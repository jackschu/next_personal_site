'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export default function Header() {
    const systemPrefersDark = useMediaQuery(
        {
            query: '(prefers-color-scheme: dark)',
        },
        undefined,
        (prefersDark) => {
            setIsDark(prefersDark)
        }
    )
    const [isDark, setIsDark] = useState(systemPrefersDark)
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])
    return (
        <div className="sticky top-0 z-10 w-full max-w-5xl font-mono text-sm lg:flex">
            <div className="flex w-full items-center justify-between rounded-b-[24px] border-b-2 border-secondary-button bg-background bg-gradient-to-b from-secondary-background pb-2 pl-5 pr-4 pt-3 backdrop-blur-2xl transition-[background-color] duration-300 lg:static lg:rounded-full lg:border-0 lg:p-7 lg:pr-5 lg:shadow-md lg:shadow-primary-button">
                <div className="flex items-baseline">
                    <p className="text-2xl lg:text-3xl">{"jack's site"}</p>
                    <p className="hidden pl-3 text-sm opacity-70 lg:block">
                        -- an exercise in Next.js and tailwind
                    </p>
                </div>
                <div className="">
                    <button
                        onClick={() => setIsDark(!isDark)}
                        title="TODO: darkmode switch"
                        className="rounded-full bg-secondary-button px-2 py-1 text-sm [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)] lg:px-4 lg:py-3 lg:text-base"
                    >
                        {'🔦'}
                    </button>
                    {/* <button className="ml-2 rounded-full bg-accent px-2 py-1 text-sm text-primary lg:p-3 lg:text-base">
                            Sign in
                        </button> */}
                </div>
            </div>
        </div>
    )
}
