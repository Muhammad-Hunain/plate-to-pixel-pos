
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Plus, Save, Trash, Settings, LayoutDashboard, Users, FileText, 
  Utensils, CalendarRange, ChefHat, ShoppingCart, LineChart
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Types for permission settings
type AccessLevel = 'hidden' | 'readonly' | 'edit' | 'full';

interface PagePermission {
  id: string;
  name: string;
  icon: React.ElementType;
  access: AccessLevel;
}

interface Role {
  id: string;
  name: string;
  description: string;
  isCustom: boolean;
  isBuiltIn: boolean;
  permissions: PagePermission[];
}

const defaultPages: Omit<PagePermission, 'access'>[] = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', name: 'Orders', icon: ShoppingCart },
  { id: 'reservations', name: 'Reservations', icon: CalendarRange },
  { id: 'menu', name: 'Menu', icon: Utensils },
  { id: 'kitchen', name: 'Kitchen', icon: ChefHat },
  { id: 'reports', name: 'Reports', icon: LineChart },
  { id: 'employees', name: 'Employees', icon: Users },
  { id: 'settings', name: 'Settings', icon: Settings },
];

// Default built-in roles
const defaultRoles: Role[] = [
  {
    id: 'owner',
    name: 'Owner',
    description: 'Full access to all features',
    isCustom: false,
    isBuiltIn: true,
    permissions: defaultPages.map(page => ({ ...page, access: 'full' })),
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Can manage day-to-day operations',
    isCustom: false,
    isBuiltIn: true,
    permissions: defaultPages.map(page => ({ 
      ...page, 
      access: page.id === 'settings' ? 'readonly' : 'full' 
    })),
  },
  {
    id: 'chef',
    name: 'Chef',
    description: 'Kitchen and food preparation',
    isCustom: false,
    isBuiltIn: true,
    permissions: defaultPages.map(page => {
      if (['kitchen', 'menu'].includes(page.id)) return { ...page, access: 'full' };
      if (['orders', 'dashboard'].includes(page.id)) return { ...page, access: 'readonly' };
      return { ...page, access: 'hidden' };
    }),
  },
  {
    id: 'server',
    name: 'Server',
    description: 'Front of house staff',
    isCustom: false,
    isBuiltIn: true,
    permissions: defaultPages.map(page => {
      if (['orders', 'reservations'].includes(page.id)) return { ...page, access: 'full' };
      if (['dashboard', 'menu', 'kitchen'].includes(page.id)) return { ...page, access: 'readonly' };
      return { ...page, access: 'hidden' };
    }),
  },
  {
    id: 'cashier',
    name: 'Cashier',
    description: 'Handles payments and orders',
    isCustom: false,
    isBuiltIn: true,
    permissions: defaultPages.map(page => {
      if (['orders'].includes(page.id)) return { ...page, access: 'full' };
      if (['dashboard', 'menu'].includes(page.id)) return { ...page, access: 'readonly' };
      return { ...page, access: 'hidden' };
    }),
  },
];

export default function RolePermissionsManager() {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('owner');
  const [newRoleDialogOpen, setNewRoleDialogOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

  const selectedRole = roles.find(role => role.id === selectedRoleId) || roles[0];

  const handleAccessChange = (pageId: string, access: AccessLevel) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === selectedRoleId
          ? {
              ...role,
              permissions: role.permissions.map(perm => 
                perm.id === pageId
                  ? { ...perm, access }
                  : perm
              ),
            }
          : role
      )
    );
  };

  const handleCreateRole = () => {
    if (!newRoleName.trim()) {
      toast.error('Role name is required');
      return;
    }

    const newRoleId = newRoleName.toLowerCase().replace(/\s+/g, '-');
    
    if (roles.some(role => role.id === newRoleId)) {
      toast.error('A role with this name already exists');
      return;
    }

    const newRole: Role = {
      id: newRoleId,
      name: newRoleName,
      description: newRoleDescription,
      isCustom: true,
      isBuiltIn: false,
      permissions: defaultPages.map(page => ({ ...page, access: 'hidden' })),
    };

    setRoles(prev => [...prev, newRole]);
    setSelectedRoleId(newRoleId);
    setNewRoleDialogOpen(false);
    setNewRoleName('');
    setNewRoleDescription('');
    
    toast.success(`Created new role: ${newRoleName}`);
  };

  const handleDeleteRole = (roleId: string) => {
    if (roles.find(r => r.id === roleId)?.isBuiltIn) {
      toast.error('Cannot delete built-in roles');
      return;
    }

    setRoles(prev => prev.filter(role => role.id !== roleId));
    
    if (selectedRoleId === roleId) {
      setSelectedRoleId('owner');
    }
    
    toast.success('Role deleted');
  };

  const handleSaveChanges = () => {
    toast.success('Role permissions updated successfully');
    // In a real app, you would send the updated roles to the backend
    console.log('Updated roles:', roles);
  };

  const getAccessColor = (access: AccessLevel) => {
    switch (access) {
      case 'full': return 'text-green-500';
      case 'edit': return 'text-blue-500';
      case 'readonly': return 'text-amber-500';
      case 'hidden': return 'text-gray-400';
      default: return '';
    }
  };

  const getAccessLabel = (access: AccessLevel) => {
    switch (access) {
      case 'full': return 'Full Access';
      case 'edit': return 'Can Edit';
      case 'readonly': return 'View Only';
      case 'hidden': return 'Hidden';
      default: return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Role & Permissions</CardTitle>
        <CardDescription>
          Define what each role can access and modify in the system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Role Selection */}
          <div className="w-full md:w-1/4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Roles</h3>
              <Dialog open={newRoleDialogOpen} onOpenChange={setNewRoleDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="h-8">
                    <Plus className="h-4 w-4 mr-1" /> New Role
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Role</DialogTitle>
                    <DialogDescription>
                      Create a custom role with tailored permissions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="role-name">Role Name</Label>
                      <Input 
                        id="role-name" 
                        placeholder="e.g., Shift Manager" 
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role-description">Description</Label>
                      <Input 
                        id="role-description" 
                        placeholder="Briefly describe this role's responsibilities" 
                        value={newRoleDescription}
                        onChange={(e) => setNewRoleDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewRoleDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateRole}>Create Role</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              {roles.map(role => (
                <div 
                  key={role.id}
                  className={`flex justify-between items-center p-3 rounded-md border cursor-pointer transition-colors
                    ${selectedRoleId === role.id ? 'bg-primary/10 border-primary/50' : 'hover:bg-muted/50'}
                  `}
                  onClick={() => setSelectedRoleId(role.id)}
                >
                  <div>
                    <h4 className="font-medium">{role.name}</h4>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </div>
                  {role.isCustom && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRole(role.id);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Permissions Management */}
          <div className="flex-1 border rounded-md">
            <div className="p-4 border-b bg-muted/30">
              <h3 className="text-lg font-medium">
                Permissions for <span className="font-bold">{selectedRole?.name}</span>
              </h3>
              <p className="text-sm text-muted-foreground">{selectedRole?.description}</p>
              {selectedRole?.isBuiltIn && (
                <p className="text-xs mt-1 text-amber-500">
                  This is a built-in role. Some permissions may be fixed.
                </p>
              )}
            </div>
            
            <div className="divide-y">
              {selectedRole?.permissions.map(permission => (
                <div key={permission.id} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <permission.icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{permission.name}</h4>
                    <p className={`text-xs ${getAccessColor(permission.access)}`}>
                      {getAccessLabel(permission.access)}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Tabs 
                      defaultValue={permission.access} 
                      value={permission.access}
                      className="w-[260px]"
                      onValueChange={(value) => handleAccessChange(
                        permission.id, 
                        value as AccessLevel
                      )}
                    >
                      <TabsList className="grid grid-cols-4 w-full">
                        <TabsTrigger value="hidden" className="text-xs">Hidden</TabsTrigger>
                        <TabsTrigger value="readonly" className="text-xs">View</TabsTrigger>
                        <TabsTrigger value="edit" className="text-xs">Edit</TabsTrigger>
                        <TabsTrigger value="full" className="text-xs">Full</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        <Button onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
