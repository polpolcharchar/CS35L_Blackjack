import { useEffect } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then(res => res.json())
      .then(data => console.log("API DATA:", data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return <p>Starter home page</p>;
}