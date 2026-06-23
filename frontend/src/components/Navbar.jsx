import { useNavigate, Link } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <h1 onClick={() => navigate('/')} className="text-2xl font-bold text-indigo-600 cursor-pointer">
                    Flipkart Clone
                </h1>

                {/* Navigation */}
                <nav className="hidden md:flex gap-8 font-medium text-gray-700">
                    <Link className="hover:text-indigo-600 transition">
                        Home
                    </Link>
                    <Link to={'/'} className="hover:text-indigo-600 transition">
                        Products
                    </Link>
                    <Link className="hover:text-indigo-600 transition">
                        Categories
                    </Link>
                    <Link className="hover:text-indigo-600 transition">
                        Contact
                    </Link>
                </nav>

                {/* Search Bar */}
                <div className="hidden lg:flex">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border border-gray-300 rounded-l-lg px-4 py-2 w-64 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700 transition">
                        Search
                    </button>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    <button className="relative bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition">
                        🛒
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                            3
                        </span>
                    </button>

                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                        Login
                    </button>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                        Register
                    </button>

                </div>
            </div>
        </header>
    );
}

export default Navbar;