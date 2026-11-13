
"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";

const initialFormData = {
  title: "",
  author: "",
  category: "Fiction",
  image: "",
  description: "",
  quantity: 1,
};

export default function AddBookForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add book");
      }

      setMessage("Book added successfully!");
      setFormData(initialFormData);
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Book Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Author Name
          </label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Kids">Kids</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Book Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Short Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write about this book"
            required
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Total Copies
          </label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>

        {message && (
          <p className="text-center font-medium">
            {message}
          </p>
        )}

      </form>
    </div>
  );
}
