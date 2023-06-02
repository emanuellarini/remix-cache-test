import type { LoaderArgs} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, Link, Outlet, useLocation } from '@remix-run/react';
import axiosClient from "../axiosClient";
import Button from '../components/ui/Button';

export const loader = async ({ request, params }: LoaderArgs) => {
  const url = new URL(request.url);

  // // avoid this url since it does not render anything
  if (url.pathname === `/projects/${params.projectId}`) {
    return redirect(`/projects/${params.projectId}/target-groups`)
  }

  const project = await axiosClient.get(`http://localhost:3000/api/projects/${params.projectId}`);

  return json(project.data as Project);
}

export default function Page() {
  const project = useLoaderData<typeof loader>();
  const location = useLocation();

  return (
    <div className="flex">
      <div className="flex flex-col bg-white min-w-xl max-w-xxl max-h-full shadow-r-md p-6">
        <div className="flex justify-between align-items mb-4">
          <h1 className="text-xl font-bold">{project.name}</h1>

          <Button asChild variant="contained" className="px-2 py-1">
            <Link to={`${location.pathname}/edit`}>Edit Project</Link>
          </Button>
        </div>

        <p className="whitespace-nowrap">Purchase Order Number: #{project.purchaseOrderNumber}</p>
        <p className="whitespace-nowrap">Job Number: #{project.jobNumber}</p>
      </div>

      <div className="p-6 bg-gray-100 w-full">
        <Outlet />
      </div>
    </div>
  )
}