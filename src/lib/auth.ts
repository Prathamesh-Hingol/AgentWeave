import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";
import {
	polar,
	checkout,
	portal,
} from "@polar-sh/better-auth";
import { polarClient } from "./polar";

export const auth = betterAuth({
	//...
	database: prismaAdapter(prisma, {
		provider: "postgresql", // or "mysql", "sqlite", ...etc
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	plugins: [
		polar({
			client: polarClient,
			createCustomerOnSignUp: true,
			use: [
				checkout({
					products: [
						{
							productId: "8e7a2509-7a70-48d0-acda-0d0ffca5ebed", // ID of Product from Polar Dashboard
							slug: "pro", // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
						},
					],
					successUrl: process.env.POLAR_SUCCESS_URL!,
					authenticatedUsersOnly: true,
				}),
				portal(),
			],
		}),
	],
});
