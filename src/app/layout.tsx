import './globals.css'
import { Inter } from 'next/font/google'
import Header from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: "jack's site",
    description: 'youre looking at an embed?',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // doing crimes (head, script) to load darkmode before anything renders
    return (
        <html lang="en">
            <head>
                <script
                    id="darkmode"
                    dangerouslySetInnerHTML={{
                        __html: `
;(function () {
    if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
        document.documentElement.classList.add('dark')
    }
})()
                  `,
                    }}
                />
            </head>
            <body className={inter.className}>
                <main className="flex min-h-screen flex-col items-center justify-between lg:px-24 lg:pt-20">
                    <Header />
                    {children}
                </main>
            </body>
        </html>
    )
}
