import fireBaseConfig from './firebaseConfig';
import fireBaseConfigLatest from './firebaseConfig.latest';
import fireBaseConfigLive from './firebaseConfig.live';
import fireBaseConfigStable from './firebaseConfig.stable';

export const getFireBaseConifg = () => {
  const env = process.env.ENV;
  if (env === 'development') {
    return fireBaseConfig;
  }
  if (env === 'latest') {
    return fireBaseConfigLatest;
  }
  if (env === 'stable') {
    return fireBaseConfigStable;
  }
  if (env === 'live' || env === 'production') {
    // should be production, but we cannot use production due to the webpack build issue.
    return fireBaseConfigLive;
  }
  return fireBaseConfig;
};
