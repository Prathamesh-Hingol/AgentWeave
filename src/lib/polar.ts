import { createPolarCore } from "@polar-sh/sdk/2026-10"; 

export const polarClient = createPolarCore({ 
    accessToken: process.env.POLAR_ACCESS_TOKEN!, 
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
    environment: 'sandbox'
});