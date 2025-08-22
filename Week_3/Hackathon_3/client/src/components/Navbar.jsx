import React, { useState, useEffect } from "react";
import Logo from "/assets/psychiatry.png";
import Account from "/assets/person.png";
import Search from "/assets/search.png";
import Cart from "/assets/cart.png";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // burger & close icons

const nav = [
  { id: 1, name: "Tea Collection", to: "/products" },
  { id: 2, name: "Accessories", to: "/" },
  { id: 3, name: "Blogs", to: "/products" },
  { id: 4, name: "Contact Us", to: "/contact" },
];

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Keep user in sync with localStorage if token changes
  useEffect(() => {
    setUser(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <div className="w-full h-20 bg-white text-[#282828] flex items-center justify-between px-6 md:px-16 shadow-sm">
      {/* Logo + Brand */}
      <div className="flex gap-x-2 items-center">
        <img src={Logo} alt="Brand Logo" className="w-8 h-8" />
        <h1 className="text-lg md:text-xl font-semibold">Brand Name</h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex">
        <ul className="flex gap-x-8 uppercase font-medium">
          {nav.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to}
                className="hover:text-cyan-600 transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Section */}
      <div className="hidden md:flex gap-x-8 items-center">
        <img src={Search} alt="Search" className="w-5 h-5 cursor-pointer" />

        {/* If logged in */}
        {token ? (
          <>
            {/* Show Go to Dashboard if user is admin/superAdmin */}
            {(user?.role === "admin" || user?.role === "superAdmin") && (
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="text-sm font-medium text-cyan-600 hover:text-cyan-800"
              >
                Go to Dashboard
              </button>
            )}

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/signup">
            <img src={Account} alt="Account" className="w-5 h-5" />
          </Link>
        )}

        <Link to="/cart">
          <img src={Cart} alt="Cart" className="w-5 h-5" />
        </Link>
      </div>

      {/* Burger Icon (Mobile) */}
      <button
        className="md:hidden text-gray-800"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md lg:hidden z-50">
          <ul className="flex flex-col gap-4 py-6 px-6 uppercase font-medium text-gray-700">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className="block hover:text-cyan-600 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Search + Account + Cart + Dashboard/Logout for mobile */}
            <li className="flex flex-col gap-4 pt-4 border-t">
              <div className="flex gap-6 items-center">
                <img src={Search} alt="Search" className="w-5 h-5 cursor-pointer" />

                {token ? (
                  <>
                    {(user?.role === "admin" || user?.role === "superAdmin") && (
                      <button
                        onClick={() => {
                          navigate("/admin/dashboard");
                          setMenuOpen(false);
                        }}
                        className="text-sm font-medium text-cyan-600 hover:text-cyan-800"
                      >
                        Go to Dashboard
                      </button>
                    )}

                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="text-sm font-medium text-red-500 hover:text-red-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                  >
                    <img src={Account} alt="Account" className="w-5 h-5" />
                  </Link>
                )}

                <Link to="/cart" onClick={() => setMenuOpen(false)}>
                  <img src={Cart} alt="Cart" className="w-5 h-5" />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
