import { DynamoDB } from 'aws-sdk'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { Table } from 'sst/node/table'

const dynamoDb = new DynamoDB.DocumentClient()

export const main: APIGatewayProxyHandler = async (event) => {
    const params = {
        TableName: Table.Connections.tableName,
        Key: {
            connectionId: event.requestContext.connectionId,
        },
    }

    await dynamoDb.delete(params).promise()

    return { statusCode: 200, body: 'Disconnected' }
}
