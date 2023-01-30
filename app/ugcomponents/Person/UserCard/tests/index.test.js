import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { UserCard } from '../index';

describe('<UserCard />', () => {
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
    rendered = shallow(<UserCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(UserCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderPhoto()', () => {
    it('should return null if !photo', () => {
      rendered.setProps({ photo: null });

      const snapshot = shallow(<div>{instance.renderPhoto()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderPhoto', () => {
      rendered.setProps({ photo: 'somephoto.com', email: 'that@guy' });

      const snapshot = shallow(<div>{instance.renderPhoto()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderName()', () => {
    it('should return null if !knownAs', () => {
      rendered.setProps({ knownAs: null });

      expect(instance.renderName()).toBe(null);
    });

    it('should renderName', () => {
      rendered.setProps({ knownAs: 'That Guy' });

      const snapshot = shallow(<div>{instance.renderName()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderName with ellipsis', () => {
      rendered.setProps({
        knownAs:
          'That Guy That Guy That Guy That Guy That Guy That Guy That GuyThat Guy',
      });

      const snapshot = shallow(<div>{instance.renderName()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEmail()', () => {
    it('should renderEmail', () => {
      rendered.setProps({ email: 'that@guy' });

      const snapshot = shallow(<div>{instance.renderEmail()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ id: 123 });
      instance.renderPhoto = jest.fn(() => 'renderPhoto');
      instance.renderName = jest.fn(() => 'renderName');
      instance.renderEmail = jest.fn(() => 'renderEmail');
      instance.renderOrganisationName = jest.fn(() => 'renderOrganisationName');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
