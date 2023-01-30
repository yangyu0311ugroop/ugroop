/**
 * Created by quando on 21/2/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import LaddaButton from 'react-ladda';
import SubmitButton from '../index';

const children = 'hello children';
const testType = 'submit';
const callback = jest.fn();

const renderedComponent = shallow(
  <SubmitButton onClick={callback}>{children}</SubmitButton>,
);

describe('<SubmitButton />', () => {
  it('should exists', () => {
    expect(SubmitButton);
  });
  it('should render without exploding', () => {
    expect(renderedComponent.length).toBe(1);
  });
  it('should render children', () => {
    expect(renderedComponent.html()).toMatch(children);
  });
});

describe('<SubmitButton /> props', () => {
  it('should be initiated correctly', () => {
    const rendered = shallow(
      <SubmitButton type={testType} onClick={callback}>
        {children}
      </SubmitButton>,
    );
    const props = rendered.instance().props;
    expect(props.type).toMatch(testType);
    expect(props.children).toMatch(children);
  });
});

describe('<SubmitButton /> state', () => {
  it('should be initiated correctly', () => {
    const state = renderedComponent.state();
    expect(state.loading).toBeFalsy();
  });
  it('should be updated correctly', () => {
    const rendered = shallow(
      <SubmitButton type={testType} onClick={callback}>
        {children}
      </SubmitButton>,
    );
    const state = rendered.state();
    expect(state.loading).toBe(false);
    const button = rendered.find(LaddaButton);
    expect(button.length).toBe(1);
    button.simulate('click');
    expect(callback).toHaveBeenCalled();
  });
});

describe('<SubmitButton /> componentWillUnmount() ', () => {
  it('should be correct', () => {
    const rendered = shallow(
      <SubmitButton type={testType} onClick={callback}>
        {children}
      </SubmitButton>,
    );
    expect(rendered.state().loading).toBe(false);
    const instance = rendered.instance();
    instance.start();
    expect(rendered.state().loading).toBe(true);
    instance.componentWillUnmount();
    expect(rendered.state().loading).toBe(false);
    expect(rendered.instance().progressing).toBe(null);
  });
});

describe('<SubmitButton /> isLoading() ', () => {
  it('should behave correctly - 1', () => {
    const instance = renderedComponent.instance();
    instance.setState({ loading: true });
    expect(instance.isLoading()).toBe(true);
  });
  it('should behave correctly - 2', () => {
    const instance = renderedComponent.instance();
    instance.setState({ loading: false });
    expect(instance.isLoading()).toBe(false);
  });
});
describe('<SubmitButton /> setInterval() ', () => {
  it('should behave correctly', () => {
    const instance = renderedComponent.instance();
    const progress = instance.progress;
    const tick = instance.props.tick;
    const maximumTick = instance.props.maximumTick;
    instance.increaseProgress = jest.fn();
    instance.setInterval();
    expect(instance.increaseProgress).toBeCalledWith(
      progress,
      tick,
      maximumTick,
    );
  });
});
describe('<SubmitButton /> clearInterval() ', () => {
  it('should behave correctly', () => {
    const instance = renderedComponent.instance();
    instance.clearInterval();
    expect(instance.progressing).toBe(null);
  });
});
describe('<SubmitButton /> start() ', () => {
  it('should behave correctly - 1', () => {
    const rendered = shallow(<SubmitButton>{children}</SubmitButton>);
    expect(rendered.state().loading).toBe(false);
    const instance = rendered.instance();
    instance.isLoading = () => false;
    instance.start();
    expect(rendered.state().loading).toBe(true);
    expect(rendered.state().progress).toBe(0);
    expect(rendered.instance().progressing).toBeDefined();
  });
  it('should behave correctly - 2', () => {
    const rendered = shallow(<SubmitButton>{children}</SubmitButton>);
    expect(rendered.state().loading).toBe(false);
    const instance = rendered.instance();
    instance.isLoading = () => true;
    const progress = rendered.state().progress;
    instance.start();
    expect(rendered.state().loading).toBe(false);
    expect(rendered.state().progress).toBe(progress);
    expect(rendered.instance().progressing).not.toBeDefined();
  });
});

describe('<SubmitButton /> pause() ', () => {
  it('should behave correctly - 1', () => {
    const rendered = shallow(<SubmitButton>{children}</SubmitButton>);
    expect(rendered.state().loading).toBe(false);
    const instance = rendered.instance();
    instance.isLoading = () => true;
    instance.start();
    const currentProgress = rendered.state().progress;
    instance.pause();
    expect(rendered.state().loading).toBe(false);
    expect(rendered.state().progress).toBe(currentProgress);
    expect(rendered.instance().progressing).toBeDefined();
  });
  it('should behave correctly - 2', () => {
    const rendered = shallow(<SubmitButton>{children}</SubmitButton>);
    expect(rendered.state().loading).toBe(false);
    const instance = rendered.instance();
    instance.isLoading = () => false;
    instance.pause();
    expect(rendered.state().loading).toBe(false);
    expect(rendered.instance().progressing).not.toBeDefined();
  });
});

describe('<SubmitButton /> resume() ', () => {
  it('should behave correctly', () => {
    const rendered = shallow(<SubmitButton>{children}</SubmitButton>);
    expect(rendered.state().loading).toBe(false);
    const instance = rendered.instance();
    instance.isLoading = () => false;
    instance.resume();
    expect(rendered.state().loading).toBe(true);
    expect(rendered.instance().progressing).toBeDefined();
  });
  it('should behave correctly', () => {
    const rendered = shallow(<SubmitButton>{children}</SubmitButton>);
    expect(rendered.state().loading).toBe(false);
    const instance = rendered.instance();
    instance.isLoading = () => true;
    instance.resume();
    expect(rendered.state().loading).toBe(false);
    expect(rendered.instance().progressing).not.toBeDefined();
  });
});

describe('<SubmitButton /> increaseProgress() ', () => {
  it('should behave correctly - 1', () => {
    const rendered = shallow(
      <SubmitButton type={testType} onClick={callback}>
        {children}
      </SubmitButton>,
    );
    expect(rendered.state().loading).toBe(false);
    const instance = rendered.instance();
    instance.isLoading = () => true;
    const currentProgress = 0.9;
    const tick = 0.05;
    const maxTick = 0.99;
    instance.increaseProgress(currentProgress, tick, maxTick);
    expect(rendered.state().progress).toBe(currentProgress + tick);
  });
  it('should behave correctly - 2', () => {
    const rendered = shallow(
      <SubmitButton type={testType} onClick={callback}>
        {children}
      </SubmitButton>,
    );
    expect(rendered.state().loading).toBe(false);
    const instance = rendered.instance();
    instance.isLoading = () => true;
    const currentProgress = 0.9;
    const tick = 0.1;
    const maxTick = 0.99;
    instance.increaseProgress(currentProgress, tick, maxTick);
    expect(rendered.state().progress).toBe(maxTick);
  });
  it('should behave correctly - 3', () => {
    const rendered = shallow(
      <SubmitButton type={testType} onClick={callback}>
        {children}
      </SubmitButton>,
    );
    expect(rendered.state().loading).toBe(false);
    const current = rendered.state().progress;
    const instance = rendered.instance();
    instance.isLoading = () => false;
    const currentProgress = 0.9;
    const tick = 0.1;
    const maxTick = 0.99;
    instance.increaseProgress(currentProgress, tick, maxTick);
    expect(rendered.state().progress).toBe(current);
  });
});

describe('<SubmitButton /> stop() ', () => {
  it('should be correct', () => {
    const rendered = shallow(
      <SubmitButton type={testType} onClick={callback}>
        {children}
      </SubmitButton>,
    );
    expect(rendered.state().loading).toBe(false);
    const instance = rendered.instance();
    instance.isLoading = () => true;
    instance.stop();
    expect(rendered.state().loading).toBe(false);
    expect(rendered.state().progress).toBe(0);
    expect(rendered.instance().progressing).toBe(null);
  });
  it('should be correct', () => {
    const rendered = shallow(
      <SubmitButton type={testType} onClick={callback}>
        {children}
      </SubmitButton>,
    );
    expect(rendered.state().loading).toBe(false);
    const cur = rendered.state().progress;
    const curProg = rendered.instance().progressing;
    const instance = rendered.instance();
    instance.isLoading = () => false;
    instance.stop();
    expect(rendered.state().loading).toBe(false);
    expect(rendered.state().progress).toBe(cur);
    expect(rendered.instance().progressing).toBe(curProg);
  });
});
