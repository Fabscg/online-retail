// import models
const Product = require('../models/Product');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const ProductTag = require('../models/ProductTag');


//Create assosiations
// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "categoy_id",
  onDelete: "SET NULL"
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "product_id",
  onDelete: "SET NULL"
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: "product_tag",
  foreignKey: "product_id",
  onDelete: "SET NULL"
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: "ProductTag",
  foreignKey: "tag_id",
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
