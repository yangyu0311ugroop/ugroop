/**
 * Created by paulcedrick on 6/15/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { UGCardHeader } from '../index';
import stylesheet from '../styles';

const mockStyle = mockStylesheet('UGCardHeader', stylesheet);

describe('<UGCardHeader /> component', () => {
  const sampleText =
    'Or do you not know that the unrighteous will not inherit the kingdom of God? ' +
    'Do not be deceived: neither the sexually immoral, nor idolaters, nor adulterers, nor men who practice homosexuality,';
  const sampleComponent = <h1>{sampleText}</h1>;
  it('should display text children', () => {
    const wrapper = shallow(
      <UGCardHeader classes={mockStyle}>{sampleText}</UGCardHeader>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should display component children', () => {
    const wrapper = shallow(
      <UGCardHeader classes={mockStyle}>
        <sampleComponent />
      </UGCardHeader>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should accept className for extending the style of component', () => {
    const sampleStyle = 'sample-test';
    const wrapper = shallow(
      <UGCardHeader classes={mockStyle} className={sampleStyle}>
        {sampleText}
      </UGCardHeader>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should have card-header class even without className being specified', () => {
    const wrapper = shallow(
      <UGCardHeader classes={mockStyle}>{sampleText}</UGCardHeader>,
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
