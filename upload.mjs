import { releaseVersion } from './src/sentry/sentryUtil';
const version = releaseVersion;
await $`sentry-cli releases new ${version} && sentry-cli releases files ${version} upload-sourcemaps './dist' && sentry-cli releases finalize ${version}`;
