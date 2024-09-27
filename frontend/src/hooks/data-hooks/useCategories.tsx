import axios from 'axios';
import { useQuery } from 'react-query';
import { API_BASE_URL } from '../../Config/config';

export const useFetchCategoryList = () => {
  return useQuery('categories', async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/user/categories`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
  });
};