import * as migration_20261030_122923_initial from './20261030_122923_initial';

export const migrations = [
  {
    up: migration_20261030_122923_initial.up,
    down: migration_20261030_122923_initial.down,
    name: '20261030_122923_initial'
  },
];
