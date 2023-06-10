import { GetServerSidePropsContext } from 'next';

import { getLayout } from '@/src/layouts/Layout';
import { getUserInterestZones } from '@/src/utils/queries/interestZones';
import useInterestZones from '@/src/hooks/useInterestZones';
import InterestZone from '@/src/components/InterestZone/InterestZone';

import { QueryClient } from '@tanstack/react-query';
import { GetSessionParams, getSession } from 'next-auth/react';
import Loader from '@/src/components/Loader/Loader';
import Link from 'next/link';

const InterestZones = () => {
  const { interestZones, isLoading } = useInterestZones();

  if (isLoading) return <Loader color="#83CB3D" className="m-auto" size={126} />;

  if (!interestZones?.length)
    return (
      <span className="m-auto text-center text-[36px]">
        You currently have no interest zones. Add some using the{' '}
        <Link href="/dashboard" className="underline">
          dashboard
        </Link>
        .
      </span>
    );

  return (
    <div className="flex w-full flex-col items-center p-5">
      <div className="m-2 mb-4 flex flex-col">
        <span className="text-[30px] font-semibold lg:text-[44px] ">
          Track the state of your {interestZones?.length} current interest zones.
        </span>
      </div>
      <div className="mx-auto flex flex-wrap justify-start gap-5 align-middle">
        {interestZones?.map((zone: InterestZone) => (
          <InterestZone zone={zone} key={zone.id} />
        ))}
      </div>
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

  await client.prefetchQuery(['interest-zones', session?.user.sub], {
    queryFn: () => getUserInterestZones({ isServer: {}, userId: session?.user.sub }),
  });

  return {
    props: {
      title: 'DefTrack - interest zones',
    },
  };
};

InterestZones.getLayout = getLayout;

export default InterestZones;
