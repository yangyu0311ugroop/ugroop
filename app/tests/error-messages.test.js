import {
  SHOW_ERROR_IN_SNACKBAR,
  SHOW_UNPROCESSABLE_ERROR_IN_SNACKBAR,
  wrapRequestWithErrorHandler,
} from 'error-messages';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import { HTTP_STATUS_CODE } from 'utils/http-constant';

const resaga = {
  setValue: jest.fn(),
  dispatchTo: jest.fn(),
};

beforeEach(() => {
  SnackbarHelper.openErrorSnackbar = jest.fn();
  jest.clearAllMocks();
});

describe('SHOW_ERROR_IN_SNACKBAR', () => {
  it('should call SnackbarHelper.openErrorSnackbar with http 401 error message if status is 401', () => {
    SHOW_ERROR_IN_SNACKBAR(resaga)({
      status: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
    });
    expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
    expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
  });

  it('should call SnackbarHelper.openErrorSnackbar with http 400 error message if status is 400', () => {
    SHOW_ERROR_IN_SNACKBAR(resaga)({
      status: HTTP_STATUS_CODE.STATUS_BAD_REQUEST,
    });
    expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
    expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
  });

  it('should call SnackbarHelper.openErrorSnackbar with general error message if status is 500', () => {
    SHOW_ERROR_IN_SNACKBAR(resaga)({
      status: HTTP_STATUS_CODE.STATUS_SERVER_ERROR,
    });
    expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
    expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
  });
});

describe('SHOW_UNPROCESSABLE_ERROR_IN_SNACKBAR', () => {
  it('should call SnackbarHelper.openErrorSnackbar with http 402 error message if status is 402', () => {
    SHOW_UNPROCESSABLE_ERROR_IN_SNACKBAR(resaga)({
      status: HTTP_STATUS_CODE.STATUS_UNPROCESSABLE_ENTITY,
      details: false,
    });
    expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
    expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
  });

  it('should call SnackbarHelper.openErrorSnackbar with http 402 error message if status is 402', () => {
    SHOW_UNPROCESSABLE_ERROR_IN_SNACKBAR(resaga)({
      status: HTTP_STATUS_CODE.STATUS_UNPROCESSABLE_ENTITY,
    });
    expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
    expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
  });

  it('should call SnackbarHelper.openErrorSnackbar with http 400 error message if status is 400', () => {
    SHOW_UNPROCESSABLE_ERROR_IN_SNACKBAR(resaga)({
      status: HTTP_STATUS_CODE.STATUS_BAD_REQUEST,
    });
    expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
    expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
  });
});

describe('wrapRequestWithErrorHandler', () => {
  it('should wrap request object with onError handlers', () => {
    const requests = {
      sample1: {
        onSuccess: 'onSuccess',
      },
      sample2: {
        onSuccess: 'onSuccess',
      },
      sample3: {
        onSuccess: 'onSuccess',
      },
    };

    wrapRequestWithErrorHandler(requests, jest.fn(() => ({})));
    expect(requests).toMatchSnapshot();
  });
});
