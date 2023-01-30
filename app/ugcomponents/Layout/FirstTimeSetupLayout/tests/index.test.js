/* eslint-disable import/first */
/**
 * Created by quando on 1/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

import { FirstTimeSetupLayout } from '../index';

const MockComponent = props => <div>{props.children}</div>;
MockComponent.propTypes = { children: PropTypes.string };

const mockResaga = {
  dispatchTo: jest.fn(),
};

let renderedComponent;
let instance;

jest.useFakeTimers();
describe('<FirstTimeSetup />', () => {
  beforeEach(() => {
    renderedComponent = shallow(
      <FirstTimeSetupLayout resaga={mockResaga} classes={{}}>
        <MockComponent>Hello</MockComponent>
      </FirstTimeSetupLayout>,
    );
    instance = renderedComponent.instance();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(FirstTimeSetupLayout).toBeDefined();
  });
  it('should render without exploding', () => {
    expect(renderedComponent.length).toBe(1);
  });
  it('should render children', () => {
    expect(instance.render()).toMatchSnapshot();
  });
  it('should render in orgSetup step', () => {
    renderedComponent.setProps({ location: { pathname: 'organisation' } });
    expect(instance.render()).toMatchSnapshot();
  });
  it('should render in personSetup step', () => {
    instance.generateHeader = jest.fn();
    renderedComponent.setProps({ location: { pathname: 'person' } });
    expect(instance.render()).toMatchSnapshot();
  });
  it('should call dispatchTo', () => {
    renderedComponent.setProps({ hasOrg: true });
    instance.componentDidMount();
    expect(mockResaga.dispatchTo).toBeCalled();
  });
  it('should call instances properly', () => {
    const mockElement = {
      preventDefault: jest.fn(),
    };
    const mockHandleLoading = jest.fn();
    renderedComponent.instance().handleLoading(true);
    expect(renderedComponent.state().isLoading).toBe(true);
    renderedComponent.instance().handleLoading = mockHandleLoading;
    renderedComponent.instance().handlesOnClick(mockElement);
    jest.runAllTimers();
    expect(mockElement.preventDefault).toHaveBeenCalled();
    expect(mockHandleLoading).toHaveBeenCalled();
  });
});
