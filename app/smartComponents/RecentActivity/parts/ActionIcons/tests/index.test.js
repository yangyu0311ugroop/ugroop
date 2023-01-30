import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { VARIANTS } from 'variantsConstants';
import { ActionIcon } from '../index';

describe('<ActionIcon />', () => {
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
    rendered = shallow(<ActionIcon {...props} />);
    instance = rendered.instance();
  });
  it('to match with Snapshot', () => {
    const snapshot = shallow(<div>{instance.render()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });

  it('VARIANTS.BUTTON', () => {
    rendered.setProps({ variant: VARIANTS.BUTTON });
    const snapshot = shallow(<div>{instance.render()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
});
