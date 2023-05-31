const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//BY SEARCHTERM
router.post("/term", async (req, res) => {
  const { size, color } = req.body;


  try {
    let products;

    if (size && color) {
      products = await Product.find({ size: size, color: color });
    } else if (size) {
      products = await Product.find({ size: size });
    } else if (color) {
      products = await Product.find({ color: color });
    } else {
      products = await Product.find();
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//SEARCH
router.get("/search", async (req, res) => {
  const searchTerm = req.query.term;

  try {
    // Perform the search operation using Mongoose
    const searchResults = await Product.find({
      title: { $regex: searchTerm, $options: "i" },
    });
   

    res.json(searchResults);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//CREATE

router.post("/",  async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
    console.log("product is saved")
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  
  try {
    
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
    console.log(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  console.log("qCategory")
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
