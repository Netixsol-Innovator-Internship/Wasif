import { useEffect, useState } from "react";
import { getAllProducts, getFilterOptions } from "../api/products";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState({}); 

  useEffect(() => {
    async function fetchData() {
      try {
        const [prods, filterOpts] = await Promise.all([
          getAllProducts(filters),
          getFilterOptions(),
        ]);
        setProducts(prods);
        setOptions(filterOpts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filters]);

  const handleCheckboxChange = (key, value, checked) => {
    setFilters((prev) => {
      const existing = prev[key] ? prev[key].split(",") : [];
      let updated;

      if (checked) {
        updated = [...existing, value];
      } else {
        updated = existing.filter((v) => v !== value);
      }


      if (updated.length === 0) {
        const { [key]: _, ...rest } = prev; 
        return rest;
      }

      return { ...prev, [key]: updated.join(",") };
    });
  };

  const handlePriceChange = (min, max) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  const toggleCollapse = (key) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="flex max-w-7xl mx-auto font-sans">
      {/* Sidebar filters */}
      <aside className="w-72 p-4 border-r">
        {[
          {
            key: "collections",
            label: "COLLECTIONS",
            values: options.collections,
          },
          { key: "origins", label: "ORIGIN", values: options.origins },
          { key: "flavour", label: "FLAVOR", values: options.flavours },
          { key: "qualities", label: "QUALITIES", values: options.benefits },
          {
            key: "caffeine",
            label: "CAFFEINE",
            values: options.caffeineLevels,
          },
          { key: "allergens", label: "ALLERGENS", values: options.allergens },
        ].map(({ key, label, values }) => (
          <div key={key} className="mb-6">
            {/* Header with collapse toggle */}
            <button
              onClick={() => toggleCollapse(key)}
              className="flex justify-between items-center w-full font-bold text-xs uppercase tracking-wide mb-2"
            >
              {label}
              <span className="text-gray-500">
                {collapsed[key] ? "+" : "–"}
              </span>
            </button>

            {/* Checkbox list */}
            {!collapsed[key] && (
              <div className="space-y-1">
                {values?.map((v) => (
                  <label key={v} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(key, v, e.target.checked)
                      }
                      checked={filters[key]?.split(",").includes(v) || false}
                      className="mr-2"
                    />
                    {v}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Price filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleCollapse("price")}
            className="flex justify-between items-center w-full font-bold text-xs uppercase tracking-wide mb-2"
          >
            PRICE
            <span className="text-gray-500">{collapsed.price ? "+" : "–"}</span>
          </button>
          {!collapsed.price && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder={`Min`}
                className="w-20 p-1 border rounded text-sm"
                onChange={(e) =>
                  handlePriceChange(Number(e.target.value), filters.maxPrice)
                }
              />
              <span>-</span>
              <input
                type="number"
                placeholder={`Max`}
                className="w-20 p-1 border rounded text-sm"
                onChange={(e) =>
                  handlePriceChange(filters.minPrice, Number(e.target.value))
                }
              />
            </div>
          )}
        </div>

        {/* Organic filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleCollapse("organic")}
            className="flex justify-between items-center w-full font-bold text-xs uppercase tracking-wide mb-2"
          >
            ORGANIC
            <span className="text-gray-500">
              {collapsed.organic ? "+" : "–"}
            </span>
          </button>
          {!collapsed.organic && (
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    qualities: e.target.checked ? "organic" : undefined,
                  }))
                }
                checked={filters.qualities?.includes("organic") || false}
                className="mr-2"
              />
              Only Organic
            </label>
          )}
        </div>
      </aside>

      {/* Products grid */}
      <main className="flex-1 p-6">
        {/* Sort bar */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            Showing {products.length} products
          </p>
          <select
            className="border rounded p-2 text-sm"
            onChange={(e) => {
              if (e.target.value === "priceAsc") {
                setProducts(
                  [...products].sort((a, b) => a.price.amount - b.price.amount)
                );
              } else if (e.target.value === "priceDesc") {
                setProducts(
                  [...products].sort((a, b) => b.price.amount - a.price.amount)
                );
              }
            }}
          >
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low → High</option>
            <option value="priceDesc">Price: High → Low</option>
          </select>
        </div>

        {/* Product grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              to={`/products/${p._id}`}
              key={p._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {p.image && (
                <img
                  src={p.image.url}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-sm truncate">{p.name}</h3>
                <p className="text-xs text-gray-500">{p.origins?.country}</p>
                <p className="mt-2 text-green-600 font-bold text-sm">
                  €{p.price?.amount?.toFixed(2)} / {p.price?.unit || "g"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
