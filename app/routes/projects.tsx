import { Suspense } from "react";
import type { LoaderArgs} from '@remix-run/node';
import {defer} from '@remix-run/node';
import {useLoaderData, Link, Outlet, Await} from '@remix-run/react';
import axiosClient from "../axiosClient";
import Button from '../components/ui/Button';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getProjects(delay?: number) {
  return axiosClient.get('http://localhost:3000/api/projects')
    .then(res => sleep(delay || 0).then(() => {
      return res.data;
    }));
}

export const loader = ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const delay = url.searchParams.get('delay');

  const projectsPromise = getProjects(delay ? Number(delay) : undefined);

  return defer({
    projects: projectsPromise
  });
}

export default function Page() {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <div className="flex justify-between align-items">
        <h1 className="text-xl font-bold">Projects</h1>
        <Button asChild>
          <Link to="/projects/create">Create Project</Link>
        </Button>

        <Outlet />
      </div>

      <div className="flex flex-col max-w-2xl bg-white rounded-md">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Purchase Order #</th>
                  <th scope="col" className="px-6 py-4">Job #</th>
                </tr>
                </thead>
                <tbody>
                  <Suspense
                    fallback={
                      <tr>
                        <td colSpan={4} className="pt-4 text-center">
                          Loading...
                        </td>
                      </tr>
                    }
                  >
                    <Await
                      resolve={projects}
                      errorElement={
                        <tr>
                          <td colSpan={4} className="pt-4 text-center">
                            Error loading projects!
                          </td>
                        </tr>
                      }
                    >
                      {(response => {
                        return response.map((project) => (
                        <tr className="border-b dark:border-neutral-500" key={project.id}>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{project.id}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link to={`/projects/${project.id}/target-groups`}>{project.name}</Link>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{project.purchaseOrderNumber}</td>
                          <td className="whitespace-nowrap px-6 py-4">{project.jobNumber}</td>
                        </tr>
                      ))})}
                    </Await>
                  </Suspense>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}