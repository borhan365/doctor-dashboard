# Authentication & Role Management for Healtha.io

## 📌 Authentication Features

Healtha.io implements a **secure and scalable** authentication system with support for:

- **Login with Google**
- **Register with Google**
- **Forgot Password & Reset Password**
- **Email Verification via OTP**
- **Phone Verification via OTP**
- **Change Password**
- **Session Management & Token-Based Authentication (JWT)**

### 🔹 **Login with Google**

- Users can authenticate using Google OAuth.
- If the user does not exist, a new account will be created automatically.
- Redirect users to their respective dashboard after authentication.

### 🔹 **Register with Google**

- Allows users to sign up using their Google account.
- Auto-fills user details (name, email, profile picture).
- Users must complete any missing information before full access.

### 🔹 **Forgot Password & Reset Password**

- Users can request a password reset link via email.
- The reset link is valid for a limited time (e.g., 15 minutes).
- After clicking the link, users must enter a new password.

### 🔹 **Email Verification (OTP-Based)**

- Users receive a **one-time password (OTP)** to verify their email.
- OTP expires after **5 minutes**.
- Users must verify their email before accessing protected features.

### 🔹 **Phone Verification (OTP-Based)**

- Users can link their phone numbers and receive an OTP for verification.
- Used for secure authentication and appointment confirmations.

### 🔹 **Change Password**

- Users can change their password from their profile settings.
- Requires entering the old password for security.

---

## 📌 Role Management

Healtha.io follows **Role-Based Access Control (RBAC)** to manage user permissions.

### 🔹 **Admin Roles (Dashboard Route: `/dashboard`)**

1. **Super Admin**

   - Full access to all features and data (No restrictions).
   - Can create, update, or delete **Admins & Editors**.
   - Can manage **advertisements, users, doctors, hospitals, and pharmaceuticals**.

   **User Management**

   - Create/Delete other admin accounts
   - Modify role permissions
   - View audit logs
   - Access system metrics

   **Content Management**

   - Approve/Reject content
   - Manage global settings
   - Override content restrictions

2. **Admin (Dynamic Role)**

   - Permissions are managed dynamically via the admin dashboard.
   - Can manage doctors, hospitals, pharmaceuticals, and user reports.

3. **Editor (Dynamic Role)**
   - Can edit content but has restricted access to user management.
   - Cannot modify financial transactions or advertisements.

### 🔹 **User-Centric Roles**

1. **Doctor (Dashboard Route: `/doctor`)**

   - Can access **only their own profile**.
   - Can **update their profile, manage appointments, and issue prescriptions**.
   - Can **add up to 2 assistants** to help manage their profile.

   **Profile Management**

   - Update professional credentials
   - Manage availability calendar
   - Upload medical certificates

   **Assistant Management**

   - Add/Remove assistants (max 2)
   - Define assistant permissions:
     - Schedule management
     - Patient record access (read-only)
     - Communication with patients
     - Cannot: Modify prescriptions, Update doctor's profile

   **Patient Interaction**

   - View assigned patient records
   - Issue/Modify prescriptions
   - Schedule appointments
   - Send notifications

2. **Hospital (Dashboard Route: `/hospital`)**

   - Can manage **only one hospital**.
   - Can **create multiple branches**.
   - Can **add up to 3 staff members** for administrative tasks.

   **Branch Management**

   - Create new branches (with location verification)
   - Assign branch administrators
   - Set branch-specific policies

   **Staff Management**

   - Add/Remove staff (max 3 per branch)
   - Define staff roles:
     - Reception: Appointment management
     - Administration: Document handling
     - Billing: Payment processing

   **Resource Management**

   - Manage department listings
   - Update facility information
   - Handle emergency notifications

3. **User/Patient (Dashboard Route: `/user`)**

   - Can update their profile.
   - Can **write reviews, bookmark doctors, and leave comments**.
   - Cannot access **other users' medical records or prescriptions**.

4. **Pharmaceutical Company (Dashboard Route: `/pharmaceutical`)**

   - Can access **doctors' prescriptions**.
   - Can view **doctor profiles and patient trends**.
   - Can analyze **medicine prescription trends**.

   **Data Access**

   - View anonymized prescription data
   - Access aggregated trending reports
   - Monitor medicine usage patterns
   - Export permitted reports

   **Restrictions**

   - No access to patient personal information
   - Cannot view individual patient histories
   - Limited to approved medicine categories
   - Data access limited to relevant geography

---

## 📌 Security Considerations

- **JWT-Based Authentication:** Used for secure session handling.
- **OAuth 2.0 Integration:** Google authentication support.
- **RBAC Implementation:** Ensures users only access permitted resources.
- **Rate Limiting & Brute Force Protection:** Prevents abuse of authentication endpoints.
- **Data Encryption:** All sensitive data (passwords, OTPs) are encrypted.

---

## 📌 Access Control Summary

| Role               | Access Scope                                        | Route             |
| ------------------ | --------------------------------------------------- | ----------------- |
| **Super Admin**    | Full access to everything                           | `/dashboard`      |
| **Admin**          | Dynamic permissions (Managed via dashboard)         | `/dashboard`      |
| **Editor**         | Can manage content, limited access to users         | `/dashboard`      |
| **Doctor**         | Can manage own profile, add assistants              | `/doctor`         |
| **Hospital**       | Can manage one hospital, create branches, add staff | `/hospital`       |
| **User/Patient**   | Can review, bookmark, comment, and update profile   | `/user`           |
| **Pharmaceutical** | Can access prescriptions, doctor profiles, trends   | `/pharmaceutical` |

---

## 📌 Future Enhancements

- **Two-Factor Authentication (2FA) via Email or SMS**.
- **Biometric Login (Fingerprint/FaceID for mobile users)**.
- **Social Login Expansion (Facebook, Apple ID, LinkedIn)**.
