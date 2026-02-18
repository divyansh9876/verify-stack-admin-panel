"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertTriangle, Search } from "lucide-react"
import { mockUsageRecords } from "@/lib/mock-data"

function getUsagePercentage(used: number, limit: number): number {
  if (limit <= 0) return 0
  return Math.min((used / limit) * 100, 100)
}

function isAbusive(used: number, limit: number): boolean {
  if (limit <= 0) return false
  return used / limit > 0.95
}

export default function UsagePage() {
  const [search, setSearch] = useState("")

  const filtered = mockUsageRecords.filter(
    (r) =>
      r.userId.toLowerCase().includes(search.toLowerCase()) ||
      r.featureName.toLowerCase().includes(search.toLowerCase())
  )

  const abuseCount = mockUsageRecords.filter(
    (r) => r.quotaType === "limited" && isAbusive(r.used, r.limit)
  ).length

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">Usage & Entitlements</h1>
        <p className="text-sm text-muted-foreground">
          Monitor real-time feature usage and detect abuse patterns
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Records</CardDescription>
            <CardTitle className="text-2xl">{mockUsageRecords.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Reserved Units</CardDescription>
            <CardTitle className="text-2xl">
              {mockUsageRecords.reduce((acc, r) => acc + r.reserved, 0).toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className={abuseCount > 0 ? "border-destructive/50" : ""}>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              {abuseCount > 0 && <AlertTriangle className="size-3.5 text-destructive" />}
              Abuse Alerts
            </CardDescription>
            <CardTitle className={`text-2xl ${abuseCount > 0 ? "text-destructive" : ""}`}>
              {abuseCount}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search by user or feature..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Usage Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Feature</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Used</TableHead>
                <TableHead>Reserved</TableHead>
                <TableHead>Committed</TableHead>
                <TableHead>Limit</TableHead>
                <TableHead className="w-[140px]">Usage</TableHead>
                <TableHead>Last Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((record) => {
                const pct = record.quotaType === "limited" ? getUsagePercentage(record.used, record.limit) : null
                const abuse = record.quotaType === "limited" && isAbusive(record.used, record.limit)

                return (
                  <TableRow key={record.id} className={abuse ? "bg-destructive/5" : ""}>
                    <TableCell className="font-mono text-xs">{record.userId}</TableCell>
                    <TableCell className="font-medium">{record.featureName}</TableCell>
                    <TableCell>
                      <Badge variant={record.quotaType === "unlimited" ? "default" : "outline"}>
                        {record.quotaType}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.used.toLocaleString()}</TableCell>
                    <TableCell>{record.reserved.toLocaleString()}</TableCell>
                    <TableCell>{record.committed.toLocaleString()}</TableCell>
                    <TableCell>
                      {record.quotaType === "limited" ? record.limit.toLocaleString() : "N/A"}
                    </TableCell>
                    <TableCell>
                      {pct !== null ? (
                        <div className="flex items-center gap-2">
                          <Progress
                            value={pct}
                            className={`h-2 flex-1 ${abuse ? "[&>div]:bg-destructive" : ""}`}
                          />
                          <span className={`text-xs font-mono w-10 text-right ${abuse ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                            {pct.toFixed(0)}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {format(new Date(record.lastUsedAt), "MMM d, HH:mm")}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
