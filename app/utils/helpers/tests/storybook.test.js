/**
 * Created by stephenkarpinskyj on 6/7/18.
 */

import helpers, { withTheme, withInfo, eventToValue } from '../storybook';

describe('utils/helpers/storybook', () => {
  describe('#withTheme()', () => {
    it('executes', () => {
      // TODO: Test properly
      const storyFn = () => 'storyFn';
      withTheme(storyFn);
    });
  });

  describe('#withInfo()', () => {
    it('executes', () => {
      // TODO: Test properly
      const opts = { x: 1 };
      withInfo(opts);
    });
  });

  describe('#htmlComponentsStoriesOf()', () => {
    it('still matches snapshot', () => {
      expect(helpers.htmlComponentsStoriesOf('Component')).toMatchSnapshot();
    });
  });

  describe('#viewComponentsStoriesOf()', () => {
    it('still matches snapshot', () => {
      expect(helpers.viewComponentsStoriesOf('Component')).toMatchSnapshot();
    });
  });

  describe('#smartComponentsStoriesOf()', () => {
    it('still matches snapshot', () => {
      expect(helpers.smartComponentsStoriesOf('Component')).toMatchSnapshot();
    });
  });

  describe('#eventToValue()', () => {
    it('still matches snapshot', () => {
      const value = { x: 1 };
      const event = { target: { value } };
      expect(eventToValue([event])).toEqual([value]);
    });
  });

  describe('#inputAction()', () => {
    it('executes', () => {
      // TODO: Test properly
      helpers.inputAction('actionName');
    });
  });

  describe('#makeProp()', () => {
    it('makes properly', () => {
      const prop = {
        name: 'name',
        value: 'value',
        knobFunc: 'knobFunc',
        opts: 'opts',
      };
      expect(
        helpers.makeProp(prop.name, prop.value, prop.knobFunc, prop.opts),
      ).toEqual(prop);
    });
  });

  describe('#prop()', () => {
    it('returns value', () => {
      const name = 'name';
      const value = 'value';
      expect(helpers.prop(name, value)).toEqual(value);
    });
    it('returns knob', () => {
      const name = 'name';
      const value = 'value';
      const knobFunc = (n, v) => ({ name: n, value: v });
      const opts = { knob: true };
      expect(helpers.prop(name, value, knobFunc, opts)).toEqual(
        knobFunc(name, value),
      );
    });
  });

  describe('#props()', () => {
    it('returns props', () => {
      const name = 'someName';
      const value = 'someValue';
      const arr = [helpers.makeProp(name, value)];
      expect(helpers.props(arr)).toEqual({ [name]: value });
    });
  });
});
