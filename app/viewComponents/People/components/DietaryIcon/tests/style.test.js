import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import style from '../style';

describe('viewComponents/People/DietaryIcon/style', () => {
  it('should match snapshot', () => {
    const snapshot = mockStylesheet('', style, coolTheme);
    expect(snapshot).toMatchSnapshot();
  });
});
