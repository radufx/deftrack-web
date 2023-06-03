import { Record } from '@/src/types/record';
import { post, request } from './queryClient';

type GetRecordImageSignedUrlType = {
  name: string;
  type: string;
  userId: string;
  recordId: string;
};

export const getRecordImageSignedUrl = async (body: GetRecordImageSignedUrlType) => {
  return await post({
    url: '/api/uploads/signed-url',
    body,
  });
};

export const getZoneRecords = async (zoneId: string) => {
  return (await request({
    url: `/api/service/records?zoneId=${zoneId}`,
  })) as Record[];
};

export const addZoneRecords = async (records: Record[]) => {
  return await post({
    url: '/api/service/records',
    body: records,
  });
};
