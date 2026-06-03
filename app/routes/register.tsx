import RegisterPage from "../register.jsx";

export function meta() {
  return [
    { title: "Register | Blackjack" },
    { name: "description", content: "Create an account to play Blackjack." },
  ];
}

export default function Register() {
  return <RegisterPage />;
}
