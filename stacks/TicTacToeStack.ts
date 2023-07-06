import { StackContext, Table, WebSocketApi, use } from 'sst/constructs'
import { AuthStack } from './AuthStack'

export function TicTacToeStack({ stack }: StackContext) {
    const connectionTable = new Table(stack, 'Connections', {
        fields: {
            connectionId: 'string',
            roomId: 'string',
            userId: 'string',
        },
        cdk: {
            id: 'connectionsTable',
        },
        primaryIndex: { partitionKey: 'connectionId' },
    })

    const gameDataTable = new Table(stack, 'GameData', {
        fields: {
            roomId: 'string',
            boardState: 'string',
            winnerUserId: 'string',
            XUserId: 'string',
            OUserId: 'string',
        },
        cdk: {
            id: 'gameDataTable',
        },
        primaryIndex: { partitionKey: 'roomId' },
    })

    const api = new WebSocketApi(stack, 'Api', {
        defaults: {
            function: {
                bind: [connectionTable, gameDataTable],
            },
        },
        routes: {
            $connect: 'packages/functions/src/webSocketConnect.main',
            $disconnect: 'packages/functions/src/webSocketDisconnect.main',
            sendmessage: 'packages/functions/src/sendMessage.main',
        },
    })
    const { auth } = use(AuthStack)

    api.bind([auth])

    stack.addOutputs({
        WebScoketApiEndpoint: api.url,
    })

    return { wsapi: api }
}
