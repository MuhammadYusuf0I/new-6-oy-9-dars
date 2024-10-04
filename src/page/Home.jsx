import { useState, useEffect } from "react";
import Card from "../components/Card";
import { SyncLoader } from "react-spinners";
import NewCard from "../components/NewCard";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [phones, setPhones] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}api/products/all`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch phones");
      })
      .then((data) => {
        setPhones(data || []);
      })
      .catch((err) => {
        console.error("Error fetching phones:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleDelete(id) {
    const conf = confirm("Are you sure you want to delete this phone?");
    if (conf) {
      fetch(`${import.meta.env.VITE_API_URL}api/products/private/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete phone");
          }
          return response.json();
        })
        .then((data) => {
          if (data.message === "Mahsulot muvaffaqiyatli o'chirildi") {
            setPhones((prevPhones) =>
              prevPhones.filter((phone) => phone.id !== id)
            );
            alert("Phone successfully deleted!");
          }
        })
        .catch((err) => {
          console.error("Error deleting phone:", err);
          alert("Failed to delete the phone.");
        });
    }
  }

  return (
    <>
      <NewCard
        addProduct={(newProduct) => setPhones([...phones, newProduct])}
      />

      <div className="base-container border rounded-xl mt-10 bg-stone-200">
        <h2 className="base-container font-bold text-3xl justify-center flex mt-4">
          Phones
        </h2>
        <div className="base-container mt-12 flex justify-between flex-wrap gap-8">
          {isLoading && <SyncLoader color="red" size={20} />}
          {!isLoading && phones.length === 0 && <p>No phones available.</p>}
          {!isLoading &&
            phones.length > 0 &&
            phones.map((el, index) => {
              return (
                <Card key={index} phone={el} handleDelete={handleDelete} />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
