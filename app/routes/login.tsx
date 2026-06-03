import LoginPage from "../login.jsx";

export function meta() {
  return [
    { title: "Login | Blackjack" },
    { name: "description", content: "Log in to play Blackjack." },
  ];
}

export default function Login() {
  return <LoginPage />;
}
