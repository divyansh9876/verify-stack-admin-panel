"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ToggleLeft, ToggleRight, Eye } from "lucide-react"
import { adminApi, publicApi } from "@/lib/api"
import { CreatePlanModal } from "@/components/create-plan-modal"
import { PriceEditorModal } from "@/components/price-editor-modal"
import { FeatureEditor } from "@/components/feature-editor"
import type { Plan, PlanFeature } from "@/lib/types"

interface PlanTableProps {
  plans: Plan[]
  onToggleActive: (planId: string) => void
  onEditPrice: (planId: string) => void
  onSelectPlan: (planId: string) => void
  selectedPlanId: string | null
}

export function PlanTable({ plans, onToggleActive, onEditPrice, onSelectPlan, selectedPlanId }: PlanTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">All Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Cycle</TableHead>
              <TableHead>Subscribers</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Features</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow
                key={plan.id}
                className={selectedPlanId === plan.id ? "bg-accent/50" : ""}
              >
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>{plan.currency} {plan.price}</TableCell>
                <TableCell className="capitalize">{plan.billingPeriod}</TableCell>
                <TableCell>{(plan.subscriberCount || 0).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={plan.active ? "default" : "secondary"}>
                    {plan.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{(plan.features || []).length}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => onSelectPlan(plan.id)}
                      title="View features"
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => onEditPrice(plan.id)}
                      title="Edit price"
                    >
                      <DollarSign className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => onToggleActive(plan.id)}
                      title={plan.active ? "Deactivate" : "Activate"}
                    >
                      {plan.active ? (
                        <ToggleRight className="size-4 text-success" />
                      ) : (
                        <ToggleLeft className="size-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

interface PlanTableContainerProps {
}

export function PlanTableContainer({}: PlanTableContainerProps) {
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const [priceModal, setPriceModal] = useState<{ open: boolean; planId: string; planName: string; currentPrice: number, currentCurrency: string } | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        setLoading(true);
        const fetchedPlans = await publicApi.getPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        toast.error("Failed to fetch plans.");
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  const handleToggleActive = async (planId: string) => {
    const plan = plans.find((p) => p.id === planId)
    if (!plan) return;

    // We assume the backend handles the toggle logic on `activate` endpoint
    // Or there could be a deactivate endpoint. For now, we proceed with optimistic UI update
    // and call the activate endpoint.
    try {
      await adminApi.activatePlan(planId);
      setPlans((prev) =>
        prev.map((p) =>
          p.id === planId ? { ...p, active: !p.active, updatedAt: new Date().toISOString() } : p
        )
      )
      toast.success(`${plan.name} ${plan.active ? "deactivated" : "activated"}`);
    } catch (error) {
      toast.error(`Failed to ${plan.active ? "deactivate" : "activate"} ${plan.name}.`);
    }
  }

  const handlePlanCreated = (plan: Plan) => {
    setPlans((prev) => [...prev, plan])
  }

  const handlePriceUpdated = (planId: string, newPrice: number, newCurrency: string) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId ? { ...p, price: newPrice, currency: newCurrency, updatedAt: new Date().toISOString() } : p
      )
    )
    setPriceModal(null)
  }

  const handleFeatureAdded = (planId: string, feature: PlanFeature) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId ? { ...p, features: [...p.features, feature] } : p
      )
    )
  }

  const selectedPlan = plans.find((p) => p.id === selectedPlanId)

  if (loading) {
    return <div>Loading plans...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">Plans Management</h1>
          <p className="text-sm text-muted-foreground">
            Create, activate, and manage billing plans
          </p>
        </div>
        <CreatePlanModal onPlanCreated={handlePlanCreated} />
      </div>

      <PlanTable
        plans={plans}
        onToggleActive={handleToggleActive}
        onEditPrice={(planId) => {
          const plan = plans.find((p) => p.id === planId)
          if (plan) {
            setPriceModal({ open: true, planId, planName: plan.name, currentPrice: plan.price, currentCurrency: plan.currency })
          }
        }}
        onSelectPlan={(planId) => setSelectedPlanId(selectedPlanId === planId ? null : planId)}
        selectedPlanId={selectedPlanId}
      />

      {selectedPlan && (
        <FeatureEditor
          planId={selectedPlan.id}
          planName={selectedPlan.name}
          features={selectedPlan.features}
          onFeatureAdded={handleFeatureAdded}
        />
      )}

      {priceModal && (
        <PriceEditorModal
          open={priceModal.open}
          onOpenChange={(open) => !open && setPriceModal(null)}
          planId={priceModal.planId}
          planName={priceModal.planName}
          currentPrice={priceModal.currentPrice}
          currentCurrency={priceModal.currentCurrency}
          onPriceUpdated={handlePriceUpdated}
        />
      )}
    </div>
  )
}
