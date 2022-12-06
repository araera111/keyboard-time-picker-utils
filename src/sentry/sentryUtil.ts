import { ux } from '@igor.dvlpr/upath';
import { drop } from 'ramda';

export const releaseVersion = '9.0.2';

export const toSentryPath = (str: string) => {
  console.log(str);
  if (process.platform !== 'win32') return str;
  const u = drop(2, ux(str));
  console.log(u);
  return u;
};
