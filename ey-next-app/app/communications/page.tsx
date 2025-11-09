'use client';

import { SleekCard } from "@/components/ui/SleekCard";
import { HoverButton } from "@/components/ui/hover-button";
import { useAppState, useAppDispatch } from "@/core/state.tsx";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle, User, Bot, Calendar } from "lucide-react";

const EngagementPage = () => {
    const { demoState } = useAppState();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleScheduleService = () => {
        if (!demoState.appointmentScheduled) {
            const today = new Date().toISOString().slice(0, 10);
            dispatch(s => ({
                ...s,
                schedule: [
                    ...s.schedule,
                    { id: 'JOB-0002', vehicleId: 'V-451', component: 'Brake Pads', date: today, techId: 'T-2', status: 'Scheduled', risk: 0.95 },
                ],
                events: [...s.events, 'Scheduling Agent: Service for V-451 scheduled.'],
                demoState: { ...s.demoState, appointmentScheduled: true },
            }));
        }
        router.push('/scheduling');
    };

    const chatMessages = [
        { from: 'agent', text: "Hello, this is an automated message from your vehicle's monitoring system. We've detected a high risk of failure in the brake pads of your vehicle (V-451). We recommend scheduling a service appointment as soon as possible.", time: "10:24 AM" },
        { from: 'customer', text: "Oh, wow. Thanks for letting me know. Yes, let's schedule that.", time: "10:26 AM" },
        { from: 'agent', text: "Great. I have an opening tomorrow at 10 AM. Does that work for you?", time: "10:26 AM" },
        { from: 'customer', text: "Yes, that's perfect.", time: "10:27 AM" },
    ];

  return (
    <main className="flex-1 flex flex-col p-8 max-w-[1200px] mx-auto w-full">
        <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white">Customer Engagement</h1>
            <p className="text-sm text-[#6b7280] mt-1">AI-powered customer communication</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation */}
          <SleekCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1f1f1f]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#3b82f6]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Owner of V-451</h3>
                  <p className="text-xs text-[#6b7280]">Active conversation</p>
                </div>
              </div>
              <MessageCircle className="w-5 h-5 text-[#6b7280]" />
            </div>

            <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2">
              {chatMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`flex gap-3 ${message.from === 'customer' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.from === 'agent' ? 'bg-[#10b981]/10' : 'bg-[#3b82f6]/10'
                  }`}>
                    {message.from === 'agent' ? (
                      <Bot className={`w-4 h-4 text-[#10b981]`} />
                    ) : (
                      <User className={`w-4 h-4 text-[#3b82f6]`} />
                    )}
                  </div>
                  
                  <div className={`flex-1 ${message.from === 'customer' ? 'flex flex-col items-end' : ''}`}>
                    <div className={`${
                      message.from === 'agent' 
                        ? 'bg-[#0a0a0a] border border-[#1f1f1f]' 
                        : 'bg-[#3b82f6]/10 border border-[#3b82f6]/20'
                    } p-3 rounded-lg max-w-[85%]`}>
                      <p className="text-sm text-[#e5e7eb]">{message.text}</p>
                    </div>
                    <span className="text-xs text-[#6b7280] mt-1">{message.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#1f1f1f]">
              <HoverButton onClick={handleScheduleService} className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Service Appointment
              </HoverButton>
            </div>
          </SleekCard>

          {/* Info Panel */}
          <div className="space-y-6">
            <SleekCard>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Vehicle Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Vehicle ID</p>
                  <p className="text-sm font-semibold text-white">V-451</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Component</p>
                  <p className="text-sm font-semibold text-white">Brake Pads</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Risk Level</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[#1f1f1f] rounded-full overflow-hidden">
                      <div className="h-full bg-[#ef4444] w-[95%]" />
                    </div>
                    <span className="text-sm font-semibold text-[#ef4444]">95%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Time to Failure</p>
                  <p className="text-sm font-semibold text-white">5 days</p>
                </div>
              </div>
            </SleekCard>

            <SleekCard>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Engagement Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#6b7280]">Response Time</span>
                  <span className="text-sm font-semibold text-white">2 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#6b7280]">Messages Sent</span>
                  <span className="text-sm font-semibold text-white">{chatMessages.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#6b7280]">Status</span>
                  <span className="text-xs px-2 py-1 rounded-md bg-[#10b981]/10 text-[#10b981] font-medium">Active</span>
                </div>
              </div>
            </SleekCard>
          </div>
        </div>
    </main>
  );
};

export default EngagementPage;