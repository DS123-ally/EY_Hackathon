
'use client';

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useAppState } from "@/core/state";

const VehiclesPage = () => {
    const { vehicles } = useAppState();

  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <section className="p-4 lg:p-6 space-y-6">
          <div className="relative z-10 w-full">
            <div className="backdrop-blur-2xl bg-white/10 dark:bg-black/40 border-t border-l border-white/20 dark:border-white/10 rounded-[32px] shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent pointer-events-none rounded-[32px]" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-4">Vehicles</h2>
                <div className="overflow-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-left text-white/70">
                      <tr>
                        <th className="px-3 py-2">ID</th>
                        <th className="px-3 py-2">VIN</th>
                        <th className="px-3 py-2">Mileage</th>
                        <th className="px-3 py-2">Last Service</th>
                        <th className="px-3 py-2">Health</th>
                        <th className="px-3 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {vehicles.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td className="px-3 py-4">{vehicle.id}</td>
                                <td className="px-3 py-4">{vehicle.vin}</td>
                                <td className="px-3 py-4">{vehicle.mileage}</td>
                                <td className="px-3 py-4">{vehicle.lastServiceDate}</td>
                                <td className="px-3 py-4">{vehicle.health}</td>
                                <td className="px-3 py-4">
                                    <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium border border-white/20 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_rgba(128,0,128,0.8)]">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default VehiclesPage;
