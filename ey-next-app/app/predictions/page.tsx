'use client';

import { SleekCard } from "@/components/ui/SleekCard";
import { HoverButton } from "@/components/ui/hover-button";
import { useAppState, useAppDispatch } from "@/core/state.tsx";
import { useRouter } from "next/navigation";
import { AlertTriangle, TrendingUp, Clock, Target, Brain, TrendingDown } from "lucide-react";
import { BarChart } from "@/components/ui/BarChart";
import { LineChart } from "@/components/ui/LineChart";
import { PieChart } from "@/components/ui/PieChart";

const PredictionsPage = () => {
    const { predictions, demoState } = useAppState();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleEngageCustomer = (vehicleId: string) => {
        if (!demoState.customerContacted) {
            dispatch(s => ({
                ...s,
                events: [...s.events, `Engagement Agent: Initiating contact with owner of ${vehicleId}.`],
                demoState: { ...s.demoState, customerContacted: true },
            }));
        }
        router.push('/communications');
    };

    const getRiskLevel = (risk: number) => {
      if (risk > 0.8) return { label: 'Critical', color: 'text-[#ef4444]', bg: 'bg-[#ef4444]/10' };
      if (risk > 0.5) return { label: 'High', color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10' };
      return { label: 'Medium', color: 'text-[#3b82f6]', bg: 'bg-[#3b82f6]/10' };
    };

    // Risk distribution by severity
    const riskDistribution = [
      { name: 'Critical (>80%)', value: predictions.filter(p => p.risk > 0.8).length, color: '#ef4444' },
      { name: 'High (50-80%)', value: predictions.filter(p => p.risk > 0.5 && p.risk <= 0.8).length, color: '#f59e0b' },
      { name: 'Medium (<50%)', value: predictions.filter(p => p.risk <= 0.5).length, color: '#3b82f6' },
    ];

    // Component failure distribution
    const componentDistribution = [
      { name: 'Brakes', value: predictions.filter(p => p.component.toLowerCase().includes('brake')).length },
      { name: 'Engine', value: predictions.filter(p => p.component.toLowerCase().includes('engine') || p.component.toLowerCase().includes('ignition') || p.component.toLowerCase().includes('spark')).length },
      { name: 'Transmission', value: predictions.filter(p => p.component.toLowerCase().includes('transmission')).length },
      { name: 'Electrical', value: predictions.filter(p => p.component.toLowerCase().includes('alternator') || p.component.toLowerCase().includes('battery')).length },
      { name: 'Other', value: predictions.filter(p => 
        !p.component.toLowerCase().includes('brake') &&
        !p.component.toLowerCase().includes('engine') &&
        !p.component.toLowerCase().includes('transmission') &&
        !p.component.toLowerCase().includes('alternator') &&
        !p.component.toLowerCase().includes('battery') &&
        !p.component.toLowerCase().includes('ignition') &&
        !p.component.toLowerCase().includes('spark')
      ).length },
    ];

    // Prediction timeline (ETA distribution)
    const timelineDistribution = [
      { name: '0-7 days', value: predictions.filter(p => p.etaDays <= 7).length },
      { name: '8-14 days', value: predictions.filter(p => p.etaDays > 7 && p.etaDays <= 14).length },
      { name: '15-21 days', value: predictions.filter(p => p.etaDays > 14 && p.etaDays <= 21).length },
      { name: '22-30 days', value: predictions.filter(p => p.etaDays > 21 && p.etaDays <= 30).length },
    ];

    // Prediction accuracy trend (simulated historical data)
    const accuracyTrend = [
      { name: '6 months', value: 82 },
      { name: '5 months', value: 85 },
      { name: '4 months', value: 87 },
      { name: '3 months', value: 89 },
      { name: '2 months', value: 91 },
      { name: 'Last month', value: 92 },
      { name: 'Current', value: predictions.length > 0 ? (predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length * 100) : 90 },
    ];

  return (
    <main className="flex-1 flex flex-col p-8 max-w-[1800px] mx-auto w-full">
        <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white">Failure Predictions</h1>
            <p className="text-sm text-[#6b7280] mt-1">AI-powered predictive maintenance alerts</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Total Predictions</p>
                <p className="text-3xl font-semibold text-white">{predictions.length}</p>
                <p className="text-xs text-[#6b7280] mt-1">Active alerts</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Critical Risk</p>
                <p className="text-3xl font-semibold text-[#ef4444]">{predictions.filter(p => p.risk > 0.8).length}</p>
                <p className="text-xs text-[#ef4444] mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Immediate action needed
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#ef4444]/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[#ef4444]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Avg Confidence</p>
                <p className="text-3xl font-semibold text-white">
                  {predictions.length > 0 ? ((predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length) * 100).toFixed(0) : 0}%
                </p>
                <p className="text-xs text-[#10b981] mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  High accuracy
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-[#10b981]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Next Failure</p>
                <p className="text-3xl font-semibold text-white">
                  {predictions.length > 0 ? Math.min(...predictions.map(p => p.etaDays)) : 0}
                </p>
                <p className="text-xs text-[#6b7280] mt-1">days</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
          </SleekCard>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Risk Distribution
            </h3>
            <div className="h-[220px]">
              <PieChart data={riskDistribution} />
            </div>
          </SleekCard>

          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Component Analysis
            </h3>
            <div className="h-[220px]">
              <BarChart data={componentDistribution} />
            </div>
          </SleekCard>

          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Failure Timeline
            </h3>
            <div className="h-[220px]">
              <BarChart data={timelineDistribution} />
            </div>
          </SleekCard>
        </div>

        <div className="grid grid-cols-1 mb-8">
          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Model Accuracy Trend
            </h3>
            <div className="h-[200px]">
              <LineChart data={accuracyTrend} />
            </div>
          </SleekCard>
        </div>

        {/* Predictions Grid */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-4">Individual Predictions</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {predictions.map((prediction, index) => {
            const riskLevel = getRiskLevel(prediction.risk);
            
            return (
              <SleekCard key={index} hover>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${riskLevel.bg} flex items-center justify-center`}>
                        <AlertTriangle className={`w-5 h-5 ${riskLevel.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{prediction.vehicleId}</h3>
                        <p className="text-sm text-[#9ca3af]">{prediction.component}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-xs font-medium ${riskLevel.color} ${riskLevel.bg}`}>
                      {riskLevel.label}
                    </div>
                  </div>

                  {/* Risk Score */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-[#6b7280]">Risk Score</span>
                      <span className="text-xs text-white font-semibold">{(prediction.risk * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-[#1f1f1f] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${riskLevel.color.replace('text-', 'bg-')} transition-all duration-500`}
                        style={{ width: `${prediction.risk * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-3 h-3 text-[#6b7280]" />
                        <p className="text-xs text-[#6b7280]">Confidence</p>
                      </div>
                      <p className="text-lg font-semibold text-white">{(prediction.confidence * 100).toFixed(0)}%</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3 h-3 text-[#6b7280]" />
                        <p className="text-xs text-[#6b7280]">Time to Failure</p>
                      </div>
                      <p className="text-lg font-semibold text-white">{prediction.etaDays} days</p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-3 border-t border-[#1f1f1f]">
                    <HoverButton 
                      onClick={() => handleEngageCustomer(prediction.vehicleId)}
                      className="w-full"
                    >
                      Engage Customer
                    </HoverButton>
                  </div>
                </div>
              </SleekCard>
            );
          })}
        </div>
    </main>
  );
};

export default PredictionsPage;