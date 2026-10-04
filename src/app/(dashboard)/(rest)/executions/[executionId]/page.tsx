import { requireAuth } from "@/lib/auth-utils";

interface PageParams{
    params: Promise<{executionId:string}>
}
const Page=async ({params}:PageParams)=>{
    await requireAuth();

    const {executionId}=await params
    return(
        <p> Execution Page {executionId}</p>
    )
}