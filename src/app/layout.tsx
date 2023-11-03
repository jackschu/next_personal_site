import './globals.css'
import { Inter } from 'next/font/google'
import { getTheme } from './getTheme'
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
                <script dangerouslySetInnerHTML={{ __html: getTheme }} />
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
