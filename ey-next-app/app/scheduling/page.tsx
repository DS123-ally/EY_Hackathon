'use client';

import { SleekCard } from "@/components/ui/SleekCard";
import { HoverButton } from "@/components/ui/hover-button";
import { useAppState, useAppDispatch } from "@/core/state.tsx";
import { useRouter } from "next/navigation";
import { Calendar, Clock, CheckCircle, AlertCircle, User, Wrench, Users, BarChart3 } from "lucide-react";
import { BarChart } from "@/components/ui/BarChart";
import { PieChart } from "@/components/ui/PieChart";
import { LineChart } from "@/components/ui/LineChart";

const SchedulingPage = () => {
    const { schedule, demoState, technicians } = useAppState();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleGenerateInsights = (jobId: string) => {
        if (!demoState.insightGenerated) {
            dispatch(s => ({
                ...s,
                rcaCases: [
                    ...s.rcaCases,
                    { id: 'RCA-002', vehicleId: 'V-451', component: 'Brake Pads', status: 'Open' },
                ],
                capaActions: [
                    ...s.capaActions,
                    { id: 'CAPA-002', rcaId: 'RCA-002', action: 'Review brake pad supplier quality', status: 'Pending' },
                ],
                events: [...s.events, `Insights Agent: RCA case created for ${jobId}.`],
                demoState: { ...s.demoState, insightGenerated: true },
            }));
        }
        router.push('/rca-capa');
    };

    const getStatusStyle = (status: string) => {
      switch(status) {
        case 'Completed':
          return { color: 'text-[#10b981]', bg: 'bg-[#10b981]/10', icon: CheckCircle };
        case 'Scheduled':
          return { color: 'text-[#3b82f6]', bg: 'bg-[#3b82f6]/10', icon: Clock };
        case 'In Progress':
          return { color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10', icon: Wrench };
        default:
          return { color: 'text-[#6b7280]', bg: 'bg-[#6b7280]/10', icon: AlertCircle };
      }
    };

    // Status distribution
    const statusDistribution = [
      { name: 'Completed', value: schedule.filter(s => s.status === 'Completed').length, color: '#10b981' },
      { name: 'In Progress', value: schedule.filter(s => s.status === 'In Progress').length, color: '#f59e0b' },
      { name: 'Scheduled', value: schedule.filter(s => s.status === 'Scheduled').length, color: '#3b82f6' },
    ];

    // Technician workload
    const technicianWorkload = technicians.map(tech => ({
      name: tech.name,
      value: schedule.filter(s => s.techId === tech.id).length,
    }));

    // Service type distribution
    const serviceTypeData = [
      { name: 'Brake', value: schedule.filter(s => s.component.toLowerCase().includes('brake')).length },
      { name: 'Engine', value: schedule.filter(s => s.component.toLowerCase().includes('engine') || s.component.toLowerCase().includes('spark')).length },
      { name: 'Transmission', value: schedule.filter(s => s.component.toLowerCase().includes('transmission')).length },
      { name: 'Electrical', value: schedule.filter(s => s.component.toLowerCase().includes('battery') || s.component.toLowerCase().includes('a/c')).length },
      { name: 'Other', value: schedule.filter(s => 
        !s.component.toLowerCase().includes('brake') &&
        !s.component.toLowerCase().includes('engine') &&
        !s.component.toLowerCase().includes('transmission') &&
        !s.component.toLowerCase().includes('battery') &&
        !s.component.toLowerCase().includes('a/c') &&
        !s.component.toLowerCase().includes('spark')
      ).length },
    ];

    // Weekly schedule trend (simulated)
    const weeklyTrend = [
      { name: '6 weeks ago', value: 12 },
      { name: '5 weeks ago', value: 15 },
      { name: '4 weeks ago', value: 11 },
      { name: '3 weeks ago', value: 14 },
      { name: '2 weeks ago', value: 16 },
      { name: 'Last week', value: 13 },
      { name: 'This week', value: schedule.length },
    ];

  return (
    <main className="flex-1 flex flex-col p-8 max-w-[1800px] mx-auto w-full">
        <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white">Service Schedule</h1>
            <p className="text-sm text-[#6b7280] mt-1">Manage maintenance appointments and technician assignments</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Total Jobs</p>
                <p className="text-3xl font-semibold text-white">{schedule.length}</p>
                <p className="text-xs text-[#6b7280] mt-1">This week</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Completed</p>
                <p className="text-3xl font-semibold text-[#10b981]">{schedule.filter(s => s.status === 'Completed').length}</p>
                <p className="text-xs text-[#10b981] mt-1">
                  {schedule.length > 0 ? Math.round((schedule.filter(s => s.status === 'Completed').length / schedule.length) * 100) : 0}% completion rate
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#10b981]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">In Progress</p>
                <p className="text-3xl font-semibold text-[#f59e0b]">{schedule.filter(s => s.status === 'In Progress').length}</p>
                <p className="text-xs text-[#6b7280] mt-1">Active now</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Technicians</p>
                <p className="text-3xl font-semibold text-white">{technicians.length}</p>
                <p className="text-xs text-[#6b7280] mt-1">
                  {technicians.reduce((acc, t) => acc + t.dailyCapacity, 0)} total capacity
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
          </SleekCard>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Job Status
            </h3>
            <div className="h-[220px]">
              <PieChart data={statusDistribution} />
            </div>
          </SleekCard>

          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Technician Workload
            </h3>
            <div className="h-[220px]">
              <BarChart data={technicianWorkload} />
            </div>
          </SleekCard>

          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Service Types
            </h3>
            <div className="h-[220px]">
              <BarChart data={serviceTypeData} />
            </div>
          </SleekCard>
        </div>

        <div className="grid grid-cols-1 mb-8">
          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Weekly Schedule Trend
            </h3>
            <div className="h-[200px]">
              <LineChart data={weeklyTrend} />
            </div>
          </SleekCard>
        </div>

        {/* Technician Capacity Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Technician Capacity</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {technicians.map(tech => {
              const assignedJobs = schedule.filter(s => s.techId === tech.id).length;
              const utilization = (assignedJobs / tech.dailyCapacity) * 100;
              
              return (
                <SleekCard key={tech.id} hover>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 flex items-center justify-center mx-auto mb-3">
                      <User className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">{tech.name}</h4>
                    <p className="text-xs text-[#6b7280] mt-1">{assignedJobs} / {tech.dailyCapacity} jobs</p>
                    <div className="mt-3">
                      <div className="h-2 bg-[#1f1f1f] rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${utilization > 90 ? 'bg-[#ef4444]' : utilization > 70 ? 'bg-[#f59e0b]' : 'bg-[#10b981]'} transition-all duration-500`}
                          style={{ width: `${Math.min(utilization, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-[#6b7280] mt-1">{utilization.toFixed(0)}% utilized</p>
                    </div>
                  </div>
                </SleekCard>
              );
            })}
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-4">Scheduled Jobs</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {schedule.map(job => {
            const statusStyle = getStatusStyle(job.status);
            const StatusIcon = statusStyle.icon;
            const tech = technicians.find(t => t.id === job.techId);
            
            return (
              <SleekCard key={job.id} hover>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-[#3b82f6]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{job.id}</h3>
                        <p className="text-xs text-[#6b7280]">{job.vehicleId}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyle.color} ${statusStyle.bg} flex items-center gap-1`}>
                      <StatusIcon className="w-3 h-3" />
                      {job.status}
                    </div>
                  </div>

                  {/* Component */}
                  <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-3">
                    <p className="text-xs text-[#6b7280] mb-1">Component</p>
                    <p className="text-sm font-semibold text-white">{job.component}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-3 h-3 text-[#6b7280]" />
                        <p className="text-xs text-[#6b7280]">Date</p>
                      </div>
                      <p className="text-sm font-semibold text-white">{job.date}</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-3 h-3 text-[#6b7280]" />
                        <p className="text-xs text-[#6b7280]">Technician</p>
                      </div>
                      <p className="text-sm font-semibold text-white">{tech?.name || job.techId}</p>
                    </div>
                  </div>

                  {/* Risk Indicator */}
                  {job.risk && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-[#6b7280]">Risk Level</span>
                        <span className="text-xs text-white font-semibold">{(job.risk * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-[#1f1f1f] rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${job.risk > 0.8 ? 'bg-[#ef4444]' : job.risk > 0.5 ? 'bg-[#f59e0b]' : 'bg-[#3b82f6]'} transition-all duration-500`}
                          style={{ width: `${job.risk * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action */}
                  {job.status === 'Completed' && (
                    <div className="pt-3 border-t border-[#1f1f1f]">
                      <HoverButton 
                        onClick={() => handleGenerateInsights(job.id)}
                        className="w-full"
                      >
                        Generate Insights
                      </HoverButton>
                    </div>
                  )}
                </div>
              </SleekCard>
            );
          })}
        </div>
    </main>
  );
};

export default SchedulingPage;