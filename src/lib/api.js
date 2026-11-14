
export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const TOKEN_KEY = "booknook_token";
const COOKIE_MAX_AGE = 60 * 60 * 24;

// Save JWT in LocalStorage and Cookie
export const saveToken = (token) => {
  if (typeof window === "undefined") return;

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  localStorage.setItem(TOKEN_KEY, token);

  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(
    token
  )}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

// Get JWT
export const getToken = () => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(TOKEN_KEY);
};

// Remove JWT
export const removeToken = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);

  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
};

// Common API Request
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = new Headers(options.headers || {});

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message || `Request failed: ${response.status}`
    );
  }

  return result;
};

// Register User
export const registerUser = (userData) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

// Login User
export const loginUser = (credentials) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

// Get Current Logged-in User
export const getCurrentUser = () =>
  apiRequest("/auth/me", {
    method: "GET",
  });

// Get All Books
export const getBooks = () =>
  apiRequest("/books", {
    method: "GET",
  });

// Get Single Book
export const getBookById = (id) =>
  apiRequest(`/books/${id}`, {
    method: "GET",
  });

// Get My Books
export const getMyBooks = () =>
  apiRequest("/my-books", {
    method: "GET",
  });

// Add Book
export const addBook = (bookData) =>
  apiRequest("/books", {
    method: "POST",
    body: JSON.stringify(bookData),
  });

// Delete Book
export const deleteBook = (id) =>
  apiRequest(`/books/${id}`, {
    method: "DELETE",
  });

// Borrow Book
export const borrowBook = (borrowData) =>
  apiRequest("/borrow", {
    method: "POST",
    body: JSON.stringify(borrowData),
  });

// Get My Borrows
export const getMyBorrows = () =>
  apiRequest("/my-borrows", {
    method: "GET",
  });

// Return Borrowed Book
export const returnBook = (borrowId) =>
  apiRequest(`/borrow/${borrowId}/return`, {
    method: "PATCH",
  });
