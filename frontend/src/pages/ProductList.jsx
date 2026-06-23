import { useQuery } from "@tanstack/react-query";
import fetchProductList from "../api/fetchProductList";
import ProductCard from "../components/ProductCard";

function ProductList() {

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
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </>
    );
}

export default ProductList;