/**
 * Created by stephenkarpinskyj on 13/6/18.
 */

import timezone from 'google-timezone-api';

const fetchTimeZone = (opts = {}, callback = null) => {
  const {
    latitude,
    longitude,
    timestamp = undefined, // seconds since epoch, defaults to now
    language = undefined, // defaults to en
  } = opts;

  return timezone(
    {
      location: `${latitude},${longitude}`,
      timestamp,
      language,
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
    callback,
  );
};

export default {
  fetchTimeZone,
};
