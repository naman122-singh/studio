
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

export type DeviceMode = 'mobile' | 'tablet' | 'desktop';

export const deviceModes = {
  mobile: { name: 'Mobile', width: '414px', icon: <Smartphone /> },
  tablet: { name: 'Tablet', width: '820px', icon: <Tablet /> },
  desktop: { name: 'Desktop', width: '100%', icon: <Monitor /> },
};

interface DevicePreviewContextType {
  device: DeviceMode;
  setDevice: (device: DeviceMode) => void;
  width: string;
}

const DevicePreviewContext = createContext<DevicePreviewContextType | undefined>(undefined);

export function DevicePreviewProvider({ children }: { children: ReactNode }) {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const width = deviceModes[device].width;

  return (
    <DevicePreviewContext.Provider value={{ device, setDevice, width }}>
      {children}
    </DevicePreviewContext.Provider>
  );
}

export function useDevicePreview() {
  const context = useContext(DevicePreviewContext);
  if (context === undefined) {
    throw new Error('useDevicePreview must be used within a DevicePreviewProvider');
  }
  return context;
}
