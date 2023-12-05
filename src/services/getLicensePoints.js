const apiEndpoint = import.meta.env.VITE_LICENSE_POINTS_API;
const API_BASE_URL = `${apiEndpoint}/get_license_points`;

export const getLicensePoints = async (cedula) => {
    try {
        const response = await fetch(`${API_BASE_URL}?cedula=${cedula}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching license points:', error);
        return 'Error fetching data';
    }
};
