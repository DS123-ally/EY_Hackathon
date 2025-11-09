'use client';

import { SleekCard } from "@/components/ui/SleekCard";
import { HoverButton } from "@/components/ui/hover-button";
import { useAppState } from "@/core/state.tsx";
import { Car, Activity, TrendingUp, TrendingDown, Minus, Gauge, AlertCircle, CheckCircle } from "lucide-react";
import { BarChart } from "@/components/ui/BarChart";
import { LineChart } from "@/components/ui/LineChart";
import { PieChart } from "@/components/ui/PieChart";

const VehiclesPage = () => {
    const { vehicles } = useAppState();

    const getHealthStatus = (health: number) => {
      if (health > 0.8) return { label: 'Excellent', color: 'text-[#10b981]', bg: 'bg-[#10b981]/10', icon: TrendingUp };
      if (health > 0.6) return { label: 'Good', color: 'text-[#3b82f6]', bg: 'bg-[#3b82f6]/10', icon: TrendingUp };
      if (health > 0.4) return { label: 'Fair', color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10', icon: Minus };
      return { label: 'Poor', color: 'text-[#ef4444]', bg: 'bg-[#ef4444]/10', icon: TrendingDown };
    };

    // Fleet statistics
    const avgHealth = (vehicles.reduce((acc, v) => acc + v.health, 0) / vehicles.length * 100).toFixed(1);
    const avgMileage = Math.round(vehicles.reduce((acc, v) => acc + v.mileage, 0) / vehicles.length);
    const healthyVehicles = vehicles.filter(v => v.health > 0.75).length;
    const vehiclesWithErrors = vehicles.filter(v => v.telemetry.errorCodes.length > 0).length;

    // Mileage distribution
    const mileageDistribution = [
      { name: '0-50k', value: vehicles.filter(v => v.mileage < 50000).length },
      { name: '50-75k', value: vehicles.filter(v => v.mileage >= 50000 && v.mileage < 75000).length },
      { name: '75-100k', value: vehicles.filter(v => v.mileage >= 75000 && v.mileage < 100000).length },
      { name: '100k+', value: vehicles.filter(v => v.mileage >= 100000).length },
    ];

    // Health trend (simulated)
    const healthTrend = [
      { name: '6 months ago', value: 82 },
      { name: '5 months ago', value: 81 },
      { name: '4 months ago', value: 79 },
      { name: '3 months ago', value: 78 },
      { name: '2 months ago', value: 76 },
      { name: 'Last month', value: 75 },
      { name: 'Current', value: parseFloat(avgHealth) },
    ];

    // Service status
    const serviceStatus = [
      { name: 'Up to date', value: vehicles.filter(v => {
        const lastService = new Date(v.lastServiceDate);
        const monthsAgo = (new Date().getTime() - lastService.getTime()) / (1000 * 60 * 60 * 24 * 30);
        return monthsAgo < 3;
      }).length, color: '#10b981' },
      { name: 'Due soon', value: vehicles.filter(v => {
        const lastService = new Date(v.lastServiceDate);
        const monthsAgo = (new Date().getTime() - lastService.getTime()) / (1000 * 60 * 60 * 24 * 30);
        return monthsAgo >= 3 && monthsAgo < 6;
      }).length, color: '#f59e0b' },
      { name: 'Overdue', value: vehicles.filter(v => {
        const lastService = new Date(v.lastServiceDate);
        const monthsAgo = (new Date().getTime() - lastService.getTime()) / (1000 * 60 * 60 * 24 * 30);
        return monthsAgo >= 6;
      }).length, color: '#ef4444' },
    ];

  return (
    <main className="flex-1 flex flex-col p-8 max-w-[1800px] mx-auto w-full">
        <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white">Fleet Vehicles</h1>
            <p className="text-sm text-[#6b7280] mt-1">Monitor and manage your entire vehicle fleet</p>
        </div>

        {/* Fleet Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Total Fleet</p>
                <p className="text-3xl font-semibold text-white">{vehicles.length}</p>
                <p className="text-xs text-[#10b981] mt-1">{healthyVehicles} in good condition</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                <Car className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Avg Health</p>
                <p className="text-3xl font-semibold text-white">{avgHealth}%</p>
                <p className="text-xs text-[#6b7280] mt-1">Fleet average</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#10b981]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Avg Mileage</p>
                <p className="text-3xl font-semibold text-white">{avgMileage.toLocaleString()}</p>
                <p className="text-xs text-[#6b7280] mt-1">miles</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                <Gauge className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
          </SleekCard>

          <SleekCard hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Active Alerts</p>
                <p className="text-3xl font-semibold text-white">{vehiclesWithErrors}</p>
                <p className="text-xs text-[#ef4444] mt-1">Require attention</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#ef4444]/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[#ef4444]" />
              </div>
            </div>
          </SleekCard>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <SleekCard className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Fleet Health Trend
            </h3>
            <div className="h-[220px]">
              <LineChart data={healthTrend} />
            </div>
          </SleekCard>

          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Service Status
            </h3>
            <div className="h-[220px]">
              <PieChart data={serviceStatus} />
            </div>
          </SleekCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <SleekCard>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Mileage Distribution
            </h3>
            <div className="h-[180px]">
              <BarChart data={mileageDistribution} />
            </div>
          </SleekCard>

          <SleekCard className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Fleet Overview
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-[#10b981] mx-auto mb-2" />
                <p className="text-2xl font-semibold text-white">{vehicles.filter(v => v.health > 0.8).length}</p>
                <p className="text-xs text-[#6b7280] mt-1">Excellent</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4 text-center">
                <Activity className="w-8 h-8 text-[#3b82f6] mx-auto mb-2" />
                <p className="text-2xl font-semibold text-white">{vehicles.filter(v => v.health > 0.6 && v.health <= 0.8).length}</p>
                <p className="text-xs text-[#6b7280] mt-1">Good</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4 text-center">
                <AlertCircle className="w-8 h-8 text-[#f59e0b] mx-auto mb-2" />
                <p className="text-2xl font-semibold text-white">{vehicles.filter(v => v.health > 0.4 && v.health <= 0.6).length}</p>
                <p className="text-xs text-[#6b7280] mt-1">Fair</p>
              </div>
            </div>
          </SleekCard>
        </div>

        {/* Vehicle Cards */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-4">Individual Vehicles</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {vehicles.map(vehicle => {
            const healthStatus = getHealthStatus(vehicle.health);
            const HealthIcon = healthStatus.icon;
            
            return (
              <SleekCard key={vehicle.id} hover>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                        <Car className="w-5 h-5 text-[#3b82f6]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{vehicle.id}</h3>
                        <p className="text-xs text-[#6b7280] font-mono">{vehicle.vin}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-xs font-medium ${healthStatus.color} ${healthStatus.bg} flex items-center gap-1`}>
                      <HealthIcon className="w-3 h-3" />
                      {healthStatus.label}
                    </div>
                  </div>

                  {/* Health Bar */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-[#6b7280]">Health Score</span>
                      <span className="text-xs text-white font-semibold">{(vehicle.health * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-[#1f1f1f] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${healthStatus.color.replace('text-', 'bg-')} transition-all duration-500`}
                        style={{ width: `${vehicle.health * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-3">
                      <p className="text-xs text-[#6b7280] mb-1">Mileage</p>
                      <p className="text-sm font-semibold text-white">{vehicle.mileage.toLocaleString()} mi</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-3">
                      <p className="text-xs text-[#6b7280] mb-1">Last Service</p>
                      <p className="text-sm font-semibold text-white">{vehicle.lastServiceDate}</p>
                    </div>
                  </div>

                  {/* Telemetry */}
                  <div className="pt-3 border-t border-[#1f1f1f] space-y-2">
                    <p className="text-xs text-[#6b7280] uppercase tracking-wide">Telemetry</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#9ca3af]">Battery</span>
                      <span className="text-white font-medium">{vehicle.telemetry.batteryVolts}V</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#9ca3af]">Brake Temp</span>
                      <span className="text-white font-medium">{vehicle.telemetry.brakeTemp}°F</span>
                    </div>
                    {vehicle.telemetry.errorCodes.length > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#ef4444]">Error Codes</span>
                        <span className="text-[#ef4444] font-mono text-xs">{vehicle.telemetry.errorCodes.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3">
                    <HoverButton className="w-full">View Details</HoverButton>
                  </div>
                </div>
              </SleekCard>
            );
          })}
        </div>
    </main>
  );
};

export default VehiclesPage;