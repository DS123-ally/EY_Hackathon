'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of the application state
export interface AppState {
  vehicles: any[];
  technicians: any[];
  schedule: any[];
  predictions: any[];
  rcaCases: any[];
  capaActions: any[];
  events: string[];
  uebaEvents: any[];
  demoState: {
    predictionGenerated: boolean;
    customerContacted: boolean;
    appointmentScheduled: boolean;
    insightGenerated: boolean;
    anomalySimulated: boolean;
  };
}

// Create a context for the application state
const AppStateContext = createContext<AppState | undefined>(undefined);

// Create a context for updating the application state
const AppDispatchContext = createContext<React.Dispatch<React.SetStateAction<AppState>> | undefined>(undefined);

export const seedMockData = (setState: React.Dispatch<React.SetStateAction<AppState>>) => {
    const today = new Date().toISOString().slice(0, 10);
    const getRandomDate = (daysAgo: number) => {
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return date.toISOString().slice(0, 10);
    };
    
    const vehicles = [
      { id: 'V-101', vin: '1FTFW1E55JKD12345', mileage: 58210, lastServiceDate: '2025-06-15', health: 0.78, telemetry: { batteryVolts: 12.1, brakeTemp: 240, errorCodes: [] } },
      { id: 'V-205', vin: '2C4RC1BG3KR123456', mileage: 121330, lastServiceDate: '2025-03-03', health: 0.62, telemetry: { batteryVolts: 11.6, brakeTemp: 320, errorCodes: ['P0420'] } },
      { id: 'V-330', vin: '3GNAXHEV8LS123456', mileage: 40220, lastServiceDate: '2025-08-22', health: 0.9, telemetry: { batteryVolts: 12.5, brakeTemp: 180, errorCodes: [] } },
      { id: 'V-451', vin: '1GNSCBE07HR123456', mileage: 89450, lastServiceDate: '2025-01-10', health: 0.71, telemetry: { batteryVolts: 12.2, brakeTemp: 280, errorCodes: ['P0300'] } },
      { id: 'V-512', vin: '5FNRL5H64GB123456', mileage: 72340, lastServiceDate: '2025-07-20', health: 0.85, telemetry: { batteryVolts: 12.4, brakeTemp: 210, errorCodes: [] } },
      { id: 'V-627', vin: '1HGBH41JXMN123456', mileage: 95670, lastServiceDate: '2025-05-12', health: 0.68, telemetry: { batteryVolts: 11.8, brakeTemp: 295, errorCodes: ['P0171', 'P0174'] } },
      { id: 'V-738', vin: '2HKRM4H76DH123456', mileage: 34560, lastServiceDate: '2025-09-01', health: 0.94, telemetry: { batteryVolts: 12.6, brakeTemp: 170, errorCodes: [] } },
      { id: 'V-849', vin: 'JN1CV6AP9CM123456', mileage: 108920, lastServiceDate: '2025-04-18', health: 0.59, telemetry: { batteryVolts: 11.5, brakeTemp: 335, errorCodes: ['P0455'] } },
      { id: 'V-950', vin: 'WBADT43452G123456', mileage: 45780, lastServiceDate: '2025-08-05', health: 0.88, telemetry: { batteryVolts: 12.3, brakeTemp: 195, errorCodes: [] } },
      { id: 'V-1051', vin: '1G1YY22G245123456', mileage: 67890, lastServiceDate: '2025-06-28', health: 0.76, telemetry: { batteryVolts: 12.0, brakeTemp: 255, errorCodes: [] } },
      { id: 'V-1152', vin: '3FADP4BJ0DM123456', mileage: 82340, lastServiceDate: '2025-05-22', health: 0.72, telemetry: { batteryVolts: 11.9, brakeTemp: 270, errorCodes: ['P0301'] } },
      { id: 'V-1253', vin: '1C4RJFBG5EC123456', mileage: 54210, lastServiceDate: '2025-07-15', health: 0.82, telemetry: { batteryVolts: 12.2, brakeTemp: 225, errorCodes: [] } },
    ];
    
    const technicians = [
      { id: 'T-1', name: 'A. Sharma', dailyCapacity: 4 },
      { id: 'T-2', name: 'B. Patel', dailyCapacity: 3 },
      { id: 'T-3', name: 'C. Singh', dailyCapacity: 5 },
      { id: 'T-4', name: 'D. Kumar', dailyCapacity: 4 },
      { id: 'T-5', name: 'E. Mehta', dailyCapacity: 3 },
    ];
    
    const schedule = [
      { id: 'JOB-0001', vehicleId: 'V-101', component: 'Oil System', date: getRandomDate(5), techId: 'T-1', status: 'Completed', risk: 0.3 },
      { id: 'JOB-0002', vehicleId: 'V-330', component: 'Tire Rotation', date: getRandomDate(3), techId: 'T-2', status: 'Completed', risk: 0.2 },
      { id: 'JOB-0003', vehicleId: 'V-512', component: 'Brake Inspection', date: today, techId: 'T-3', status: 'Scheduled', risk: 0.5 },
      { id: 'JOB-0004', vehicleId: 'V-205', component: 'Engine Diagnostic', date: today, techId: 'T-1', status: 'In Progress', risk: 0.75 },
      { id: 'JOB-0005', vehicleId: 'V-738', component: 'Battery Check', date: getRandomDate(1), techId: 'T-4', status: 'Completed', risk: 0.15 },
      { id: 'JOB-0006', vehicleId: 'V-849', component: 'Transmission Service', date: today, techId: 'T-2', status: 'Scheduled', risk: 0.82 },
      { id: 'JOB-0007', vehicleId: 'V-1051', component: 'A/C Service', date: getRandomDate(2), techId: 'T-5', status: 'Completed', risk: 0.35 },
      { id: 'JOB-0008', vehicleId: 'V-1152', component: 'Spark Plug Replacement', date: today, techId: 'T-3', status: 'Scheduled', risk: 0.68 },
    ];
    
    const predictions = [
      { vehicleId: 'V-205', component: 'Catalytic Converter', risk: 0.85, confidence: 0.92, etaDays: 14 },
      { vehicleId: 'V-451', component: 'Brake Pads', risk: 0.92, confidence: 0.95, etaDays: 7 },
      { vehicleId: 'V-627', component: 'Fuel System', risk: 0.78, confidence: 0.88, etaDays: 21 },
      { vehicleId: 'V-849', component: 'Transmission', risk: 0.88, confidence: 0.91, etaDays: 10 },
      { vehicleId: 'V-1152', component: 'Ignition Coil', risk: 0.73, confidence: 0.85, etaDays: 18 },
      { vehicleId: 'V-1051', component: 'Alternator', risk: 0.65, confidence: 0.82, etaDays: 25 },
      { vehicleId: 'V-512', component: 'Suspension', risk: 0.58, confidence: 0.79, etaDays: 30 },
      { vehicleId: 'V-101', component: 'Cooling System', risk: 0.71, confidence: 0.86, etaDays: 16 },
    ];
    
    const rcaCases = [
      { id: 'RCA-001', vehicleId: 'V-101', component: 'Oil System', status: 'Closed' },
      { id: 'RCA-002', vehicleId: 'V-205', component: 'Catalytic Converter', status: 'Open' },
      { id: 'RCA-003', vehicleId: 'V-627', component: 'Fuel Injectors', status: 'Open' },
      { id: 'RCA-004', vehicleId: 'V-330', component: 'Tire Wear Pattern', status: 'Closed' },
      { id: 'RCA-005', vehicleId: 'V-849', component: 'Transmission Fluid', status: 'Open' },
    ];
    
    const capaActions = [
      { id: 'CAPA-001', rcaId: 'RCA-001', action: 'Update oil change interval from 5000 to 4000 miles', status: 'Completed' },
      { id: 'CAPA-002', rcaId: 'RCA-002', action: 'Review catalytic converter supplier quality standards', status: 'Pending' },
      { id: 'CAPA-003', rcaId: 'RCA-003', action: 'Implement enhanced fuel quality monitoring', status: 'Pending' },
      { id: 'CAPA-004', rcaId: 'RCA-004', action: 'Adjust tire rotation schedule for fleet vehicles', status: 'Completed' },
      { id: 'CAPA-005', rcaId: 'RCA-005', action: 'Evaluate transmission fluid change intervals', status: 'In Progress' },
      { id: 'CAPA-006', rcaId: 'RCA-002', action: 'Train technicians on emissions system diagnostics', status: 'Pending' },
    ];
    
    const uebaEvents = [
      { ts: new Date(Date.now() - 3600000).toISOString(), policyId: 'AGENT-LOGIN', severity: 'INFO', detail: 'MasterAgent logged in successfully.' },
      { ts: new Date(Date.now() - 7200000).toISOString(), policyId: 'DATA-ACCESS', severity: 'INFO', detail: 'Prediction Agent accessed vehicle telemetry data.' },
      { ts: new Date(Date.now() - 10800000).toISOString(), policyId: 'SCHEDULE-UPDATE', severity: 'INFO', detail: 'Scheduling Agent updated maintenance schedule.' },
      { ts: new Date(Date.now() - 14400000).toISOString(), policyId: 'RATE-LIMIT', severity: 'MEDIUM', detail: 'Communication Agent exceeded API rate limit (recovered).' },
      { ts: new Date(Date.now() - 18000000).toISOString(), policyId: 'DATA-ACCESS', severity: 'INFO', detail: 'RCA Agent queried historical maintenance records.' },
    ];
    
    setState({
        vehicles,
        technicians,
        schedule,
        predictions,
        rcaCases,
        capaActions,
        events: [
          'System Initialized',
          'Prediction Agent: Analyzing vehicle telemetry data...',
          'Prediction Agent: 8 potential failures identified.',
          'Scheduling Agent: Optimizing technician assignments...',
          'RCA Agent: Reviewing completed service records.',
        ],
        uebaEvents,
        demoState: {
            predictionGenerated: false,
            customerContacted: false,
            appointmentScheduled: false,
            insightGenerated: false,
            anomalySimulated: false,
        },
    });
}


// Create a provider component to wrap the application and provide the state
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    vehicles: [],
    technicians: [],
    schedule: [],
    predictions: [],
    rcaCases: [],
    capaActions: [],
    events: [],
    uebaEvents: [],
    demoState: {
        predictionGenerated: false,
        customerContacted: false,
        appointmentScheduled: false,
        insightGenerated: false,
        anomalySimulated: false,
    },
  });

  useEffect(() => {
    seedMockData(setState);
  }, []);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={setState}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

// Custom hook to access the application state
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};

// Custom hook to update the application state
export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within an AppProvider');
  }
  return context;
};