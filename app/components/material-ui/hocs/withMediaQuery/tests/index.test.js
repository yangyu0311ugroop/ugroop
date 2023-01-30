import {
  smDownQuery,
  withSMDown,
  xsDownQuery,
  withXSDown,
  withMDDown,
  mdDownQuery,
} from '../index';

describe('useMediaQuery', () => {
  it('withSMDown should exists', () => {
    expect(withSMDown()).toBeDefined();
  });

  it('smDownQuery should exists', () => {
    expect(smDownQuery({ breakpoints: { down: () => true } })).toBeDefined();
  });

  it('withXSDown should exists', () => {
    expect(withXSDown()).toBeDefined();
  });

  it('xsDownQuery should exists', () => {
    expect(xsDownQuery({ breakpoints: { down: () => true } })).toBeDefined();
  });

  it('withMDDown should exists', () => {
    expect(withMDDown()).toBeDefined();
  });

  it('xsDownQuery should exists', () => {
    expect(mdDownQuery({ breakpoints: { down: () => true } })).toBeDefined();
  });
});
