import { ApiUrl } from "@/app/Variables";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import Image from "next/image";
import { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const { Option } = Select;

interface AdminAuthorBoxProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function AdminAuthorBox({
  value,
  onChange,
}: AdminAuthorBoxProps) {
  // Static data for demo purposes
  const user = { id: "demo-user-id" };

  // Fetch admin users using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const response = await fetch(`${ApiUrl}/users/get-all`);
      if (!response.ok) {
        throw new Error("Failed to fetch admin users");
      }
      const data = await response.json();
      return data.data?.users || [];
    },
  });

  // Set current admin user as default when component mounts
  useEffect(() => {
    if (!value && user?.id) {
      const currentUser = data?.find(
        (user: any) => user.id === user.id && user.role.name === "ADMIN",
      );
      if (currentUser) {
        onChange(currentUser.id);
      }
    }
  }, [user, value, onChange, data]);

  const adminUsers =
    (data && data?.filter((user: any) => user.role.name === "ADMIN")) || [];

  if (error) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-4">
        <p className="text-red-600">Error loading admin users</p>
      </div>
    );
  }

  return (
    <div className="rounded border border-slate-200 bg-white">
      <div className="p-4">
        <label
          htmlFor="admin"
          className="mb-2 block text-base font-medium text-gray-700"
        >
          Hospital Admin
        </label>

        <Select
          showSearch
          loading={isLoading}
          value={value || undefined}
          onChange={onChange}
          className="custom-antd-input w-full"
          placeholder={isLoading ? "Loading admins..." : "Select admin"}
          optionFilterProp="children"
          filterOption={(input, option) =>
            ((option?.children as unknown as string) || "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          allowClear
          suffixIcon={<IoIosArrowDown size={20} />}
        >
          {adminUsers.map((user: any) => (
            <Option key={user.id} value={user.id}>
              <div className="flex items-center gap-2">
                {user.image ? (
                  <Image
                    width={24}
                    height={24}
                    src={user.image}
                    alt={user.name || ""}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                    {user.name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <span>{user.name || "Unnamed Admin"}</span>
              </div>
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
}
