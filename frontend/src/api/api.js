// Import axios for making API requests
import axios from "axios";

// Backend base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Projects APIs

// Get all projects
export const getProjects = () => {
  return api.get("/projects");
};

// Add new project
export const addProject = (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("image", data.image);

  return api.post("/projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete project
export const deleteProject = (id) => {
  return api.delete(`/projects/${id}`);
};

// Clients APIs

// Get all clients
export const getClients = () => {
  return api.get("/clients");
};

// Add new client (with image)
export const addClient = (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("designation", data.designation);
  formData.append("description", data.description);
  formData.append("image", data.image);

  return api.post("/clients", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete client
export const deleteClient = (id) => {
  return api.delete(`/clients/${id}`);
};

// Contact APIs

// Get all contact form submissions
export const getContacts = () => {
  return api.get("/contacts");
};

// Submit contact form
export const submitContact = (data) => {
  return api.post("/contacts", data);
};

// Newsletter APIs

// Get all newsletter subscribers
export const getNewsletters = () => {
  return api.get("/newsletters");
};

// Subscribe to newsletter
export const subscribeNewsletter = (email) => {
  return api.post("/newsletters", { email });
};

// Export axios instance
export default api;
