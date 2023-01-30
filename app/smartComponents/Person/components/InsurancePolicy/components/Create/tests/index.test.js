import React from 'react';
import { shallow } from 'enzyme';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { InsurancePolicyCreate } from '../index';
import { PORTAL_HELPERS } from '../../../../../../../containers/Portal/helpers';

describe('<MedicalCreate />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<InsurancePolicyCreate classes={{}} resaga={{}} />);
    instance = rendered.instance();
  });

  describe('handleValidSubmit', () => {
    it('should call addMedical', () => {
      PERSON_DETAIL_HELPER.addInsurancePolicy = jest.fn();
      instance.handleValidSubmit({});
      expect(PERSON_DETAIL_HELPER.addInsurancePolicy).toHaveBeenCalled();
    });
  });

  describe('handleCreateClick', () => {
    it('should setState', () => {
      PORTAL_HELPERS.showAddEditInsurance = jest.fn();
      instance.handleCreateClick();
      expect(PORTAL_HELPERS.showAddEditInsurance).toBeCalled();
    });
  });
});
