/**
 * Created by stephenkarpinskyj on 4/11/18.
 */

import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import style from '../styles';

describe('viewComponents/Inputs/TextField/styles', () => {
  it('should match snapshot', () => {
    const snapshot = mockStylesheet('', style, coolTheme);
    expect(snapshot).toMatchSnapshot();
  });
});
