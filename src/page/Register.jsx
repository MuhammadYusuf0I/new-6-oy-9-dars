import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const formRef = useRef();
  const [pressed, setPressed] = useState(false);
  const [errors, setErrors] = useState({});

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    const newErrors = {};
    if (usernameRef.current.value.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }

    if (!validateEmail(emailRef.current.value)) {
      newErrors.email = "Invalid email address.";
    }

    if (passwordRef.current.value.trim().length < 4) {
      newErrors.password = "Password must be at least 4 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleRegister(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    };

    setPressed(true);
    fetch(`${import.meta.env.VITE_API_URL}api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message || `Server error: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.message === "User registered successfully!") {
          formRef.current.reset();
          alert("Registration successful! You can now log in.");
          navigate("/login");
        } else {
          alert(data.message || "An unknown error occurred. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.message.includes("Username is already in use")) {
          alert("This username is already taken. Please choose another one.");
        } else if (err.message.includes("Email is already in use")) {
          alert("This email is already registered. Please log in.");
        } else {
          alert("Registration failed. Please check your input and try again.");
        }
      })
      .finally(() => {
        setPressed(false);
      });
  }

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleRegister}
        className="w-1/4 mt-4 flex flex-col mx-auto border bg-slate-100 rounded-md gap-5 p-5 hover:bg-stone-200 active:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-300"
      >
        <input
          className={`border rounded-md p-3 ${
            errors.username ? "outline-red-500" : ""
          }`}
          ref={usernameRef}
          type="text"
          placeholder="Enter username"
          aria-label="Username"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}

        <input
          className={`border rounded-md p-3 ${
            errors.email ? "outline-red-500" : ""
          }`}
          ref={emailRef}
          type="email"
          placeholder="Enter email"
          aria-label="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input
          className={`border rounded-md p-3 ${
            errors.password ? "outline-red-500" : ""
          }`}
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
          aria-label="Password"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <button disabled={pressed} className="btn btn-ghost bg-slate-200">
          {pressed ? "LOADING..." : "Register"}
        </button>

        <Link className="btn btn-ghost bg-slate-200" to="/login">
          Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
