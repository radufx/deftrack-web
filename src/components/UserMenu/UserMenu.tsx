import { useState } from 'react';
import { useRouter } from 'next/router';

import UserInformation from '@components/UserInformation/UserInformation';
import { logout } from '@helpers/session';

import { Menu, MenuItem } from '@mui/material';

const UserMenu = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    logout();
    handleClose();
  };

  return (
    <div className="hidden md:flex">
      <UserInformation onClick={handleClick} className="cursor-pointer" />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem className="w-[200px] justify-center" onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
