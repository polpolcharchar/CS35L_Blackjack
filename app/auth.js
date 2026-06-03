const USERS_KEY = "blackjack_users";
const TOKEN_KEY = "token";
const EMAIL_KEY = "userEmail";
const USERNAME_KEY = "userName";

function safeStorage() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return window.localStorage;
}

export function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function getUsers() {
  const ls = safeStorage();
  if (!ls) return [];
  try {
    const raw = ls.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  const ls = safeStorage();
  if (!ls) return;
  ls.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser({ username, email, password, confirmPassword }) {
  const errors = {};
  const cleanUsername = String(username || "").trim();
  const cleanEmail = String(email || "").trim().toLowerCase();

  if (!cleanUsername) {
    errors.username = "Please enter a username.";
  }
  if (!cleanEmail) {
    errors.email = "Please enter your email.";
  } else if (!isValidEmail(cleanEmail)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!password || String(password).length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }
  if (confirmPassword !== undefined && password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const users = getUsers();
  if (users.some((u) => u.email === cleanEmail)) {
    return { ok: false, errors: { email: "email already exists" } };
  }
  if (users.some((u) => String(u.username).toLowerCase() === cleanUsername.toLowerCase())) {
    return { ok: false, errors: { username: "username already exists" } };
  }

  const newUser = { username: cleanUsername, email: cleanEmail, password: String(password) };
  saveUsers([...users, newUser]);
  return { ok: true, user: { username: cleanUsername, email: cleanEmail } };
}

export function loginUser({ email, password }) {
  const errors = {};
  const cleanEmail = String(email || "").trim().toLowerCase();

  if (!cleanEmail) {
    errors.email = "Please enter your email.";
  }
  if (!password || String(password).trim() === "") {
    errors.password = "Please enter your password.";
  }
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const user = getUsers().find((u) => u.email === cleanEmail);
  if (!user) {
    return { ok: false, errors: { email: "No account found with that email." } };
  }
  if (user.password !== String(password)) {
    return { ok: false, errors: { password: "Incorrect password." } };
  }

  return { ok: true, user: { username: user.username, email: user.email } };
}

export function setSession(user) {
  const ls = safeStorage();
  if (!ls) return;
  ls.setItem(TOKEN_KEY, `${user.username}:${Date.now()}`);
  ls.setItem(EMAIL_KEY, user.email || "");
  ls.setItem(USERNAME_KEY, user.username || "");
}

export function logout() {
  const ls = safeStorage();
  if (!ls) return;
  ls.removeItem(TOKEN_KEY);
  ls.removeItem(EMAIL_KEY);
  ls.removeItem(USERNAME_KEY);
}

export function getCurrentUser() {
  const ls = safeStorage();
  if (!ls) return null;
  const token = ls.getItem(TOKEN_KEY);
  if (!token) return null;
  return { username: ls.getItem(USERNAME_KEY) || "" };
}

export function isLoggedIn() {
  return !!getCurrentUser();
}
