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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { adminApi } from "@/lib/api"
import type { Plan } from "@/lib/types"

interface CreatePlanModalProps {
  onPlanCreated: (plan: Plan) => void
}

export function CreatePlanModal({ onPlanCreated }: CreatePlanModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    billingCycle: "monthly",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.price) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      await adminApi.createPlan({
        code: form.name.toUpperCase().replace(/[^A-Z0-9]/g, "_"),
        name: form.name,
        description: form.description,
        type: "SUBSCRIPTION",
        price: parseFloat(form.price),
        currency: "INR",
        billingPeriod: form.billingCycle.toUpperCase(),
      })

      const newPlan: Plan = {
        id: `plan_${Date.now()}`,
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        billingCycle: form.billingCycle as "monthly" | "yearly",
        active: false,
        features: [],
        subscriberCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      onPlanCreated(newPlan)
      toast.success(`Plan "${form.name}" created successfully`)
      setOpen(false)
      setForm({ name: "", description: "", price: "", billingCycle: "monthly" })
    } catch {
      // Mock success for demo
      const newPlan: Plan = {
        id: `plan_${Date.now()}`,
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        billingCycle: form.billingCycle as "monthly" | "yearly",
        active: false,
        features: [],
        subscriberCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      onPlanCreated(newPlan)
      toast.success(`Plan "${form.name}" created successfully`)
      setOpen(false)
      setForm({ name: "", description: "", price: "", billingCycle: "monthly" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Create Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Plan</DialogTitle>
            <DialogDescription>
              Add a new billing plan for your platform.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Plan Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Professional"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe what this plan offers..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="99.00"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Billing Cycle</Label>
                <Select
                  value={form.billingCycle}
                  onValueChange={(v) => setForm({ ...form, billingCycle: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Plan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
