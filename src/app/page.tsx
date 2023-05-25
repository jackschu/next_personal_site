import Image from 'next/image'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center  bg-background bg-gradient-to-b from-secondary-button  pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:p-4 lg:shadow-md lg:shadow-primary-button">
                    An exercise in&nbsp;
                    <code className="font-mono font-bold">Next.js and tailwind</code>
                </p>
                <div className="fixed bottom-0 left-0 flex h-auto w-full justify-center border-t-2 border-secondary-button py-2 backdrop-blur-sm lg:static  lg:w-auto lg:items-end lg:border-none lg:bg-none">
                    By&nbsp;<span className="italic">Jack Schumann</span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-8 rounded-md hover:border-2 hover:border-accent lg:flex-row lg:gap-16">
                <p className="text-5xl">👋 Hi, I'm Jack</p>
                <Image
                    className="rounded-full shadow-lg shadow-[#8a8eb2]/40 dark:shadow-[#8a8eb2]/30" //"
                    src={'/pic.jpg'}
                    alt={'profile pic of jack'}
                    width={300}
                    height={300}
                />
            </div>

            <div className="mb-0 grid text-center lg:grid-cols-4 lg:text-left">
                <a
                    href="https://github.com/jackschu"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Github{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Explore other projects made by me.
                    </p>
                </a>

                <a
                    href=""
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Blog{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Lorem ipsum is the best, but I hope my content will be better.
                    </p>
                </a>

                <a
                    href=""
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Directions{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Parking instructions are included (maybe)
                    </p>
                </a>

                <a
                    href="http://jackschumann.com"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Version 1{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        My site had a proto-site, you can go check it out.
                    </p>
                </a>
            </div>
        </main>
    )
}
