'use client'
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const Page =() => {
  const trpc = useTRPC();
  const queryClient=useQueryClient();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());
  const create=useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess:()=>{
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
    }
  }));  
  const testAI=useMutation(trpc.testAi.mutationOptions());

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      protected server component
      <div>
      {JSON.stringify(data, null ,2)}
      </div>
      <Button onClick={()=>testAI.mutate()} disabled={testAI.isPending}>
        Test AI
      </Button>
      <Button onClick={()=>create.mutate()} disabled={create.isPending}>
        Create WorkFLow
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Page;