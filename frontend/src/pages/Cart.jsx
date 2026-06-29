import { useCart } from "../context/CartContext";

function Cart() {

    const { cartItems, removeFromCart, updateQuantity } = useCart();
    console.log(cartItems);
    const total = cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-3">
                        Your Cart is Empty
                    </h1>
                    <p className="text-gray-500">
                        Add some products to get started.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[95%] lg:w-[85%] mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">

                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row gap-4"
                        >
                            {/* Image */}
                            <div className="sm:w-40">
                                <img
                                    src={`${BASE_URL}${item.product_image}`}
                                    alt={item.product_name}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {item.product_name}
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-1">
                                        {item.product_brand}
                                    </p>

                                    <p className="text-orange-500 font-bold text-xl mt-2">
                                        ₹{item.product_price}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 mt-4">

                                    {/* Quantity Controls */}
                                    <div className="flex items-center border rounded-lg overflow-hidden">
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                                        >
                                            -
                                        </button>

                                        <span className="px-4">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() =>
                                            removeFromCart(item.id)
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                            {/* Subtotal */}
                            <div className="flex items-center justify-end">
                                <p className="font-bold text-lg">
                                    ₹{item.product_price * item.quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white shadow-lg rounded-xl p-6 h-fit sticky top-5">
                    <h2 className="text-2xl font-bold mb-6">
                        Order Summary
                    </h2>

                    <div className="space-y-4">

                        <div className="flex justify-between">
                            <span>Total Items</span>
                            <span>
                                {cartItems.reduce(
                                    (acc, item) => acc + item.quantity,
                                    0
                                )}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-green-600">
                                Free
                            </span>
                        </div>

                        <hr />

                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        <button className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4 hover:bg-orange-600 transition">
                            Proceed To Checkout
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Cart;