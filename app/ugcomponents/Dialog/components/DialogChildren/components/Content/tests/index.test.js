import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { HeadlineContent } from '../index';

describe('<HeadlineContent />', () => {
  let rendered;
  beforeEach(() => {
    rendered = shallow(<HeadlineContent classes={{}} />);
  });

  it('should exists', () => {
    expect(HeadlineContent).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render custom headline', () => {
    const props = {
      headlineIcon: 'lnr-trash',
      headlineText: 'Something',
      headlineTitle: 'Something',
    };
    rendered.setProps(props);
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('types', () => {
    it('should render custom type', () => {
      rendered.setProps({ type: 'test' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render to tour type', () => {
      rendered.setProps({ type: 'template' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('templates', () => {
    it('should render add template', () => {
      rendered.setProps({ template: 'add' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render delete template', () => {
      rendered.setProps({ template: 'delete' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render confirm template', () => {
      rendered.setProps({ template: 'confirm' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
