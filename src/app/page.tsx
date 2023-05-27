import Image from 'next/image'
import profilePic from '../../public/pic.jpg'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 lg:pt-20">
            <div className="sticky top-0 z-10 w-full max-w-5xl font-mono text-sm lg:flex">
                <div className="flex w-full items-center justify-between rounded-b-[24px] border-b-2 border-secondary-button bg-background bg-gradient-to-b from-secondary-background py-3 pl-5 pr-3 backdrop-blur-2xl lg:static lg:rounded-full lg:border-0 lg:p-7 lg:pr-5 lg:shadow-md lg:shadow-primary-button">
                    <div className="flex items-baseline">
                        <p className="text-2xl lg:text-3xl">jack's site</p>
                        <p className="hidden pl-2 text-sm opacity-70 lg:block">
                            an exercise in Next.js and tailwind
                        </p>
                    </div>
                    <div className="">
                        <button className="mr-2 rounded-full bg-secondary-button px-2 py-1 text-sm lg:px-4 lg:py-3 lg:text-base">
                            {'🔦'}
                        </button>
                        {/* <button className="rounded-full bg-accent px-2 py-1 text-sm text-primary lg:p-3 lg:text-base">
                            Sign in
                        </button> */}
                    </div>
                </div>
            </div>

            <div className="group flex flex-col items-center gap-8 rounded-md pb-12 pt-9 lg:flex-row lg:gap-16">
                <div className="flex flex-row gap-2">
                    <div className="group-hover:animate-wiggle">
                        <p className="text-center text-4xl lg:text-5xl">{'👋'}</p>
                    </div>
                    <p className="text-center text-4xl lg:text-5xl">
                        {" hi i'm jack"}
                        <span className="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
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
