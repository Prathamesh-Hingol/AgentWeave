
import { prefetchWorkflows } from "@features/workflow/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { workflowsParamsLoader } from "@/features/workflow/server/params-loader";
import { 
  WorkflowsContainer, 
  WorkflowsList, 
  WorkflowsLoading,
  WorkflowsError,
} from "@/features/workflow/components/workflows";
import type { SearchParams } from "nuqs/server";
type Props = {
	searchParams: Promise<SearchParams>;
};

const Page = async ({searchParams}:Props) => {
	await requireAuth();

	const params = await workflowsParamsLoader(searchParams);
	prefetchWorkflows(params);

	return (
		<WorkflowsContainer>
			<HydrateClient>
				<ErrorBoundary fallback={<WorkflowsError/>}>
					<Suspense fallback={<WorkflowsLoading/>}>
						<WorkflowsList />
					</Suspense>
				</ErrorBoundary>
			</HydrateClient>
		</WorkflowsContainer>
	);
};

export default Page;
