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
        const isDev = app.stage === 'devbox'
        if (isDev) {
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
                            'arn:aws:acm:us-east-1:311526342890:certificate/1ae597dd-4676-40ed-904d-e4ccb207153b'
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
                    environment: {
                        REDIRECT_URL: isDev ? 'http://localhost:3000' : 'https://www.jackschumann.com',
                    },
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
