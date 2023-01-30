import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { scalingFontSizes } from '../scalingFontSizes';

describe('scalingFontSizes', () => {
  it('should have style with margin', () => {
    const snapshot = mockStylesheet('', scalingFontSizes, coolTheme);
    expect(snapshot).toMatchSnapshot();
  });
  it('should have style without margin', () => {
    const snapshot = mockStylesheet('', scalingFontSizes, coolTheme, false);
    expect(snapshot).toMatchSnapshot();
  });
});
