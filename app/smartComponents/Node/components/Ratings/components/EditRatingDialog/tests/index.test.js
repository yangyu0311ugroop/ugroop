import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { RATING } from 'utils/modelConstants';
import { EditRatingDialog } from '../index';

describe('<EditRatingDialog />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<EditRatingDialog {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EditRatingDialog).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleUpdateSuccess', () => {
    it('should call onClose and set loading state to false', () => {
      instance.handleUpdateSuccess();

      expect(props.onClose).toBeCalled();
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('handleSubmit', () => {
    it('should call updateNode', () => {
      rendered.setProps({ id: 1 });
      instance.handleUpdateSuccess = 'handleUpdateSuccess';
      NODE_API_HELPERS.updateNode = jest.fn();

      instance.handleSubmit({ content: 'sample' });

      expect(NODE_API_HELPERS.updateNode).toBeCalledWith(
        {
          nodeId: 1,
          node: {
            content: 'sample',
            type: RATING,
          },
          onSuccess: 'handleUpdateSuccess',
        },
        { ...props, id: 1, open: false },
      );
    });
  });

  describe('renderDialogHeader', () => {
    it('should match snapshot', () => {
      const renderCloseButton = jest.fn(() => 'renderCloseButton');
      const snapshot = shallow(
        <div>{instance.renderDialogHeader({ renderCloseButton })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDialogContent', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        id: 1,
      });
      const snapshot = shallow(<div>{instance.renderDialogContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDialogFooter', () => {
    it('should match snapshot', () => {
      const renderActions = jest.fn(args => args);
      const renderSubmitButton = jest.fn(() => 'submitButton');
      const renderCancelButton = jest.fn(() => 'cancelButton');
      const snapshot = shallow(
        <div>
          {instance.renderDialogFooter()({
            renderActions,
            renderSubmitButton,
            renderCancelButton,
          })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderDialogFooter = jest.fn(() => 'renderDialogFooter');
      instance.handleSubmit = 'handleSubmit';
      instance.renderDialogHeader = 'renderDialogHeader';
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
