import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { login, type LoginRequest, type LoginResponse } from "@/lib/api/auth";

export function useLoginMutation(
  options?: Omit<
    UseMutationOptions<LoginResponse, Error, LoginRequest, unknown>,
    "mutationFn"
  >
) {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    ...options,
  });
}
