import { Table } from 'sst/node/table'
import { ApiHandler } from 'sst/node/api'
import { useSession } from 'sst/node/auth'
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

export const handler = ApiHandler(async () => {
    const session = useSession()

    //@ts-ignore bug from sst auth?
    if (session.type !== 'user') {
        throw new Error('Not authenticated')
    }

    const ddb = new DynamoDBClient({})
    const data = await ddb.send(
        new GetItemCommand({
            //@ts-ignore cant see binding
            TableName: Table.users.tableName,
            Key: marshall({
                //@ts-ignore cant see binding
                userId: session.properties.userID,
            }),
        })
    )

    return {
        statusCode: 200,
        body: JSON.stringify(unmarshall(data.Item!)),
    }
})
