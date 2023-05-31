import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';

import { getLayout } from '@layouts/Layout';
import Map from '@components/Map/Map';

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-full w-full">
      <Map />
    </div>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      title: 'DefTrack - Dashboard',
    },
  };
};

Dashboard.getLayout = getLayout;

export default Dashboard;
