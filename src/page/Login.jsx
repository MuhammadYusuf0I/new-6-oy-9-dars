import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [pressed, setPressed] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); // Fixed typo from navigatee to navigate

  function validate() {
    if (usernameRef.current.value.trim().length < 3) {
      alert("Username kamida 3 ta belgidan iborat bo'lishi kerak");
      usernameRef.current.focus();
      usernameRef.current.style.outline = "2px solid red";
      return false;
    } else {
      usernameRef.current.style.outline = "";
    }
    if (passwordRef.current.value.trim().length < 4) {
      alert("Parol kamida 4 ta belgidan iborat bo'lishi kerak");
      passwordRef.current.focus();
      passwordRef.current.style.outline = "2px solid red";
      return false;
    } else {
      passwordRef.current.style.outline = "";
    }

    return true;
  }

  function handleLogin(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    };
    
    setPressed(true);
    
    fetch(`${import.meta.env.VITE_API_URL}api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.message === "User Not found." || data.message === "Invalid Password!") {
          alert(data.message);
        } else if (data.id) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data)); 
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Mavjud bolgan email yoki username kiritildi ");
      })
      .finally(() => {
        setPressed(false);
      });
  }

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className="w-1/4 mt-4 flex flex-col mx-auto rounded-md gap-5 p-5 bg-slate-100 hover:bg-stone-200 active:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-300 border"
      >
        <input
          className="border rounded-md p-3"
          ref={usernameRef}
          type="text"
          placeholder="Enter username"
        />
        <input
          className="border rounded-md p-3"
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
        />
        <button disabled={pressed} className="btn btn-ghost bg-slate-200">
          {pressed ? "LOADING..." : "Login"}
        </button>
        <Link className="btn btn-ghost bg-slate-200" to="/register">
          Register
        </Link>
      </form>
    </div>
  );
}

export default Login;
