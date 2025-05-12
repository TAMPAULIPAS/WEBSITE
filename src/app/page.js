"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleLoginChange = () => {
    setLogin(!login);
    setUsername("");
    setPassword("");
    setEmail("");
  };

  const checkIfUserExists = async () => {
    const result = await JSON.parse(localStorage.getItem("user"));
    if (result !== null) {
      router.replace("/products", { path: "products" });
    }
  };

  useEffect(() => {
    checkIfUserExists();
  }, []);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: "m38rmF$",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            localStorage.setItem("user", JSON.stringify(res.token));
            router.replace("/products", { path: "products" });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password,
          name: {
            firstname: "John",
            lastname: "Doe",
          },
          address: {
            city: "Tbilisi",
            street: "Main Street",
            number: 123,
            zipcode: "12345",
            geolocation: {
              lat: "0",
              long: "0",
            },
          },
          phone: "1234567890",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          handleLoginChange();
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className={styles.main}>
      <form
        className={styles.container}
        onSubmit={login ? handleSignInSubmit : handleSignUpSubmit}
      >
        {login ? (
          <>
            <h3 className={styles.signin}>Sign In</h3>
            <p className={styles.desc}>please sign in to access market.</p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="username"
              value={username}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              type="password"
              placeholder="password"
              value={password}
            />
            <button className={styles.button} type="submit">
              Sign In
            </button>
            <button
              onClick={handleLoginChange}
              className={styles.notResgitered}
              type="button"
            >
              Not Registered? Sign Up
            </button>
          </>
        ) : (
          <>
            <h3 className={styles.signin}>Sign Up</h3>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              type="email"
              placeholder="email"
              value={email}
            />
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="username"
              value={username}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              type="password"
              placeholder="password"
              value={password}
            />
            <button className={styles.button} type="submit">
              Sign Up
            </button>
            <button
              onClick={handleLoginChange}
              className={styles.notResgitered}
              type="button"
            >
              Already Registered? Sign In
            </button>
          </>
        )}
      </form>
    </main>
  );
}
