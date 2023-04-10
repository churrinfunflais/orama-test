import { CloudWatchLogsClient } from '@aws-sdk/client-cloudwatch-logs';
import { env } from 'process';
// import { EMPTY_STRING } from '../utils/constants';

// Create SQS service object.
const cloudWatchClient = new CloudWatchLogsClient({
    region: env.AWS__REGION || 'us-east-1',
    ...(env.LOCAL_MODE === 'true' && {
        credentials: {
            accessKeyId: env.AWS__ACCESS_KEY_ID || '',
            secretAccessKey: env.AWS__ACCESS_KEY || '',
        },
    }),
});

export { cloudWatchClient };
