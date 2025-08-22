import React, { useState, useEffect } from "react";
import { Users, Package, ShoppingCart, LogOut } from "lucide-react"; // Added Store icon
import ProductsManagement from "../components/ProductsManagement";
import UsersManagement from "../components/UsersManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [userRole, setUserRole] = useState(null);

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded = decodeJWT(token);
    return decoded?.role || null;
  };

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);

    if (!role || (role !== "admin" && role !== "superAdmin")) {
      alert("Access denied. Admin privileges required.");
      return;
    }
  }, []);

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back! You're logged in as{" "}
                <span
                  className={`font-semibold ${
                    userRole === "superAdmin"
                      ? "text-purple-600"
                      : "text-blue-600"
                  }`}
                >
                  {userRole === "superAdmin" ? "Super Admin" : "Admin"}
                </span>
              </p>
            </div>

            
<div className="flex gap-2">
  {/* Go to Store Button */}
  <button
    onClick={() => (window.location.href = "/")}
    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 md:px-4 md:py-2 rounded-md flex items-center gap-1 md:gap-2 text-xs md:text-base"
  >
    <ShoppingCart size={16} />
    <span className="hidden md:inline">Go to Store</span>
  </button>

  {/* Logout Button */}
  <button
    onClick={() => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }}
    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 md:px-4 md:py-2 rounded-md flex items-center gap-1 md:gap-2 text-xs md:text-base"
  >
    <LogOut size={16} />
    <span className="hidden md:inline">Logout</span>
  </button>
</div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "products"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } flex items-center gap-2`}
            >
              <Package size={16} />
              Products Management
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "users"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } flex items-center gap-2`}
            >
              <Users size={16} />
              Users Management
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === "products" && <ProductsManagement userRole={userRole} />}
        {activeTab === "users" && <UsersManagement userRole={userRole} />}
      </main>
    </div>
  );
};

export default AdminDashboard;
