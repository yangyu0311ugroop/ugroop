import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { CropperFooter } from '../cropperFooter';

const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: [0, 20],
  },
};

const wrapperFooter = shallow(
  <CropperFooter classes={styles} defaultValue={1} />,
);

describe('Cropper Footer', () => {
  it('shall render properly', () => {
    expect(toJSON(wrapperFooter)).toMatchSnapshot();
  });
  it('componentWillMount with no changes', () => {
    const instance = wrapperFooter.instance();
    instance.componentWillMount();
    expect(instance.state.opacity).toBe(1);
  });
  it('render', () => {
    const mockedFn = jest.fn();
    const content = shallow(wrapperFooter.instance().render());
    const fn = content.instance().props.children;
    wrapperFooter.instance().content = mockedFn;
    fn({ height: 200 });
    expect(mockedFn).toHaveBeenCalledWith({ height: 200 });
  });
});
