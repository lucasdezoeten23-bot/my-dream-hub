import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const { user, signOut } = useAuth();

  return (
    <DashboardLayout>
      <div className="p-6 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-6">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="font-sans">Profile</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-foreground">{user?.email}</p>
            </div>
            <Button variant="destructive" onClick={signOut}>Sign Out</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
