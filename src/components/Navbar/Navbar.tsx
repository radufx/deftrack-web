import Link from 'next/link';

import SideNavigation from './SideNavigation';
import UserMenu from '@components/UserMenu/UserMenu';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[50] flex w-full flex-col items-center ">
      <div className="flex min-h-[60px] w-full flex-1 items-center justify-between bg-[#83CB3D] px-6 py-2">
        <div className="flex items-center">
          <SideNavigation />
          <div className="hidden items-center gap-10 font-medium text-white md:flex">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/interest-zones">Interest Zones</Link>
          </div>
        </div>
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
