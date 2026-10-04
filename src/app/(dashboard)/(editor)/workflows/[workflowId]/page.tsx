import { requireAuth } from "@/lib/auth-utils";

const Page=async ()=>{
    await requireAuth();
    return(
        <p> workflow page id </p>
    )
}
export default Page