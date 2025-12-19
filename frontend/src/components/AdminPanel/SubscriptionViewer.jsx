import React, { useEffect, useState } from "react";
import { getNewsletters } from "../../api/api";

// Component to display all newsletter subscriptions
const SubscriptionViewer = () => {
  const [subscriptions, setSubscriptions] = useState([]); // Store subscriptions
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message

  // Fetch subscriptions on component load
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await getNewsletters();
      setSubscriptions(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load subscriptions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Newsletter Subscriptions</h2>

      {loading ? (
        <p className="text-gray-400">Loading subscriptions...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : subscriptions.length === 0 ? (
        <p className="text-gray-400">No newsletter subscriptions yet.</p>
      ) : (
        <div>
          <div className="mb-6 text-blue-400 font-semibold">
            Total Subscriptions: {subscriptions.length}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
            {subscriptions.map((sub) => (
              <div key={sub._id} className="bg-gray-700 p-4 rounded">
                <p className="text-white font-semibold break-all">
                  {sub.email}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Subscribed: {new Date(sub.subscribedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionViewer;
