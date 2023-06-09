import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { post, put, request } from './queryClient';

type GetUserInterestZones = {
  userId: string;
  isServer?: NextApiRequestCookies;
};
type GetInterestZone = {
  zoneId: string;
  isServer?: NextApiRequestCookies;
};

type UpdateZoneDetailsType = {
  id: string;
  name: string;
  description?: string;
  priority: 'unset' | 'low' | 'medium' | 'high';
};

export const getUserInterestZones = async ({ isServer = undefined, userId }: GetUserInterestZones) => {
  return (await request({
    url: `/api/service/interest-zones?userId=${userId}`,
    isServer,
  })) as InterestZone[];
};

export const getInterestZoneIds = async (isServer?: NextApiRequestCookies) => {
  return (await request({
    url: `/api/service/interest-zones/ids`,
    isServer,
  })) as string[];
};

export const getInterestZone = async ({ isServer = undefined, zoneId }: GetInterestZone) => {
  return (await request({
    url: `/api/service/interest-zones/${zoneId}`,
    isServer,
  })) as InterestZone;
};

export const addInterestZone = async (interestZone: InterestZone) => {
  return await post({
    url: '/api/service/interest-zones',
    body: interestZone,
  });
};

export const updateZoneDetails = async (interestZone: UpdateZoneDetailsType) => {
  return await put({
    url: `/api/service/interest-zones/${interestZone.id}`,
    body: interestZone,
  });
};
