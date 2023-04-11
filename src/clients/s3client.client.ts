import { S3Client } from '@aws-sdk/client-s3';
import { AWS__ACCESS_KEY_ID, AWS__ACCESS_KEY, AWS__REGION, LOCAL_MODE } from '../config';

// Create an Amazon S3 service client object.
const s3Client = new S3Client({
    region: AWS__REGION || 'us-east-1',
    ...(LOCAL_MODE === 'true' && {
        credentials: {
            accessKeyId: AWS__ACCESS_KEY_ID || '',
            secretAccessKey: AWS__ACCESS_KEY || '',
        },
    }),
});

export { s3Client };
