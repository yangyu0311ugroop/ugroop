import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TRANSFER_TOUR_TYPE } from 'variantsConstants';
import { TransferByUser } from '../index';

describe('<TransferByUser />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 999,
    classes: {},
    resaga,
    peopleIds: [1, 2],
    userNodeIds: [1, 2],
    userIds: [1, 2],
    me: 1,
  };

  beforeEach(() => {
    rendered = shallow(<TransferByUser {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TransferByUser).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('handleEditableClick()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.handleEditableClick(1)()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ variant: TRANSFER_TOUR_TYPE.ORG_CONNECTION });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly for placeholder', () => {
      rendered.setProps({
        variant: TRANSFER_TOUR_TYPE.ORG_CONNECTION,
        peopleIds: [],
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
