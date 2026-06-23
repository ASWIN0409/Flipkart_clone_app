import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import fetchProductDetails from "../api/fetchProductDetails";

function ProductDetails() {

    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductDetails(id),
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 2,
        retry: 2,
        refetchOnWindowFocus: true
    });

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error: {error.message}</h1>

    return (
        <>
            <div>This is the product detail page {id}</div>
            <div className=" w-80 h-full mx-auto bg-white rounded-3xl overflow-hidden shadow-md">

                <div className="relative overflow-hidden">
                    <img
                        src={`${BASE_URL}${product.image}`}
                        alt={product.name}
                        className="h-56 w-full"
                    />
                </div>

                <div className="p-5">
                    <h2 className="font-semibold text-gray-800 text-lg">
                        {product.name}
                    </h2>

                    <div className="flex items-center justify-between mt-3">
                        <span className="text-2xl font-bold text-green-600">
                            ₹{product.price}
                        </span>

                        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ProductDetails;