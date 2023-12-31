import Image from 'next/image'
import profilePic from '../../public/pic.jpg'
import Header from './header'
import HomeLinks from './homeLinks'

export default function Home() {
    return (
        <div className="flex flex-col justify-evenly">
            <div className="group flex flex-col justify-center gap-10 rounded-md pb-14 pt-10 lg:flex-row lg:gap-16 lg:pt-0">
                <div className="flex flex-row justify-center gap-2">
                    <div className="flex flex-col justify-center lg:gap-1">
                        <div className="flex flex-row gap-2">
                            <div className="group-hover:animate-wiggle">
                                <p className="text-center text-4xl lg:text-5xl">{'👋'}</p>
                            </div>
                            <p className="text-center text-4xl lg:text-5xl">
                                {"hi i'm jack"}
                                <span className="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
                            </p>
                        </div>
                        <p className="text-center text-sm text-muted">(jack schumann)</p>
                    </div>
                </div>
                <Image
                    className="w-80 rounded-full shadow-lg shadow-[#8a8eb2]/40 dark:shadow-[#8a8eb2]/30" //"
                    src={profilePic}
                    alt={'profile pic of jack'}
                    placeholder="blur"
                    blurDataURL="/pic_blur.jpg"
                />
            </div>
            <HomeLinks />
        </div>
    )
}
