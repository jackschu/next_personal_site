import { DynamoDB, ApiGatewayManagementApi } from 'aws-sdk'
import { Table } from 'sst/node/table'
import { WebSocketApiHandler } from 'sst/node/websocket-api'

const ConnectionTableName = Table.Connections.tableName
const dynamoDb = new DynamoDB.DocumentClient()

export const main = WebSocketApiHandler(async (event, _ctx) => {
    const connectionId = event.requestContext.connectionId
    const result = await dynamoDb
        .scan({
            TableName: Table.Connections.tableName,
            ProjectionExpression: 'userId,roomId',
            FilterExpression: 'connectionId = :connectionId',
            ExpressionAttributeValues: {
                ':connectionId': connectionId,
            },
        })
        .promise()

    const incomingUserId: string | undefined = result.Items?.at(0)?.userId
    const roomId: string | undefined = result.Items?.at(0)?.roomId

    const { stage, domainName } = event.requestContext
    const apiG = new ApiGatewayManagementApi({
        endpoint: `${domainName}/${stage}`,
    })

    const postToConnection = async function (message: string) {
        try {
            // Send the message to the given client
            await apiG.postToConnection({ ConnectionId: connectionId, Data: message }).promise()
        } catch (e) {
            if (typeof e === 'object' && e !== null && 'statusCode' in e && e.statusCode === 410) {
                // Remove stale connections
                await dynamoDb
                    .delete({ TableName: ConnectionTableName, Key: { connectionId } })
                    .promise()
            }
        }
    }

    if (!incomingUserId || !roomId) {
        await postToConnection(
            JSON.stringify({
                message: 'error',
                info: 'failed to find room or user',
                incomingUserId,
                roomId,
            })
        )
        return { statusCode: 200, body: 'Improper user, not found' }
    }

    const others = await dynamoDb
        .scan({
            TableName: Table.GameData.tableName,
            ProjectionExpression: 'XUserId,OUserId,boardState,winnerUserId',
            FilterExpression: 'roomId = :roomid',
            ExpressionAttributeValues: {
                ':roomid': roomId,
            },
        })
        .promise()
    const roomData = others.Items?.at(0) ?? {}
    await postToConnection(
        JSON.stringify({ message: 'gameInfo', roomId, yourUserId: incomingUserId, ...roomData })
    )

    return { statusCode: 200, body: 'Message sent' }
})
