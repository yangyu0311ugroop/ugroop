import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGTemplateListHR } from '../index';

describe('UGTemplateListHR', () => {
  it('should always render what it should render', () => {
    const sampleClass = 'sample';
    const sampleClasses = { root: 'qweqwe' };
    const wrapper = shallow(
      <UGTemplateListHR classes={sampleClasses} className={sampleClass} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should display what it should display when className is present', () => {
    const sampleClass = '';
    const sampleClasses = { root: 'qweqwe' };
    const wrapper = shallow(
      <UGTemplateListHR classes={sampleClasses} className={sampleClass}>
        Blessed be the name of the Lord!
      </UGTemplateListHR>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
