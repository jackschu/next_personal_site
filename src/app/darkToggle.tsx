'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export default function DarkToggle() {
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
        <button
            onClick={() => setIsDark(!isDark)}
            title="TODO: darkmode switch"
            className="rounded-full bg-secondary-button px-2 py-1 text-sm [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)] lg:px-4 lg:py-3 lg:text-base"
        >
            {'🔦'}
        </button>
    )
}
