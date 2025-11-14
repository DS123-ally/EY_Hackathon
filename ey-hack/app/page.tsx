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

const COLORS = ['#00D4FF', '#00FF88', '#FF6B6B', '#FFD93D'];

const ProgressBar = ({ currentStep, totalSteps, steps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              index <= currentStep
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-700 text-gray-400 border-2 border-gray-600'
            }`}>
              {index + 1}
            </div>
            <span className={`text-xs mt-2 font-medium ${index <= currentStep ? 'text-cyan-400' : 'text-gray-500'}`}>
              {step.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out shadow-lg shadow-cyan-500/50"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const ChartCard = ({ title, children, className = "" }) => (
  <div className={`bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 ${className}`}>
    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
      {title}
    </h3>
    {children}
  </div>
);

const StatCard = ({ title, value, subtitle, color = "cyan" }) => (
  <div className={`bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-700 hover:border-${color}-500/50 transition-all duration-300`}>
    <div className={`w-12 h-12 bg-${color}-500/20 rounded-xl flex items-center justify-center mb-4`}>
      <div className={`w-6 h-6 bg-${color}-400 rounded-full`}></div>
    </div>
    <h4 className="text-2xl font-bold text-white mb-1">{value}</h4>
    <p className="text-gray-400 text-sm font-medium">{title}</p>
    {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
  </div>
);

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
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Continuous Vehicle Monitoring
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Real-time sensor data streaming from vehicle telematics. Anomalies detected in engine temperature trend.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ChartCard title="Engine Temperature (°C)">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={mockSensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Line type="monotone" dataKey="engineTemp" stroke="#00D4FF" strokeWidth={3} dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Oil Pressure (PSI)">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={mockSensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Line type="monotone" dataKey="oilPressure" stroke="#00FF88" strokeWidth={3} dot={{ fill: '#00FF88', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Battery Voltage (V)">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={mockSensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Line type="monotone" dataKey="batteryVoltage" stroke="#FF6B6B" strokeWidth={3} dot={{ fill: '#FF6B6B', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Fuel Level (%)">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={mockSensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Line type="monotone" dataKey="fuelLevel" stroke="#FFD93D" strokeWidth={3} dot={{ fill: '#FFD93D', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Predictive Failure Detection
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                AI models analyze sensor data and maintenance history to predict potential failures. High-priority issues flagged for immediate attention.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartCard title="Component Failure Probabilities" className="lg:col-span-1">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={predictionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="component" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Bar dataKey="probability" fill="#00D4FF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {predictionData.map((item, index) => (
                  <StatCard
                    key={index}
                    title={item.component}
                    value={`${item.probability}%`}
                    subtitle={`Priority: ${item.priority}`}
                    color={
                      item.priority === 'High' ? 'red' :
                      item.priority === 'Medium' ? 'yellow' : 'green'
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Customer Engagement via Voice Agent
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Voice agent initiates personalized conversation to explain issues and recommend service. Customer preferences captured for scheduling.
              </p>
            </div>
            <ChartCard title="AI Agent Conversation" className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-700 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'Agent' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`p-4 rounded-2xl max-w-xs shadow-lg ${
                        msg.sender === 'Agent'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                          : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      }`}>
                        <p className="font-bold text-sm mb-1">{msg.sender}:</p>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {!appointmentBooked && (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={simulateChat}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 transform hover:scale-105"
                    >
                      Simulate Customer Response
                    </button>
                  </div>
                )}
              </div>
            </ChartCard>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Autonomous Service Scheduling
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                AI forecasts demand and optimizes scheduling based on capacity, customer preferences, and maintenance needs.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartCard title="Service Demand Forecast">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={serviceDemandData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Bar dataKey="demand" fill="#00FF88" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Appointment Management">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-600">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                      Available Slots
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Monday 10 AM</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>Tuesday 2 PM - Booked</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Wednesday 11 AM</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard title="Current Load" value="65%" subtitle="Service Center" color="blue" />
                    <StatCard title="Peak Hours" value="9AM-3PM" subtitle="Daily Schedule" color="purple" />
                  </div>
                  {appointmentBooked && (
                    <div className="bg-gradient-to-r from-green-900 to-emerald-900 p-4 rounded-xl border border-green-500/50">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-green-400 font-bold">Appointment Confirmed!</p>
                          <p className="text-green-300 text-sm">Tuesday, 2:00 PM at Downtown Service Center</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ChartCard>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Post-Service Feedback Collection
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Feedback captured and maintenance records updated. Insights fed back to improve future services.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartCard title="Service Feedback" className="lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Service Quality Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                          <span className="text-white font-bold">★</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Comments</label>
                    <textarea
                      className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      rows={4}
                      placeholder="Share your experience..."
                    ></textarea>
                  </div>
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25">
                    Submit Feedback
                  </button>
                </div>
              </ChartCard>
              <ChartCard title="Maintenance Records">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="pb-3 text-gray-400 font-semibold">Component</th>
                        <th className="pb-3 text-gray-400 font-semibold">Last Service</th>
                        <th className="pb-3 text-gray-400 font-semibold">Next Due</th>
                        <th className="pb-3 text-gray-400 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      <tr className="border-b border-gray-800">
                        <td className="py-3 text-white font-medium">Engine Oil</td>
                        <td className="py-3 text-gray-300">Nov 9, 2025</td>
                        <td className="py-3 text-gray-300">Feb 9, 2026</td>
                        <td className="py-3">
                          <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-xs font-semibold border border-green-500/30">
                            Good
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-white font-medium">Brake Pads</td>
                        <td className="py-3 text-gray-300">Oct 15, 2025</td>
                        <td className="py-3 text-gray-300">Apr 15, 2026</td>
                        <td className="py-3">
                          <span className="px-3 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-500/30">
                            Monitor
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ChartCard>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                RCA/CAPA Insights for Manufacturing
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Cross-referencing predicted failures with historical data generates actionable insights for product quality improvement.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartCard title="Recurring Defect Analysis">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={rcaData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      label={(props: any) => `${props.defect} ${(props.percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="frequency"
                    >
                      {rcaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
              <div className="space-y-6">
                {rcaData.map((item, index) => (
                  <ChartCard key={index} title={item.defect} className="p-4">
                    <div className="space-y-2">
                      <p className="text-red-400 font-semibold">Frequency: {item.frequency}</p>
                      <p className="text-gray-300"><strong>Root Cause:</strong> {item.cause}</p>
                      <p className="text-gray-300"><strong>Recommended Action:</strong> {item.action}</p>
                    </div>
                  </ChartCard>
                ))}
              </div>
            </div>
            <ChartCard title="Manufacturing Improvement Insights" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <p className="text-gray-300">Implement enhanced seal testing protocols in production</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <p className="text-gray-300">Upgrade cooling system components with higher thermal resistance materials</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <p className="text-gray-300">Introduce predictive wear monitoring for transmission gears</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <p className="text-gray-300">Conduct quarterly design reviews based on field failure data</p>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        );
      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                UEBA Security Monitoring
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                UEBA continuously monitors agent interactions for anomalies, ensuring secure and compliant autonomous operations.
              </p>
            </div>
            <ChartCard title="Agent Behavior Analytics">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="pb-3 text-gray-400 font-semibold">Agent</th>
                      <th className="pb-3 text-gray-400 font-semibold">Anomalies Detected</th>
                      <th className="pb-3 text-gray-400 font-semibold">Status</th>
                      <th className="pb-3 text-gray-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uebaData.map((item, index) => (
                      <tr key={index} className={`border-b border-gray-800 ${item.status === 'Alert' ? 'bg-red-900/20' : ''}`}>
                        <td className="py-4 text-white font-medium">{item.agent}</td>
                        <td className="py-4 text-gray-300">{item.anomalies}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'Normal'
                              ? 'bg-green-900/50 text-green-400 border border-green-500/30'
                              : 'bg-red-900/50 text-red-400 border border-red-500/30'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4">
                          {item.status === 'Alert' && (
                            <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/25 text-xs">
                              Investigate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChartCard>
            <ChartCard title="Security Alert" className="border-red-500/50 bg-gradient-to-br from-red-900/20 to-red-950/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30">
                  <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-red-400 font-bold text-lg mb-2">Anomalous Customer Engagement Activity Detected</h4>
                  <p className="text-red-300 mb-3">Detected unusual pattern in customer interaction logs. Potential unauthorized access attempt blocked.</p>
                  <ul className="space-y-2 text-red-200">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      Multiple rapid API calls from unrecognized IP
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      Attempted access to sensitive vehicle data
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      Automated response triggered security protocol
                    </li>
                  </ul>
                </div>
              </div>
            </ChartCard>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="relative z-10">
        <header className="text-center py-12 px-6">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Agentic AI Vehicle Maintenance System
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proactive Predictive Maintenance & Autonomous Service Orchestration
          </p>
        </header>

        <ProgressBar currentStep={currentStep} totalSteps={steps.length} steps={steps} />

        <div className="px-6 pb-12">
          {renderStepContent()}
        </div>

        <div className="flex justify-center space-x-6 px-6 pb-12">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 px-8 py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg shadow-gray-900/50 hover:shadow-gray-900/70 transform hover:scale-105 disabled:transform-none"
          >
            ← Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 transform hover:scale-105 disabled:transform-none"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
