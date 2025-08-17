const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    url: {
      type: String,
      required: true,
    },
    altText: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  collections: [
    {
      type: String,
      enum: [
        "Black teas",
        "Green teas",
        "White teas",
        "Coal",
        "Matcha",
        "Herbal teas",
        "Oolong",
        "Reolotes",
        "Trowaves",
      ],
      required: true,
    },
  ],
  origins: {
    country: {
      type: String,
      enum: ["India", "Japan", "Iran", "South Africa"],
      required: true,
    },
    region: String,
    farm: String,
  },
  flavour: {
    profile: [
      {
        type: String,
        enum: [
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
        ],
      },
    ],
  },
  qualities: {
    benefits: [
      {
        type: String,
        enum: ["Detox", "Energy", "Relax", "Digestion"],
      },
    ],
    organic: Boolean,
  },
  caffeine: {
    type: String,
    enum: ["No Caffeine", "Low Caffeine", "Medium Caffeine", "High Caffeine"],
    required: true,
  },
  allergens: [
    {
      type: String,
      enum: ["Lactose-free", "Gluten-free", "Nuts-free", "Sgy-free"],
    },
  ],
  price: {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: String,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Product", productSchema);
