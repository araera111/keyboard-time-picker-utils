/* eslint-disable no-underscore-dangle */
import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import produce from 'immer';

type User = {
  id: number;
  name: string;
};

const basicUser: User = {
  id: 0,
  name: ''
};

Sentry.init({
  dsn: 'https://aa39a3fb646743d381df307f6a476d68@o4504269737361408.ingest.sentry.io/4504276783005696',
  tracesSampleRate: 1.0,
  release: '1991',
  integrations: [
    new RewriteFrames({
      root: global.__rootdir__
    })
  ]
});
const main = async () => {
  const user2 = produce(basicUser, (draft) => {
    draft.id = 1;
    draft.name = 'tanaka';
  });
  console.log(user2);
  throw new Error('main error');
};
const transaction = Sentry.startTransaction({
  op: 'server',
  name: 'My First Test Transaction'
});
try {
  main();
} catch (e) {
  Sentry.captureException(e);
} finally {
  transaction.finish();
}
