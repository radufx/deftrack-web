import { NextApiRequest, NextApiResponse } from 'next';

import { s3 } from '@/src/utils/external/s3';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId, recordId, name, type } = req.body;

    const file = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${userId}/${recordId}`,
      ContentType: type,
      ACL: 'public-read',
    };

    const url = await s3.getSignedUrlPromise('putObject', file);

    res.status(200).json({ data: { url } });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
};
