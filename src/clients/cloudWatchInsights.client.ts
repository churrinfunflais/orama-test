import { ApplicationInsightsClient } from '@aws-sdk/client-application-insights';
import { env } from 'process';

// Create SQS service object.
const cloudWatchInsightsClient = new ApplicationInsightsClient({
    region: env.AWS__REGION || 'us-east-1',
    ...(env.LOCAL_MODE === 'true' && {
        credentials: {
            accessKeyId: env.AWS__ACCESS_KEY_ID || '',
            secretAccessKey: env.AWS__ACCESS_KEY || '',
        },
    }),
});

export { cloudWatchInsightsClient };
