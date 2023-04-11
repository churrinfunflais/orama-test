import { Schema } from '@orama/orama';

const ProductSearchSchema: Schema = {
    name: 'string',
    image: 'string',
    description: 'string',
    sku: 'string',
    mpn: 'string',
    brand: {
        name: 'string',
    },
};

export default ProductSearchSchema;
