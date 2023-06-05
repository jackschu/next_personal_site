'use client'

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
    const localValue =
        typeof window !== 'undefined' ? localStorage.getItem('isDarkMode') : undefined
    const [isDark, setIsDark] = useState(
        localValue === 'true' || (localValue == null && systemPrefersDark)
    )

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])
    return (
        <button
            onClick={() => {
                localStorage.setItem('isDarkMode', !isDark ? 'true' : 'false')
                setIsDark(!isDark)
            }}
            className="h-7 rounded-full bg-secondary-button px-2 text-sm [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)] lg:h-12 lg:px-4 lg:text-base"
        >
            {'🔦'}
        </button>
    )
}
