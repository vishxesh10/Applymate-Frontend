export const generateContent = async (formData) => {
    try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

        const response = await fetch(`${API_URL}/generate`, {
            method: "POST",
            // Content-Type is set automatically by browser for FormData
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
