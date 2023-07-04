import { GetStaticPropsContext } from 'next';

import { getLayout } from '@/src/layouts/Layout';
import { getInterestZone, getInterestZoneIds } from '@/src/utils/queries/interestZones';
import Map from '@/src/components/Map/Map';
import Loader from '@/src/components/Loader/Loader';

import { QueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import InterestZoneInformation from '@/src/components/InterestZoneInformation/InterestZoneInformation';

const InterestZonePage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: zone } = useQuery({
    queryKey: ['interest-zone', id],
    queryFn: () => getInterestZone({ zoneId: id }),
  });

  if (!zone) return <Loader color="#83CB3D" className="m-auto" size={126} />;

  return (
    <div className="flex min-h-full w-full flex-col-reverse md:flex-row">
      <div className="flex h-full min-w-full flex-col md:min-w-[50%]">
        <InterestZoneInformation zone={zone} />
      </div>
      <Map className="h-[300px] md:h-full" readOnly centerTo={{ lng: zone.lng, lat: zone.lat }} />
    </div>
  );
};

export async function getStaticPaths() {
  let paths = [] as { params: { id: string } }[];

  const ids = await getInterestZoneIds({});

  for (const id of ids) {
    paths.push({ params: { id } });
  }

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const client = new QueryClient();

  await client.prefetchQuery(['interest-zone'], {
    queryFn: () => getInterestZone({ isServer: {}, zoneId: params?.id as string }),
  });

  return {
    props: {
      title: 'Interest zone',
    },
  };
};

InterestZonePage.getLayout = getLayout;
export default InterestZonePage;
