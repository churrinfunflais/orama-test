import { GetObjectCommand } from '@aws-sdk/client-s3';
import { Orama, count, load } from '@orama/orama';
import { s3Client } from '../clients/s3client.client.js';
import { logger } from '../middlewares/logger/logger.mdw.js';
import { DB_BUCKET, DB_FILE } from '../config.js';

const restore = async (DB: Orama) => {
    try {
        const bucketParams = {
            Bucket: DB_BUCKET,
            Key: DB_FILE,
        };
        const object = await s3Client.send(new GetObjectCommand(bucketParams));
        const data = (await object.Body?.transformToString()) || '';

        if (data) {
            await load(DB, JSON.parse(data));
            logger.info(`${await count(DB)} documents restored`);
        }
    } catch (error) {
        console.log(error);
    }
};

export default restore;
