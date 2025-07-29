import { ApiResponse } from "./addRoles";

export const assignRoles = async (
  userId: string,
  roleIds: string[]
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${your_token}` // Optional: auth token
      },
      credentials: 'include',
      body: JSON.stringify(roleIds),
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
      message: error?.message || 'Something went wrong while assigning roles.',
      result: null,
    };
  }
};
