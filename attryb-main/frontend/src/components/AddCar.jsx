import React, { useState } from "react";
import { API } from "../api";

const AddCar = () => {
  const [car, setCar] = useState({
    title: "",
    image: "",
    description: ["", "", "", "", ""],
    price: "",
    color: "",
    mileage: ""
  });

  const handleChange = (e, index=null) => {
    if(index !== null){
      const newDesc = [...car.description];
      newDesc[index] = e.target.value;
      setCar({...car, description: newDesc});
    } else {
      setCar({...car, [e.target.name]: e.target.value});
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", car.title);
    formData.append("price", car.price);
    formData.append("color", car.color);
    formData.append("mileage", car.mileage);
    formData.append("image", car.image);
    car.description.forEach((desc, i) => formData.append(`description[${i}]`, desc));

    try {
      await API.post("/add-car", formData, {
        headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Car added successfully");
    } catch (err) {
      console.error(err);
      alert("Error adding car");
    }
  };

  return (
    <div>
      <h2>Add Car</h2>
      <form onSubmit={handleAddCar}>
        <input type="text" name="title" placeholder="Title" value={car.title} onChange={handleChange} required />
        <input type="file" name="image" onChange={e => setCar({...car, image: e.target.files[0]})} required />
        {car.description.map((desc, i) => (
          <input key={i} type="text" placeholder={`Description ${i+1}`} value={desc} onChange={e => handleChange(e, i)} required />
        ))}
        <input type="number" name="price" placeholder="Price" value={car.price} onChange={handleChange} required />
        <input type="text" name="color" placeholder="Color" value={car.color} onChange={handleChange} required />
        <input type="number" name="mileage" placeholder="Mileage" value={car.mileage} onChange={handleChange} required />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
