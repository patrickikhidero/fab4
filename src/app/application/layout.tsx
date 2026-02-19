import { RequireAuth } from "@/components/auth/RequireAuth";
import { ApplicationShell } from "@/components/application/ApplicationShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <RequireAuth>
      <ApplicationShell>{children}</ApplicationShell>
    // </RequireAuth>
  );
}
