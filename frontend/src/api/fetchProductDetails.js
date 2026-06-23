import { axiosInstance } from "../helpers/axiosInstance";

export default async function fetchProductDetails(id) {
        const response = await axiosInstance.get(`api/product/${id}`);
        return response.data;
}