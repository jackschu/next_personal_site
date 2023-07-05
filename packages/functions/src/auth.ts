import { Table } from 'sst/node/table'
import { AuthHandler, GoogleAdapter, Session } from 'sst/node/auth'
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { AuthSessionType } from '../sessionTypes'

const GOOGLE_CLIENT_ID = '6143585867-3klj82trtqujqrdqu2g9sbkmv8ofejb3.apps.googleusercontent.com'

export const handler = AuthHandler({
    providers: {
        google: GoogleAdapter({
            mode: 'oidc',
            clientID: GOOGLE_CLIENT_ID,
            onSuccess: async (tokenset) => {
                const claims = tokenset.claims()

                const ddb = new DynamoDBClient({})
                await ddb.send(
                    new PutItemCommand({
                        TableName: Table.usersStack.tableName,
                        Item: marshall({
                            userId: claims.sub,
                            email: claims.email,
                            picture: claims.picture,
                            name: claims.given_name,
                        }),
                    })
                )
                const properties: AuthSessionType = {
                    properties: {
                        userID: claims.sub,
                    },
                }
                return Session.parameter({
                    redirect: process.env.REDIRECT_URL ?? 'https://www.jackschumann.com',
                    //@ts-ignore bug from sst auth?
                    type: 'user',
                    ...properties,
                })
            },
        }),
    },
})
