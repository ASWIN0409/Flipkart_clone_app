import { useState } from "react";
import { useCart } from "../context/CartContext";
import { axiosInstance } from "../helpers/axiosInstance";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const { cartItems, emptyCart } = useCart();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const totalItems = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.product_price * item.quantity,
        0
    );

    const discount = 500;
    const deliveryCharge = 0;

    const finalAmount =
        subtotal - discount + deliveryCharge;

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        payment_method: 'Cash on Delivery',
    });

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('api/orders/create/', formData);
            setMessage("Order Placed Successfully !");
            setTimeout(() => {
                emptyCart();
                navigate('/')
            }, 3000);
        } catch (error) {
            setMessage("Order Failed, Please Try again !");
        }
    };

    if (message) return <h1 className="text-green-600 w-full font-extrabold text-5xl flex justify-center items-center h-screen">{message}</h1>

    return (
        <div className="bg-gray-100 min-h-screen mx-auto py-8">
            <div className="w-full max-w-4xl mx-auto px-4">

                <h1 className="text-3xl text-center font-bold mb-8">
                    Checkout
                </h1>

                <div className="max-w-3xl mx-auto space-y-6">

                    {/* Delivery Address */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="font-bold text-xl mb-4">
                            Delivery Address
                        </h2>

                        <form onSubmit={onSubmitHandler} className="grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="border p-3 rounded-lg outline-none focus:border-blue-500"
                                required
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="border p-3 rounded-lg outline-none focus:border-blue-500"
                                required
                            />

                            <textarea
                                placeholder="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows="4"
                                className="border p-3 rounded-lg md:col-span-2 outline-none focus:border-blue-500"
                                required
                            />

                            {/* Payment Method */}
                            <div className="bg-white p-6 rounded-xl shadow">
                                <h2 className="font-bold text-xl mb-5">
                                    Payment Method
                                </h2>

                                <div className="space-y-4">

                                    <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="Cash on Delivery"
                                            checked={formData.payment_method === "Cash on Delivery"}
                                            onChange={handleInputChange}
                                        />
                                        <span>
                                            Cash On Delivery
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="Credit / Debit Card"
                                            checked={formData.payment_method === "Credit / Debit Card"}
                                            onChange={handleInputChange}
                                        />
                                        <span>
                                            Credit / Debit Card
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="UPI"
                                            checked={formData.payment_method === "UPI"}
                                            onChange={handleInputChange}
                                        />
                                        <span>UPI</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="bg-white rounded-xl shadow p-6 sticky top-5">

                                    <h2 className="text-xl font-bold mb-6">
                                        Price Details
                                    </h2>

                                    <div className="space-y-4">

                                        <div className="flex justify-between">
                                            <span>
                                                Price ({totalItems} items)
                                            </span>
                                            <span>
                                                ₹{subtotal}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Discount</span>
                                            <span className="text-green-600">
                                                - ₹{discount}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Delivery Charges</span>
                                            <span className="text-green-600">
                                                FREE
                                            </span>
                                        </div>

                                        <hr />

                                        <div className="flex justify-between text-xl font-bold">
                                            <span>Total Amount</span>
                                            <span>
                                                ₹{finalAmount}
                                            </span>
                                        </div>

                                        <button
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold mt-5 transition">
                                            Place Order
                                        </button>

                                        <p className="text-sm text-green-600 text-center">
                                            You will save ₹{discount} on this order.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="font-bold text-xl mb-6">
                            Order Items
                        </h2>

                        <div className="space-y-5">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 border-b pb-5"
                                >
                                    <img
                                        src={`${BASE_URL}${item.product_image}`}
                                        alt={item.product_name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {item.product_name}
                                        </h3>

                                        <p className="text-gray-500 text-sm mt-1">
                                            Quantity: {item.quantity}
                                        </p>

                                        <p className="text-orange-500 font-bold mt-2">
                                            ₹
                                            {item.product_price}
                                        </p>
                                    </div>

                                    <div className="font-bold">
                                        ₹
                                        {item.product_price *
                                            item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Checkout;