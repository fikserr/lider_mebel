import { Suspense, lazy } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// Lazy components
const AppSidebar = lazy(() =>
  import("@/components/shared/app-sidebar").then((m) => ({ default: m.AppSidebar }))
);
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster }))
);

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      {/* Sidebar lazy */}
      <Suspense fallback={<div className="p-4">Sidebar yuklanmoqda...</div>}>
        <AppSidebar />
      </Suspense>

      <main className="min-h-screen flex flex-col transition-all duration-300">
        <header className="sticky top-0 z-50 bg-white shadow-sm flex items-center px-4 py-2">
          <SidebarTrigger />
        </header>

        <div className="flex-1 px-4 py-6">{children}</div>

        {/* Toaster lazy */}
        <Suspense fallback={null}>
          <Toaster />
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
