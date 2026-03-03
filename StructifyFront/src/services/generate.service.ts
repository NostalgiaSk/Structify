import apiClient from './apiClient';
import type { GeneratedResult } from '../pages/Dashboard/types';

interface GenerateResponse {
    success: boolean;
    data: GeneratedResult;
}

export async function generateArchitecture(description: string): Promise<GeneratedResult> {
    try {
        const response = await apiClient.post<GenerateResponse>('/api/generate', {
            description,
        });

        return response.data.data;
    } catch (error: unknown) {
        if (error instanceof Error && 'response' in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            const serverMessage = axiosError.response?.data?.message;
            throw new Error(serverMessage || 'Failed to generate architecture');
        }
        throw new Error('Network error — unable to reach server');
    }
}
