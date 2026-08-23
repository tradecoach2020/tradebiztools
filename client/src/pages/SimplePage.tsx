import React from "react";

const SimplePage = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">TradeCoach Lite</h1>
      <div className="space-y-4">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Welcome to TradeCoach Lite</h2>
          <p className="text-gray-700">
            Your comprehensive business tools platform for trade professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">Trade Calculator</h3>
            <p className="text-gray-600 text-sm">Calculate pricing and estimates</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">Business Health Check</h3>
            <p className="text-gray-600 text-sm">Assess your business performance</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">Daily Tips</h3>
            <p className="text-gray-600 text-sm">Get daily business insights</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">Video Resources</h3>
            <p className="text-gray-600 text-sm">Learn from expert tutorials</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">PWA Features</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Install directly from your browser</li>
            <li>• Works offline</li>
            <li>• Native app experience</li>
            <li>• No app store required</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SimplePage;