import React, { useEffect, useState } from "react";
import { getContacts } from "../../api/api";

// Component to display all contact form submissions
const ContactFormViewer = () => {
  const [contacts, setContacts] = useState([]); // Store contact submissions
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message

  // Fetch contacts on component load
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await getContacts();
      setContacts(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load contacts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Contact Form Submissions</h2>

      {loading ? (
        <p className="text-gray-400">Loading contacts...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-400">No contact form submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3 text-gray-300 font-semibold">
                  Full Name
                </th>
                <th className="px-4 py-3 text-gray-300 font-semibold">Email</th>
                <th className="px-4 py-3 text-gray-300 font-semibold">
                  Mobile
                </th>
                <th className="px-4 py-3 text-gray-300 font-semibold">City</th>
                <th className="px-4 py-3 text-gray-300 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3 text-white">{contact.fullName}</td>
                  <td className="px-4 py-3 text-white">{contact.email}</td>
                  <td className="px-4 py-3 text-white">
                    {contact.mobileNumber}
                  </td>
                  <td className="px-4 py-3 text-white">{contact.city}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactFormViewer;
