"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockRevenueData, mockRevenuePlanData, mockFeatureUsage } from "@/lib/mock-data"

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

const featureRevenueData = [
  { feature: "Identity Checks", revenue: 142000 },
  { feature: "Criminal Records", revenue: 89000 },
  { feature: "Employment History", revenue: 34000 },
  { feature: "Education Verification", revenue: 12500 },
  { feature: "API Access", revenue: 7000 },
]

export default function AnalyticsPage() {
  const mrr = mockRevenueData[mockRevenueData.length - 1]?.revenue || 0
  const prevMrr = mockRevenueData[mockRevenueData.length - 2]?.revenue || 0
  const mrrGrowth = prevMrr > 0 ? (((mrr - prevMrr) / prevMrr) * 100).toFixed(1) : "0"

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">Revenue Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Detailed revenue breakdowns and growth metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Recurring Revenue</CardDescription>
            <CardTitle className="text-2xl">${mrr.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-success">+{mrrGrowth}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Annual Run Rate</CardDescription>
            <CardTitle className="text-2xl">${(mrr * 12).toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Based on current MRR</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Revenue Per User</CardDescription>
            <CardTitle className="text-2xl">
              ${(mrr / (mockRevenueData[mockRevenueData.length - 1]?.subscriptions || 1)).toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Across all active subscriptions</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="analyticsRevGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius)",
                    color: "var(--color-card-foreground)",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" fill="url(#analyticsRevGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Revenue by plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue by Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockRevenuePlanData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="revenue"
                    nameKey="planName"
                  >
                    {mockRevenuePlanData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius)",
                      color: "var(--color-card-foreground)",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by feature */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue by Feature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="feature" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
                  <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius)",
                      color: "var(--color-card-foreground)",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan revenue table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRevenuePlanData.map((item) => (
                <TableRow key={item.planName}>
                  <TableCell className="font-medium">{item.planName}</TableCell>
                  <TableCell className="text-right">${item.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{item.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Feature usage summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Feature Usage Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Key</TableHead>
                <TableHead className="text-right">Total Usage</TableHead>
                <TableHead className="text-right">Unique Users</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFeatureUsage.map((item) => (
                <TableRow key={item.featureKey}>
                  <TableCell className="font-medium">{item.featureName}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{item.featureKey}</code>
                  </TableCell>
                  <TableCell className="text-right">{item.totalUsage.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.uniqueUsers.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
