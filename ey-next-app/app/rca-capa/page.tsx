'use client';

import { SleekCard } from "@/components/ui/SleekCard";
import { useAppState } from "@/core/state";
import { FileSearch, CheckCircle, Clock, XCircle, Target, TrendingUp } from "lucide-react";

const InsightsPage = () => {
    const { rcaCases, capaActions } = useAppState();

    const getStatusStyle = (status: string) => {
      switch(status) {
        case 'Closed':
        case 'Completed':
          return { color: 'text-[#10b981]', bg: 'bg-[#10b981]/10', icon: CheckCircle };
        case 'Open':
        case 'Pending':
          return { color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10', icon: Clock };
        default:
          return { color: 'text-[#6b7280]', bg: 'bg-[#6b7280]/10', icon: XCircle };
      }
    };

  return (
    <main className="flex-1 flex flex-col p-8 max-w-[1800px] mx-auto w-full">
        <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white">Manufacturing Insights</h1>
            <p className="text-sm text-[#6b7280] mt-1">Root Cause Analysis & Corrective Actions</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-4">
            <p className="text-xs text-[#6b7280] mb-1">Total RCA Cases</p>
            <p className="text-2xl font-semibold text-white">{rcaCases.length}</p>
          </div>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-4">
            <p className="text-xs text-[#6b7280] mb-1">Open Cases</p>
            <p className="text-2xl font-semibold text-[#f59e0b]">{rcaCases.filter(c => c.status === 'Open').length}</p>
          </div>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-4">
            <p className="text-xs text-[#6b7280] mb-1">Total CAPA</p>
            <p className="text-2xl font-semibold text-white">{capaActions.length}</p>
          </div>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-4">
            <p className="text-xs text-[#6b7280] mb-1">Completion Rate</p>
            <p className="text-2xl font-semibold text-[#10b981]">
              {capaActions.length > 0 ? Math.round((capaActions.filter(a => a.status === 'Completed').length / capaActions.length) * 100) : 0}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* RCA Cases */}
          <SleekCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">RCA Cases</h3>
              <FileSearch className="w-5 h-5 text-[#6b7280]" />
            </div>
            
            <div className="space-y-3">
              {rcaCases.map(rcaCase => {
                const statusStyle = getStatusStyle(rcaCase.status);
                const StatusIcon = statusStyle.icon;
                
                return (
                  <div 
                    key={rcaCase.id}
                    className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4 hover:border-[#2a2a2a] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                          <FileSearch className="w-4 h-4 text-[#3b82f6]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{rcaCase.id}</h4>
                          <p className="text-xs text-[#6b7280]">{rcaCase.vehicleId}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle.color} ${statusStyle.bg} flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {rcaCase.status}
                      </div>
                    </div>
                    
                    <div className="pl-11">
                      <p className="text-sm text-[#9ca3af]">Component: <span className="text-white font-medium">{rcaCase.component}</span></p>
                    </div>
                  </div>
                );
              })}
            </div>

            {rcaCases.length === 0 && (
              <div className="text-center py-12">
                <FileSearch className="w-12 h-12 text-[#6b7280] mx-auto mb-4" />
                <p className="text-sm text-[#6b7280]">No RCA cases</p>
              </div>
            )}
          </SleekCard>

          {/* CAPA Actions */}
          <SleekCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">CAPA Actions</h3>
              <Target className="w-5 h-5 text-[#6b7280]" />
            </div>
            
            <div className="space-y-3">
              {capaActions.map(capaAction => {
                const statusStyle = getStatusStyle(capaAction.status);
                const StatusIcon = statusStyle.icon;
                
                return (
                  <div 
                    key={capaAction.id}
                    className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4 hover:border-[#2a2a2a] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#10b981]/10 flex items-center justify-center">
                          <Target className="w-4 h-4 text-[#10b981]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{capaAction.id}</h4>
                          <p className="text-xs text-[#6b7280]">RCA: {capaAction.rcaId}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle.color} ${statusStyle.bg} flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {capaAction.status}
                      </div>
                    </div>
                    
                    <div className="pl-11">
                      <p className="text-sm text-[#9ca3af]">{capaAction.action}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {capaActions.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-[#6b7280] mx-auto mb-4" />
                <p className="text-sm text-[#6b7280]">No CAPA actions</p>
              </div>
            )}
          </SleekCard>
        </div>

        {/* Insights Section */}
        {(rcaCases.length > 0 || capaActions.length > 0) && (
          <SleekCard className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Key Insights</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4">
                <p className="text-xs text-[#6b7280] mb-2">Most Common Component</p>
                <p className="text-lg font-semibold text-white">Brake System</p>
                <p className="text-xs text-[#10b981] mt-1">↑ 23% this month</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4">
                <p className="text-xs text-[#6b7280] mb-2">Avg Resolution Time</p>
                <p className="text-lg font-semibold text-white">3.5 days</p>
                <p className="text-xs text-[#10b981] mt-1">↓ 12% faster</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4">
                <p className="text-xs text-[#6b7280] mb-2">Prevention Impact</p>
                <p className="text-lg font-semibold text-white">$24,500</p>
                <p className="text-xs text-[#10b981] mt-1">Cost savings</p>
              </div>
            </div>
          </SleekCard>
        )}
    </main>
  );
};

export default InsightsPage;