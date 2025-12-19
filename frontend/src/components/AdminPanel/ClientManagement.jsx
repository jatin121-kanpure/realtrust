import React, { useEffect, useState } from "react";
import { getClients, addClient, deleteClient } from "../../api/api";

// Component to manage clients in Admin Panel
const ClientManagement = () => {
  const [clients, setClients] = useState([]); // Store all clients
  const [loading, setLoading] = useState(true); // Loading state for fetching clients
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    image: null,
  }); // Form data state
  const [submitting, setSubmitting] = useState(false); // Loading state for form submission
  const [message, setMessage] = useState(""); // Success message
  const [error, setError] = useState(""); // Error message

  // Fetch clients from backend on component load
  useEffect(() => {
    fetchClients();
  }, []);

  // Fetch all clients
  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await getClients();
      setClients(response.data);
    } catch (err) {
      setError("Failed to load clients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes (name, designation, description)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Take only the first selected file
    setFormData((prev) => ({ ...prev, image: file }));
  };

  // Handle form submission to add a client
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.designation ||
      !formData.description ||
      !formData.image
    ) {
      setError("All fields are required");
      return;
    }

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      await addClient(formData);
      setMessage("Client added successfully!");
      setFormData({ name: "", designation: "", description: "", image: null });
      fetchClients(); // Refresh client list
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add client");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle deleting a client
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await deleteClient(id);
      setMessage("Client deleted successfully!");
      fetchClients();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete client");
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form to add a new client */}
      <div className="lg:col-span-1">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Add New Client</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Client Name */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Client Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                required
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="e.g., CEO, Developer, Designer"
                className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                required
              />
            </div>

            {/* Upload Image */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                required
              />
            </div>

            {/* Messages */}
            {message && (
              <div className="p-3 bg-green-600 rounded text-white">
                {message}
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-600 rounded text-white">{error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 font-semibold py-2 rounded transition"
            >
              {submitting ? "Adding..." : "Add Client"}
            </button>
          </form>
        </div>
      </div>

      {/* Clients List */}
      <div className="lg:col-span-2">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Clients List</h2>

          {loading ? (
            <p className="text-gray-400">Loading clients...</p>
          ) : clients.length === 0 ? (
            <p className="text-gray-400">
              No clients yet. Add one to get started!
            </p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {clients.map((client) => (
                <div
                  key={client._id}
                  className="bg-gray-700 p-4 rounded flex items-start justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white">
                      {client.name}
                    </h3>
                    <p className="text-blue-400 text-sm">
                      {client.designation}
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                      {client.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="ml-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold whitespace-nowrap"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;
