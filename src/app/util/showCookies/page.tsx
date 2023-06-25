import { cookies } from 'next/headers'
import awsConfig from './../../../aws-exports'

import { Amplify } from '@aws-amplify/core'

Amplify.configure({ ...awsConfig, ssr: true })

export default function Page() {
    const cookieStore = cookies()
    return cookieStore.getAll().map((cookie) => (
        <div key={cookie.name}>
            <p>Name: {cookie.name}</p>
            <p>Value: {cookie.value}</p>
        </div>
    ))
}
