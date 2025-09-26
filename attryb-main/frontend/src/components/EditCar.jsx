import React, { useState, useEffect } from "react";
import { API } from "../api";
import { useParams, useNavigate } from "react-router-dom";

const EditCar = () => {
  const { id } = useParams(); // car id from URL
  const navigate = useNavigate();

  const [car, setCar] = useState({
    title: "",
    image: null,
    description: ["", "", "", "", ""],
    price: "",
    color: "",
    mileage: ""
  });

  // Fetch car details by ID
  const fetchCar = async () => {
    try {
      const res = await API.get(`/cars/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const data = res.data;
      setCar({
        title: data.title,
        image: null, // keep null, user can upload new image
        description: data.description,
        price: data.price,
        color: data.color,
        mileage: data.mileage
      });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch car details");
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const newDesc = [...car.description];
      newDesc[index] = e.target.value;
      setCar({ ...car, description: newDesc });
    } else {
      setCar({ ...car, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", car.title);
    formData.append("price", car.price);
    formData.append("color", car.color);
    formData.append("mileage", car.mileage);
    if (car.image) formData.append("image", car.image); // only update if new image uploaded
    car.description.forEach((desc, i) => formData.append(`description[${i}]`, desc));

    try {
      await API.put(`/cars/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Car updated successfully");
      navigate("/cars"); // redirect to car list
    } catch (err) {
      console.error(err);
      alert("Failed to update car");
    }
  };

  return (
    <div>
      <h2>Edit Car</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="title" placeholder="Title" value={car.title} onChange={handleChange} required />
        <input type="file" name="image" onChange={e => setCar({ ...car, image: e.target.files[0] })} />
        {car.description.map((desc, i) => (
          <input key={i} type="text" placeholder={`Description ${i + 1}`} value={desc} onChange={e => handleChange(e, i)} required />
        ))}
        <input type="number" name="price" placeholder="Price" value={car.price} onChange={handleChange} required />
        <input type="text" name="color" placeholder="Color" value={car.color} onChange={handleChange} required />
        <input type="number" name="mileage" placeholder="Mileage" value={car.mileage} onChange={handleChange} required />
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default EditCar;
