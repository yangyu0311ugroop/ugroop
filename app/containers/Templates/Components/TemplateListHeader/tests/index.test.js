import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGTemplateListHeader } from '../index';

describe('UGTemplateListHeader', () => {
  it('should always render what it should render', () => {
    const sampleClass = 'sample';
    const sampleClasses = { root: 'qweqwe' };
    const wrapper = shallow(
      <UGTemplateListHeader classes={sampleClasses} className={sampleClass} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should display what it should display when className is present', () => {
    const sampleClass = '';
    const sampleClasses = { root: 'qweqwe' };
    const wrapper = shallow(
      <UGTemplateListHeader classes={sampleClasses} className={sampleClass}>
        Blessed be the name of the Lord!
      </UGTemplateListHeader>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
