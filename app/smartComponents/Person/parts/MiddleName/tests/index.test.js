import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';

import { MiddleName } from '../index';

describe('<MiddleName />', () => {
  let rendered;
  let instance;

  const props = {
    readOnly: true,
  };

  beforeEach(() => {
    rendered = shallow(<MiddleName {...props} />);
    instance = rendered.instance();
  });

  describe('renderTextField', () => {
    it('should match snapshot', () => {
      const snap = shallow(<div>{instance.renderTextField()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('handleEditableSubmit', () => {
    it('should match snapshot', () => {
      const model = {};
      const onSuccess = jest.fn();
      const onError = jest.fn();
      PERSON_DETAIL_HELPER.updatePerson = jest.fn();
      instance.handleEditableSubmit({ model, onSuccess, onError });
      expect(PERSON_DETAIL_HELPER.updatePerson).toHaveBeenCalled();
    });
  });
});
