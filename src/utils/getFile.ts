import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../clients/s3client.client';
import streamToString from './streamToString';

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
        console.error(error);
        return { body: '', lastModified: null };
    }
};

export default getFile;
