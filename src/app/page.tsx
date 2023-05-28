'use client'

import Image from 'next/image'
import profilePic from '../../public/pic.jpg'
import Header from './header'
import HomeLinks from './homeLinks'
import { useEffect, useState } from 'react'
import { Amplify, Hub } from '@aws-amplify/core'
import { CognitoHostedUIIdentityProvider, Auth } from '@aws-amplify/auth'
import awsConfig from './../aws-exports'

const isLocalhost = true

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [productionRedirectSignIn, localRedirectSignIn] = awsConfig.oauth.redirectSignIn.split(',')

const [productionRedirectSignOut, localRedirectSignOut] = awsConfig.oauth.redirectSignOut.split(',')

const updatedAwsConfig = {
    ...awsConfig,
    oauth: {
        ...awsConfig.oauth,
        redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
        redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    },
}

Amplify.configure(updatedAwsConfig)

export default function Home() {
    const [user, setUser] = useState(null)
    const [customState, setCustomState] = useState(null)

    useEffect(() => {
        const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    setUser(data)
                    break
                case 'signOut':
                    setUser(null)
                    break
                case 'customOAuthState':
                    setCustomState(data)
            }
        })

        Auth.currentAuthenticatedUser()
            .then((currentUser) => setUser(currentUser))
            .catch(() => console.log('Not signed in'))

        return unsubscribe
    }, [])

    console.log(user)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 lg:pt-20">
            <Header />
            {user ? user.attributes.name : 'nope'}

            <button
                onClick={() =>
                    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
                }
            >
                Open Google
            </button>
            <button onClick={() => Auth.signOut()}>Sign Out</button>
            <div className="group flex flex-col items-center gap-10 rounded-md pb-14 pt-10 lg:flex-row lg:gap-16 lg:pt-0">
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col lg:gap-1">
                        <div className="flex flex-row gap-2">
                            <div className="group-hover:animate-wiggle">
                                <p className="text-center text-4xl lg:text-5xl">{'👋'}</p>
                            </div>
                            <p className="text-center text-4xl lg:text-5xl">
                                {"hi i'm jack"}
                                <span className="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
                            </p>
                        </div>
                        <p className="text-center text-sm opacity-60">(jack schumann)</p>
                    </div>
                </div>
                <Image
                    className="w-80 rounded-full shadow-lg shadow-[#8a8eb2]/40 dark:shadow-[#8a8eb2]/30" //"
                    src={profilePic}
                    alt={'profile pic of jack'}
                    placeholder="blur"
                    blurDataURL="/pic_blur.jpg"
                />
            </div>
            <HomeLinks />
        </main>
    )
}
