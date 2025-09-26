import React, { useState } from "react";
// import API from "../api";

export default function CarForm() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    year: "",
    price: "",
    description: ""
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      await API.post("/cars/createCar", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Car created successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create car");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Car</h2>
      <input name="name" placeholder="Car Name" onChange={handleChange} required /><br />
      <input name="brand" placeholder="Brand" onChange={handleChange} required /><br />
      <input name="year" placeholder="Year" type="number" onChange={handleChange} required /><br />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} required /><br />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea><br />
      <input type="file" multiple onChange={handleFileChange} /><br />
      <button type="submit">Add Car</button>
    </form>
  );
}
