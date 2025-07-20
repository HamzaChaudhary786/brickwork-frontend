export interface RoleData {
  name: string;
  description: string;
  discordRoleId: string;
  color: number;
  level: number;
  isActive: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  result: T | null;
}

export const addRole = async (roleData: RoleData): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rbac/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add your auth token if needed
        // Authorization: `Bearer ${your_token}`,
      },
      body: JSON.stringify(roleData),
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
      message: error?.message || 'Something went wrong while adding the role.',
      result: null,
    };
  }
};
