import AuthLayout from "@/features/auth/components/authh-layout";
const Layout = ({children}: {children: React.ReactNode}) => {
    return (
         <AuthLayout>
        {children}
         </AuthLayout>
    );
};

export default Layout;