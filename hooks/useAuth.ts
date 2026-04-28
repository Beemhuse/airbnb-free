import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMe, login, logout, register, getCookie } from "@/lib/api";
import { useEffect, useState } from "react";

export function useAuth() {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const currentToken = getCookie("access_token");
    setToken(currentToken ?? null);
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
      // Only store the token the server just issued — never fall back to an old one
      const resolvedToken = data.access_token ?? null;
      setToken(resolvedToken);
      queryClient.setQueryData(["me"], data.user ?? null);
      if (resolvedToken) {
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }
    },
  });

  // Register does NOT redirect — the onboarding flow controls the next step
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      const resolvedToken =
        data.access_token || data.token || getCookie("access_token");
      setToken(resolvedToken ?? null);
      queryClient.setQueryData(["me"], data.user);
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
    // Expose mutate (fire-and-forget with optional callbacks) and mutateAsync (awaitable)
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: handleLogout,
    error: userQuery.error,
  };
}
