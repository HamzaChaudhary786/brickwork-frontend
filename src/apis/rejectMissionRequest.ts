// src/api/mission.ts


interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    result: T | null;
}


export const rejectMissionRequest = async (id: string): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/quests/rejectRequest/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${your_token}`, // optional
            },
            credentials: 'include',
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
                message: data?.message || 'Request failed',
                result: null,
            };
        }

        return data;
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error?.message || 'Something went wrong while rejecting the request.',
            result: null,
        };
    }
};
