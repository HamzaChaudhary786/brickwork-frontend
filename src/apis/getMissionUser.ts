// src/api/userApi.ts

export async function fetchUserMissions() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/quests/userQuests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // For cookies/session-based auth
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user missions: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error: any) {
        console.error("Error fetching user missions:", error.message);
        throw error;
    }
}





