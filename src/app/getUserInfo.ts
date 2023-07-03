'use server'

const getUserInfo = async (session: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session}`,
            },
        })
        return response.json()
    } catch (error) {
        alert(error)
    }
}