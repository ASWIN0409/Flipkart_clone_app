function ProductCard({ product }) {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    return (
        <div>
            <img className="h-20 w-20" src={`${BASE_URL}${product.image}`} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
        </div>
    );
}

export default ProductCard;