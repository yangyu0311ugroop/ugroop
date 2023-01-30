import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { PARTICIPANT_STATUSES } from 'utils/constants/nodes';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { Participant } from '..';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import dotProp from 'dot-prop-immutable';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { PARTICIPANT } from 'utils/modelConstants';

describe('<Participant />', () => {
  let wrapper;
  let instance;
  const resaga = {
    dispatch: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const makeProps = () => ({
    value: 'value',
  });

  const props = {
    resaga,
  };

  beforeEach(() => {
    wrapper = shallow(<Participant {...makeProps()} {...props} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Comment).toBeDefined();
  });

  describe('componentWillReceiveProps()', () => {
    it('should call resaga.analyse', () => {
      instance.componentWillReceiveProps({ isEmptyParticipantStatus: true });
      expect(instance.state.isEmptyParticipantStatusState).toBe(true);
    });
  });

  describe('#handleSelectFieldChange()', () => {
    it('calls NODE_STORE_HELPERS.updateNode', () => {
      const value = 'value';
      let model = {};

      model = dotProp.set(
        model,
        NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.status),
        value,
      );
      model = dotProp.set(
        model,
        NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.status),
        PARTICIPANT,
      );

      instance.handleSelectFieldChange({ target: { value } });
      instance.handleSubmit(model);
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderSelectField()', () => {
    it('still matches snapshot renderSelectField', () => {
      expect(
        toJSON(shallow(<div>{instance.renderSelectField()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#checkUpdateValue()', () => {
    it('should checkUpdateValue', () => {
      instance.checkUpdateValue('abc');
      expect(instance.state.isEmptyParticipantStatusState).toBe(false);
    });
  });

  describe('#handleSubmit()', () => {
    it('calls NODE_API_HELPERS.updateNode', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleSubmit({
        model: 'model',
        onSuccess: 'onSuccess',
        onError: 'onError',
      });
      expect(NODE_API_HELPERS.updateNode.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderValue()', () => {
    it('still matches snapshot if CONFIRMED', () => {
      expect(
        instance.renderValue(PARTICIPANT_STATUSES.confirmed),
      ).toMatchSnapshot();
    });

    it('still matches snapshot if unknown', () => {
      expect(instance.renderValue('somethingUnknown')).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderEditable()).toMatchSnapshot();
    });
  });

  describe('#renderTextField()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderTextField()).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
