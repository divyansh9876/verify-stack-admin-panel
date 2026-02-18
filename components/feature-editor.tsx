"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { adminApi } from "@/lib/api"
import type { PlanFeature } from "@/lib/types"

interface FeatureEditorProps {
  planId: string
  planName: string
  features: PlanFeature[]
  onFeatureAdded: (planId: string, feature: PlanFeature) => void
}

export function FeatureEditor({ planId, planName, features, onFeatureAdded }: FeatureEditorProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    featureCode: "",
    quotaType: "LIMITED",
    quota: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.featureCode) {
      toast.error("Feature code is required")
      return
    }

    setLoading(true)
    try {
      const newFeature = await adminApi.addFeatureToPlan(planId, {
        featureCode: form.featureCode,
        quotaType: form.quotaType as "LIMITED" | "UNLIMITED",
        quota: form.quotaType === "LIMITED" ? parseInt(form.quota) : null,
      })

      onFeatureAdded(planId, newFeature)
      toast.success(`Feature "${form.featureCode}" added`)
      setOpen(false)
      setForm({ featureCode: "", quotaType: "LIMITED", quota: "" })
    } catch (error) {
        toast.error("Failed to add feature.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Features - {planName}</CardTitle>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="mr-1 size-3.5" />
          Add Feature
        </Button>
      </CardHeader>
      <CardContent>
        {(features || []).length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No features added yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Limit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(features || []).map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell>
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{feature.featureCode}</code>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      feature.quotaType === "UNLIMITED" ? "default" : "outline"
                    }>
                      {feature.quotaType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {feature.quotaType === "LIMITED" ? feature.quota?.toLocaleString() : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Feature to {planName}</DialogTitle>
              <DialogDescription>
                Define a new feature for this plan.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="featureCode">Feature Code *</Label>
                  <Input
                    id="featureCode"
                    value={form.featureCode}
                    onChange={(e) => setForm({ ...form, featureCode: e.target.value })}
                    placeholder="e.g. PAN_VERIFY"
                  />
                </div>
                  <div className="flex flex-col gap-2">
                    <Label>Quota Type</Label>
                    <Select
                      value={form.quotaType}
                      onValueChange={(v) => setForm({ ...form, quotaType: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LIMITED">Limited</SelectItem>
                        <SelectItem value="UNLIMITED">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>
              {form.quotaType === "LIMITED" && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="quota">Quota Limit</Label>
                  <Input
                    id="quota"
                    type="number"
                    min="1"
                    value={form.quota}
                    onChange={(e) => setForm({ ...form, quota: e.target.value })}
                    placeholder="e.g. 500"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Feature"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
