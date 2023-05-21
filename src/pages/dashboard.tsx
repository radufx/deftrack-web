import { GetStaticProps } from 'next';

import { getLayout } from '@layouts/Layout';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session } = useSession();

  return <></>;
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      title: 'DefTrack - dashboard',
    },
  };
};

Dashboard.getLayout = getLayout;

export default Dashboard;
