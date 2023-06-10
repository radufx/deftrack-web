import { GetSessionParams, getSession, signIn, useSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { logout } from '@helpers/session';

import Button from '@components/Button/Button';
import { getLayout } from '@layouts/Layout';

const Home = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: false,
    onUnauthenticated: () => {
      router.push('/dashboard');
    },
  });

  return (
    <div className="m-auto flex max-w-[500px] flex-col items-center gap-2">
      <h1 className="text-center text-[48px] font-semibold">Welcome to DefTrack</h1>
      <h5 className="text-center">You need to be signed in to use the application.</h5>

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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context as GetSessionParams);

  if (session?.user.sub) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
        revalidate: 60 * 60,
      },
    };
  }

  return {
    props: {
      title: 'DefTrack',
    },
  };
};

Home.getLayout = getLayout;

export default Home;
