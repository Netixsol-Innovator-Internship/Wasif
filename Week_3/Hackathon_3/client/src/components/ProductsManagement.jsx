import React, { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../redux/apiSlice";
import ProductForm from "./ProductForm";
import Spinner from "./Spinner";

export default function ProductsManagement({ userRole }) {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = async (formData) => {
    try {
      await addProduct(formData).unwrap();
      setShowForm(false);
      alert("Product added successfully!");
    } catch (error) {
      alert("Error adding product: " + (error.data?.message || error.message));
    }
  };

  const handleUpdateProduct = async (formData) => {
    try {
      await updateProduct({
        id: editingProduct._id || editingProduct.id,
        ...formData,
      }).unwrap();
      setEditingProduct(null);
      alert("Product updated successfully!");
    } catch (error) {
      alert(
        "Error updating product: " + (error.data?.message || error.message)
      );
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (userRole !== "superAdmin") {
      alert("Only Super Admins can delete products");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId).unwrap();
        alert("Product deleted successfully!");
      } catch (error) {
        alert(
          "Error deleting product: " + (error.data?.message || error.message)
        );
      }
    }
  };

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-red-600 text-center py-8">
        Error loading products
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-white">Products Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="
         text-xs md:text-2xl bg-white text-purple-700 font-semibold px-1 md:px-5 py-2.5 rounded-xl shadow-md hover:bg-purple-100 transition flex items-center md:gap-2"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          <div
            key={product._id || product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col overflow-hidden"
          >
            {product.image && (
              <img
                src={product.image.url}
                alt={product.title}
                className="w-full h-52 object-cover"
              />
            )}

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {product.name}
              </h3>

              <p className="text-2xl font-bold text-green-600 mb-2">
                $
                {typeof product.price === "object"
                  ? `${product.price.amount} ${product.price.unit || ""}`
                  : product.price}
              </p>

              {product.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {String(product.description)}
                </p>
              )}

              <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                {product.category && (
                  <span className="bg-gray-100 px-2 py-1 rounded-lg">
                    {String(product.category)}
                  </span>
                )}
                {product.stock !== undefined && (
                  <span
                    className={`px-2 py-1 rounded-lg ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Stock: {String(product.stock)}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Edit3 size={16} />
                  Edit
                </button>

                {userRole === "superAdmin" && (
                  <button
                    onClick={() => handleDeleteProduct(product._id || product.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showForm && (
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Edit Form */}
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleUpdateProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}
