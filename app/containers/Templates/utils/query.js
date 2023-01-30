import { FOLDER_QUERY_PARAM } from 'containers/Templates/constants';
import { stringifyParam } from 'utils/helpers/url';

export const getQueryParamForRoute = currentRoute => {
  switch (currentRoute) {
    case FOLDER_QUERY_PARAM.MY_TOURS: {
      const query = {
        folder: FOLDER_QUERY_PARAM.MY_TOURS,
      };
      return stringifyParam(query);
    }
    case FOLDER_QUERY_PARAM.ORG_TOURS: {
      const query = {
        folder: FOLDER_QUERY_PARAM.ORG_TOURS,
      };
      return stringifyParam(query);
    }
    case FOLDER_QUERY_PARAM.SHARED_TOURS: {
      const query = {
        folder: FOLDER_QUERY_PARAM.SHARED_TOURS,
      };
      return stringifyParam(query);
    }
    default: {
      return '';
    }
  }
};
