export const getUserInfo = async (
    session: string
): Promise<Record<string, unknown> | undefined> => {
    // if (true) return
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session}`,
            },
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return
    }
}
