'use client';

import { SleekCard } from "@/components/ui/SleekCard";
import { HoverButton } from "@/components/ui/hover-button";
import { useAppState, useAppDispatch } from "@/core/state.tsx";
import { useRouter } from "next/navigation";
import { BarChart } from "@/components/ui/BarChart";
import { LineChart } from "@/components/ui/LineChart";
import { PieChart } from "@/components/ui/PieChart";
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Clock, Users } from "lucide-react";

export default function Home() {
  const { vehicles, predictions, schedule, uebaEvents, events, demoState } = useAppState();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRunOrchestration = () => {
    if (!demoState.predictionGenerated) {
      dispatch(s => ({
        ...s,
        predictions: [
          ...s.predictions,
          { vehicleId: 'V-451', component: 'Brake Pads', risk: 0.95, confidence: 0.98, etaDays: 5 },
        ],
        events: [...s.events, 'Diagnosis Agent: High-risk failure predicted for V-451.'],
        demoState: { ...s.demoState, predictionGenerated: true },
      }));
    }
    router.push('/predictions');
  };

  const vehicleHealthData = [
    { name: 'Excellent', value: vehicles.filter(v => v.health > 0.8).length },
    { name: 'Good', value: vehicles.filter(v => v.health > 0.6 && v.health <= 0.8).length },
    { name: 'Fair', value: vehicles.filter(v => v.health > 0.4 && v.health <= 0.6).length },
    { name: 'Poor', value: vehicles.filter(v => v.health <= 0.4).length },
  ];

  const agentWorkloadData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 19 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 22 },
    { name: 'Fri', value: 18 },
    { name: 'Sat', value: 8 },
    { name: 'Sun', value: 5 },
  ];

  const failurePredictionData = [
    { name: 'Brakes', value: 4, color: '#3b82f6' },
    { name: 'Engine', value: 2, color: '#10b981' },
    { name: 'Transmission', value: 1, color: '#f59e0b' },
    { name: 'Battery', value: 3, color: '#ef4444' },
  ];

  const avgHealth = (vehicles.reduce((acc, v) => acc + v.health, 0) / vehicles.length * 100).toFixed(1);
  const criticalAlerts = predictions.filter(p => p.risk > 0.8).length;
  const completedServices = schedule.filter(s => s.status === 'Completed').length;

  return (
    <main className="flex-1 flex flex-col p-8 gap-6 max-w-[1800px] mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-white">Fleet Overview</h1>
          <p className="text-sm text-[#6b7280] mt-1">Real-time monitoring and predictive maintenance</p>
        </div>
        <HoverButton onClick={handleRunOrchestration}>
          Run Orchestration
        </HoverButton>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SleekCard hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Vehicles</p>
              <p className="text-3xl font-semibold text-white">{vehicles.length}</p>
              <p className="text-xs text-[#10b981] mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{avgHealth}% avg health</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#3b82f6]" />
            </div>
          </div>
        </SleekCard>

        <SleekCard hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Critical Alerts</p>
              <p className="text-3xl font-semibold text-white">{criticalAlerts}</p>
              <p className="text-xs text-[#6b7280] mt-1">Next 7 days</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#ef4444]/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-[#ef4444]" />
            </div>
          </div>
        </SleekCard>

        <SleekCard hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Scheduled</p>
              <p className="text-3xl font-semibold text-white">{schedule.length}</p>
              <p className="text-xs text-[#6b7280] mt-1">{completedServices} completed</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#10b981]/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#10b981]" />
            </div>
          </div>
        </SleekCard>

        <SleekCard hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">UEBA Events</p>
              <p className="text-3xl font-semibold text-white">{uebaEvents.length}</p>
              <p className="text-xs text-[#6b7280] mt-1">Last 24 hours</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#f59e0b]" />
            </div>
          </div>
        </SleekCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Events - Takes 1 column */}
        <SleekCard className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Agent Events</h3>
            <Clock className="w-4 h-4 text-[#6b7280]" />
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {events.slice().reverse().map((event, index) => (
              <div 
                key={index} 
                className="p-3 rounded-md bg-[#0a0a0a] border border-[#1f1f1f] text-xs text-[#9ca3af] hover:border-[#2a2a2a] transition-colors"
              >
                <span className="text-[#3b82f6] font-mono mr-2">
                  {new Date().toLocaleTimeString()}
                </span>
                {event}
              </div>
            ))}
          </div>
        </SleekCard>

        {/* Charts - Takes 2 columns */}
        <div className="lg:col-span-2 grid grid-cols-1 gap-6">
          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Agent Workload - Last 7 Days
            </h3>
            <div className="h-[180px]">
              <LineChart data={agentWorkloadData} />
            </div>
          </SleekCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SleekCard>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                Vehicle Health
              </h3>
              <div className="h-[160px]">
                <BarChart data={vehicleHealthData} />
              </div>
            </SleekCard>

            <SleekCard>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                Failure Predictions
              </h3>
              <div className="h-[160px]">
                <PieChart data={failurePredictionData} />
              </div>
            </SleekCard>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-4">
          <p className="text-xs text-[#6b7280] mb-1">High Risk</p>
          <p className="text-2xl font-semibold text-[#ef4444]">{predictions.filter(p => p.risk > 0.8).length}</p>
        </div>
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-4">
          <p className="text-xs text-[#6b7280] mb-1">Medium Risk</p>
          <p className="text-2xl font-semibold text-[#f59e0b]">{predictions.filter(p => p.risk > 0.5 && p.risk <= 0.8).length}</p>
        </div>
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-4">
          <p className="text-xs text-[#6b7280] mb-1">Low Risk</p>
          <p className="text-2xl font-semibold text-[#10b981]">{predictions.filter(p => p.risk <= 0.5).length}</p>
        </div>
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-4">
          <p className="text-xs text-[#6b7280] mb-1">Active Jobs</p>
          <p className="text-2xl font-semibold text-[#3b82f6]">{schedule.filter(s => s.status !== 'Completed').length}</p>
        </div>
      </div>
    </main>
  );
}