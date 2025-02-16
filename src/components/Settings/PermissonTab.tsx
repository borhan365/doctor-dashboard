"use client"

import { useState } from 'react'

interface Permission {
  name: string
  category: string
}

interface Role {
  name: string
}

const permissions: Permission[] = [
  { name: "Activate Graphmarts", category: "Default" },
  { name: "Browse Dashboards", category: "Default" },
  { name: "Browse Models", category: "Default" },
  { name: "Create Dashboards", category: "Default" },
  { name: "Create Graphmarts", category: "Default" },
  { name: "Data On Demand", category: "Default" },
  { name: "Manage Graphmarts", category: "Default" },
  { name: "Manage Models", category: "Default" },
  { name: "Show Query Builder", category: "Default" },
  { name: "View Datasets", category: "Default" },
  { name: "View Graphmarts", category: "Default" },
  { name: "View Provenance", category: "Default" },
  { name: "Create Anzo Data Stores", category: "Data Onboarding" },
  { name: "Create Data Sources", category: "Data Onboarding" },
]

const roles: Role[] = [
  { name: "Everyone" },
  { name: "Authenticated Users" },
  { name: "Anzo Administrator" },
  { name: "Data Analyst" },
  { name: "Data Citizen" },
  { name: "Data Curator" },
  { name: "Data Governor" },
  { name: "Data Scientist" },
]

export default function PermissionTab() {
  const [permissionState, setPermissionState] = useState<Record<string, Record<string, boolean>>>({})

  const togglePermission = (permission: string, role: string) => {
    setPermissionState(prevState => ({
      ...prevState,
      [permission]: {
        ...prevState[permission],
        [role]: !prevState[permission]?.[role]
      }
    }))
  }

  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-black p-5 rounded">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-stroke font-semibold text-left"></th>
            {roles.map(role => (
              <th key={role.name} className="p-2 border border-stroke font-semibold text-center">
                {role.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, index) => (
            <>
              {permission.category === "Default" && index === 0 && (
                <tr>
                  <td colSpan={roles.length + 1} className="p-2 border border-stroke font-semibold bg-gray-200">
                    Default
                  </td>
                </tr>
              )}
              {permission.category === "Data Onboarding" && permissions.filter(p => p.category === "Data Onboarding")[0].name === permission.name && (
                <tr>
                  <td colSpan={roles.length + 1} className="p-2 border border-stroke font-semibold bg-gray-200">
                    Data Onboarding
                  </td>
                </tr>
              )}
              <tr key={permission.name}>
                <td className="p-2 border border-stroke">{permission.name}</td>
                {roles.map(role => (
                  <td key={`${permission.name}-${role.name}`} className="p-2 border border-stroke text-center">
                    <input
                      type="checkbox"
                      checked={permissionState[permission.name]?.[role.name] || false}
                      onChange={() => togglePermission(permission.name, role.name)}
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-stroke rounded"
                    />
                  </td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600">Save</button>
      </div>
    </div>
  )
}
