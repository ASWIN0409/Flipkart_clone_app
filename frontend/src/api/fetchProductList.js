import { axiosInstance } from "../helpers/axiosInstance";

export default async function fetchProductList() {
        const response = await axiosInstance.get('/api/product/');
        return response.data;
}