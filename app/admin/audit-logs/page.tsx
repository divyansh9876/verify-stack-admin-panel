"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import { mockAuditLogs } from "@/lib/mock-data"

const actionColors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  CREATE: "default",
  UPDATE_PRICE: "outline",
  ACTIVATE: "default",
  DEACTIVATE: "destructive",
  ADD_FEATURE: "secondary",
}

export default function AuditLogsPage() {
  const [search, setSearch] = useState("")
  const [actionFilter, setActionFilter] = useState("all")

  const actions = [...new Set(mockAuditLogs.map((l) => l.action))]

  const filtered = mockAuditLogs.filter((log) => {
    const matchesSearch =
      log.adminEmail.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.resourceId.toLowerCase().includes(search.toLowerCase())
    const matchesAction = actionFilter === "all" || log.action === actionFilter
    return matchesSearch && matchesAction
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">
          Track all administrative actions and changes
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            {actions.map((action) => (
              <SelectItem key={action} value={action}>
                {action.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {filtered.length} log entr{filtered.length !== 1 ? "ies" : "y"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(log.timestamp), "MMM d, yyyy HH:mm")}
                  </TableCell>
                  <TableCell className="text-sm">{log.adminEmail}</TableCell>
                  <TableCell>
                    <Badge variant={actionColors[log.action] || "secondary"}>
                      {log.action.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                      {log.resource}/{log.resourceId}
                    </code>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate text-sm text-muted-foreground">
                    {log.details}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {log.ipAddress}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No audit logs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
