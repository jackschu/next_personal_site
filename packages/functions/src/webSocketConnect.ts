import { DynamoDB } from 'aws-sdk'
import { useSession } from 'sst/node/auth'
import { WebSocketApiHandler } from 'sst/node/websocket-api'
import { Table } from 'sst/node/table'
import { AuthSessionType } from '../sessionTypes'
const dynamoDb = new DynamoDB.DocumentClient()

export const main = WebSocketApiHandler(async (event, _ctx) => {
    const session = useSession<AuthSessionType>()

    //@ts-ignore bug from sst auth?
    if (session.type !== 'user') {
        return { statusCode: 500, body: 'Not authenticated', session: JSON.stringify(session) }
    }
    const TableName = Table.Connections.tableName
    const roomId = '1'
    const incomingUserId = session.properties.userID

    const connectionParams = {
        TableName,
        Item: {
            connectionId: event.requestContext.connectionId,
            userId: incomingUserId,
            roomId: roomId,
        },
    }

    await dynamoDb.put(connectionParams).promise()

    const others = await dynamoDb
        .scan({
            TableName: Table.GameData.tableName,
            ProjectionExpression: 'XUserId,OUserId',
            FilterExpression: 'roomId = :roomid',
//            FilterExpression: '(NOT XUserId = :mine) AND roomId = :roomid',
            // // Define the expression attribute value, which are substitutes for the values you want to compare.
            ExpressionAttributeValues: {
//                ':mine': incomingUserId ,
                ':roomid': roomId,
             },
        })
        .promise()

    const otherXUserId = others.Items?.at(0)?.XUserId
    const otherOUserId = others.Items?.at(0)?.OUserId
    let playerIds: {XUserId: string | undefined, OUserId: string | undefined}

    if(otherXUserId === incomingUserId || otherOUserId === incomingUserId) {
        return { statusCode: 200, body: 'Connected'}
    }

    if(!otherOUserId && !otherXUserId)
        playerIds = {
            XUserId: incomingUserId,
            OUserId: undefined,
        }
    else if(otherXUserId && !otherOUserId)
        playerIds = {
            XUserId: otherXUserId,
            OUserId: incomingUserId,
        }
    else if(otherXUserId && otherOUserId){
        playerIds = {
            XUserId: incomingUserId,
            OUserId: undefined,
        }
    } else {
        playerIds = {
            XUserId: incomingUserId,
            OUserId: otherOUserId,
        }
    }

    const params = {
        TableName: Table.GameData.tableName,
        Item: {
            boardState: '         ',
            winnerUserId: '',
            roomId: roomId,
            ...playerIds,
        },
        //        ConditionExpression: 'attribute_not_exists(roomId)'
    }

    await dynamoDb.put(params).promise()

    return { statusCode: 200, body: 'Connected'}
})
