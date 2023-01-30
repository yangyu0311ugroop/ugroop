/**
 * Created by stephenkarpinskyj on 29/4/18.
 */

const fileToData = file => {
  const data = new FormData();
  data.append('file-to-upload', file);
  return data;
};

const parseError = ({ code, response }) => {
  switch (code) {
    case 'htmlerror':
      return response.title;
    case 'texterror':
      return response.text;
    case 'jsonerror':
      return JSON.stringify(response, null, 2);
    default:
      return typeof response === 'object' ? response.statusText : response;
  }
};

export default {
  fileToData,
  parseError,
};
