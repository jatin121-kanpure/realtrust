import React, { useState } from "react";
import { subscribeNewsletter } from "../../api/api";

// Component for newsletter subscription
const Newsletter = () => {
  const [email, setEmail] = useState(""); // Store user email
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Success message
  const [error, setError] = useState(""); // Error message

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await subscribeNewsletter(email);

      setMessage("Thank you for subscribing!");
      setEmail(""); // Clear input field

      // Hide success message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to subscribe. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-blue-100 mb-8">
          Get updates about our latest projects and news
        </p>

        {/* Subscription form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:bg-gray-400"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {/* Success message */}
        {message && (
          <div className="mt-4 p-3 bg-green-500 rounded-lg text-white">
            {message}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-500 rounded-lg text-white">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
