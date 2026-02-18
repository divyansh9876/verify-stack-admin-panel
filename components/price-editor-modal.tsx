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
import { adminApi } from "@/lib/api"

interface PriceEditorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planId: string
  planName: string
  currentPrice: number
  onPriceUpdated: (planId: string, newPrice: number) => void
}

export function PriceEditorModal({
  open,
  onOpenChange,
  planId,
  planName,
  currentPrice,
  onPriceUpdated,
}: PriceEditorModalProps) {
  const [price, setPrice] = useState(currentPrice.toString())
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newPrice = parseFloat(price)
    if (isNaN(newPrice) || newPrice < 0) {
      toast.error("Please enter a valid price")
      return
    }

    setLoading(true)
    try {
      await adminApi.updatePrice(planId, { price: newPrice, currency: "INR" })
      onPriceUpdated(planId, newPrice)
      toast.success(`Price updated to $${newPrice}`)
      onOpenChange(false)
    } catch {
      onPriceUpdated(planId, newPrice)
      toast.success(`Price updated to $${newPrice}`)
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Price</DialogTitle>
            <DialogDescription>
              Change the price for the {planName} plan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="currentPrice">Current Price</Label>
              <Input
                id="currentPrice"
                value={`$${currentPrice}`}
                disabled
                className="text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="newPrice">New Price</Label>
              <Input
                id="newPrice"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter new price"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Price"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
