import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current path is exactly '/dashboard'
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 text-gray-800 p-6 shadow-lg">
        <h2
          onClick={() => navigate('/dashboard')}
          className="text-xl font-bold mb-6 cursor-pointer hover:text-blue-600"
        >
          Dashboard
        </h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/dashboard/contacts"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium text-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'hover:bg-blue-100 hover:text-blue-600'
              }`
            }
          >
            Contacts
          </NavLink>
          <NavLink
            to="/dashboard/campaigns"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium text-lg transition-all duration-200 ${
                isActive
                  ? 'bg-green-500 text-white shadow-md'
                  : 'hover:bg-green-100 hover:text-green-600'
              }`
            }
          >
            Template
          </NavLink>
          <NavLink
            to="/dashboard/generate"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium text-lg transition-all duration-200 ${
                isActive
                  ? 'bg-yellow-500 text-white shadow-md'
                  : 'hover:bg-yellow-100 hover:text-yellow-600'
              }`
            }
          >
            Generate Automation
          </NavLink>
          <NavLink
            to="/dashboard/scheduled-emails"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium text-lg transition-all duration-200 ${
                isActive
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'hover:bg-yellow-100 hover:text-purple-600'
              }`
            }
          >
            Scheduled Emails
          </NavLink>

          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium text-lg transition-all duration-200 ${
                isActive
                  ? 'bg-red-500 text-white shadow-md'
                  : 'hover:bg-red-100 hover:text-red-600'
              }`
            }
          >
            Analytics
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-4/5 bg-gray-50 p-8">
        {/* Content only for '/dashboard' */}
        {isDashboardPage && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Welcome to the Dashboard
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Follow these steps to get started with automation.
            </p>

            {/* Cards for steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div
                onClick={() => navigate('/dashboard/contacts')}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white text-xl font-bold mb-4">
                  1
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Create Contact
                </h2>
                <p className="text-gray-600">
                  Add your contacts to the system to get started with your automation.
                </p>
                <span className="text-blue-500 mt-4 inline-block">
                  Go to Contacts →
                </span>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => navigate('/dashboard/campaigns')}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white text-xl font-bold mb-4">
                  2
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Select Template
                </h2>
                <p className="text-gray-600">
                  Choose a pre-designed template or create your own for campaigns.
                </p>
                <span className="text-green-500 mt-4 inline-block">
                  Go to Templates →
                </span>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => navigate('/dashboard/generate')}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-white text-xl font-bold mb-4">
                  3
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Generate Automation
                </h2>
                <p className="text-gray-600">
                  Set up automation to save time and streamline your workflow.
                </p>
                <span className="text-yellow-500 mt-4 inline-block">
                  Go to Automation →
                </span>
              </div>

              {/* Step 4 */}
              <div
                onClick={() => navigate('/dashboard/analytics')}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white text-xl font-bold mb-4">
                  4
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Analytics
                </h2>
                <p className="text-gray-600">
                  View and analyze the performance of your campaigns and automations.
                </p>
                <span className="text-red-500 mt-4 inline-block">
                  Go to Analytics →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Render subpage content */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
