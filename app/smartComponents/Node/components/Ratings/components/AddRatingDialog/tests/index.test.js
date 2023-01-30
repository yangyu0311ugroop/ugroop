import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { CREATE_LINK, NODE_API } from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PARTICIPANTS, RATING, RATINGS } from 'utils/modelConstants';
import { AddRatingDialog } from '../index';

describe('<AddRatingDialog />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<AddRatingDialog {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddRatingDialog).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleLinkSuccess', () => {
    it('should call close props', () => {
      const onClose = jest.fn();
      rendered.setProps({ onClose });
      instance.handleLinkSuccess();

      expect(onClose).toBeCalled();
    });
  });

  describe('handleSubmitSuccess', () => {
    it('should dispatch to create link api', () => {
      rendered.setProps({ participantId: 1 });
      instance.handleLinkSuccess = 'handleLinkSuccess';
      instance.handleSubmitSuccess({ node: { id: 1 } });

      expect(resaga.dispatchTo).toBeCalledWith(NODE_API, CREATE_LINK, {
        payload: {
          id: 1,
          data: {
            nextNodeId: 1,
          },
          prevNodeChildKey: PARTICIPANTS,
          nextNodeChildKey: RATINGS,
        },
        onSuccess: 'handleLinkSuccess',
      });
    });
  });

  describe('handleSubmit', () => {
    it('should call createNode of api helpers', () => {
      NODE_API_HELPERS.createNode = jest.fn();
      rendered.setProps({ parentNodeId: 1 });
      instance.handleSubmitSuccess = 'handleSubmitSuccess';

      instance.handleSubmit({ content: 'sample', customData: { rating: 3 } });

      expect(NODE_API_HELPERS.createNode).toBeCalledWith(
        {
          node: {
            content: 'sample',
            customData: { rating: 3 },
            type: RATING,
            parentNodeId: 1,
          },
          parentNodeId: 1,
          childKey: RATINGS,
          onSuccess: 'handleSubmitSuccess',
        },
        { ...props, parentNodeId: 1 },
      );
    });

    it('should not call createNode of api helpers', () => {
      NODE_API_HELPERS.createNode = jest.fn();
      rendered.setProps({ parentNodeId: 1 });
      instance.handleSubmitSuccess = 'handleSubmitSuccess';

      instance.handleSubmit({ content: 'sample' });

      expect(NODE_API_HELPERS.createNode).not.toBeCalled();
    });
  });

  describe('renderDialogHeader', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>
          {instance.renderDialogHeader({ renderCloseButton: jest.fn() })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDialogContent', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderDialogContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderDialogContent = jest.fn(() => 'renderDialogContent');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
