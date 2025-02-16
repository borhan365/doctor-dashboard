export interface UserRole {
  id: string;
  name: string;
  description: string | null;
  rolePermissions: UserRolePermission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  actions: string[];
  permission: {
    id: string;
    name: string;
    description: string | null;
    module: {
      id: string;
      name: string;
      category: {
        id: string;
        name: string;
      };
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPermission {
  id: string;
  name: string;
  description?: string;
}

export interface CreateRoleInput {
  name: string;
  description?: string;
  permissionIds: string[];
}

export interface UpdateRoleInput {
  name?: string;
  description?: string;
  permissionIds?: string[];
}

export interface RolePermissionInput {
  roleId: string;
  permissionId: string;
  actions: string[];
}
