"use client";

import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { toast } from "sonner";

interface ApiMutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidate?: QueryKey[];
  successMessage?: string | ((data: TData) => string);
  onSuccess?: (data: TData, variables: TVariables) => void;
}

export function useApiMutation<TData, TVariables = void>({ mutationFn, invalidate = [], successMessage, onSuccess }: ApiMutationOptions<TData, TVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: async (data, variables) => {
      await Promise.all(invalidate.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
      if (successMessage) toast.success(typeof successMessage === "function" ? successMessage(data) : successMessage);
      onSuccess?.(data, variables);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    },
  });
}
