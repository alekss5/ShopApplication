import React, { useState } from 'react';

const AddProductForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [categories, setCategories] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      title,
      desc,
      img,
      categories: categories.split(',').map((category) => category.trim()),
      size: size.split(',').map((sizeItem) => sizeItem.trim()),
      color: color.split(',').map((colorItem) => colorItem.trim()),
      price: parseFloat(price),
      inStock
    };

    try {
      const response = await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });
      
      const data = await response.json();
      console.log(data); // The response from the API
      // Reset the form after successful submission
      setTitle('');
      setDesc('');
      setImg('');
      setCategories('');
      setSize('');
      setColor('');
      setPrice('');
      setInStock(false);
    } catch (error) {
      console.error(error);
      // Handle the error case
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />

        <label htmlFor="desc">Description:</label>
        <textarea id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} required></textarea><br />

        <label htmlFor="img">Image URL:</label>
        <input type="text" id="img" value={img} onChange={(e) => setImg(e.target.value)} required /><br />

        <label htmlFor="categories">Categories (comma-separated):</label>
        <input type="text" id="categories" value={categories} onChange={(e) => setCategories(e.target.value)} /><br />

        <label htmlFor="size">Sizes (comma-separated):</label>
        <input type="text" id="size" value={size} onChange={(e) => setSize(e.target.value)} /><br />

        <label htmlFor="color">Colors (comma-separated):</label>
        <input type="text" id="color" value={color} onChange={(e) => setColor(e.target.value)} /><br />

        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required /><br />

        <label htmlFor="inStock">In Stock:</label>
        <input type="checkbox" id="inStock" checked={inStock} onChange={(e) => setInStock(e.target.checked)} /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
