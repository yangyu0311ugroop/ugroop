import { TOUR_ROLE } from 'apis/components/Ability/roles';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { RateAverage, FilterRatings } from 'smartComponents/Node/logics';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { RatingsDialog } from '../index';

describe('<RatingsDialog />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<RatingsDialog {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RatingsDialog).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderButton', () => {
    it('should render add rating button if userRatingId is null', () => {
      rendered.setProps({ userRatingId: 0 });

      const roles = [TOUR_ROLE.TOUR_PARTICIPANT];
      const snapshot = shallow(<div>{instance.renderButton(roles)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render edit rating button if userRatingId is not null', () => {
      rendered.setProps({ userRatingId: 1 });

      const roles = [TOUR_ROLE.TOUR_PARTICIPANT];
      const snapshot = shallow(<div>{instance.renderButton(roles)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render nothing if roles is not participant, organiser or owner of tour', () => {
      rendered.setProps({ userRatingId: 1 });

      const roles = [TOUR_ROLE.TOUR_COLLABORATOR];
      const snapshot = shallow(<div>{instance.renderButton(roles)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderAverage', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderAverage()}</div>);
      const renderProp = snapshot.find(RateAverage).renderProp('children')(1);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(toJSON(renderProp)).toMatchSnapshot();
    });
  });

  describe('renderRateBar', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderRateBar(1, [1, 2, 3])(3)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderRateBars', () => {
    it('should match snapshot', () => {
      rendered.setProps({ ratings: [1, 2, 3, 4, 5], id: 1 });
      const snapshot = shallow(<div>{instance.renderRateBars()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderRateStar', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRateStar()}</div>);
      const renderProp = snapshot.find(RateAverage).renderProp('children')(1);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(toJSON(renderProp)).toMatchSnapshot();
    });
  });

  describe('renderDialogHeader', () => {
    it('should match snapshot', () => {
      instance.renderAverage = jest.fn(() => 'renderAverage');
      instance.renderRateStar = jest.fn(() => 'renderRateStar');
      const snapshot = shallow(<div>{instance.renderDialogHeader()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDialogContent', () => {
    it('should match snapshot', () => {
      rendered.setProps({ ratings: [1, 2] });
      const snapshot = shallow(<div>{instance.renderDialogContent()}</div>);
      const node = snapshot.find(FilterRatings).renderProp('children')([
        1,
        2,
        3,
      ]);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(toJSON(node)).toMatchSnapshot();
    });
  });

  describe('renderRateAverage()', () => {
    it('should renderRateAverage', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRateAverage, [4.3333]);
    });
  });

  describe('render()', () => {
    it('should render correctly badge null', () => {
      rendered.setProps({ badge: true, ratings: [] });

      expect(instance.render()).toBe(null);
    });
    it('should render correctly badge', () => {
      rendered.setProps({ badge: true, ratings: [1] });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly simplify', () => {
      rendered.setProps({ simplify: true });

      instance.renderDialogHeader = jest.fn(() => 'renderDialogHeader');
      instance.renderDialogContent = jest.fn(() => 'renderDialogContent');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      instance.renderDialogHeader = jest.fn(() => 'renderDialogHeader');
      instance.renderDialogContent = jest.fn(() => 'renderDialogContent');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
