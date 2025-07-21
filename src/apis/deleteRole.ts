// src/api/roleApi.ts

export async function deleteRole(id: string): Promise<boolean> {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/rbac/roles/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete role: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || "Failed to delete role");
        }

        return true;
    } catch (error: any) {
        console.error("Delete Role Error:", error.message);
        return false;
    }
}
