
'use client';

import { useAppState } from "@/core/state.tsx";
import DashboardCard from "./ui/DashboardCard";

const Dashboard = () => {
    const { vehicles, predictions, schedule, uebaEvents, events } = useAppState();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* KPI Cards */}
        <DashboardCard>
          <p className="text-sm text-white/70">Vehicles Monitored</p>
          <p id="kpi-vehicles" className="text-4xl font-bold mt-2 text-white">{vehicles.length}</p>
        </DashboardCard>
        <DashboardCard>
          <p className="text-sm text-white/70">Predicted Failures (7d)</p>
          <p id="kpi-failures" className="text-4xl font-bold mt-2 text-white">{predictions.length}</p>
        </DashboardCard>
        <DashboardCard>
          <p className="text-sm text-white/70">Scheduled Services</p>
          <p id="kpi-scheduled" className="text-4xl font-bold mt-2 text-white">{schedule.length}</p>
        </DashboardCard>
        <DashboardCard>
          <p className="text-sm text-white/70">UEBA Alerts (24h)</p>
          <p id="kpi-ueba" className="text-4xl font-bold mt-2 text-white">{uebaEvents.length}</p>
        </DashboardCard>
  
        {/* Recent Agent Events */}
        <DashboardCard className="md:col-span-2 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Recent Agent Events</h3>
            <button id="btn-clear-events" className="text-xs text-white/70 hover:text-white">Clear</button>
          </div>
          <ul id="event-feed" className="mt-3 space-y-2 max-h-72 overflow-auto text-sm">
            {events.map((event, index) => (
                <li key={index} className="p-2 rounded-md bg-white/5 border border-white/10">{event}</li>
            ))}
          </ul>
        </DashboardCard>
  
        {/* Workload Overview */}
        <DashboardCard className="md:col-span-2 xl:col-span-2">
          <h3 className="font-semibold text-white">Workload Overview</h3>
          <div id="workload-bars" className="mt-3 space-y-2"></div>
        </DashboardCard>
      </div>
    );
  };
  
  export default Dashboard;
  