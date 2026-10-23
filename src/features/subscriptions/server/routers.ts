import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { getCustomerProStatus } from "@/lib/polar";

export const subscriptionsRouter = createTRPCRouter({
	getStatus: protectedProcedure.query(async ({ ctx }) => {
		return getCustomerProStatus(ctx.auth.user.id);
	}),
});
