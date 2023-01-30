/* eslint-disable guard-for-in,no-restricted-syntax */
import { pastTenseAction } from '../pastTense';
const tests = {
  bake: 'baked',
  smile: 'smiled',
  free: 'freed',
  dye: 'dyed',
  tiptoe: 'tiptoed',
  travel: 'traveled',
  model: 'modeled',
  distil: 'distilled',
  equal: 'equalled',
  admit: 'admitted',
  commit: 'committed',
  refer: 'referred',
  inherit: 'inherited',
  visit: 'visited',
  stop: 'stopped',
  tap: 'tapped',
  sob: 'sobbed',
  treat: 'treated',
  wheel: 'wheeled',
  pour: 'poured',
  picnic: 'picnicked',
  mimic: 'mimicked',
  traffic: 'trafficked',
  add: 'added',
  connect: 'connected',
};

describe('PastTense tests', () => {
  it('test past tense result', () => {
    for (const verb in tests) {
      const past = pastTenseAction(verb);
      expect(past).toEqual(tests[verb]);
    }
  });
});
