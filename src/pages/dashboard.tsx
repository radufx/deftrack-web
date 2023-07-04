import { GetServerSidePropsContext } from 'next';
import { GetSessionParams, getSession, useSession } from 'next-auth/react';

import { getLayout } from '@layouts/Layout';
import Map from '@components/Map/Map';
import { getUserInterestZones } from '@utils/queries/interestZones';

import { QueryClient } from '@tanstack/react-query';

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-full w-full">
      <Map />
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const client = new QueryClient();
  const session = await getSession(context as GetSessionParams);

  if (!session?.user.sub) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
        revalidate: 60 * 60,
      },
    };
  }

  await client.prefetchQuery(['interest-zones'], {
    queryFn: () => getUserInterestZones({ isServer: {}, userId: session.user.sub }),
  });

  return {
    props: {
      title: 'DefTrack - dashboard',
    },
  };
};

Dashboard.getLayout = getLayout;

export default Dashboard;
