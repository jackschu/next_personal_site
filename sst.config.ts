import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { SSTConfig } from 'sst'
import { NextjsSite, use } from 'sst/constructs'
import { RandomBucket } from './stacks/RandomBucket'
import { isDev } from './stacks/utils'
import { AuthStack } from './stacks/AuthStack'

export default {
    config(_input) {
        return {
            name: 'next-app',
            region: 'us-east-1',
        }
    },
    stacks(app) {
        if (isDev(app.stage)) {
            app.setDefaultRemovalPolicy('destroy')
        }

        app.stack(RandomBucket)
            .stack(AuthStack)
            .stack(function Site({ stack }) {
                const { bucket } = use(RandomBucket)
                const { api } = use(AuthStack)

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

                stack.addOutputs({
                    SiteUrl: site.url,
                })
            })
    },
} satisfies SSTConfig
