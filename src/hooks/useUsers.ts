import { ApiUrl } from "@/app/Variables";
import { User, UserResponse, UsersResponse } from "@/types/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Fetch all users with pagination and filters
export const useUsers = (page = 1, limit = 10, filters = {}) => {
  return useQuery<UsersResponse>({
    queryKey: ["users", page, limit, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      });

      const response = await axios.get(
        `${ApiUrl}/users/get-all?${params.toString()}`,
      );
      return response.data;
    },
  });
};

// Fetch a single user by ID
export const useUser = (id: string) => {
  return useQuery<UserResponse>({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/users/get-single/${id}`);
      return response.data;
    },
    enabled: !!id, // Only run the query if an ID is provided
  });
};

// Create a new user
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Partial<User>) => {
      const response = await axios.post(`${ApiUrl}/users/create`, userData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Update an existing user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      userData,
    }: {
      id: string;
      userData: Partial<User>;
    }) => {
      const response = await axios.put(
        `${ApiUrl}/users/update/${id}`,
        userData,
        {
          withCredentials: true, // Include credentials
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        },
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
};

// Delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`${ApiUrl}/users/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Change user status (activate, suspend, ban)
export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await axios.patch(
        `${ApiUrl}/users/update/${id}/status`,
        {
          status,
        },
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
};

// Verify a user
export const useVerifyUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.patch(`${ApiUrl}/users/update/${id}/verify`);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
};
