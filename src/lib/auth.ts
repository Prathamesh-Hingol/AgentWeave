import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth"; 
import { polarClient } from "./polar";

export const auth = betterAuth({
  //...
  database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    emailAndPassword:{
        enabled:true   
    },
    plugins:[
        polar({ 
            client: polarClient, 
            createCustomerOnSignUp: true, 
            use: [ 
                checkout({ 
                    products: [ 
                        { 
                            productId: "8e7a2509-7a70-48d0-acda-0d0ffca5ebed", // ID of Product from Polar Dashboard
                            slug: "pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                        } 
                    ], 
                    successUrl:process.env.POLAR_SUCCESS_URL!, 
                    authenticatedUsersOnly: true
                }), 
                portal(), 
            ], 
        }) 
    ]
});