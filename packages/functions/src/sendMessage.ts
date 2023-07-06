import { DynamoDB, ApiGatewayManagementApi } from 'aws-sdk'
import { Table } from 'sst/node/table'
import { WebSocketApiHandler } from 'sst/node/websocket-api'
import { AuthSessionType } from '../sessionTypes'
//import { useSession } from 'sst/node/auth'

const TableName = Table.Connections.tableName
const dynamoDb = new DynamoDB.DocumentClient()

export const main = WebSocketApiHandler(async (event, _ctx) => {
    const body = event.body
    if (body == null) {
        return { statusCode: 500, body: 'Invalid request (null event body)' }
    }
    const messageData = JSON.parse(body).data

//    const session = useSession<AuthSessionType>()


    const connectionId = event.requestContext.connectionId
    const result = await dynamoDb
        .scan({
            TableName: Table.Connections.tableName,
            ProjectionExpression: 'userId',
            FilterExpression: 'connectionId = :connectionId',
            ExpressionAttributeValues: {
                ':connectionId': connectionId,
             },
        })
        .promise()

    const incomingUserId: string | undefined = result.Items?.at(0)?.userId
    if(!incomingUserId)
        return { statusCode: 200, body: 'Improper user, not found'}


    const roomId = '1'
    const gameDataResults = await dynamoDb
        .scan({
            TableName: Table.GameData.tableName,
            FilterExpression: 'roomId = :roomId',
            // Define the expression attribute value, which are substitutes for the values you want to compare.
            ExpressionAttributeValues: {
                ':roomId': roomId,
            },
        })
        .promise()
    let board: string;
    if(gameDataResults.Items !== undefined && gameDataResults.Items.at(0) != null) {
        let char: string

        const gameData = gameDataResults.Items[0] as {
            roomId: string,
            boardState: string,
            winnerUserId: string,
            XUserId: string,
            OUserId: string,
        }

        if(incomingUserId === gameData.XUserId)
            char = 'X'
        else if(incomingUserId === gameData.OUserId)
            char = 'O'
        else
            return { statusCode: 200, body: 'Improper user', results: JSON.stringify({...gameData})}
        const boardArr =gameData.boardState.split("")
        boardArr[messageData] = char
        board = boardArr.join("")
        const params = {
            TableName: Table.GameData.tableName,
            Item: {
                ...gameData,
                boardState: board,
            },
        }

        await dynamoDb.put(params).promise()
    } else {
        return { statusCode: 200, body: 'no room created' , results: JSON.stringify(gameDataResults.Items)}
    }

    const { stage, domainName } = event.requestContext

    // Get all the connections
    const connections = await dynamoDb
        .scan({ TableName, ProjectionExpression: 'connectionId' })
        .promise()

    const apiG = new ApiGatewayManagementApi({
        endpoint: `${domainName}/${stage}`,
    })

    const postToConnection = async function (attrs: Record<string, unknown>) {
        if (!('connectionId' in attrs) || typeof attrs.connectionId !== 'string')
            throw new Error('no connectionId')
        const connectionId = attrs.connectionId
        try {
            // Send the message to the given client
            await apiG.postToConnection({ ConnectionId: connectionId, Data: board }).promise()
        } catch (e) {
            if (typeof e === 'object' && e !== null && 'statusCode' in e && e.statusCode === 410) {
                // Remove stale connections
                await dynamoDb.delete({ TableName, Key: { connectionId } }).promise()
            }
        }
    }

    // Iterate through all the connections
    await Promise.all((connections.Items ?? []).map(postToConnection))

    return { statusCode: 200, body: 'Message sent' }
})
