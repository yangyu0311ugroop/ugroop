import React from 'react';
import { moment } from 'utils';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { LastAccessAt } from '../index';

describe('<LastAccessAt />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<LastAccessAt {...props} />);
    instance = rendered.instance();
  });

  it('render()', () => {
    instance.renderDefault = 'renderDefault';
    const snapshot = shallow(<div>{instance.render()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('contentClassName()', () => {
    const snapshot = shallow(<div>{instance.contentClassName()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('renderTextWithlabel()', () => {
    const snapshot = shallow(<div>{instance.renderTextWithlabel()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('renderTextWithlabel()', () => {
    rendered.setProps({ showNoAccessPlaceHolder: true });
    const snapshot = shallow(<div>{instance.renderTextWithlabel()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('renderTextWithlabel() lastAccess', () => {
    instance.iAm = jest.fn(() => false);
    rendered.setProps({ lastAccess: '2001-01-01' });
    moment.renderFromNow = jest.fn(value => value);
    const snapshot = shallow(<div>{instance.renderTextWithlabel()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('renderTextWithlabel() lastAccess if user is me and not renderActualTime', () => {
    instance.iAm = jest.fn(() => true);
    rendered.setProps({ lastAccess: '2001-01-01', renderActualTime: false });
    moment.renderFromNow = jest.fn(() => '2001-01-01');
    const snapshot = shallow(<div>{instance.renderTextWithlabel()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('returns iAm', () => {
    rendered.setProps({ me: 1, id: 1 });
    expect(instance.iAm()).toBe(true);
  });
});
