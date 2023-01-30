/**
 * Created by stephenkarpinskyj on 2/5/18.
 */

import { FormContext } from '../FormContext';

describe('utils/hoc/formsy/FormContext', () => {
  it('exists', () => {
    expect(FormContext).toBeDefined();
  });

  it('still matches snapshot', () => {
    expect(FormContext).toMatchSnapshot();
  });
});
