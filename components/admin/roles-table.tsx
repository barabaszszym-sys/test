"use client"

import { useState, useEffect } from "react"
import { Search, Shield, ShieldCheck, ChevronRight, Users, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { mockRoles, mockAdminUsers, mockDistributorsList } from "@/lib/mock-data"
import { ALL_PERMISSIONS, type Role, type AdminUser } from "@/lib/types"
import { getFromStorage } from "@/lib/storage"

export function RolesTable() {
  const [roles, setRoles] = useState<Role[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("roles")

  useEffect(() => {
    const storedRoles = getFromStorage<Role[]>("soymax_roles")
    const storedUsers = getFromStorage<AdminUser[]>("soymax_admin_users")
    setRoles(storedRoles || mockRoles)
    setUsers(storedUsers || mockAdminUsers)
  }, [])

  const filteredRoles = roles.filter((role) =>
    role.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleDisplayName = (roleName: string) => {
    const role = roles.find(r => r.name === roleName)
    return role?.displayName || roleName
  }

  const getAssignedDistributorsCount = (user: AdminUser) => {
    return user.assignedDistributorIds.length
  }

  const getAssignedDistributors = (user: AdminUser) => {
    return mockDistributorsList.filter(d => user.assignedDistributorIds.includes(d.id))
  }

  const getPermissionsByCategory = () => {
    const categories: Record<string, typeof ALL_PERMISSIONS> = {
      "Produkty": ALL_PERMISSIONS.filter(p => p.id.startsWith("products.")),
      "Dystrybutorzy": ALL_PERMISSIONS.filter(p => p.id.startsWith("distributors.")),
      "Klienci": ALL_PERMISSIONS.filter(p => p.id.startsWith("clients.")),
      "Promocje": ALL_PERMISSIONS.filter(p => p.id.startsWith("promotions.")),
      "Sprzedaż": ALL_PERMISSIONS.filter(p => p.id.startsWith("sales.")),
      "Ustawienia": ALL_PERMISSIONS.filter(p => p.id.startsWith("settings.")),
      "Użytkownicy": ALL_PERMISSIONS.filter(p => p.id.startsWith("users.")),
      "Role": ALL_PERMISSIONS.filter(p => p.id.startsWith("roles.")),
    }
    return categories
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={activeTab === "roles" ? "Szukaj roli..." : "Szukaj użytkownika..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="roles" className="gap-2">
            <Shield className="h-4 w-4" />
            Role ({roles.length})
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Użytkownicy ({users.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="mt-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Nazwa roli</TableHead>
                  <TableHead>Opis</TableHead>
                  <TableHead className="text-center">Uprawnienia</TableHead>
                  <TableHead className="text-center">Użytkownicy</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => {
                  const usersWithRole = users.filter(u => u.role === role.name)
                  return (
                    <TableRow
                      key={role.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedRole(role)}
                    >
                      <TableCell>
                        {role.name === "admin" ? (
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        ) : (
                          <Shield className="h-5 w-5 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{role.displayName}</TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {role.description}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{role.permissions.length}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{usersWithRole.length}</Badge>
                      </TableCell>
                      <TableCell>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imię i nazwisko</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rola</TableHead>
                  <TableHead className="text-center">Przypisani dystrybutorzy</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedUser(user)}
                  >
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {user.role === "salesperson" ? (
                        <Badge variant="outline">{getAssignedDistributorsCount(user)}</Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">Wszyscy</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.isActive ? (
                        <Badge className="bg-green-100 text-green-700">Aktywny</Badge>
                      ) : (
                        <Badge variant="secondary">Nieaktywny</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Role Detail Sheet */}
      <Sheet open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedRole && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  {selectedRole.name === "admin" ? (
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  ) : (
                    <Shield className="h-8 w-8 text-muted-foreground" />
                  )}
                  <div>
                    <SheetTitle>{selectedRole.displayName}</SheetTitle>
                    <p className="text-sm text-muted-foreground">{selectedRole.description}</p>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Uprawnienia ({selectedRole.permissions.length})</CardTitle>
                    <CardDescription>Lista uprawnień przypisanych do tej roli</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(getPermissionsByCategory()).map(([category, permissions]) => {
                      const categoryPermissions = permissions.filter(p => 
                        selectedRole.permissions.includes(p.id)
                      )
                      if (categoryPermissions.length === 0) return null
                      
                      return (
                        <div key={category}>
                          <h4 className="font-medium text-sm mb-2">{category}</h4>
                          <div className="space-y-2">
                            {permissions.map((permission) => {
                              const hasPermission = selectedRole.permissions.includes(permission.id)
                              return (
                                <div
                                  key={permission.id}
                                  className="flex items-center gap-3 text-sm"
                                >
                                  <Checkbox checked={hasPermission} disabled />
                                  <div className="flex-1">
                                    <span className={hasPermission ? "" : "text-muted-foreground"}>
                                      {permission.name}
                                    </span>
                                  </div>
                                  {hasPermission ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <X className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Użytkownicy z tą rolą</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {users.filter(u => u.role === selectedRole.name).length === 0 ? (
                      <p className="text-sm text-muted-foreground">Brak użytkowników</p>
                    ) : (
                      <div className="space-y-2">
                        {users.filter(u => u.role === selectedRole.name).map((user) => (
                          <div key={user.id} className="flex items-center justify-between py-2 border-b last:border-0">
                            <div>
                              <p className="font-medium text-sm">{user.firstName} {user.lastName}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                            <Badge variant={user.isActive ? "default" : "secondary"} className="text-xs">
                              {user.isActive ? "Aktywny" : "Nieaktywny"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button className="flex-1">Edytuj rolę</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* User Detail Sheet */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedUser && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedUser.firstName} {selectedUser.lastName}</SheetTitle>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Informacje podstawowe</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium">{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Telefon</span>
                      <span className="font-medium">{selectedUser.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rola</span>
                      <Badge variant={selectedUser.role === "admin" ? "default" : "secondary"}>
                        {getRoleDisplayName(selectedUser.role)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      {selectedUser.isActive ? (
                        <Badge className="bg-green-100 text-green-700">Aktywny</Badge>
                      ) : (
                        <Badge variant="secondary">Nieaktywny</Badge>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data utworzenia</span>
                      <span className="font-medium">
                        {new Date(selectedUser.createdAt).toLocaleDateString("pl-PL")}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {selectedUser.role === "salesperson" && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        Przypisani dystrybutorzy ({selectedUser.assignedDistributorIds.length})
                      </CardTitle>
                      <CardDescription>
                        Lista dystrybutorów, którymi zarządza ten handlowiec
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {selectedUser.assignedDistributorIds.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Brak przypisanych dystrybutorów</p>
                      ) : (
                        <div className="space-y-2">
                          {getAssignedDistributors(selectedUser).map((distributor) => (
                            <div key={distributor.id} className="flex items-center justify-between py-2 border-b last:border-0">
                              <div>
                                <p className="font-medium text-sm">{distributor.companyName}</p>
                                <p className="text-xs text-muted-foreground">NIP: {distributor.nip}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {distributor.registeredClientsCount} klientów
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Uprawnienia</CardTitle>
                    <CardDescription>
                      Uprawnienia wynikające z roli: {getRoleDisplayName(selectedUser.role)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const userRole = roles.find(r => r.name === selectedUser.role)
                      if (!userRole) return <p className="text-sm text-muted-foreground">Brak roli</p>
                      
                      return (
                        <div className="flex flex-wrap gap-1">
                          {userRole.permissions.map((permId) => {
                            const perm = ALL_PERMISSIONS.find(p => p.id === permId)
                            return perm ? (
                              <Badge key={permId} variant="secondary" className="text-xs">
                                {perm.name}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button className="flex-1">Edytuj użytkownika</Button>
                  <Button variant="outline">
                    {selectedUser.isActive ? "Dezaktywuj" : "Aktywuj"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
