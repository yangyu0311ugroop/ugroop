/**
 * Created by Yang on 31/1/17.
 */
import { PUT_ORG_SUCCESS } from './constants';

function putOrgSuccess(response) {
  return {
    type: PUT_ORG_SUCCESS,
    data: response,
  };
}

export { putOrgSuccess };
