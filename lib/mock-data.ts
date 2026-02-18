import type {
  Plan,
  Subscription,
  UsageRecord,
  RevenueData,
  RevenuePlanData,
  AuditLog,
  DashboardStats,
  FeatureUsageBreakdown,
} from "./types"

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 284500,
  revenueChange: 12.5,
  activeSubscriptions: 1247,
  subscriptionChange: 8.2,
  totalApiUsage: 3456789,
  apiUsageChange: -2.4,
  totalPlans: 5,
  activePlans: 4,
}

export const mockPlans: Plan[] = [
  {
    id: "plan_starter",
    name: "Starter",
    description: "For small teams getting started with background verification",
    price: 29,
    billingCycle: "monthly",
    active: true,
    subscriberCount: 342,
    features: [
      { id: "f1", planId: "plan_starter", name: "Identity Checks", key: "identity_checks", quotaType: "limited", quotaLimit: 100, description: "Basic identity verification" },
      { id: "f2", planId: "plan_starter", name: "Criminal Records", key: "criminal_records", quotaType: "limited", quotaLimit: 50, description: "Criminal background checks" },
      { id: "f3", planId: "plan_starter", name: "Email Support", key: "email_support", quotaType: "boolean", quotaLimit: null, description: "Email-based customer support" },
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2025-06-01T08:30:00Z",
  },
  {
    id: "plan_professional",
    name: "Professional",
    description: "Comprehensive verification for growing businesses",
    price: 99,
    billingCycle: "monthly",
    active: true,
    subscriberCount: 586,
    features: [
      { id: "f4", planId: "plan_professional", name: "Identity Checks", key: "identity_checks", quotaType: "limited", quotaLimit: 500, description: "Advanced identity verification" },
      { id: "f5", planId: "plan_professional", name: "Criminal Records", key: "criminal_records", quotaType: "limited", quotaLimit: 250, description: "Full criminal background checks" },
      { id: "f6", planId: "plan_professional", name: "Employment History", key: "employment_history", quotaType: "limited", quotaLimit: 200, description: "Employment verification" },
      { id: "f7", planId: "plan_professional", name: "Education Verification", key: "education_verification", quotaType: "limited", quotaLimit: 200, description: "Education history verification" },
      { id: "f8", planId: "plan_professional", name: "Priority Support", key: "priority_support", quotaType: "boolean", quotaLimit: null, description: "Priority customer support" },
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2025-07-12T14:20:00Z",
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    description: "Full-suite verification with unlimited access",
    price: 299,
    billingCycle: "monthly",
    active: true,
    subscriberCount: 214,
    features: [
      { id: "f9", planId: "plan_enterprise", name: "Identity Checks", key: "identity_checks", quotaType: "unlimited", quotaLimit: null, description: "Unlimited identity verification" },
      { id: "f10", planId: "plan_enterprise", name: "Criminal Records", key: "criminal_records", quotaType: "unlimited", quotaLimit: null, description: "Unlimited criminal checks" },
      { id: "f11", planId: "plan_enterprise", name: "Employment History", key: "employment_history", quotaType: "unlimited", quotaLimit: null, description: "Unlimited employment checks" },
      { id: "f12", planId: "plan_enterprise", name: "Education Verification", key: "education_verification", quotaType: "unlimited", quotaLimit: null, description: "Unlimited education checks" },
      { id: "f13", planId: "plan_enterprise", name: "API Access", key: "api_access", quotaType: "boolean", quotaLimit: null, description: "Full REST API access" },
      { id: "f14", planId: "plan_enterprise", name: "Dedicated Support", key: "dedicated_support", quotaType: "boolean", quotaLimit: null, description: "Dedicated account manager" },
    ],
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2025-08-05T16:45:00Z",
  },
  {
    id: "plan_basic",
    name: "Basic",
    description: "Entry-level plan for individual verifications",
    price: 9,
    billingCycle: "monthly",
    active: true,
    subscriberCount: 105,
    features: [
      { id: "f15", planId: "plan_basic", name: "Identity Checks", key: "identity_checks", quotaType: "limited", quotaLimit: 25, description: "Basic identity checks" },
      { id: "f16", planId: "plan_basic", name: "Email Support", key: "email_support", quotaType: "boolean", quotaLimit: null, description: "Email support" },
    ],
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2025-06-01T08:30:00Z",
  },
  {
    id: "plan_legacy",
    name: "Legacy Pro",
    description: "Deprecated professional plan",
    price: 79,
    billingCycle: "monthly",
    active: false,
    subscriberCount: 23,
    features: [
      { id: "f17", planId: "plan_legacy", name: "Identity Checks", key: "identity_checks", quotaType: "limited", quotaLimit: 300, description: "Identity verification" },
      { id: "f18", planId: "plan_legacy", name: "Criminal Records", key: "criminal_records", quotaType: "limited", quotaLimit: 150, description: "Criminal checks" },
    ],
    createdAt: "2023-06-15T10:00:00Z",
    updatedAt: "2024-12-01T08:30:00Z",
  },
]

export const mockSubscriptions: Subscription[] = [
  { id: "sub_001", userId: "usr_a1b2c3", orgId: "org_acme", planId: "plan_professional", planName: "Professional", status: "active", startDate: "2025-01-15T00:00:00Z", endDate: "2026-01-15T00:00:00Z", createdAt: "2025-01-15T10:00:00Z" },
  { id: "sub_002", userId: "usr_d4e5f6", orgId: "org_globex", planId: "plan_enterprise", planName: "Enterprise", status: "active", startDate: "2025-03-01T00:00:00Z", endDate: "2026-03-01T00:00:00Z", createdAt: "2025-03-01T14:30:00Z" },
  { id: "sub_003", userId: "usr_g7h8i9", orgId: "org_initech", planId: "plan_starter", planName: "Starter", status: "active", startDate: "2025-06-10T00:00:00Z", endDate: "2026-06-10T00:00:00Z", createdAt: "2025-06-10T09:15:00Z" },
  { id: "sub_004", userId: "usr_j0k1l2", orgId: "org_umbrella", planId: "plan_professional", planName: "Professional", status: "canceled", startDate: "2024-11-01T00:00:00Z", endDate: "2025-11-01T00:00:00Z", createdAt: "2024-11-01T11:00:00Z" },
  { id: "sub_005", userId: "usr_m3n4o5", orgId: "org_wayne", planId: "plan_enterprise", planName: "Enterprise", status: "active", startDate: "2025-02-20T00:00:00Z", endDate: "2026-02-20T00:00:00Z", createdAt: "2025-02-20T16:45:00Z" },
  { id: "sub_006", userId: "usr_p6q7r8", orgId: "org_stark", planId: "plan_starter", planName: "Starter", status: "trialing", startDate: "2025-12-01T00:00:00Z", endDate: "2026-01-01T00:00:00Z", createdAt: "2025-12-01T08:00:00Z" },
  { id: "sub_007", userId: "usr_s9t0u1", orgId: "org_daily", planId: "plan_basic", planName: "Basic", status: "active", startDate: "2025-09-15T00:00:00Z", endDate: "2026-09-15T00:00:00Z", createdAt: "2025-09-15T10:00:00Z" },
  { id: "sub_008", userId: "usr_v2w3x4", orgId: "org_pied", planId: "plan_professional", planName: "Professional", status: "expired", startDate: "2024-05-01T00:00:00Z", endDate: "2025-05-01T00:00:00Z", createdAt: "2024-05-01T12:00:00Z" },
]

export const mockUsageRecords: UsageRecord[] = [
  { id: "usg_001", userId: "usr_a1b2c3", featureKey: "identity_checks", featureName: "Identity Checks", used: 347, reserved: 20, committed: 327, limit: 500, quotaType: "limited", lastUsedAt: "2025-12-18T14:30:00Z" },
  { id: "usg_002", userId: "usr_a1b2c3", featureKey: "criminal_records", featureName: "Criminal Records", used: 189, reserved: 10, committed: 179, limit: 250, quotaType: "limited", lastUsedAt: "2025-12-18T12:15:00Z" },
  { id: "usg_003", userId: "usr_d4e5f6", featureKey: "identity_checks", featureName: "Identity Checks", used: 12450, reserved: 0, committed: 12450, limit: -1, quotaType: "unlimited", lastUsedAt: "2025-12-18T16:00:00Z" },
  { id: "usg_004", userId: "usr_d4e5f6", featureKey: "employment_history", featureName: "Employment History", used: 3420, reserved: 50, committed: 3370, limit: -1, quotaType: "unlimited", lastUsedAt: "2025-12-18T15:45:00Z" },
  { id: "usg_005", userId: "usr_g7h8i9", featureKey: "identity_checks", featureName: "Identity Checks", used: 95, reserved: 5, committed: 90, limit: 100, quotaType: "limited", lastUsedAt: "2025-12-18T11:00:00Z" },
  { id: "usg_006", userId: "usr_j0k1l2", featureKey: "identity_checks", featureName: "Identity Checks", used: 498, reserved: 0, committed: 498, limit: 500, quotaType: "limited", lastUsedAt: "2025-12-17T23:59:00Z" },
  { id: "usg_007", userId: "usr_m3n4o5", featureKey: "criminal_records", featureName: "Criminal Records", used: 8750, reserved: 200, committed: 8550, limit: -1, quotaType: "unlimited", lastUsedAt: "2025-12-18T16:30:00Z" },
  { id: "usg_008", userId: "usr_p6q7r8", featureKey: "identity_checks", featureName: "Identity Checks", used: 12, reserved: 0, committed: 12, limit: 100, quotaType: "limited", lastUsedAt: "2025-12-15T09:00:00Z" },
]

export const mockRevenueData: RevenueData[] = [
  { month: "Jan", revenue: 18200, subscriptions: 980 },
  { month: "Feb", revenue: 19800, subscriptions: 1020 },
  { month: "Mar", revenue: 21500, subscriptions: 1050 },
  { month: "Apr", revenue: 22100, subscriptions: 1080 },
  { month: "May", revenue: 23400, subscriptions: 1120 },
  { month: "Jun", revenue: 24800, subscriptions: 1150 },
  { month: "Jul", revenue: 25200, subscriptions: 1170 },
  { month: "Aug", revenue: 26100, subscriptions: 1190 },
  { month: "Sep", revenue: 27300, subscriptions: 1210 },
  { month: "Oct", revenue: 28500, subscriptions: 1230 },
  { month: "Nov", revenue: 29800, subscriptions: 1247 },
  { month: "Dec", revenue: 31200, subscriptions: 1270 },
]

export const mockRevenuePlanData: RevenuePlanData[] = [
  { planName: "Enterprise", revenue: 128172, percentage: 45.1 },
  { planName: "Professional", revenue: 116028, percentage: 40.8 },
  { planName: "Starter", revenue: 19908, percentage: 7.0 },
  { planName: "Basic", revenue: 1890, percentage: 0.7 },
  { planName: "Legacy Pro", revenue: 18502, percentage: 6.4 },
]

export const mockFeatureUsage: FeatureUsageBreakdown[] = [
  { featureKey: "identity_checks", featureName: "Identity Checks", totalUsage: 1845230, uniqueUsers: 1124 },
  { featureKey: "criminal_records", featureName: "Criminal Records", totalUsage: 892140, uniqueUsers: 876 },
  { featureKey: "employment_history", featureName: "Employment History", totalUsage: 456780, uniqueUsers: 654 },
  { featureKey: "education_verification", featureName: "Education Verification", totalUsage: 234560, uniqueUsers: 432 },
  { featureKey: "api_access", featureName: "API Access", totalUsage: 28099, uniqueUsers: 214 },
]

export const mockAuditLogs: AuditLog[] = [
  { id: "log_001", adminId: "adm_001", adminEmail: "admin@verifystack.com", action: "CREATE", resource: "plan", resourceId: "plan_basic", details: "Created Basic plan with price $9/month", timestamp: "2025-12-18T16:30:00Z", ipAddress: "192.168.1.10" },
  { id: "log_002", adminId: "adm_001", adminEmail: "admin@verifystack.com", action: "UPDATE_PRICE", resource: "plan", resourceId: "plan_professional", details: "Updated Professional plan price from $89 to $99", timestamp: "2025-12-18T15:20:00Z", ipAddress: "192.168.1.10" },
  { id: "log_003", adminId: "adm_002", adminEmail: "ops@verifystack.com", action: "ACTIVATE", resource: "plan", resourceId: "plan_basic", details: "Activated Basic plan", timestamp: "2025-12-18T14:00:00Z", ipAddress: "10.0.0.5" },
  { id: "log_004", adminId: "adm_001", adminEmail: "admin@verifystack.com", action: "ADD_FEATURE", resource: "feature", resourceId: "f16", details: "Added Email Support feature to Basic plan", timestamp: "2025-12-18T13:45:00Z", ipAddress: "192.168.1.10" },
  { id: "log_005", adminId: "adm_002", adminEmail: "ops@verifystack.com", action: "DEACTIVATE", resource: "plan", resourceId: "plan_legacy", details: "Deactivated Legacy Pro plan", timestamp: "2025-12-17T18:00:00Z", ipAddress: "10.0.0.5" },
  { id: "log_006", adminId: "adm_001", adminEmail: "admin@verifystack.com", action: "CREATE", resource: "plan", resourceId: "plan_enterprise", details: "Created Enterprise plan with price $299/month", timestamp: "2025-12-17T11:00:00Z", ipAddress: "192.168.1.10" },
  { id: "log_007", adminId: "adm_003", adminEmail: "security@verifystack.com", action: "UPDATE_PRICE", resource: "plan", resourceId: "plan_starter", details: "Updated Starter plan price from $19 to $29", timestamp: "2025-12-16T09:30:00Z", ipAddress: "172.16.0.3" },
  { id: "log_008", adminId: "adm_001", adminEmail: "admin@verifystack.com", action: "ADD_FEATURE", resource: "feature", resourceId: "f14", details: "Added Dedicated Support to Enterprise plan", timestamp: "2025-12-15T16:15:00Z", ipAddress: "192.168.1.10" },
  { id: "log_009", adminId: "adm_002", adminEmail: "ops@verifystack.com", action: "ADD_FEATURE", resource: "feature", resourceId: "f13", details: "Added API Access to Enterprise plan", timestamp: "2025-12-15T14:00:00Z", ipAddress: "10.0.0.5" },
  { id: "log_010", adminId: "adm_003", adminEmail: "security@verifystack.com", action: "CREATE", resource: "plan", resourceId: "plan_starter", details: "Created Starter plan with price $19/month", timestamp: "2025-12-14T10:00:00Z", ipAddress: "172.16.0.3" },
]
