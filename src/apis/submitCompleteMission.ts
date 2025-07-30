export interface CompleteQuestData {
    questId: string;
}

export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    result: T | null;
}

export const completeQuest = async (
    data: CompleteQuestData
): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/quests/completeQuest`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${your_token}`, // Optional
            },
            credentials: 'include',
            body: JSON.stringify(data),
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

        const responseData: ApiResponse<any> = await response.json();

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: responseData?.message || 'Request failed',
                result: null,
            };
        }

        return responseData;
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error?.message || 'Something went wrong while completing the quest.',
            result: null,
        };
    }
};
