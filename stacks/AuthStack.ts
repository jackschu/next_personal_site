import { Api, Auth, Table } from 'sst/constructs'
import { StackContext } from 'sst/constructs'
import { isDev } from './utils'

export function AuthStack({ stack }: StackContext) {
    const table = new Table(stack, 'usersStack', {
        fields: {
            userId: 'string',
        },
        cdk: {
            id: 'usersTableID_v2',
        },
        primaryIndex: { partitionKey: 'userId' },
    })
    const api = new Api(stack, 'apiStack', {
        defaults: {
            function: {
                bind: [table],
            },
        },
        routes: {
            'GET /': 'packages/functions/src/auth.handler',
            'GET /session': 'packages/functions/src/session.handler',
        },
        cdk: {
            id: 'apiID',
        },
    })
    const auth = new Auth(stack, 'authStack', {
        authenticator: {
            handler: 'packages/functions/src/auth.handler',
            environment: {
                REDIRECT_URL: isDev(stack.stage)
                    ? 'http://localhost:3000'
                    : 'https://www.jackschumann.com',
            },
        },
        // cdk: {
        //     id: 'authID',
        // },
    })
    stack.addOutputs({
        ApiEndpoint: api.url,
    })

    auth.attach(stack, {
        api,
        prefix: '/auth',
    })
    return { api, auth }
}
