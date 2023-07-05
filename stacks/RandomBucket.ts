import { StackContext, Bucket } from 'sst/constructs'

export function RandomBucket({ stack }: StackContext) {
    const bucket = new Bucket(stack, 'randomPublicBucketStack', {
        cdk: {
            id: 'randomPublicBucketID',
        },
    })
    return { bucket }
}
