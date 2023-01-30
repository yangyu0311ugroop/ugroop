/**
 * Created by Yang on 6/4/17.
 */
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ResetSuccess from '../resetSuccess';

describe('<ResetSuccess /> props', () => {
  const email = 'h@h.com';

  it('should render email address', () => {
    const snapshot = shallow(ResetSuccess({ email }));
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
});
