const version = '1.0.4';
await $`sentry-cli releases new ${version} && sentry-cli releases files ${version} upload-sourcemaps './dist' && sentry-cli releases finalize ${version}`;
