import DarkToggle from './darkToggle'
import ProfileButton from './profileButton'

export default function Header() {
    return (
        <div className="align-center sticky top-0 z-10 w-full max-w-5xl font-mono text-sm lg:static lg:mb-10 lg:flex">
            <div className="flex w-full items-center justify-between rounded-b-[24px] border-b-2 border-secondary-button bg-background bg-gradient-to-b from-secondary-background pb-2 pl-5 pr-2 pt-3 backdrop-blur-2xl transition-[background-color] duration-300 lg:static lg:rounded-full lg:border-0 lg:p-7 lg:pr-5 lg:shadow-md lg:shadow-primary-button">
                <div className="flex items-baseline">
                    <a href="/" className="text-2xl lg:text-3xl">
                        {"jack's site"}
                    </a>
                    <p className="hidden pl-3 text-sm text-muted lg:block">
                        -- an exercise in Next.js and tailwind
                    </p>
                </div>
                <div className="">
                    <DarkToggle />
                    <ProfileButton />
                </div>
            </div>
        </div>
    )
}
