import React, { useState } from "react";
import ProjectManagement from "./ProjectManagement";
import ClientManagement from "./ClientManagement";
import ContactFormViewer from "./ContactFormViewer";
import SubscriptionViewer from "./SubscriptionViewer";

// Admin Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("projects"); // Track current tab

  // Tabs configuration
  const tabs = [
    { id: "projects", label: "Manage Projects" },
    { id: "clients", label: "Manage Clients" },
    { id: "contacts", label: "Contact Forms" },
    { id: "subscriptions", label: "Subscriptions" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-6 shadow-lg">
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        <p className="text-gray-400">Manage your portfolio content</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-semibold transition ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === "projects" && <ProjectManagement />}
        {activeTab === "clients" && <ClientManagement />}
        {activeTab === "contacts" && <ContactFormViewer />}
        {activeTab === "subscriptions" && <SubscriptionViewer />}
      </div>
    </div>
  );
};

export default Dashboard;
