import S3 from 'aws-sdk/clients/s3';

export const s3 = new S3({
  region: 'eu-west-3',
  signatureVersion: 'v4',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
  },
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
