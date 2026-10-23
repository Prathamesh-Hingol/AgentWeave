import { createPolarCore } from "@polar-sh/sdk/2026-10";
import { getStateExternalCustomers } from "@polar-sh/sdk/2026-10/services/customers";
import { createCustomerSessions } from "@polar-sh/sdk/2026-10/services/customer_sessions";
import { listOrders as listCustomerPortalOrders } from "@polar-sh/sdk/2026-10/services/customer_portal/orders";

export const polarClient = createPolarCore({
	accessToken: process.env.POLAR_ACCESS_TOKEN!,
	// Use 'sandbox' if you're using the Polar Sandbox environment
	// Remember that access tokens, products, etc. are completely separated between environments.
	// Access tokens obtained in Production are for instance not usable in the Sandbox environment.
	environment: "sandbox",
});

export interface ProStatusResult {
	isPro: boolean;
	subscription?: any;
	order?: any;
	state?: any;
	error?: string;
}

/**
 * Checks whether a user has an active Pro entitlement in Polar.
 * Supports:
 * 1. Recurring subscriptions (active_subscriptions > 0)
 * 2. Granted benefits (granted_benefits > 0)
 * 3. Paid one-time orders (e.g. lifetime access or one-time purchases)
 */
export async function getCustomerProStatus(
	userId: string,
): Promise<ProStatusResult> {
	if (!userId) {
		return { isPro: false };
	}

	try {
		// 1. Check customer state (active subscriptions and granted benefits)
		const state = await getStateExternalCustomers(polarClient)(userId);
		const hasActiveSub = Boolean(
			state?.active_subscriptions && state.active_subscriptions.length > 0,
		);
		const hasBenefit = Boolean(
			state?.granted_benefits && state.granted_benefits.length > 0,
		);

		if (hasActiveSub || hasBenefit) {
			return {
				isPro: true,
				subscription: state?.active_subscriptions?.[0],
				state,
			};
		}

		// 2. Check customer portal orders (handles one-time Pro purchases)
		try {
			const session = await createCustomerSessions(polarClient)({
				external_customer_id: userId,
			});
			const orders = await listCustomerPortalOrders(polarClient)(
				{},
				{ accessToken: session.token },
			);
			const paidOrder = orders?.items?.find(
				(order) => order.status === "paid",
			);

			if (paidOrder) {
				return {
					isPro: true,
					order: paidOrder,
					state,
				};
			}
		} catch {
			// Order check failed, keep isPro as false
		}

		return {
			isPro: false,
			state,
		};
	} catch (error: any) {
		// If customer doesn't exist in Polar (404), user is not Pro
		return {
			isPro: false,
			error: error?.message,
		};
	}
}