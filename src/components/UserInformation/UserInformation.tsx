import { useSession } from 'next-auth/react';
import { MouseEventHandler } from 'react';

import ImageIcon from '@components/ImageIcon/ImageIcon';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

interface UserInformationProps {
  className?: string;
  onClick?: MouseEventHandler<any> | undefined;
}

const UserInformation = ({ className = '', onClick = () => {} }: UserInformationProps) => {
  const { data: session } = useSession();

  return (
    <div className={twMerge('flex items-center gap-3', className)} onClick={onClick}>
      <ImageIcon
        icon={faUser}
        src={session?.user.image}
        alt="profile-picture"
        width={38}
        height={38}
        className="rounded-full"
        iconClassName="text-[38px] rounded-full"
      />
      <span className="text-lg font-medium text-gray-200">{session?.user.name ?? session?.user.email}</span>
    </div>
  );
};

export default UserInformation;
