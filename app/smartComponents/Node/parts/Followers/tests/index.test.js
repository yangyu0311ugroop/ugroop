import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Followers } from '../index';

describe('<Followers />', () => {
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
    rendered = shallow(<Followers {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Followers).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleOpenFollowerDialog', () => {
    it('should call setValue for opening interestedPersonCreate modal', () => {
      instance.handleOpenFollowerDialog();

      expect(resaga.setValue).toBeCalledWith({
        interestedPersonCreateOpen: true,
        interestedPersonCreateParticipantId: undefined,
      });
    });
  });

  describe('handleShowFollowers', () => {
    it('should toggle showFollowers state', () => {
      instance.setState({ showFollowers: false });
      instance.handleShowFollowers();

      expect(rendered.state().showFollowers).toBe(true);
    });
  });

  describe('renderRow', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
