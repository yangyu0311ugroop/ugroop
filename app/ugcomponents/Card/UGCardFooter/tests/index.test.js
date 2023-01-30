/**
 * Created by paulcedrick on 6/16/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import stylesheet from '../styles';
import { UGCardFooter } from '../index';

const mockStyle = mockStylesheet('UGCardFooter', stylesheet);

describe('<UGCardFooter /> component', () => {
  const sampleText =
    'Jesus said to him, ' +
    '“I am the way, and the truth, and the life. ' +
    'No one comes to the Father except through me.';
  const sampleComponent = <h1>{sampleText}</h1>;

  it('should accept children text and display it', () => {
    const wrapper = shallow(
      <UGCardFooter classes={mockStyle}>{sampleText}</UGCardFooter>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should accept children component', () => {
    const wrapper = shallow(
      <UGCardFooter classes={mockStyle}>
        <sampleComponent />
      </UGCardFooter>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should accept className for easy extending the component', () => {
    const sampleClass = 'card-footer';
    const wrapper = shallow(
      <UGCardFooter classes={mockStyle} className={sampleClass} />,
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should have card-footer class even without className being specified', () => {
    const wrapper = shallow(
      <UGCardFooter classes={mockStyle}>
        <sampleContent />
      </UGCardFooter>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
