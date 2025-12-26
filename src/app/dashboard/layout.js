'use client';
import AdminDashboardSidebar from "@/components/dashboard/Sidebar"; // your existing sidebar
// import DashboardNavbar from "@/components/dashboard/DashboardNavbar"; // optional top navbar for dashboard

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      {/* <AdminDashboardSidebar /> */}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* <DashboardNavbar /> */}
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
