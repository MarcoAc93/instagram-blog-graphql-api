import fs from 'fs';
import path from 'path';

const queriesSchema = fs.readFileSync(path.join(__dirname, 'queries.graphql'), 'utf8');
const mutationsSchema = fs.readFileSync(path.join(__dirname, 'mutations.graphql'), 'utf8');

export default [queriesSchema, mutationsSchema].join('\n');
