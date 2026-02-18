import type { Plan, PlanFeature } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://bgv-billing-service.onrender.com"

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  if (response.status === 204 || response.headers.get("Content-Length") === "0") {
    return {} as T
  }

  return response.json()
}

// Admin Plan APIs
export const adminApi = {
  createPlan: (data: {
    code: string
    name: string
    type: string
    price: number
    currency: string
    billingPeriod: string
    description?: string
  }) =>
    apiRequest<Plan>("/admin/plans", { method: "POST", body: JSON.stringify(data) }),

  addFeatureToPlan: (planId: string, data: { featureCode: string; quota: number; quotaType: string }) =>
    apiRequest<PlanFeature>(`/admin/plans/${planId}/features`, { method: "POST", body: JSON.stringify(data) }),

  activatePlan: (planId: string) =>
    apiRequest(`/admin/plans/${planId}/activate`, { method: "PATCH" }),

  updatePrice: (planId: string, data: { price: number; currency: string }) =>
    apiRequest(`/admin/plans/${planId}/price`, { method: "PUT", body: JSON.stringify(data) }),
}

// Public/User APIs
export const publicApi = {
  getPlans: () => apiRequest<Plan[]>("/plans"),
  getMySubscription: () => apiRequest("/subscriptions/me"),
  subscribe: (planId: string, data: { userId: string; orgId?: string | null }) =>
    apiRequest(`/subscriptions/${planId}`, { method: "POST", body: JSON.stringify(data) }),
}

// Entitlement & Usage APIs
export const usageApi = {
  checkEntitlement: (data: { userId: string; orgId?: string | null; featureCode: string; count?: number }) =>
    apiRequest("/entitlements/check", { method: "POST", body: JSON.stringify(data) }),

  commitUsage: (data: { reservationId: string }) =>
    apiRequest("/usage/commit", { method: "POST", body: JSON.stringify(data) }),

  releaseUsage: (data: { reservationId: string }) =>
    apiRequest("/usage/release", { method: "POST", body: JSON.stringify(data) }),
}