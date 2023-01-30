import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TabPeople } from '../index';

describe('<TabPeople />', () => {
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
    rendered = shallow(<TabPeople {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabPeople).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('setValue not to be called', () => {
      rendered.setProps({ peopleTabOptionSelected: '1' });
      instance.componentDidMount();
    });
    it('setValue to be called', () => {
      rendered.setProps({ peopleTabOptionSelected: '' });
      rendered.canViewAll = jest.fn(() => true);
      instance.componentDidMount();
    });
    it('set value should be called to open participant view', () => {
      const location = {
        search: '?participant=1407',
      };
      rendered.setProps({
        peopleTabOptionSelected: '',
        location,
        participantIds: [1407],
      });
      rendered.canViewAll = jest.fn(() => true);
      instance.componentDidMount();
      expect(resaga.setValue).toBeCalled();
    });
    it('set value should not open participant view if Participant does not existsing', () => {
      const location = {
        search: '?participant=1407',
      };
      rendered.setProps({
        peopleTabOptionSelected: '',
        location,
        participantIds: [],
      });
      rendered.canViewAll = jest.fn(() => true);
      instance.componentDidMount();
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render public correctly', () => {
      rendered.setProps({ isPublic: true });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
