import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)
// export const swaggerDoc = yaml.load(readFileSync(__dirname+'/openapi.yml', 'utf8'));

function parseYaml(file) {
    return yaml.load(readFileSync(resolve(__dirname, `${file}.yml`), 'utf8'));
}

export const swaggerDoc = {
    openapi: "3.0.0",
    info: {
      title: "APPOITMENT API",
        description: "This is a simple API for managing appointments ",
    },
    components: {
      schemas: parseYaml('schemas'),
      securitySchemes: parseYaml('security'),
    },
    Response:parseYaml('responses'),
    examples: parseYaml('examples'),
    paths: parseYaml('paths'),
};
