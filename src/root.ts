/* eslint-disable no-var */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
declare global {
  // eslint-disable-next-line vars-on-top
  var __rootdir__: string;
}
global.__rootdir__ = __dirname || process.cwd();

export {};
