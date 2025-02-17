"use client";

import { User, UserRole, UserStatus } from "@/types/user";
import { useState } from "react";
import { EmailVerificationSection } from "./ui/EmailVerificationSection";
import { ProfileSection } from "./ui/ProfileSection";

const mockUser: User = {
  id: "1234567890",
  name: "John Doe",
  email: "john.doe@example.com",
  emailVerified: null,
  isVerified: false,
  image: "https://via.placeholder.com/150",
  role: UserRole.USER,
  status: UserStatus.PENDING,
  doctorProfile: {
    id: "1234567890",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
  },
};

const SettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <EmailVerificationSection user={mockUser} />
      <ProfileSection
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        user={mockUser}
      />
    </div>
  );
};

export default SettingsPage;
