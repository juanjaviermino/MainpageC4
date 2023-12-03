const apiEndpoint = import.meta.env.VITE_CONTRIBUTION_API;
const API_BASE_URL = `${apiEndpoint}/verify_contributor`;

export const checkIRSContribution = async (cedula) => {
    try {
        const response = await fetch(`${API_BASE_URL}?cedula=${cedula}`);
        const data = await response.json();
        return JSON.stringify(data); // Assuming the response is an object
    } catch (error) {
        console.error('Error checking IRS contribution:', error);
        return 'Error fetching data';
    }
};

