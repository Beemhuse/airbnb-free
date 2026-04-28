import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMe, login, logout, register, getCookie } from "@/lib/api";
import { useEffect, useState } from "react";

export function useAuth() {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for token on mount and when it changes
    const currentToken = getCookie("access_token");
    setToken(currentToken);
  }, []);

  const userQuery = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!token,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data.user);
      setToken(data.access_token || getCookie("access_token"));
      window.location.href = "/";
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data.user);
      setToken(data.token || getCookie("access_token"));
      window.location.href = "/";
    },
  });

  const handleLogout = () => {
    logout();
    setToken(null);
    queryClient.setQueryData(["me"], null);
    queryClient.removeQueries({ queryKey: ["me"] });
    window.location.href = "/";
  };

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading && !!token,
    isLoggedIn: !!token,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout: handleLogout,
    error: userQuery.error || loginMutation.error || registerMutation.error,
  };
}
