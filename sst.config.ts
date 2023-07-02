import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { SSTConfig } from 'sst'
import { Api, Auth, Bucket, NextjsSite, Table } from 'sst/constructs'

export default {
    config(_input) {
        return {
            name: 'next-app',
            region: 'us-east-1',
        }
    },
    stacks(app) {
        if (app.stage === 'devbox') {
            app.setDefaultRemovalPolicy('destroy')
        }
        app.stack(function Site({ stack }) {
            const bucket = new Bucket(stack, 'public')

            const table = new Table(stack, 'users', {
                fields: {
                    userId: 'string',
                },
                primaryIndex: { partitionKey: 'userId' },
            })

            const api = new Api(stack, 'api', {
                defaults: {
                    function: {
                        bind: [table],
                    },
                },
                routes: {
                    'GET /': 'packages/functions/src/auth.handler',
                    'GET /session': 'packages/functions/src/session.handler',
                },
            })

            const site = new NextjsSite(stack, 'site', {
                customDomain: {
                    domainName: 'jackschumann.com',
                    isExternalDomain: true,
                    cdk: {
                        certificate: Certificate.fromCertificateArn(
                            stack,
                            'jackschumannCert',
                            'arn:aws:acm:us-east-1:311526342890:certificate/329d1754-512d-438c-bc83-a5981ad0ed2f'
                        ),
                    },
                },
                environment: {
                    NEXT_PUBLIC_API_URL: api.url,
                },
                bind: [bucket],
            })

            const auth = new Auth(stack, 'auth', {
                authenticator: {
                    handler: 'packages/functions/src/auth.handler',
                    bind: [site],
                },
            })
            auth.attach(stack, {
                api,
                prefix: '/auth',
            })

            stack.addOutputs({
                ApiEndpoint: api.url,
                SiteUrl: site.url,
            })
        })
    },
} satisfies SSTConfig
