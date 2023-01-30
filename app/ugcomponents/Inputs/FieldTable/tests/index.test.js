/**
 * Created by stephenkarpinskyj on 3/5/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { FieldTable } from '..';

describe('<FieldTable />', () => {
  let wrapper;
  let instance;

  const makeValues = () => [{ id: 123, x: 1 }];

  const makeProps = () => ({
    isFormDisabled: () => false,
    onRenderRow: (values, _, renderRowTail) => (
      <React.Fragment>
        {`some row ${JSON.stringify(values)}`}
        {renderRowTail()}
      </React.Fragment>
    ),
    onRemoveRow: jest.fn(),
    footerProps: { footerProp: 'some footer prop' },
    rowTailProps: { rowTailProp: 'some row tail prop' },
  });

  beforeEach(() => {
    wrapper = shallow(<FieldTable {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(FieldTable).toBeDefined();
  });

  describe('#onHandleRemoveRow()', () => {
    it('calles props.onRemoveRow', () => {
      const index = 1;
      instance.handleRemoveRow(index)();
      expect(instance.props.onRemoveRow).toBeCalledWith(index);
    });
  });

  describe('#renderRowTail()', () => {
    it('calles props.onRemoveRow', () => {
      wrapper.setProps({ isFormDisabled: () => true });
      expect(instance.renderRowTail()).toBeNull();
    });
  });

  describe('#renderFooter()', () => {
    it('calles props.onRemoveRow', () => {
      wrapper.setProps({ isFormDisabled: () => true });
      expect(instance.renderFooter()).toBeNull();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot when empty', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot when not empty', () => {
      wrapper.setProps({ values: makeValues() });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot when empty and with header', () => {
      wrapper.setProps({ onRenderHeader: () => 'some header' });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot when not empty and with header', () => {
      wrapper.setProps({
        values: makeValues(),
        onRenderHeader: () => 'some header',
      });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot when empty and with custom footer', () => {
      wrapper.setProps({
        values: makeValues(),
        onRenderFooter: rowCount => `some footer ${rowCount}`,
      });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
