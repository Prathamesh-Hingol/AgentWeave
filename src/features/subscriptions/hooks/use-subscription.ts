import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const useSubscription = () => {
  const trpc = useTRPC();
  return useQuery(trpc.subscriptions.getStatus.queryOptions());
};

export const useHasActiveSubscription = () => {
  const { data, isLoading, ...rest } = useSubscription();

  const hasActiveSubscription = Boolean(data?.isPro);

  return {
    hasActiveSubscription,
    subscription: data?.subscription,
    order: data?.order,
    isLoading,
    ...rest,
  };
};