import { useNavigate, Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-12">
            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            ShopHub
                        </h2>
                        <p className="text-sm">
                            Your one-stop destination for quality products at the best prices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link className="hover:text-white transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className="hover:text-white transition">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link  className="hover:text-white transition">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Customer Service
                        </h3>
                        <ul className="space-y-2">
                            <li>FAQs</li>
                            <li>Shipping Policy</li>
                            <li>Returns & Refunds</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Contact Us
                        </h3>
                        <p>Email: support@flipkartclone.com</p>
                        <p>Phone: +91 9535729783</p>
                        <p>Bangalore, India</p>
                    </div>

                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
                    © {new Date().getFullYear()} Flipkart Clone. All Rights Reserved.
                </div>

            </div>
        </footer>
    );
}

export default Footer;