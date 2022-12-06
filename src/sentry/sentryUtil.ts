import { ux } from '@igor.dvlpr/upath';
import { drop } from 'ramda';

export const releaseVersion = '9.0.0';

export const toSentryPath = (str: string) => {
  if (process.platform !== 'win32') return str;
  const u = drop(2, ux(str));
  return u;
};
