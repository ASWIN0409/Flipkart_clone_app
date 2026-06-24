import { useQuery } from "@tanstack/react-query";
import fetchProductList from "../api/fetchProductList";
import ProductCard from "../components/ProductCard";
import {useNavigate} from 'react-router-dom';

function ProductList() {

    const navigate = useNavigate();

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductList,
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 2,
        retry: 2,
        refetchOnWindowFocus: true
    });

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error: {error.message}</h1>

    return (
        <>
            <div className="m-8 grid grid-cols-1 w-[90%] mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products && products.map(product => (
                    <ProductCard onClickHandler={() => navigate(`/product/details/${product.id}`)} key={product.id} product={product}/>
                ))}
            </div>
        </>
    );
}

export default ProductList;