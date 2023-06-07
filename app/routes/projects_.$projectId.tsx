import type { LoaderArgs,ActionArgs} from '@remix-run/node';
import { json, redirect} from '@remix-run/node';
import { useLoaderData, Link, Outlet, useLocation, useSearchParams } from '@remix-run/react';
import axiosClient from "../axiosClient";
import Button from '../components/ui/Button';
import EditDialog from '../components/Projects/EditDialog';
import {storeValidationSchema} from "../components/Projects/validationSchemas";

export const loader = async ({ request, params }: LoaderArgs) => {
  const url = new URL(request.url);

  // // avoid this url since it does not render anything
  if (url.pathname === `/projects/${params.projectId}`) {
    return redirect(`/projects/${params.projectId}/target-groups${url.search}`)
  }

  const project = await axiosClient.get(`http://localhost:3000/api/projects/${params.projectId}`);

  let headers = {};
  if (url.searchParams.get('modal') === 'edit') {
    headers = {
      'Cache-Control': url.searchParams.get('modal') ?
        undefined : 'max-age=5, stale-while-revalidate=55'
    }
  }

  return json(project.data as Project, headers);
}

export async function action({ request, params }: ActionArgs) {
  const body = await request.formData();
  const data = Object.fromEntries(body);
  const url = new URL(request.url);

  try {
    storeValidationSchema.parse(data);
  } catch (e) {
    const errors = e.issues.reduce((acc, value) => {
      acc[value.path[0]] = value.message;
      return acc;
    }, {});

    return json({ errors });
  }

  await axiosClient.put(`/projects/${params.projectId}`, data);

  return redirect(url.pathname);
}

export default function Page() {
  const project = useLoaderData<typeof loader>();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return (
    <div className="flex">
      <div className="flex flex-col bg-white min-w-xl max-w-xxl max-h-full shadow-r-md p-6">
        <div className="flex justify-between align-items mb-4">
          <h1 className="text-xl font-bold">{project.name}</h1>

          <Button asChild variant="contained" className="px-2 py-1">
            <Link to={`${location.pathname}?modal=edit`}>Edit Project</Link>
          </Button>
        </div>

        {searchParams.get('modal') === 'edit' && <EditDialog />}

        <p className="whitespace-nowrap">Purchase Order Number: #{project.purchaseOrderNumber}</p>
        <p className="whitespace-nowrap">Job Number: #{project.jobNumber}</p>
      </div>

      <div className="p-6 bg-gray-100 w-full">
        <Outlet />
      </div>
    </div>
  )
}