import { SQSClient } from '@aws-sdk/client-sqs';
import { env } from 'process';

// Create SQS service object.
const sqsClient = new SQSClient({
    region: env.AWS__REGION || 'us-east-1',
    ...(env.LOCAL_MODE === 'true' && {
        credentials: {
            accessKeyId: env.AWS__ACCESS_KEY_ID || '',
            secretAccessKey: env.AWS__ACCESS_KEY || '',
        },
    }),
});

export { sqsClient };
