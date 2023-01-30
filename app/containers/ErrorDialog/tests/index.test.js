import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { resetError } from 'containers/App/actions';
import { ErrorDialog, mapDispatchToProps } from '../index';
describe('Error Dialog', () => {
  const rendered = shallow(<ErrorDialog classes={{}} />);
  it('Render Smoke Test', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeUsername', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.resetError).toBeDefined();
      });
      it('should dispatch resetError when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.resetError();
        expect(dispatch).toHaveBeenCalledWith(resetError());
      });
    });
  });
});
