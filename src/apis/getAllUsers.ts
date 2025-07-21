// src/api/userApi.ts

export async function fetchAllUsers() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // include cookies if you're using sessions
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error: any) {
        console.error("Error fetching user:", error.message);
        throw error;
    }
}
