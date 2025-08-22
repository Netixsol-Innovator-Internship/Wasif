const Product = require("../models/products");

async function getAllProducts(req, res) {
  try {
    const {
      collections,
      origins,
      flavour,
      qualities,
      caffeine,
      allergens,
      minPrice,
      maxPrice,
    } = req.query;

    const filter = {};

    if (collections) filter.collections = { $in: collections.split(",") };
    if (origins) filter["origins.country"] = { $in: origins.split(",") };
    if (flavour) filter["flavour.profile"] = { $in: flavour.split(",") };
    if (qualities) {
      if (qualities.includes("organic")) {
        filter["qualities.organic"] = true;
      }
      filter["qualities.benefits"] = { $in: qualities.split(",") };
    }
    if (caffeine) filter.caffeine = { $in: caffeine.split(",") };
    if (allergens) filter.allergens = { $in: allergens.split(",") };
    if (minPrice || maxPrice) {
      filter["price.amount"] = {};
      if (minPrice) filter["price.amount"].$gte = Number(minPrice);
      if (maxPrice) filter["price.amount"].$lte = Number(maxPrice);
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getFilterOptions(req, res) {
  try {
    const collections = await Product.distinct("collections");
    const origins = await Product.distinct("origins.country");
    const flavours = await Product.distinct("flavour.profile");
    const benefits = await Product.distinct("qualities.benefits");
    const caffeineLevels = await Product.distinct("caffeine");
    const allergens = await Product.distinct("allergens");

    const priceRange = await Product.aggregate([
      {
        $group: {
          _id: null,
          min: { $min: "$price.amount" },
          max: { $max: "$price.amount" },
        },
      },
    ]);

    res.json({
      collections,
      origins,
      flavours,
      benefits,
      caffeineLevels,
      allergens,
      priceRange: priceRange[0] || { min: 0, max: 100 },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function addProduct(req, res) {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getFilterOptions,
  addProduct,
  updateProduct,
  deleteProduct,
};
