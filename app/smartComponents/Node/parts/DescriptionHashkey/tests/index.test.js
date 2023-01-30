import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { DescriptionHashkey } from '..';

const resagaMock = {
  dispatchTo: jest.fn(),
};
describe('<DescriptionHashkey />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    value: 'value',
    id: 1,
  });

  beforeEach(() => {
    wrapper = shallow(
      <DescriptionHashkey resaga={resagaMock} {...makeProps()} />,
    );
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Comment).toBeDefined();
  });

  describe('#renderTextOnly()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderTextOnly()).toMatchSnapshot();
    });
  });

  describe('#renderTextField()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderTextField()).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
