import { Table } from "sst/node/table";
import { NextjsSite } from 'sst/constructs'
import { AuthHandler, GoogleAdapter, Session } from 'sst/node/auth'
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'

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
                        TableName: (Table as any).users.tableName,
                        Item: marshall({
                            userId: claims.sub,
                            email: claims.email,
                            picture: claims.picture,
                            name: claims.given_name,
                        }),
                    })
                )
//                console.log(NextjsSite)

                return Session.parameter({
                    redirect: 'http://localhost:3000',
//                    redirect:(NextjsSite as any).site.url,
                    //@ts-ignore
                    type: 'user',
                    properties: {
                        userID: claims.sub,
                    },
                })
            },
        }),
    },
})
