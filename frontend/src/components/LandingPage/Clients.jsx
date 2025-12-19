import React, { useEffect, useState } from "react";
import { getClients } from "../../api/api";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error("Failed to load clients:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="clients" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Happy Clients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by leading companies worldwide
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading clients...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No clients available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {clients.map((client) => (
              <div
                key={client._id}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition text-center"
              >
                {/* Client Image */}
                <div className="mb-4">
                  <img
                    src={`http://localhost:5000${client.image}`}
                    alt={client.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-200"
                  />
                </div>

                {/* Client Info */}
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {client.name}
                </h3>
                <p className="text-blue-600 font-semibold text-sm mb-3">
                  {client.designation}
                </p>
                <p className="text-gray-600 text-sm">"{client.description}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
