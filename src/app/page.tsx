import Image from 'next/image'
import profilePic from '../../public/pic.jpg'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-16 pt-24 lg:p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center  bg-background bg-gradient-to-b from-secondary-button  pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:p-4 lg:shadow-md lg:shadow-primary-button">
                    an exercise in&nbsp;
                    <code className="font-mono font-bold">Next.js and tailwind</code>
                </p>
                <div className="fixed bottom-0 left-0 flex h-auto w-full justify-center border-t-2 border-secondary-button py-2 backdrop-blur-sm lg:static  lg:w-auto lg:items-end lg:border-none lg:bg-none">
                    by&nbsp;<span className="italic">jack schumann</span>
                </div>
            </div>

            <div className="group flex flex-col items-center gap-6 rounded-md lg:flex-row lg:gap-16">
                <div className="flex flex-row gap-2">
                    <div className="group-hover:animate-wiggle">
                        <p className="text-center text-4xl lg:text-5xl">{'👋'}</p>
                    </div>
                    <p className="text-center text-4xl lg:text-5xl">
                        {" hi i'm jack"}
                        <span class="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
                    </p>
                </div>
                <Image
                    className="w-80 rounded-full shadow-lg shadow-[#8a8eb2]/40 dark:shadow-[#8a8eb2]/30" //"
                    src={profilePic}
                    alt={'profile pic of jack'}
                    placeholder="blur"
                    blurDataURL="/pic_blur.jpg"
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
                        github{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        explore other projects made by me.
                    </p>
                </a>

                <a
                    href=""
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        blog{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        lorem ipsum is the best, but i hope my content will be better.
                    </p>
                </a>

                <a
                    href=""
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        directions{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        parking instructions are included (maybe)
                    </p>
                </a>

                <a
                    href="http://jackschumann.com"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        version 1{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        my site had a proto-site, you can go check it out.
                    </p>
                </a>
            </div>
        </main>
    )
}
