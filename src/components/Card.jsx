import React from "react";

function Card({ phone, handleDelete }) {
  const { id, name, description, price } = phone;

  return (
    <div className="max-w-[450px] w-full">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center flex">
          <h2 className="card-title font-semibold text-[#294E6A] items-center">
            Name: <span className="font-bold">{name}</span>
          </h2>
          <p className="gap-2 flex">
            Price:
            <span className="text-[#463AA1] font-bold">{price}</span>
          </p>
          <p className="gap-2 flex">
            Description:
            <span className="text-[#463AA1] font-bold">{description}</span>
          </p>
          <button
            onClick={() => handleDelete(id)}
            className="mt-5 btn btn-outline btn-error"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
