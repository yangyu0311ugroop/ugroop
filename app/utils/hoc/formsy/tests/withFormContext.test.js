/**
 * Created by stephenkarpinskyj on 2/5/18.
 */

import React from 'react';
import withFormContext, { renderWrappedComponent } from '../withFormContext';

describe('utils/hoc/formsy/withFormContext', () => {
  class MockComponent extends React.Component {
    componentDidMount = () => {};

    render = () => <div />;
  }

  it('exists', () => {
    expect(withFormContext).toBeDefined();
  });

  it('still matches snapshot', () => {
    expect(withFormContext(<MockComponent />)).toMatchSnapshot();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(withFormContext(<MockComponent />).render()).toMatchSnapshot();
    });
  });

  describe('#renderWrappedComponent()', () => {
    it('still matches snapshot', () => {
      const props = { x: 1 };
      const form = { y: 2 };
      expect(
        renderWrappedComponent(<MockComponent />, props, 'ref')(form),
      ).toMatchSnapshot();
    });
  });
});
