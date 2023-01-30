import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import {
  TEMPLATE_MANAGEMENT_STORE_SELECTORS,
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
  TEMPLATE_SELECTOR,
  TAB_SELECTOR,
} from '../selectors';

describe('TAB_SELECTOR', () => {
  it('should render a particular keyPath shape given the id passed to it', () => {
    Object.keys(TAB_SELECTOR).map(key =>
      expect(TAB_SELECTOR[key]({ id: 1 })).toMatchSnapshot(),
    );
  });

  it('should render a particular keyPath shape given the id passed to it is array', () => {
    Object.keys(TAB_SELECTOR).map(key =>
      expect(TAB_SELECTOR[key]({ id: [1] })).toMatchSnapshot(),
    );
  });
});

describe('TEMPLATE_SELECTOR', () => {
  it('should render a particular keyPath shape given the id passed to it', () => {
    Object.keys(TEMPLATE_SELECTOR).map(key =>
      expect(TEMPLATE_SELECTOR[key]({ id: 1 })).toMatchSnapshot(),
    );
  });

  it('should render a particular keyPath shape given the id passed to it is array', () => {
    Object.keys(TEMPLATE_SELECTOR).map(key =>
      expect(TEMPLATE_SELECTOR[key]({ id: [1] })).toMatchSnapshot(),
    );
  });
});

describe('templateDisplayDate', () => {
  it('should render shape given the id passed to it', () => {
    expect(
      TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateDisplayDate({
        templateId: 1,
      }),
    ).toEqual([
      TEMPLATE_MANAGEMENT_DATASTORE,
      'templates',
      1,
      'customData',
      'displayDate',
    ]);
  });
});
describe('tabChildren', () => {
  it('should render shape given the id passed to it', () => {
    expect(
      TEMPLATE_MANAGEMENT_STORE_SELECTORS.tabChildren({ tabId: 1 }),
    ).toEqual([TEMPLATE_MANAGEMENT_DATASTORE, 'tabs', 1, 'children']);
  });
});

describe('TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS', () => {
  it('still matches snapshot', () => {
    expect(TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS).toMatchSnapshot();
  });
});
