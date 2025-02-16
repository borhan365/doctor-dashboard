"use client";

import { LogoutButton } from "@/components/common/LogoutButton";

export const Header = () => {
  return (
    <header>
      {/* Other header content */}
      <div className="flex items-center gap-4">
        {/* Other elements */}
        <LogoutButton />
      </div>
    </header>
  );
};
