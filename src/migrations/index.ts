import * as migration_20261030_122923_initial from './20261030_122923_initial';
import * as migration_20261030_144720_content_fields from './20261030_144720_content_fields';

export const migrations = [
  {
    up: migration_20261030_122923_initial.up,
    down: migration_20261030_122923_initial.down,
    name: '20261030_122923_initial',
  },
  {
    up: migration_20261030_144720_content_fields.up,
    down: migration_20261030_144720_content_fields.down,
    name: '20261030_144720_content_fields'
  },
];
