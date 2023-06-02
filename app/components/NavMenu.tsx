import {Form, Link} from '@remix-run/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PersonIcon } from '@radix-ui/react-icons';
import { RadioGroup, RadioGroupItem } from '../components/ui/RadioGroup';

function RadioItem({ value, label }: { label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <RadioGroupItem value={value} id={label} type="submit" />
      <label className="text-black text-[15px] leading-none pl-[15px] cursor-pointer" htmlFor={label}>
        {label}
      </label>
    </div>
  )
}

export default function NavMenu({ theme = 'light' }: { theme?: string }) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black dark:bg-blue-950 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Mozart UI</span>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-white hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/projects"
             className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
            Projects
          </Link>
        </div>
        <Form method="POST">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-black bg-white shadow-[0_2px_10px] shadow-black outline-none hover:bg-white focus:shadow-[0_0_0_2px] focus:shadow-black"
                aria-label="Options"
              >
                <PersonIcon />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              className="min-w-[220px] bg-white rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              <DropdownMenu.Label className="pl-[25px] text-xs leading-[25px] text-black opacity-60">
                Theme
              </DropdownMenu.Label>


              <RadioGroup
                name="theme"
                className="flex flex-col gap-2.5"
                defaultValue={theme}
                aria-label="Theme"
              >
                <RadioItem value="light" label="Light" />
                <RadioItem value="dark" label="Dark" />
              </RadioGroup>
            </DropdownMenu.Content>

          </DropdownMenu.Root>
        </Form>
      </div>
    </nav>
  )
}