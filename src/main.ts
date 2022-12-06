/* eslint-disable no-underscore-dangle */
import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import produce from 'immer';
import { releaseVersion, toSentryPath } from './sentry/sentryUtil';
import { User } from './types/type';
import { eee } from './utils/compo/eee';

const basicUser: User = {
  id: 0,
  name: ''
};

const rootDir = toSentryPath(__dirname ?? process.cwd());
Sentry.init({
  dsn: 'https://aa39a3fb646743d381df307f6a476d68@o4504269737361408.ingest.sentry.io/4504276783005696',
  tracesSampleRate: 1.0,
  release: releaseVersion,
  integrations: [
    new RewriteFrames({
      root: rootDir
    })
  ]
});

const main = () => {
  const user2 = produce(basicUser, (draft) => {
    draft.id = 1;
    draft.name = 'tanaka';
  });
  console.log(user2);
  eee();
};

try {
  main();
} catch (e) {
  Sentry.captureException(e);
}
