export interface Permission {
  id: string;
  name: string;
  description: string | null;
  moduleId: string;
  module: {
    id: string;
    name: string;
    description: string | null;
    category: {
      id: string;
      name: string;
      description: string | null;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePermissionInput {
  name: string;
  description?: string;
  moduleId: string;
}

export interface UpdatePermissionInput {
  name?: string;
  description?: string;
  moduleId?: string;
}

export interface GroupedPermissions {
  [category: string]: {
    [module: string]: Permission;
  };
}
