
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { PlusCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: `Dashboard for ${siteConfig.name}`,
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
           <Button asChild>
            <Link href="/tasks/new"> {/* Assuming a route for new task */}
                <PlusCircle className="mr-2 h-4 w-4" /> Create Task
            </Link>
           </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            <CardDescription>Overview of your active tasks.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You have <span className="font-bold">5</span> active tasks.</p>
            <Button variant="link" className="p-0 h-auto mt-2" asChild>
                <Link href="/tasks">View All Tasks</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Logged Today</CardTitle>
            <CardDescription>Total time tracked on tasks today.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3h 45m</p>
             <Button variant="link" className="p-0 h-auto mt-2" asChild>
                <Link href="/tracking">View Time Logs</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks nearing their due dates.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
                <li>Finalize report - 2 days</li>
                <li>Client meeting prep - 3 days</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for more dashboard content like charts or recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No recent activity to display yet.</p>
        </CardContent>
      </Card>
    </div>
  );
}
