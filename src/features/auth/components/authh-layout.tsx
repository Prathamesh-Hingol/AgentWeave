import Link from "next/link";
import Image from "next/image";
const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-3 self-center font-bold text-2xl">
          <Image src="/logos/agentweave-logo-transparent.svg" alt="AgentWeave" width={60} height={30}/>
          AgentWeave
        </Link>
        {children}
      </div>
    </div>
    );
};

export default AuthLayout;