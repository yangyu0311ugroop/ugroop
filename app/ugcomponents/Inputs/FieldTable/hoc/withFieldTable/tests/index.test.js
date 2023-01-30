import React, { Component } from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import withFieldTable, { getDerivedStateFromProps } from '..';

describe('ugcomponents/Inputs/FieldTable/hoc/withFieldTable', () => {
  class MockComponent extends Component {
    componentDidMount = () => {};

    render = () => <div />;
  }

  let wrapper;
  let instance;

  const makeConfig = () => ({});

  const makeHocProps = () => ({
    tableName: 'someTableName',
  });

  beforeEach(() => {
    const Hoc = withFieldTable(makeConfig())(MockComponent);
    wrapper = shallow(<Hoc {...makeHocProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(withFieldTable).toBeDefined();
  });

  describe('#getDerivedStateFromProps()', () => {
    it('initialises state.currentValues first time', () => {
      const values = [{ id: 123 }, { id: 456 }];
      const nextProps = { values };
      const prevState = {};
      expect(getDerivedStateFromProps(nextProps, prevState)).toEqual(
        expect.objectContaining({
          currentValues: values,
        }),
      );
    });
    it('not initialises state.currentValues not first time', () => {
      const nextProps = {};
      const prevState = { currentValues: 'some values' };
      expect(getDerivedStateFromProps(nextProps, prevState)).toBeNull();
    });
  });

  describe('#addRow()', () => {
    it('adds default row to state.currentValues', () => {
      instance.setState({ currentValues: [1, 2] });
      instance.setState = jest.fn();
      const row = expect.objectContaining({ id: expect.anything() });
      instance.addRow();
      expect(instance.setState).toBeCalledWith({
        currentValues: [1, 2, row],
      });
    });
    it('adds specific row to state.currentValues', () => {
      instance.setState({ currentValues: [1, 2] });
      instance.setState = jest.fn();
      const row = 3;
      instance.addRow(row);
      expect(instance.setState).toBeCalledWith({
        currentValues: [1, 2, row],
      });
    });
  });

  describe('#removeRow()', () => {
    it('removes row from state.currentValues', () => {
      instance.setState({ currentValues: [1, 2] });
      instance.setState = jest.fn();
      instance.removeRow(1);
      expect(instance.setState).toBeCalledWith({
        currentValues: [1],
      });
    });
  });

  describe('#reset()', () => {
    it('sets state.currentValues and state.reset', () => {
      const values = [1, 2];
      instance.setState = jest.fn();
      instance.reset(values);
      expect(instance.setState).toBeCalledWith({
        currentValues: values,
        reset: true,
      });
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
      wrapper.setProps({ values: [{ id: 123 }, { id: 456 }] });
      // instance.setState({ currentValues: [{ id: 123 }, { id: 456 }] });
      expect(toJSON(shallow(instance.render()))).toMatchSnapshot();
    });
  });
});
