import type { Metadata } from "next"
import DashboardClientPage from "./DashboardClientPage"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your projects and collaborative sessions",
}

export default function DashboardPage() {
  return <DashboardClientPage />
}
