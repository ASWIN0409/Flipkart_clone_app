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
        <div className="w-[95%] lg:w-[85%] mx-auto bg-white overflow-hidden flex flex-col lg:flex-row">

            {/* Product Image Section */}
            <div className="w-full lg:basis-[50%] relative overflow-hidden">
                <img
                    src={`${BASE_URL}${product.image}`}
                    alt={product.name}
                    className="w-full h-[350px] sm:h-[450px] lg:h-screen object-cover"
                />
            </div>

            {/* Product Details Section */}
            <div className="w-full lg:basis-[50%] p-4 sm:p-6">
                <h2 className="text-gray-800 text-sm sm:text-base lg:text-lg">
                    {product?.category?.name} / {product?.subcategory?.name}
                </h2>

                <hr className="my-3" />

                {/* Thumbnail */}
                <div className="hover:border hover:shadow-2xl transition-all duration-300 hover:translate-y-2 w-20 sm:w-24 p-2 rounded-xl mb-4">
                    <img
                        src={`${BASE_URL}${product.image}`}
                        alt={product.name}
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover"
                    />
                </div>

                <p className="font-extrabold mb-4 text-gray-800 text-base sm:text-lg">
                    {product?.brand?.name}
                </p>

                <hr className="my-3" />

                <div className="flex flex-col gap-4 my-4">

                    <p className="text-gray-800 text-lg sm:text-xl font-semibold">
                        {product.name}
                    </p>

                    {/* Tabs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="border text-center bg-black text-white font-bold hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                            Description
                        </div>

                        <div className="border text-center bg-black text-white font-bold hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                            Specification
                        </div>

                        <div className="border text-center bg-black text-white font-bold hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
                            Manufacturer Info
                        </div>
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <hr className="my-3" />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center mt-4 gap-3">
                    <button className="bg-gray-200 text-black w-full px-4 py-3 rounded-lg hover:bg-gray-300">
                        Add to Cart
                    </button>

                    <button className="bg-orange-400 text-white w-full px-4 py-3 rounded-lg hover:bg-orange-600">
                        Buy at ₹{product.price}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;