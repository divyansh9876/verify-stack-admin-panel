"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Activity,
  BarChart3,
  ScrollText,
  ShieldCheck,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Plans", href: "/admin/plans", icon: CreditCard },
  { title: "Subscriptions", href: "/admin/subscriptions", icon: Users },
  { title: "Usage Monitor", href: "/admin/usage", icon: Activity },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { title: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary">
            <ShieldCheck className="size-4 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground leading-tight">VerifyStack</span>
            <span className="text-[11px] text-sidebar-foreground/60 leading-tight">Admin Panel</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center justify-between px-2 group-data-[collapsible=icon]:justify-center">
          <span className="text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">v1.0.0</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
