/**
 * Created by paulcedrick on 6/15/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import { UGCard } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('UGCard', styles, theme);

describe('<UGCard /> component', () => {
  const sampleText =
    '16 For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' +
    ' 17 For God did not send his Son into the world to condemn the world, but to save the world through him. ' +
    '18 Whoever believes in him is not condemned, but whoever does not believe stands condemned already ' +
    'because they have not believed in the name of God’s one and only Son.';
  const sampleComponent = (
    <h1>
      16 For God so loved the world that he gave his one and only Son, that
      whoever believes in him shall not perish but have eternal life. 17 For God
      did not send his Son into the world to condemn the world, but to save the
      world through him. 18 Whoever believes in him is not condemned, but
      whoever does not believe stands condemned already because they have not
      believed in the name of God’s one and only Son.
    </h1>
  );
  it('should accept children text and display it', () => {
    const wrapper = shallow(<UGCard classes={mockStyles}>{sampleText}</UGCard>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should display children component', () => {
    const wrapper = shallow(
      <UGCard classes={mockStyles}>
        <sampleComponent />
      </UGCard>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should accept className for easy extending the component', () => {
    const sampleClassName = 'sample-test';
    const wrapper = shallow(
      <UGCard classes={mockStyles} className={sampleClassName}>
        <sampleContent />
      </UGCard>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should add class when withShadow is true', () => {
    const sampleClassName = 'sample-test';
    const wrapper = shallow(
      <UGCard classes={mockStyles} withShadow className={sampleClassName}>
        <sampleContent />
      </UGCard>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should not add class when withNoShadowAndBorder is true', () => {
    const sampleClassName = 'sample-test';
    const wrapper = shallow(
      <UGCard
        classes={mockStyles}
        withShadow
        withNoShadowAndBorder
        className={sampleClassName}
      >
        <sampleContent />
      </UGCard>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
