import { useState } from 'react';

import UserInformation from '@components/UserInformation/UserInformation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SwipeableDrawer } from '@mui/material';
import Link from 'next/link';
import { logout } from '@/src/helpers/session';

const SideNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden">
      <FontAwesomeIcon icon={faBars} className="cursor-pointer text-2xl text-white" onClick={() => setOpen(true)} />
      <SwipeableDrawer open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} className="">
        <div className="flex h-full w-[320px] flex-col gap-4 bg-green p-4">
          <UserInformation />
          <div className="flex flex-col px-2 text-lg font-medium text-white">
            <Link href="/profile" className="ml-0 mr-auto">
              Profile
            </Link>
            <Link href="/" onClick={logout} className="ml-0 mr-auto">
              Sign out
            </Link>
          </div>
          <div className="flex flex-col px-2 text-lg font-medium">
            <Link href="/dashboard" className="ml-0 mr-auto">
              Dashboard
            </Link>
            <Link href="/interest-zones" className="ml-0 mr-auto">
              Interest zones
            </Link>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default SideNavigation;
