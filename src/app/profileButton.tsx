'use client'

import { useTransition, useEffect, useState, useCallback } from 'react'
import { Amplify, Hub } from '@aws-amplify/core'
import { CognitoHostedUIIdentityProvider, Auth } from '@aws-amplify/auth'
import awsConfig from './../aws-exports'

const isLocalhost = process && process.env.NODE_ENV === 'development'

// Assuming you have two redirect URIs, and the second is for localhost and first is for production
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

export default function ProfileButton() {
    const [user, setUser] = useState<
        null | 'none' | { attributes?: { name?: string; nickname?: string } }
    >(null)
    const [optimisticUser, setOptimisticUser] = useState(false)
    const [isHovered, setHovered] = useState(false)

    useEffect(() => {
        const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    setUser(data)
                    setOptimisticUser(true)
                    break
                case 'signOut':
                    setUser('none')
                    setOptimisticUser(false)
                    break
            }
        })

        Auth.currentAuthenticatedUser()
            .then((currentUser: Record<string, unknown>) => {
                setUser(currentUser)
                setOptimisticUser(true)
            })
            .catch((reason) => {
                setUser('none')
                setOptimisticUser(false)
            })

        return unsubscribe
    }, [])

    const name = user !== 'none' ? user?.attributes?.nickname?.toLowerCase?.() : null
    const onClick =
        user == null || user == 'none'
            ? () => {
                  setOptimisticUser(true)
                  Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
              }
            : () => {
                  setOptimisticUser(false)
                  Auth.signOut()
              }

    const isStale = user == null || (optimisticUser ? user == 'none' : user != 'none')
    const text = name == null ? 'sign in' : `hi ${name}`

    return (
        <>
            <button
                type="button"
                disabled={isStale}
                className={`has-tooltip ${
                    isStale ? 'opacity-50' : ''
                } relative ml-1 h-7 rounded-full bg-accent px-2 text-xs text-[#1a1d16c4] lg:ml-2 lg:h-12 lg:px-3 lg:text-base`}
                onClick={onClick}
            >
                {name != null && (
                    <div
                        role="tooltip"
                        className="tooltip right-0 mt-10 w-24 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 lg:left-1/2 lg:-translate-x-1/2"
                    >
                        <div className="px-3 py-2">
                            <p>sign out</p>
                        </div>
                    </div>
                )}
                {text}
            </button>
        </>
    )
}
