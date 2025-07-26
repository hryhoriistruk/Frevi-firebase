import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const getComplaints = async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/complaints`);
    return response.data;
};

export const resolveComplaint = async (complaintId) => {
    const response = await axios.post(`${API_BASE_URL}/admin/complaints/${complaintId}/resolve`);
    return response.data;
};