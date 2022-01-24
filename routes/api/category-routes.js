const router = require('express').Router();
const res = require('express/lib/response');
// const { json } = require('express/lib/response');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories, be sure to include its associated Products
router.get("/", (req, res) => {
  // find all categories
  Category.findAll(
    //its associated Products
    {
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    }
  )
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET one category by id
router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    //its associated Product
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock"],
    },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "No category data with this id" })
        return;
      }
      res.json(categoryData)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create New Category
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT update  a category
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      if (categoryData[0]) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(categoryData)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
})

//Delete a category by its 'id' value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
