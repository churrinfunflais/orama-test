import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Orama, save } from '@orama/orama';
import { s3Client } from '../clients/s3client.client.js';
import { DB_BUCKET, DB_FILE } from '../config.js';

const persist = async (DB: Orama) => {
    const dbExport = await save(DB);
    await s3Client.send(
        new PutObjectCommand({
            Bucket: DB_BUCKET,
            Key: DB_FILE,
            Body: JSON.stringify(dbExport),
        }),
    );
};

export default persist;
