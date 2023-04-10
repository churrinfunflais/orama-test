import { S3Client } from '@aws-sdk/client-s3';
import { env } from 'process';

// Create an Amazon S3 service client object.
const s3Client = new S3Client({
    region: env.AWS__REGION || 'us-east-1',
    ...(env.LOCAL_MODE === 'true' && {
        credentials: {
            accessKeyId: env.AWS__ACCESS_KEY_ID || '',
            secretAccessKey: env.AWS__ACCESS_KEY || '',
        },
    }),
});

export { s3Client };
