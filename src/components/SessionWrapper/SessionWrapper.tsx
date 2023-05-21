import { PropsWithChildren, useEffect } from 'react';

import { logout } from '@/src/helpers/session';

import { useSession } from 'next-auth/react';

const SessionWrapper = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'ExpiredAccessTokenError') {
      logout();
    }
  }, [session?.error]);

  return <>{children}</>;
};

export default SessionWrapper;
