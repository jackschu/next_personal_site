'use client'
import type { ReactNode } from 'react'

export default function PrivacyPage() {
    const clear = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js', { scope: '/' })
                .then((registration) => {
                    // registration worked
                    console.log('Registration succeeded.')
                    registration.unregister().then((boolean) => {
                        // if boolean = true, unregister is successful
                    })
                })
                .catch((error) => {
                    // registration failed
                    console.error(`Registration failed with ${error}`)
                })
        }
    }

    return (
        <>
            <div>
                <button onClick={clear}>clear!</button>
            </div>
            <button onClick={clear}>clear!</button>
        </>
    )
}
