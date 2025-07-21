import { ApiResponse, RoleData } from "./addRoles";

export const assignRole = async (
  id: string,
  roleData: RoleData
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/rbac/roles/{id}`,
      {
        method: 'PUT', // or 'PUT' if you're updating
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(roleData),
      }
    );

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
      message:
        error?.message || 'Something went wrong while assigning the role.',
      result: null,
    };
  }
};
