import SingleLink from './singleHomeLink'
export default function HomeLinks() {
    return (
        <div className="mb-0 grid text-center lg:grid-cols-4 lg:text-left">
            <SingleLink
                title="github"
                newtab={true}
                url="https://github.com/jackschu"
                description="explore other projects made by me."
            />
            <SingleLink
                title="tic-tac-toe"
                newtab={false}
                hasRoomSuffix={true}
                url={`/tictactoe`}
                description="i'm proving out an architecture, come play a game"
            />
            {/* <SingleLink
                title="blog"
                url="/"
                description="lorem ipsum is the best, but i hope my content will be better."
            /> */}
            <SingleLink
                title="directions"
                newtab={false}
                url="/"
                description="parking instructions are included (maybe)"
            />
            <SingleLink
                title="version 1"
                newtab={true}
                url="http://v0.jackschumann.com"
                description="my site had a proto-site, you can go check it out."
            />
        </div>
    )
}
