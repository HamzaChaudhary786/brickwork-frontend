// src/api/questApi.ts

export interface QuestStep {
    id: string;
    questId: string;
    title: string;
    description: string;
    xpReward: number;
    coinsReward: number;
    rewardType: string;
    createdAt: string;
    updatedAt: string;
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    banner: object; // You can define this better based on actual data
    category: string;
    type: string;
    unlockConditions: string;
    submissionDeadline: string;
    startDate: string;
    endDate: string;
    visibility: string;
    xpRewards: number;
    coinsRewards: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    QuestSteps: QuestStep[];
}

export interface QuestApiResponse {
    success: boolean;
    message: string;
    result: Quest[];
    statusCode: number;
}

export async function fetchAllQuests(): Promise<QuestApiResponse> {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/quests`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // include cookies if needed
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch quests: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error("Error fetching quests:", error.message);
        throw error;
    }
}
