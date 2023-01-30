import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGTemplateListContainer } from '../index';

describe('UGTemplateListContainer', () => {
  it('should display what it should display', () => {
    const sampleClassName = 'qweqwe';
    const sampleClasses = { root: 'qwee' };
    const wrapper = shallow(
      <UGTemplateListContainer
        classes={sampleClasses}
        className={sampleClassName}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should display what it should display if children and class are present', () => {
    const sampleClassName = 'qweqwe';
    const sampleClasses = { root: 'qwee' };
    const wrapper = shallow(
      <UGTemplateListContainer
        classes={sampleClasses}
        className={sampleClassName}
      >
        Praise the Lord! Oh my soul!
      </UGTemplateListContainer>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
