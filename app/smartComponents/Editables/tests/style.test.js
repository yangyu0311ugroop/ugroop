import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import style from '../style';

describe('Editables style', () => {
  it('should match snapshot', () => {
    const snapshot = mockStylesheet('', style, coolTheme);
    expect(snapshot).toMatchSnapshot();
  });
});
