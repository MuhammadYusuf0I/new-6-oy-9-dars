import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewCard({ addProduct }) {
  const nameRef = useRef("");
  const priceRef = useRef("");
  const descriptionRef = useRef("");
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPhone = {
      name: nameRef.current.value,
      price: parseFloat(priceRef.current.value),
      description: descriptionRef.current.value,
    };

    fetch(`${import.meta.env.VITE_API_URL}api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPhone),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add product");
        }
        return response.json();
      })
      .then((data) => {
        addProduct(data);
        resetForm();
        navigate("/");
      })
      .catch((err) => {
        setErrMessage("Error adding product: " + err.message);
      });
  };

  const resetForm = () => {
    nameRef.current.value = "";
    priceRef.current.value = "";
    descriptionRef.current.value = "";
    setErrMessage("");
  };

  return (
    <div className="w-96 base-container gap-5 flex flex-col p-5 border rounded-xl h-full bg-slate-100  hover:bg-stone-200 active:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-300 ">
      <h1 className="px-2 font-semibold">New Phone</h1>
      {errMessage && <p className="error">{errMessage}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          ref={nameRef}
          type="text"
          placeholder="Phone Name"
          required
          className="border rounded-lg w-full h-9 px-3"
        />
        <input
          ref={priceRef}
          type="number"
          placeholder="Phone Price"
          required
          className="border rounded-lg w-full h-9 px-3"
        />
        <textarea
          ref={descriptionRef}
          placeholder="Phone Description"
          required
          className="h-16 border rounded-xl w-full px-3"
        />
        <button type="submit" className="btn btn-ghost w-full bg-slate-200">
          Add New Phone
        </button>
      </form>
    </div>
  );
}

export default NewCard;
