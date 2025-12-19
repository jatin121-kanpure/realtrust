import React, { useEffect, useState } from "react";
import { getProjects, addProject, deleteProject } from "../../api/api";

// Component to manage projects in Admin Panel
const ProjectManagement = () => {
  const [projects, setProjects] = useState([]); // Store all projects
  const [loading, setLoading] = useState(true); // Loading state for projects
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  }); // Form data state
  const [submitting, setSubmitting] = useState(false); // Loading state for form submission
  const [message, setMessage] = useState(""); // Success message
  const [error, setError] = useState(""); // Error message

  // Fetch projects from backend on component load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      setProjects(response.data);
    } catch (err) {
      setError("Failed to load projects");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes (name & description)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Take only the first file
    setFormData((prev) => ({ ...prev, image: file }));
  };

  // Handle form submission to add a project
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.description || !formData.image) {
      setError("All fields are required");
      return;
    }

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      await addProject(formData);
      setMessage("Project added successfully!");
      setFormData({ name: "", description: "", image: null });
      fetchProjects(); // Refresh the project list
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add project");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle deleting a project
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await deleteProject(id);
      setMessage("Project deleted successfully!");
      fetchProjects();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete project");
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form to add a new project */}
      <div className="lg:col-span-1">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Add New Project</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Project Name */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Project Name
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

            {/* Project Description */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
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
              {submitting ? "Adding..." : "Add Project"}
            </button>
          </form>
        </div>
      </div>

      {/* Projects List */}
      <div className="lg:col-span-2">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Projects List</h2>

          {loading ? (
            <p className="text-gray-400">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-400">
              No projects yet. Add one to get started!
            </p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-700 p-4 rounded flex items-start justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white">
                      {project.name}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">
                      {project.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(project._id)}
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

export default ProjectManagement;
