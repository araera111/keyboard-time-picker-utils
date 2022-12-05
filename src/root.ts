/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-underscore-dangle */
// This allows TypeScript to detect our global value
declare global {
  var __rootdir__: string;
}

global.__rootdir__ = __dirname || process.cwd();

export {};
