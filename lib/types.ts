export interface Plan {
  id: string
  code: string
  name: string
  type: "SUBSCRIPTION" | "USAGE_BASED"
  price: number
  currency: string
  billingPeriod: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  active: boolean
  features: PlanFeature[]
  subscriberCount: number
  createdAt: string
  updatedAt: string
}

export interface PlanFeature {
  id: string
  planId: string
  featureCode: string
  quota: number | null
  quotaType: "LIMITED" | "UNLIMITED"
}

export interface Subscription {
  id: string
  userId: string
  orgId: string
  planId: string
  planName: string
  status: "active" | "canceled" | "expired" | "trialing"
  startDate: string
  endDate: string
  createdAt: string
}

export interface UsageRecord {
  id: string
  userId: string
  featureKey: string
  featureName: string
  used: number
  reserved: number
  committed: number
  limit: number
  quotaType: "unlimited" | "limited" | "boolean"
  lastUsedAt: string
}

export interface RevenueData {
  month: string
  revenue: number
  subscriptions: number
}

export interface RevenuePlanData {
  planName: string
  revenue: number
  percentage: number
}

export interface AuditLog {
  id: string
  adminId: string
  adminEmail: string
  action: string
  resource: string
  resourceId: string
  details: string
  timestamp: string
  ipAddress: string
}

export interface DashboardStats {
  totalRevenue: number
  revenueChange: number
  activeSubscriptions: number
  subscriptionChange: number
  totalApiUsage: number
  apiUsageChange: number
  totalPlans: number
  activePlans: number
}

export interface FeatureUsageBreakdown {
  featureKey: string
  featureName: string
  totalUsage: number
  uniqueUsers: number
}
