import { Suspense, lazy } from "react";
import { usePage } from "@inertiajs/react";

// Lazy components
const UserNavbar = lazy(() => import("../components/shared/UserNavbar"));
const Footer = lazy(() => import("../components/shared/Footer"));
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster }))
);


export default function UserLayout({ children }) {
  const { url } = usePage();
  const hidePath = ["/login", "/register"];
  const shouldHideNavbar = hidePath.includes(url);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar lazy */}
      {!shouldHideNavbar && (
        <Suspense fallback={<div className="p-4">Navbar yuklanmoqda...</div>}>
          <UserNavbar />
        </Suspense>
      )}

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Toaster lazy */}
      <Suspense fallback={null}>
        <Toaster />
      </Suspense>

      {/* Footer lazy */}
      {!shouldHideNavbar && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}
