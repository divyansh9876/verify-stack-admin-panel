"use client"

import { StatsCards } from "@/components/stats-cards"
import { RevenueChart, FeatureUsageChart, RevenuePieChart, SubscriptionsChart } from "@/components/dashboard-charts"
import {
  mockDashboardStats,
  mockRevenueData,
  mockFeatureUsage,
  mockRevenuePlanData,
} from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your verification platform metrics
        </p>
      </div>

      <StatsCards stats={mockDashboardStats} />

      <div className="grid gap-4 lg:grid-cols-3">
        <RevenueChart data={mockRevenueData} />
        <RevenuePieChart data={mockRevenuePlanData} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <FeatureUsageChart data={mockFeatureUsage} />
        <SubscriptionsChart data={mockRevenueData} />
      </div>
    </div>
  )
}
