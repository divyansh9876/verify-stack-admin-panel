"use client"

import { DollarSign, Users, Zap, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardStats } from "@/lib/types"

interface StatsCardsProps {
  stats: DashboardStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: stats.revenueChange,
      icon: DollarSign,
    },
    {
      title: "Active Subscriptions",
      value: stats.activeSubscriptions.toLocaleString(),
      change: stats.subscriptionChange,
      icon: Users,
    },
    {
      title: "Total API Usage",
      value: stats.totalApiUsage.toLocaleString(),
      change: stats.apiUsageChange,
      icon: Zap,
    },
    {
      title: "Active Plans",
      value: `${stats.activePlans} / ${stats.totalPlans}`,
      change: null,
      icon: Package,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            {card.change !== null && (
              <p className={`text-xs mt-1 ${card.change >= 0 ? "text-success" : "text-destructive"}`}>
                {card.change >= 0 ? "+" : ""}{card.change}% from last month
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
