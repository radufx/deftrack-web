import { signIn, useSession } from 'next-auth/react';
import { GetStaticProps } from 'next';

import Button from '@components/Button/Button';
import { getLayout } from '@/src/layouts/Layout';
import { logout } from '../helpers/session';

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className="m-auto flex max-w-[500px] flex-col items-center gap-2">
      <h1 className="text-[48px]">Welcome to DefTrack</h1>

      {session ? (
        <>
          <Button onClick={() => logout()} className="w-[300px]" intent="quaternary">
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => signIn('cognito', { callbackUrl: '/dashboard' })} className="w-[300px]">
            Sign in
          </Button>
          <Button className="w-[300px]" intent="quaternary">
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      title: 'DefTrack',
    },
  };
};

Home.getLayout = getLayout;

export default Home;
