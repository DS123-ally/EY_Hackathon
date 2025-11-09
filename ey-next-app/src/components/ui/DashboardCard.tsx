// ey-next-app/src/components/ui/DashboardCard.tsx
import React from 'react';

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardCard = ({ children, className = '' }: DashboardCardProps) => {
  return (
    <div className={`bg-gray-800 p-6 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default DashboardCard;
