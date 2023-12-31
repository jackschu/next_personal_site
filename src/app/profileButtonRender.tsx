type Props = {
    disabled: boolean
    onClick?: () => void
    name?: string | null
}

export default function ProfileButtonRender({ disabled, onClick, name }: Props) {
    const text = name == null ? 'sign in' : `hi ${name}`
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`has-tooltip ${
                disabled ? 'opacity-50' : ''
            } relative ml-1 h-7 rounded-full bg-accent px-2 text-xs text-[#1a1d16c4] lg:ml-2 lg:h-12 lg:px-3 lg:text-base`}
        >
            {name != null && (
                <div
                    role="tooltip"
                    className="tooltip right-0 mt-10 w-24 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 lg:left-1/2 lg:-translate-x-1/2"
                >
                    <div className="px-3 py-2">
                        <p>sign out</p>
                    </div>
                </div>
            )}
            {text}
        </button>
    )
}
