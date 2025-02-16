# Healtha V2 User & Role Management System

## Overview
I'm building Healtha V2, a doctor and hospital directory with a role-based user system where:

- Doctors & Hospitals can register with their own email and phone number
- Doctors can manage chambers, appointments, and assistants
- Hospitals can manage staff, doctors, and services 
- Users have specific roles, permissions, and hierarchical sub-users

## User Model & Role System
- Every user has a single role field (instead of multiple role-related fields)
- Admins are superpower users who can manage all users and settings
- Doctors & Hospitals can create sub-users (assistants and staff), but they cannot manage other doctors or hospitals

## Roles & Hierarchy

| Role | Can Create/Manage | Restrictions |
|------|------------------|--------------|
| SUPER_ADMIN | Everything (Admins, Doctors, Hospitals, Staff, Assistants) | No restrictions |
| ADMIN | Manage Users (Doctors, Hospitals, Staff, Assistants) | Cannot control SUPER_ADMIN |
| DOCTOR | Can create Assistants, manage chambers & appointments | Cannot create Doctors |
| HOSPITAL | Can create Staff, manage services & hospital settings | Cannot create Hospitals |
| STAFF | Works under a Hospital | No sub-users |
| ASSISTANT | Works under a Doctor | No sub-users |
| USER | General User | No sub-users |

## Technical Implementation

### Database: Prisma (with Next.js)

#### User Model:
- A single role field (Enum)
- parentId to track sub-users (for Doctors & Hospitals)
- Relations for hierarchical management (Doctor → Assistants, Hospital → Staff)
- Authentication: Email & Phone-based signup
- Permissions: Role-based access control (RBAC)

## Key Features to Build
- User Registration (Doctors, Hospitals, General Users)
- Role-Based Dashboard (Separate for Admin, Doctor, and Hospital)
- Sub-User Management (Doctors → Assistants, Hospitals → Staff)
- Super Admin Panel (Full control over system users)

## Final Goal
To create a scalable, secure, and efficient doctor-hospital directory where roles are clearly defined and sub-users are managed within their scope while keeping Admins as the highest authority.

// complete UserRole Enum
// enum UserRole {
//   SUPER_ADMIN
//   -- ADMIN
//   -- EDITOR
//   -- VIEWER
//   DOCTOR
//   -- ASSISTANT
//   HOSPITAL
//   -- STAFF
//   AMBULANCE
//   PHARMACUTICAL
//   APPS
//   USER 
// }