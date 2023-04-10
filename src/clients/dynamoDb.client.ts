// Create the DynamoDB service client module using ES6 syntax.
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { env } from 'process';

// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient({
    region: env.AWS__REGION || 'us-east-1',
    ...(env.LOCAL_MODE === 'true' && {
        credentials: {
            accessKeyId: env.AWS__ACCESS_KEY_ID || '',
            secretAccessKey: env.AWS__ACCESS_KEY || '',
        },
    }),
});

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the DynamoDB document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

export { ddbDocClient };
