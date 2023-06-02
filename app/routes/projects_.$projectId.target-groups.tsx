import type { LoaderArgs} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import axiosClient from "../axiosClient";

export const loader = async ({ params }: LoaderArgs) => {
  const targetGroups = await axiosClient.get(`http://localhost:3000/api/projects/${params.projectId}/target-groups`);

  return json(targetGroups.data as TargetGroup[]);
}

export default function Page() {
  const targetGroups = useLoaderData<typeof loader>();

  return (
    <>
      <Outlet />

      <h1 className="text-xl">Target Groups</h1>

      <div className="flex flex-col max-w-2xl bg-white rounded-md mt-4">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Earnings Per Click #</th>
                </tr>
                </thead>
                <tbody>
                {targetGroups.map(tg => (
                  <tr className="border-b dark:border-neutral-500" key={tg.id}>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{tg.id}</td>
                    <td className="whitespace-nowrap px-6 py-4">{tg.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{tg.earningsPerClick?.toFixed(2)}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}