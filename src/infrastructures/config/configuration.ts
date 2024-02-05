import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { Config } from './interfaces/config.interface';

const YAML_CONFIG_FILENAME = `${process.env.NODE_ENV || 'dev'}.yaml`;

export default () => {
  return yaml.load(
    readFileSync(join(``, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Config;
};