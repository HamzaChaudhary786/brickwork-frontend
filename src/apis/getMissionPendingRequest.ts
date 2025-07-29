// src/api/missionApi.ts

export interface PendingMissionUser {
    id: string;
    name: string;
}

export interface PendingMissionQuest {
    id: string;
    title: string;
}

export interface PendingMission {
    id: string;
    coinsRewards: number;
    xpRewards: number;
    user: PendingMissionUser;
    quest: PendingMissionQuest;
}

export interface PendingMissionApiResponse {
    success: boolean;
    message: string;
    result: PendingMission[];
    statusCode: number;
}

export async function getPendingMissionRequest(): Promise<PendingMissionApiResponse> {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/quests/getPendingMissionRequest`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // include cookies if needed
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch pending missions: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error("Error fetching pending mission requests:", error.message);
        throw error;
    }
}
