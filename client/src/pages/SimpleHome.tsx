import React from "react";

const SimpleHome = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">TradeCoach Lite</h1>
          <p className="text-xl text-gray-600">Free Business Tools for Trade Professionals</p>
        </header>

        <div className="bg-blue-50 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Your Business Growth Platform</h2>
          <p className="text-gray-700 mb-6">
            TradeCoach Lite provides essential tools to help grow your trade business. 
            Access calculators, health assessments, daily tips, and more - all completely free.
          </p>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">PWA Features</h3>
            <ul className="text-green-700 space-y-1">
              <li>• Install directly from your browser</li>
              <li>• Works offline once installed</li>
              <li>• Native app experience</li>
              <li>• No app store required</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Calendar</h3>
            <p className="text-gray-600">Manage appointments and project schedules efficiently</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">🧮</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trade Calculator</h3>
            <p className="text-gray-600">Calculate pricing, estimates, and material costs</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📈</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Health</h3>
            <p className="text-gray-600">Assess and track your business performance</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">💡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Tips</h3>
            <p className="text-gray-600">Get daily business insights and coaching</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">🎥</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Resources</h3>
            <p className="text-gray-600">Watch expert tutorials and coaching videos</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📄</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Resources</h3>
            <p className="text-gray-600">Download templates and business guides</p>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Grow Your Business?</h3>
          <p className="text-gray-600 mb-6">
            Install TradeCoach Lite on your device for quick access to all tools and resources.
          </p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800 font-medium">
              Look for the "Install App" option in your browser menu or address bar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHome;