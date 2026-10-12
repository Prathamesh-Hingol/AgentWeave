import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const requireAuth = async () => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			redirect("/login");
		}

		return session;
	} catch (err) {
		// Next.js redirect() throws a special NEXT_REDIRECT error internally.
		// We must re-throw it so the redirect actually works.
		if (
			err instanceof Error &&
			(err as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")
		) {
			throw err;
		}
		console.log(err);
	}
};

export const requireUnauth = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect("/");
	}
};
