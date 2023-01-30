import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { PUB_API_HELPERS } from 'apis/components/Pub/helpers';
import { TourForm } from '..';

describe('<TourForm />', () => {
  let wrapper;
  let instance;

  const history = {
    push: jest.fn(),
  };

  const makeProps = () => ({
    classes: {
      root: 'root',
      actionsRoot: 'actionsRoot',
      h1: 'h1',
    },
    history,
    hashkey: 'hashkey',
  });

  beforeEach(() => {
    wrapper = shallow(<TourForm {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  describe('#handleSubmit()', () => {
    it('calls PUB_API_HELPERS.createInterest', () => {
      PUB_API_HELPERS.createInterest = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(PUB_API_HELPERS.createInterest.mock.calls).toMatchSnapshot();
    });
    it('interested person is also a participant', () => {
      wrapper.setState({ selfTravel: true });
      PUB_API_HELPERS.createInterest = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(PUB_API_HELPERS.createInterest.mock.calls).toMatchSnapshot();
    });
  });

  describe('#handleCancel()', () => {
    it('should call history push to redirect', () => {
      instance.handleCancel();
      const expected = '/public/template/hashkey';
      expect(history.push).toBeCalledWith(expected);
    });
  });

  describe('#handleOnError()', () => {
    it('should call history push to redirect', () => {
      instance.handleOnError();
      expect(instance.state.loading).toBe(false);
    });
  });

  describe('#handleOnReturnRegister()', () => {
    it('should set to false', () => {
      instance.handleOnReturnRegister(false);
      expect(instance.state.registered).toBe(false);
    });
  });

  describe('#handleSelfTravelChange()', () => {
    it('should set to true', () => {
      instance.handleSelfTravelChange(true);
      expect(instance.state.selfTravel).toBe(true);
    });
    it('should set to false', () => {
      instance.handleSelfTravelChange(false);
      expect(instance.state.selfTravel).toBe(false);
    });
  });

  describe('#handleInterestedPerson', () => {
    it('should set to false', () => {
      instance.handleSelfTravelChange(false);
      expect(instance.state.isEmptyInterestLevel).toBe(null);
    });
  });

  describe('#handleAddOther()', () => {
    it('should handle otherTravel state', () => {
      instance.handleAddOther(1)();
      expect(instance.state.otherTravel).toBe(1);
    });
    it('should call handleSelfTravelChange', () => {
      wrapper.setState({ selfTravel: true });
      instance.handleSelfTravelChange = jest.fn();

      instance.handleAddOther(0)();
      expect(instance.state.otherTravel).toBe(0);
      expect(instance.handleSelfTravelChange).toBeCalledWith(false);
    });
  });

  describe('#handleResetForm()', () => {
    it('should resetForm and otherTravel state', () => {
      const resetForm = jest.fn();
      instance.handleResetForm(resetForm)();
      expect(resetForm).toHaveBeenCalled();
      expect(instance.state.otherTravel).toBe(1);
    });
  });

  describe('#handleInvalidSubmit()', () => {
    it('should call handleInvalidSubmit', () => {
      instance.handleInvalidSubmit({
        node: { customData: { interestLevel: '' } },
        selfTravel: '',
      });
      expect(instance.state.isEmptyInterestLevel).toMatchSnapshot();
      expect(instance.state.isEmptySelfTravel).toMatchSnapshot();
    });
  });

  describe('#formChange()', () => {
    it('should setState', () => {
      const FName = 'node.customData.firstName';
      const LName = 'node.customData.lastName';
      const previousValues = { [FName]: '', [LName]: '' };
      const currentValues = { [FName]: 'Test', [LName]: 'User' };

      instance.formChange({ previousValues, currentValues });
      expect(instance.state.firstName).toBe(currentValues[FName]);
      expect(instance.state.lastName).toBe(currentValues[LName]);
    });
    it('should not set state', () => {
      instance.formChange({});
      expect(instance.state.firstName).toBe('');
      expect(instance.state.lastName).toBe('');
    });
  });

  describe('#renderOtherTravelSelect()', () => {
    it('should match snapshot', () => {
      wrapper.setState({ otherTravel: 1 });
      instance.handleAddOther = () => jest.fn();
      const snapshot = shallow(<div>{instance.renderOtherTravelSelect()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#renderParticipantFormItem()', () => {
    it('should match snapshot', () => {
      wrapper.setState({ selfTravel: true, otherTravel: 1 });
      const snapshot = shallow(
        <div>{instance.renderParticipantFormItem()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      instance.renderFormButtons = () => 'renderFormButtons';
      instance.renderInterestForm = () => 'renderInterestForm';
      instance.renderParticipantForm = () => 'renderParticipantForm';
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
