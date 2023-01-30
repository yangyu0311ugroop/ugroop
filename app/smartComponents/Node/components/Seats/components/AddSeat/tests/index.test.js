import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { CREATE_LINK, NODE_API } from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PARTICIPANTS, SEAT, SEATS } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import { AddSeat } from '../index';

describe('<AddSeat />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    variant: VARIANTS.ROUND,
  };

  beforeEach(() => {
    rendered = shallow(<AddSeat {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(AddSeat).toBeDefined();
  });

  it('should render correctly', () => {
    LOGIC_HELPERS.switchCase = jest.fn(() => 'button');
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('renderStandardButton', () => {
    it('should return view component button', () => {
      const snapshot = shallow(<div>{instance.renderStandardButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderRoundButton', () => {
    it('should render create button component', () => {
      const snapshot = shallow(<div>{instance.renderRoundButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleSubmitSuccess', () => {
    it('should dispatch to link node api', () => {
      const mockResult = {
        node: {
          id: 1,
        },
      };
      const participantId = 2;

      instance.handleSubmitSuccess(participantId)(mockResult);

      expect(resaga.dispatchTo).toBeCalledWith(NODE_API, CREATE_LINK, {
        payload: {
          id: mockResult.node.id,
          data: {
            nextNodeId: participantId,
          },
          nextNodeChildKey: SEATS,
          prevNodeChildKey: PARTICIPANTS,
        },
      });
    });

    it('should not dispatch to link node api if there is no participant selected', () => {
      const mockResult = {
        node: {
          id: 1,
        },
      };

      instance.handleSubmitSuccess(null)(mockResult);

      expect(resaga.dispatchTo).not.toBeCalled();
    });
  });

  describe('handleSubmit', () => {
    it('should call createNode of api helpers', () => {
      rendered.setProps({ parentNodeId: 2 });
      NODE_API_HELPERS.createNode = jest.fn();
      instance.handleSubmitSuccess = jest.fn(() => 'handleSubmitSuccess');
      const mockResult = {
        node: {
          content: 'Something',
        },
        participantId: 1,
      };

      instance.handleSubmit(mockResult);

      expect(NODE_API_HELPERS.createNode).toBeCalledWith(
        {
          node: {
            content: 'Something',
            type: SEAT,
          },
          parentNodeId: 2,
          childKey: SEATS,
          onSuccess: 'handleSubmitSuccess',
        },
        {
          ...props,
          parentNodeId: 2,
        },
      );
      expect(rendered.state().loading).toBe(true);
    });
  });

  describe('dialog actions', () => {
    it('should open and close the state for opening and closing the dialog', () => {
      instance.handleOpenDialog();
      expect(rendered.state().open).toBe(true);

      instance.handleCloseDialog();
      expect(rendered.state().open).toBe(false);
    });
  });
});
