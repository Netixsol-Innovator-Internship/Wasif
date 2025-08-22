// import React, { useState } from "react";
// import { Save, X } from "lucide-react";

// export default function ProductForm({ product, onSubmit, onCancel }) {
//   const collectionsOptions = [
//     "Black teas",
//     "Green teas",
//     "White teas",
//     "Coal",
//     "Matcha",
//     "Herbal teas",
//     "Oolong",
//     "Reolotes",
//     "Trowaves",
//   ];

//   const originsOptions = ["India", "Japan", "Iran", "South Africa"];

//   const flavourOptions = [
//     "Spicy",
//     "Sweet",
//     "Grass",
//     "Smooth",
//     "Pruhy",
//     "Flowl",
//     "Craxey",
//     "Mirny",
//     "Bitter",
//     "Creamy",
//   ];

//   const qualitiesOptions = ["Detox", "Energy", "Relax", "Digestion"];

//   const caffeineOptions = [
//     "No Caffeine",
//     "Low Caffeine",
//     "Medium Caffeine",
//     "High Caffeine",
//   ];

//   const allergensOptions = [
//     "Lactose-free",
//     "Gluten-free",
//     "Nuts-free",
//     "Sgy-free",
//   ];

//   const [formData, setFormData] = useState({
//     imageUrl: product?.image?.url || "",
//     imageAlt: product?.image?.altText || "",
//     name: product?.name || "",
//     description: product?.description || "",
//     collections: product?.collections || [],
//     originCountry: product?.origins?.country || "",
//     flavourProfile: product?.flavour?.profile || [],
//     qualitiesBenefits: product?.qualities?.benefits || [],
//     organic: product?.qualities?.organic || false,
//     caffeine: product?.caffeine || "",
//     allergens: product?.allergens || [],
//     priceAmount: product?.price?.amount || "",
//     priceUnit: product?.price?.unit || "USD",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData((prev) => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleMultiSelect = (e, key) => {
//     const { options } = e.target;
//     const values = Array.from(options)
//       .filter((o) => o.selected)
//       .map((o) => o.value);
//     setFormData((prev) => ({ ...prev, [key]: values }));
//   };

//   const handleSubmit = () => {
//     const payload = {
//       image: { url: formData.imageUrl, altText: formData.imageAlt },
//       name: formData.name,
//       collections: formData.collections,
//       origins: { country: formData.originCountry },
//       flavour: { profile: formData.flavourProfile },
//       qualities: {
//         benefits: formData.qualitiesBenefits,
//         organic: formData.organic,
//       },
//       caffeine: formData.caffeine,
//       allergens: formData.allergens,
//       price: {
//         amount: Number(formData.priceAmount),
//         unit: formData.priceUnit,
//       },
//       description: formData.description,
//     };
//     onSubmit(payload);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-100/90 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-gray-200">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-2xl font-bold text-gray-800">
//             {product ? "Edit Product" : "Add New Product"}
//           </h3>
//           <button
//             onClick={onCancel}
//             className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Form Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Left Column */}
//           <div className="space-y-4">
//             {/* Image URL */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Image URL *
//               </label>
//               <input
//                 type="url"
//                 name="imageUrl"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 value={formData.imageUrl}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Image Alt Text */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Image Alt Text
//               </label>
//               <input
//                 type="text"
//                 name="imageAlt"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 value={formData.imageAlt}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Product Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Product Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Collections */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Collections
//               </label>
//               <select
//                 multiple
//                 value={formData.collections}
//                 onChange={(e) => handleMultiSelect(e, "collections")}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 size="4"
//               >
//                 {collectionsOptions.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Origin Country */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Origin Country *
//               </label>
//               <select
//                 name="originCountry"
//                 value={formData.originCountry}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 required
//               >
//                 <option value="">Select Country</option>
//                 {originsOptions.map((o) => (
//                   <option key={o} value={o}>
//                     {o}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Price */}
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Price *
//                 </label>
//                 <input
//                   type="number"
//                   name="priceAmount"
//                   step="0.01"
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                   value={formData.priceAmount}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Currency
//                 </label>
//                 <input
//                   type="text"
//                   name="priceUnit"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                   value={formData.priceUnit}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-4">
//             {/* Flavour Profile */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Flavour Profile
//               </label>
//               <select
//                 multiple
//                 value={formData.flavourProfile}
//                 onChange={(e) => handleMultiSelect(e, "flavourProfile")}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 size="4"
//               >
//                 {flavourOptions.map((f) => (
//                   <option key={f} value={f}>
//                     {f}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Qualities/Benefits */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Qualities/Benefits
//               </label>
//               <select
//                 multiple
//                 value={formData.qualitiesBenefits}
//                 onChange={(e) => handleMultiSelect(e, "qualitiesBenefits")}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 size="4"
//               >
//                 {qualitiesOptions.map((q) => (
//                   <option key={q} value={q}>
//                     {q}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Organic Checkbox */}
//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="organic"
//                 checked={formData.organic}
//                 onChange={handleChange}
//                 className="rounded text-purple-600 focus:ring-purple-500"
//               />
//               <label className="text-sm font-medium text-gray-700">
//                 Organic
//               </label>
//             </div>

//             {/* Caffeine Level */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Caffeine Level *
//               </label>
//               <select
//                 name="caffeine"
//                 value={formData.caffeine}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 required
//               >
//                 <option value="">Select Caffeine Level</option>
//                 {caffeineOptions.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Allergens */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Allergens
//               </label>
//               <select
//                 multiple
//                 value={formData.allergens}
//                 onChange={(e) => handleMultiSelect(e, "allergens")}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 size="4"
//               >
//                 {allergensOptions.map((a) => (
//                   <option key={a} value={a}>
//                     {a}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mt-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Description
//           </label>
//           <textarea
//             name="description"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//             rows="4"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-4 pt-8">
//           <button
//             onClick={handleSubmit}
//             className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 font-medium shadow-sm"
//           >
//             <Save size={16} />
//             {product ? "Update" : "Add"} Product
//           </button>
//           <button
//             onClick={onCancel}
//             className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2 font-medium"
//           >
//             <X size={16} />
//             Cancel
//           </button>
//         </div>

//         <div className="mt-4 text-xs text-gray-500 text-center">
//           <p>
//             <strong>Tip:</strong> Hold <kbd>Ctrl</kbd> (Windows) or{" "}
//             <kbd>Cmd</kbd> (Mac) to select multiple options
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Save, X } from "lucide-react";

export default function ProductForm({ product, onSubmit, onCancel }) {
  const collectionsOptions = [
    "Black teas",
    "Green teas",
    "White teas",
    "Coal",
    "Matcha",
    "Herbal teas",
    "Oolong",
    "Reolotes",
    "Trowaves",
  ];

  const originsOptions = ["India", "Japan", "Iran", "South Africa"];

  const flavourOptions = [
    "Spicy",
    "Sweet",
    "Grass",
    "Smooth",
    "Pruhy",
    "Flowl",
    "Craxey",
    "Mirny",
    "Bitter",
    "Creamy",
  ];

  const qualitiesOptions = ["Detox", "Energy", "Relax", "Digestion"];

  const caffeineOptions = [
    "No Caffeine",
    "Low Caffeine",
    "Medium Caffeine",
    "High Caffeine",
  ];

  const allergensOptions = [
    "Lactose-free",
    "Gluten-free",
    "Nuts-free",
    "Sgy-free",
  ];

  const [formData, setFormData] = useState({
    imageUrl: product?.image?.url || "",
    imageFile: null,
    imageAlt: product?.image?.altText || "",
    name: product?.name || "",
    description: product?.description || "",
    collections: product?.collections || [],
    originCountry: product?.origins?.country || "",
    flavourProfile: product?.flavour?.profile || [],
    qualitiesBenefits: product?.qualities?.benefits || [],
    organic: product?.qualities?.organic || false,
    caffeine: product?.caffeine || "",
    allergens: product?.allergens || [],
    priceAmount: product?.price?.amount || "",
    priceUnit: product?.price?.unit || "USD",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (e, key) => {
    const { options } = e.target;
    const values = Array.from(options)
      .filter((o) => o.selected)
      .map((o) => o.value);
    setFormData((prev) => ({ ...prev, [key]: values }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // preview
      setFormData((prev) => ({ ...prev, imageUrl: url, imageFile: file }));
    }
  };

  const handleSubmit = () => {
    const payload = {
      image: {
        url: formData.imageUrl, // For preview
        altText: formData.imageAlt,
        file: formData.imageFile, // Actual file for upload
      },
      name: formData.name,
      collections: formData.collections,
      origins: { country: formData.originCountry },
      flavour: { profile: formData.flavourProfile },
      qualities: {
        benefits: formData.qualitiesBenefits,
        organic: formData.organic,
      },
      caffeine: formData.caffeine,
      allergens: formData.allergens,
      price: {
        amount: Number(formData.priceAmount),
        unit: formData.priceUnit,
      },
      description: formData.description,
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-gray-100/90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {product ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg border"
                />
              )}
            </div>

            {/* Image Alt Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                name="imageAlt"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={formData.imageAlt}
                onChange={handleChange}
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Collections */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collections
              </label>
              <select
                multiple
                value={formData.collections}
                onChange={(e) => handleMultiSelect(e, "collections")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                size="4"
              >
                {collectionsOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Origin Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Origin Country *
              </label>
              <select
                name="originCountry"
                value={formData.originCountry}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Country</option>
                {originsOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  name="priceAmount"
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={formData.priceAmount}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  name="priceUnit"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={formData.priceUnit}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Flavour Profile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flavour Profile
              </label>
              <select
                multiple
                value={formData.flavourProfile}
                onChange={(e) => handleMultiSelect(e, "flavourProfile")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                size="4"
              >
                {flavourOptions.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Qualities/Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qualities/Benefits
              </label>
              <select
                multiple
                value={formData.qualitiesBenefits}
                onChange={(e) => handleMultiSelect(e, "qualitiesBenefits")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                size="4"
              >
                {qualitiesOptions.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            {/* Organic Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="organic"
                checked={formData.organic}
                onChange={handleChange}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Organic
              </label>
            </div>

            {/* Caffeine Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caffeine Level *
              </label>
              <select
                name="caffeine"
                value={formData.caffeine}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Caffeine Level</option>
                {caffeineOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Allergens */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Allergens
              </label>
              <select
                multiple
                value={formData.allergens}
                onChange={(e) => handleMultiSelect(e, "allergens")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                size="4"
              >
                {allergensOptions.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-8">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 font-medium shadow-sm"
          >
            <Save size={16} />
            {product ? "Update" : "Add"} Product
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2 font-medium"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
