import { PropsWithChildren, useEffect } from 'react';

import { logout } from '@/src/helpers/session';

import { useSession } from 'next-auth/react';

const SessionWrapper = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.token.error === 'ExpiredAccessTokenError') {
      logout();
    }
  }, [session?.token.error]);

  return <>{children}</>;
};

export default SessionWrapper;
