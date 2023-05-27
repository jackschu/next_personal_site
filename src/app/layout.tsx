import { useEffect } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: "jack's site",
    description: 'youre looking at an embed?',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {' '}
                <Script id="darkmode">
                    {/* TODO: remove if we go to non static export */}
                    {
                        "if(window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark');"
                    }
                </Script>
                {children}
            </body>
        </html>
    )
}
