'use client';

import { SleekCard } from "@/components/ui/SleekCard";
import { HoverButton } from "@/components/ui/hover-button";
import { useAppState, useAppDispatch } from "@/core/state.tsx";
import { ShieldAlert, ShieldCheck, Info, AlertTriangle, XCircle, Activity, TrendingDown } from "lucide-react";
import { BarChart } from "@/components/ui/BarChart";
import { LineChart } from "@/components/ui/LineChart";
import { PieChart } from "@/components/ui/PieChart";

const UebaPage = () => {
    const { uebaEvents, demoState } = useAppState();
    const dispatch = useAppDispatch();

    const handleSimulateAnomaly = () => {
        if (!demoState.anomalySimulated) {
            dispatch(s => ({
                ...s,
                uebaEvents: [
                    ...s.uebaEvents,
                    { ts: new Date().toISOString(), policyId: 'AUTH-VIOLATION', severity: 'CRITICAL', detail: 'Unauthorized attempt to access customer data by Scheduling Agent.' },
                ],
                events: [...s.events, 'UEBA: Critical anomaly detected!'],
                demoState: { ...s.demoState, anomalySimulated: true },
            }));
        }
    };

    const getSeverityStyle = (severity: string) => {
      switch(severity) {
        case 'CRITICAL':
          return { color: 'text-[#ef4444]', bg: 'bg-[#ef4444]/10', icon: XCircle, border: 'border-[#ef4444]/20' };
        case 'HIGH':
          return { color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10', icon: AlertTriangle, border: 'border-[#f59e0b]/20' };
        case 'MEDIUM':
          return { color: 'text-[#3b82f6]', bg: 'bg-[#3b82f6]/10', icon: ShieldAlert, border: 'border-[#3b82f6]/20' };
        default:
          return { color: 'text-[#10b981]', bg: 'bg-[#10b981]/10', icon: ShieldCheck, border: 'border-[#10b981]/20' };
      }
    };

    // Severity distribution
    const severityDistribution = [
      { name: 'Critical', value: uebaEvents.filter(e => e.severity === 'CRITICAL').length, color: '#ef4444' },
      { name: 'High', value: uebaEvents.filter(e => e.severity === 'HIGH').length, color: '#f59e0b' },
      { name: 'Medium', value: uebaEvents.filter(e => e.severity === 'MEDIUM').length, color: '#3b82f6' },
      { name: 'Info', value: uebaEvents.filter(e => e.severity === 'INFO').length, color: '#10b981' },
    ];

    // Policy violations
    const policyViolations = [
      { name: 'Data Access', value: uebaEvents.filter(e => e.policyId.includes('DATA')).length },
      { name: 'Authentication', value: uebaEvents.filter(e => e.policyId.includes('LOGIN') || e.policyId.includes('AUTH')).length },
      { name: 'Rate Limit', value: uebaEvents.filter(e => e.policyId.includes('RATE')).length },
      { name: 'Schedule', value: uebaEvents.filter(e => e.policyId.includes('SCHEDULE')).length },
      { name: 'Other', value: uebaEvents.filter(e => 
        !e.policyId.includes('DATA') &&
        !e.policyId.includes('LOGIN') &&
        !e.policyId.includes('AUTH') &&
        !e.policyId.includes('RATE') &&
        !e.policyId.includes('SCHEDULE')
      ).length },
    ];

    // Events timeline (simulated hourly data)
    const eventTimeline = [
      { name: '6h ago', value: 3 },
      { name: '5h ago', value: 2 },
      { name: '4h ago', value: 4 },
      { name: '3h ago', value: 1 },
      { name: '2h ago', value: 3 },
      { name: '1h ago', value: 2 },
      { name: 'Now', value: uebaEvents.length },
    ];

    // Agent activity (simulated)
    const agentActivity = [
      { name: 'Prediction Agent', value: 45 },
      { name: 'Scheduling Agent', value: 32 },
      { name: 'RCA Agent', value: 28 },
      { name: 'Communication Agent', value: 24 },
      { name: 'UEBA Agent', value: 18 },
    ];

  return (
    <main className="flex-1 flex flex-col p-8 max-w-[1800px] mx-auto w-full">
        <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white">UEBA Monitoring</h1>
              <p className="text-sm text-[#6b7280] mt-1">User and Entity Behavior Analytics</p>
            </div>
            <HoverButton onClick={handleSimulateAnomaly}>
              Simulate Anomaly
            </HoverButton>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Total Events</p>
                <p className="text-3xl font-semibold text-white">{uebaEvents.length}</p>
                <p className="text-xs text-[#6b7280] mt-1">Last 24 hours</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Critical</p>
                <p className="text-3xl font-semibold text-[#ef4444]">{uebaEvents.filter(e => e.severity === 'CRITICAL').length}</p>
                <p className="text-xs text-[#ef4444] mt-1">Requires immediate action</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#ef4444]/10 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-[#ef4444]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">High Priority</p>
                <p className="text-3xl font-semibold text-[#f59e0b]">{uebaEvents.filter(e => e.severity === 'HIGH').length}</p>
                <p className="text-xs text-[#6b7280] mt-1">Review needed</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Info</p>
                <p className="text-3xl font-semibold text-[#10b981]">{uebaEvents.filter(e => e.severity === 'INFO').length}</p>
                <p className="text-xs text-[#10b981] mt-1">Normal operations</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#10b981]" />
              </div>
            </div>
          </SleekCard>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Severity Distribution
            </h3>
            <div className="h-[220px]">
              <PieChart data={severityDistribution} />
            </div>
          </SleekCard>

          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Policy Violations
            </h3>
            <div className="h-[220px]">
              <BarChart data={policyViolations} />
            </div>
          </SleekCard>

          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Agent Activity
            </h3>
            <div className="h-[220px]">
              <BarChart data={agentActivity} />
            </div>
          </SleekCard>
        </div>

        <div className="grid grid-cols-1 mb-8">
          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Event Timeline (Last 6 Hours)
            </h3>
            <div className="h-[200px]">
              <LineChart data={eventTimeline} />
            </div>
          </SleekCard>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Threat Level
            </h3>
            <div className="text-center py-4">
              <div className="w-20 h-20 rounded-full bg-[#10b981]/10 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-10 h-10 text-[#10b981]" />
              </div>
              <p className="text-2xl font-semibold text-[#10b981]">Low</p>
              <p className="text-xs text-[#6b7280] mt-2">All systems secure</p>
            </div>
          </SleekCard>

          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Response Time
            </h3>
            <div className="text-center py-4">
              <p className="text-4xl font-semibold text-white">1.2s</p>
              <p className="text-xs text-[#6b7280] mt-2">Average detection time</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-xs text-[#10b981]">
                <TrendingDown className="w-3 h-3" />
                <span>15% faster than last week</span>
              </div>
            </div>
          </SleekCard>

          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Anomaly Detection
            </h3>
            <div className="text-center py-4">
              <p className="text-4xl font-semibold text-white">98.7%</p>
              <p className="text-xs text-[#6b7280] mt-2">Model accuracy</p>
              <div className="mt-3 text-xs text-[#10b981]">
                <span>↑ 2.3% improvement</span>
              </div>
            </div>
          </SleekCard>
        </div>

        {/* Events Timeline */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-4">Security Events</h3>
        </div>

        <SleekCard>
          <div className="space-y-3">
            {uebaEvents.slice().reverse().map((event, index) => {
              const severityStyle = getSeverityStyle(event.severity);
              const SeverityIcon = severityStyle.icon;
              
              return (
                <div 
                  key={index}
                  className={`bg-[#0a0a0a] border ${severityStyle.border} rounded-lg p-4 hover:border-[#2a2a2a] transition-colors`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${severityStyle.bg} flex items-center justify-center flex-shrink-0`}>
                      <SeverityIcon className={`w-5 h-5 ${severityStyle.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${severityStyle.color} ${severityStyle.bg}`}>
                            {event.severity}
                          </span>
                          <span className="text-xs text-[#6b7280] font-mono">
                            {event.policyId}
                          </span>
                        </div>
                        <span className="text-xs text-[#6b7280]">
                          {new Date(event.ts).toLocaleString()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-[#9ca3af]">{event.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SleekCard>
    </main>
  );
};

export default UebaPage;