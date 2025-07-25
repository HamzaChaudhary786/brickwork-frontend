import { ApiResponse } from './addRoles';

export const startMission = async (questId: string): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/quests/userQuest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${your_token}` // Uncomment if required
            },
            credentials: 'include',
            body: JSON.stringify({ questId }), // only sending questId
        });

        const contentType = response.headers.get('Content-Type');

        if (!contentType || !contentType.includes('application/json')) {
            return {
                success: false,
                statusCode: response.status,
                message: 'Unexpected server response format (not JSON)',
                result: null,
            };
        }

        const data: ApiResponse<any> = await response.json();

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: data?.message || 'Mission start request failed',
                result: null,
            };
        }

        return data;
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error?.message || 'Something went wrong while starting the mission.',
            result: null,
        };
    }
};
