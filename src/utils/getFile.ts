import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../clients/s3client.client.js';
import streamToString from './streamToString.js';
import { logger } from '../middlewares/logger/logger.mdw.js';

const getFile = async (bucket: string, filename: string) => {
    try {
        const bucketParams = {
            Bucket: bucket,
            Key: filename,
        };

        const data = await s3Client.send(new GetObjectCommand(bucketParams));
        const body = await streamToString(data.Body);
        const lastModified = `${data.LastModified}`;

        return { body, lastModified };
    } catch (error) {
        logger.error(error);
        return { body: '', lastModified: null };
    }
};

export default getFile;
