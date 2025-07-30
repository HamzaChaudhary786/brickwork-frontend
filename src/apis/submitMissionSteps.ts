export interface CompleteQuestStepData {
  questStepId: string;
  proof: File; // image file to be sent as binary
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  result: T | null;
}

export const completeQuestStep = async (
  data: CompleteQuestStepData
): Promise<ApiResponse<any>> => {
  try {
    const formData = new FormData();
    formData.append("questStepId", data.questStepId);
    formData.append("proof", data.proof); // binary image

    const response = await fetch(`${import.meta.env.VITE_API_URL}/quests/completeQuestStep`, {
      method: 'PUT',
      headers: {
        // Do NOT set 'Content-Type' manually when using FormData
        // The browser sets the correct boundary automatically
        // Authorization: `Bearer ${your_token}`, // if needed
      },
      credentials: "include",
      body: formData,
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
      message: error?.message || 'Something went wrong while completing the quest step.',
      result: null,
    };
  }
};
