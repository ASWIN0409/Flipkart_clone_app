function ProductCard({ product, onClickHandler }) {

    const BASE_URL = import.meta.env.VITE_BASE_URL

    return (
        <div onClick={onClickHandler} className="flex flex-col justify-between bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

            <div className="relative overflow-hidden">
                <img
                    src={`${BASE_URL}${product.image}`}
                    alt={product.name}
                    className="h-56 w-full hover:scale-110 transition-transform duration-500"
                />

                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    New
                </span>
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
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;