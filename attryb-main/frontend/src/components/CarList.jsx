import React, { useEffect, useState } from "react";
// import API from "../api";

export default function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await API.get("/cars");
      setCars(data);
    };
    fetchCars();
  }, []);

  return (
    <div>
      <h2>Available Cars</h2>
      {cars.map((car) => (
        <div key={car._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{car.name} ({car.year})</h3>
          <p>Brand: {car.brand}</p>
          <p>Price: ${car.price}</p>
          <p>{car.description}</p>
          {car.images?.map((img, idx) => (
            <img key={idx} src={`http://localhost:5000/${img}`} alt="car" width="150" />
          ))}
        </div>
      ))}
    </div>
  );
}
