import './globals.css'
import { Inter } from 'next/font/google'
import Header from './header'
import Link from 'next/link'

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
    if (localStorage.getItem('isDarkMode') === 'true' || (localStorage.getItem('isDarkMode') == null && window.matchMedia('(prefers-color-scheme:dark)').matches)) {
console.log("here")
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
                    <div className="flex flex-grow">{children}</div>
                    <Link href="/privacy" className="p-4 text-xs text-muted">
                        (privacy policy)
                    </Link>
                </main>
            </body>
        </html>
    )
}
