'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const mockSensorData = [
  { time: '00:00', engineTemp: 85, oilPressure: 45, batteryVoltage: 12.5, fuelLevel: 80 },
  { time: '01:00', engineTemp: 87, oilPressure: 44, batteryVoltage: 12.4, fuelLevel: 78 },
  { time: '02:00', engineTemp: 89, oilPressure: 43, batteryVoltage: 12.3, fuelLevel: 76 },
  { time: '03:00', engineTemp: 91, oilPressure: 42, batteryVoltage: 12.2, fuelLevel: 74 },
  { time: '04:00', engineTemp: 93, oilPressure: 41, batteryVoltage: 12.1, fuelLevel: 72 },
  { time: '05:00', engineTemp: 95, oilPressure: 40, batteryVoltage: 12.0, fuelLevel: 70 },
];

const predictionData = [    
  { component: 'Engine', probability: 85, priority: 'High' },
  { component: 'Transmission', probability: 60, priority: 'Medium' },
  { component: 'Brakes', probability: 30, priority: 'Low' },
  { component: 'Battery', probability: 20, priority: 'Low' },
];

const serviceDemandData = [
  { month: 'Jan', demand: 120 },
  { month: 'Feb', demand: 150 },
  { month: 'Mar', demand: 180 },
  { month: 'Apr', demand: 200 },
  { month: 'May', demand: 220 },
  { month: 'Jun', demand: 250 },
];

const rcaData = [
  { defect: 'Oil Leak', frequency: 45, cause: 'Seal Failure', action: 'Improve Seal Design' },
  { defect: 'Overheating', frequency: 30, cause: 'Cooling System', action: 'Enhance Cooling' },
  { defect: 'Transmission Slip', frequency: 25, cause: 'Gear Wear', action: 'Upgrade Materials' },
];

const uebaData = [
  { agent: 'Data Analysis', anomalies: 2, status: 'Normal' },
  { agent: 'Diagnosis', anomalies: 0, status: 'Normal' },
  { agent: 'Customer Engagement', anomalies: 1, status: 'Alert' },
  { agent: 'Scheduling', anomalies: 0, status: 'Normal' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Agent', message: 'Hello! We detected a potential issue with your vehicle. Would you like to schedule maintenance?' },
  ]);
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const steps = [
    'Vehicle Monitoring',
    'Failure Prediction',
    'Customer Engagement',
    'Service Scheduling',
    'Feedback Collection',
    'RCA/CAPA Insights',
    'UEBA Security',
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const simulateChat = () => {
    setChatMessages(prev => [...prev, { sender: 'Customer', message: 'Yes, please schedule for next week.' }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'Agent', message: 'Great! I\'ve booked your appointment for Tuesday at 2 PM. Confirmation sent to your app.' }]);
      setAppointmentBooked(true);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Continuous Vehicle Monitoring</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Engine Temperature (°C)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={mockSensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="engineTemp" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Oil Pressure (PSI)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={mockSensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="oilPressure" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Battery Voltage (V)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={mockSensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="batteryVoltage" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Fuel Level (%)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={mockSensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="fuelLevel" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="text-center text-black">Real-time sensor data streaming from vehicle telematics. Anomalies detected in engine temperature trend.</p>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Predictive Failure Detection</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Component Failure Probabilities</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="component" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="probability" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {predictionData.map((item, index) => (
                <div key={index} className={`p-4 rounded-lg shadow-lg ${item.priority === 'High' ? 'bg-red-100 border-red-300' : item.priority === 'Medium' ? 'bg-yellow-100 border-yellow-300' : 'bg-green-100 border-green-300'}`}>
                  <h4 className="font-semibold">{item.component}</h4>
                  <p>Probability: {item.probability}%</p>
                  <p>Priority: {item.priority}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-black">AI models analyze sensor data and maintenance history to predict potential failures. High-priority issues flagged for immediate attention.</p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Customer Engagement via Voice Agent</h2>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'Agent' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'Agent' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
                      <p className="font-semibold">{msg.sender}:</p>
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              {!appointmentBooked && (
                <button
                  onClick={simulateChat}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Simulate Customer Response
                </button>
              )}
            </div>
            <p className="text-center text-black">Voice agent initiates personalized conversation to explain issues and recommend service. Customer preferences captured for scheduling.</p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Autonomous Service Scheduling</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Service Demand Forecast</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceDemandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="demand" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Appointment Booking</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Available Slots</h4>
                  <ul className="mt-2 space-y-1">
                    <li>Monday 10 AM</li>
                    <li>Tuesday 2 PM - Booked</li>
                    <li>Wednesday 11 AM</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Service Center Capacity</h4>
                  <p>Current Load: 65%</p>
                  <p>Peak Hours: 9 AM - 3 PM</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Customer Preferences</h4>
                  <p>Preferred Time: Morning</p>
                  <p>Location: Downtown Center</p>
                </div>
              </div>
              {appointmentBooked && (
                <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                  <p className="text-green-800 font-semibold">Appointment Confirmed!</p>
                  <p>Tuesday, 2:00 PM at Downtown Service Center</p>
                </div>
              )}
            </div>
            <p className="text-center text-black">AI forecasts demand and optimizes scheduling based on capacity, customer preferences, and maintenance needs.</p>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Post-Service Feedback Collection</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-4">Service Completion Follow-up</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black">Service Quality Rating</label>
                  <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-2xl">★</span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Comments</label>
                  <textarea
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Share your experience..."
                  ></textarea>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Submit Feedback
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Updated Maintenance Records</h3>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Component</th>
                    <th className="px-4 py-2 text-left">Last Service</th>
                    <th className="px-4 py-2 text-left">Next Due</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">Engine Oil</td>
                    <td className="px-4 py-2">Nov 9, 2025</td>
                    <td className="px-4 py-2">Feb 9, 2026</td>
                    <td className="px-4 py-2 text-green-600">Good</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Brake Pads</td>
                    <td className="px-4 py-2">Oct 15, 2025</td>
                    <td className="px-4 py-2">Apr 15, 2026</td>
                    <td className="px-4 py-2 text-yellow-600">Monitor</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center text-black">Feedback captured and maintenance records updated. Insights fed back to improve future services.</p>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">RCA/CAPA Insights for Manufacturing</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Recurring Defect Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={rcaData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ defect, percent }) => `${defect} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="frequency"
                  >
                    {rcaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rcaData.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-red-600">{item.defect}</h4>
                  <p><strong>Frequency:</strong> {item.frequency}</p>
                  <p><strong>Root Cause:</strong> {item.cause}</p>
                  <p><strong>Recommended Action:</strong> {item.action}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Manufacturing Improvement Insights</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Implement enhanced seal testing protocols in production</li>
                <li>Upgrade cooling system components with higher thermal resistance materials</li>
                <li>Introduce predictive wear monitoring for transmission gears</li>
                <li>Conduct quarterly design reviews based on field failure data</li>
              </ul>
            </div>
            <p className="text-center text-black">Cross-referencing predicted failures with historical data generates actionable insights for product quality improvement.</p>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">UEBA Security Monitoring</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Agent Behavior Analytics</h3>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Agent</th>
                    <th className="px-4 py-2 text-left">Anomalies Detected</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {uebaData.map((item, index) => (
                    <tr key={index} className={item.status === 'Alert' ? 'bg-yellow-50' : ''}>
                      <td className="px-4 py-2">{item.agent}</td>
                      <td className="px-4 py-2">{item.anomalies}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {item.status === 'Alert' && (
                          <button className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">
                            Investigate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-red-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-red-800">Security Alert: Anomalous Customer Engagement Activity</h3>
              <p className="text-red-700">Detected unusual pattern in customer interaction logs. Potential unauthorized access attempt blocked.</p>
              <ul className="list-disc list-inside mt-2 text-red-700">
                <li>Multiple rapid API calls from unrecognized IP</li>
                <li>Attempted access to sensitive vehicle data</li>
                <li>Automated response triggered security protocol</li>
              </ul>
            </div>
            <p className="text-center text-black">UEBA continuously monitors agent interactions for anomalies, ensuring secure and compliant autonomous operations.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Agentic AI Vehicle Maintenance System</h1>
          <p className="text-xl text-black">Proactive Predictive Maintenance & Autonomous Service Orchestration</p>
        </header>

        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4 mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-black">{steps[currentStep]}</h2>
          </div>
        </div>

        <div className="mb-8">
          {renderStepContent()}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
