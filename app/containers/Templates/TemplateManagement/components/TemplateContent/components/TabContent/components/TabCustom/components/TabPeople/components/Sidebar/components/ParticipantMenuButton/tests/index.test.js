import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ParticipantMenuButton } from '../index';

describe('<ParticipantMenuButton />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    isMobile: true,
  };

  beforeEach(() => {
    rendered = shallow(<ParticipantMenuButton {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ParticipantMenuButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick', () => {
    it('should call setValue', () => {
      instance.handleClick();

      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderContent', () => {
    it('should render correctly and return null', () => {
      instance.renderContent(null, {});

      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
    it('should return content', () => {
      instance.renderContent('hello', {});

      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('buyMoreView', () => {
    it('should render correctly', () => {
      rendered.setProps({ canInvite: true, orgId: 1 });
      const snapshot = shallow(<div>{instance.buyMoreView()}</div>);

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
