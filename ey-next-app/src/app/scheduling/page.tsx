
'use client';

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useAppState } from "@/core/state";

const SchedulingPage = () => {
    const { schedule } = useAppState();

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
                <h2 className="text-2xl font-bold text-white mb-4">Service Schedule</h2>
                <div className="overflow-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-left text-white/70">
                      <tr>
                        <th className="px-3 py-2">Job ID</th>
                        <th className="px-3 py-2">Vehicle ID</th>
                        <th className="px-3 py-2">Component</th>
                        <th className="px-3 py-2">Date</th>
                        <th className="px-3 py-2">Technician</th>
                        <th className="px-3 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {schedule.map(job => (
                            <tr key={job.id}>
                                <td className="px-3 py-4">{job.id}</td>
                                <td className="px-3 py-4">{job.vehicleId}</td>
                                <td className="px-3 py-4">{job.component}</td>
                                <td className="px-3 py-4">{job.date}</td>
                                <td className="px-3 py-4">{job.techId}</td>
                                <td className="px-3 py-4">{job.status}</td>
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

export default SchedulingPage;
