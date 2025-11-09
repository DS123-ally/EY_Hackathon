// ey-next-app/src/components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col border-r border-gray-700">
      <div className="flex items-center mb-8">
        {/* You can replace this with your logo */}
        <div className="w-8 h-8 bg-purple-600 rounded-full mr-3"></div>
        <h2 className="text-xl font-semibold">FleetWatch</h2>
      </div>
      <nav className="flex flex-col space-y-2">
        <Link href="/" className="p-2 rounded-md hover:bg-gray-700">Dashboard</Link>
        <Link href="/vehicles" className="p-2 rounded-md hover:bg-gray-700">Vehicles</Link>
        <Link href="/predictions" className="p-2 rounded-md hover:bg-gray-700">Predictions</Link>
        <Link href="/scheduling" className="p-2 rounded-md hover:bg-gray-700">Scheduling</Link>
        <Link href="/rca-capa" className="p-2 rounded-md hover:bg-gray-700">RCA/CAPA</Link>
        <Link href="/ueba" className="p-2 rounded-md hover:bg-gray-700">UEBA</Link>
        <Link href="/communications" className="p-2 rounded-md hover:bg-gray-700">Communications</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
