export interface Permission {
  id: string;
  label: string;
}

// Define available permissions
export const PERMISSIONS: Permission[] = [
  { id: "view", label: "View" },
  { id: "create", label: "Create" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
  { id: "multiple_profiles", label: "Multiple Profiles" },
];

// Helper function to create permission string
export const createPermission = (moduleId: string, permission: Permission) =>
  `${moduleId}_${permission.id}`;

// Helper function to check if a permission is granted
export const hasPermission = (
  userPermissions: string[],
  moduleId: string,
  permissionId: string,
) => {
  return userPermissions.includes(`${moduleId}_${permissionId}`);
};

// Helper function to get all possible permissions for a module
export const getAllModulePermissions = (moduleId: string) => {
  return PERMISSIONS.map((permission) =>
    createPermission(moduleId, permission),
  );
};

// Helper function to check if all permissions are granted for a module
export const hasAllPermissions = (
  userPermissions: string[],
  moduleId: string,
) => {
  const allModulePermissions = getAllModulePermissions(moduleId);
  return allModulePermissions.every((permission) =>
    userPermissions.includes(permission),
  );
};

// Export types for better TypeScript support
export type PermissionId = (typeof PERMISSIONS)[number]["id"];
