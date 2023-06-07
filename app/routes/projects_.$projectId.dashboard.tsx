import { Outlet } from '@remix-run/react';

export default function Page() {
  return (
    <>
      <Outlet />

      <h1 className="text-xl">Dashboard</h1>
    </>
  )
}