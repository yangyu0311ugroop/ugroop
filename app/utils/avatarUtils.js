export const parseMetaInfo = metaInfoJsonString => {
  let ret = {};

  if (metaInfoJsonString) {
    try {
      ret = JSON.parse(metaInfoJsonString);
      if (typeof ret !== 'object' || Array.isArray(ret)) {
        ret = {};
      }
    } catch (except) {
      ret = {};
    }
  }

  return ret;
};
