import { useQuery } from "@tanstack/react-query";
import fetchProductList from "../api/fetchProductList";

function ProductList() {

    const BASE_URL = import.meta.env.VITE_BASE_URL

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductList,
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 2,
        retry: 2,
        refetchOnWindowFocus: true
    });

    console.log(products);

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error: {error.message}</h1>

    return (
        <>
            <div>This is the product list page</div>
            <div>
                {products && products.map(product => (
                    <div key={product.id}>
                        <img className="h-20 w-20" src={`${BASE_URL}${product.image}`} alt={product.name} />
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProductList;