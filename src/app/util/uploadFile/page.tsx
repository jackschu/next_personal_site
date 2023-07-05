import crypto from 'crypto'
import { Bucket } from 'sst/node/bucket'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export default function UploadPage() {
    async function put_object(data: FormData) {
        'use server'

        const command = new PutObjectCommand({
            ACL: 'public-read',
            Key: crypto.randomUUID(),
            Bucket: Bucket.randomPublicBucketStack.bucketName,
        })
        const url = await getSignedUrl(new S3Client({}), command)

        const file = data.get('file')
        if (!file || typeof file === 'string') {
            console.error('no file attached')
            return
        }
        const put_result = await fetch(url, {
            body: file,
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
                'Content-Disposition': `attachment; filename="${file.name}"`,
            },
        })
    }

    return (
        <form action={put_object}>
            <input name="file" type="file" accept="image/png, image/jpeg" />
            <button type="submit">Upload</button>
        </form>
    )
}
