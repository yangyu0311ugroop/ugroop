import SnackbarHelper from '../helpers';

describe('Snackbar Helper', () => {
  const resaga = {
    setValue: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('openSuccessSnackbar', () => {
    it('should call setValue with particular shape', () => {
      SnackbarHelper.openSuccessSnackbar('Jesus reigns victorious!', resaga);
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('openErrorSnackbar', () => {
    it('should call setValue with particular shape', () => {
      SnackbarHelper.openErrorSnackbar('Death has no sting on me', resaga);
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('openInfoSnackbar', () => {
    it('should call setValue with particular shape', () => {
      SnackbarHelper.openInfoSnackbar('Following Jesus is costly', resaga);
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });
});
