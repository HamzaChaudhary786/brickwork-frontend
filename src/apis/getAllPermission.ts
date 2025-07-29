// src/api/permissionApi.ts

export async function fetchAllPermissions() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/rbac/permissions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // if you're using cookies/session auth
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch permissions: ${response.status}`);
        }

        const data = await response.json();
        return data; // includes success, message, result
    } catch (error: any) {
        console.error('Error fetching permissions:', error.message);
        throw error;
    }
}
