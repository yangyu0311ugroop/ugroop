import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { DayCarousel } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('DayCarousel', styles);

describe('<DayCarousel />', () => {
  let rendered;
  let instance;

  const props = {
    totalNum: 5,
    classes: mockStyles,
    onChange: jest.fn(),
  };

  const innerSlider = {
    props: { slidesToShow: 4 },
  };

  beforeEach(() => {
    rendered = shallow(
      <DayCarousel {...props}>
        <div>Jesus my comforter</div>
      </DayCarousel>,
    );
    instance = rendered.instance();
    instance.slider = { slickGoTo: jest.fn(), innerSlider };
  });

  it('should exists', () => {
    expect(DayCarousel).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render no Actions', () => {
    rendered.setProps({ totalNum: 4 });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('onNext', () => {
    it('should call slickGoTo()', () => {
      instance.onNext();
      expect(instance.slider.slickGoTo).toBeCalled();
    });
    it('should call slickGoTo(0)', () => {
      rendered.setProps({ currPage: 1, totalNum: 4 });
      instance.onNext();
      expect(instance.slider.slickGoTo).toBeCalledWith(0);
    });
    it('should call slickGoTo(5)', () => {
      rendered.setProps({ currPage: 1, totalNum: 8 });
      instance.onNext();
      expect(instance.slider.slickGoTo).toBeCalledWith(5);
    });
  });

  describe('onPrev', () => {
    it('should call slickGoTo()', () => {
      instance.onPrev();
      expect(instance.slider.slickGoTo).toBeCalled();
    });
    it('should call slickGoTo(1)', () => {
      rendered.setProps({ currPage: 5, totalNum: 8 });
      instance.onPrev();
      expect(instance.slider.slickGoTo).toBeCalledWith(1);
    });
  });

  describe('renderActions', () => {
    it('return default', () => {
      rendered.setProps({ totalNum: 0 });
      const snapshot = shallow(<div>{instance.renderActions()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('createSliderRef', () => {
    it('should populate slider variable whatever is passed on it', () => {
      const sliderVar =
        "Jesus saves me not because I'm perfect and awesome but because He is perfect and awesome!";
      instance.createSliderRef(sliderVar);
      expect(instance.slider).toEqual(sliderVar);
    });
  });
  describe('Screen Responsive', () => {
    it('LargeScreen', () => {
      const expected = {
        breakpoint: 1615,
        settings: {
          slidesToShow: 4,
        },
      };
      let result = instance.LargeScreen(10);
      expect(result).toEqual(expected);
      result = instance.LargeScreen(3).settings.slidesToShow;
      expect(result).toEqual(3);
      result = instance.LargeScreen(2).settings.slidesToShow;
      expect(result).toEqual(2);
      result = instance.LargeScreen(1).settings.slidesToShow;
      expect(result).toEqual(1);
    });
    it('NormalScreen', () => {
      const expected = {
        breakpoint: 1415,
        settings: {
          slidesToShow: 3,
        },
      };
      let result = instance.NormalScreen(10);
      expect(result).toEqual(expected);
      result = instance.NormalScreen(2).settings.slidesToShow;
      expect(result).toEqual(2);
      result = instance.NormalScreen(1).settings.slidesToShow;
      expect(result).toEqual(1);
    });
    it('MediumScreen', () => {
      const expected = {
        breakpoint: 1215,
        settings: {
          slidesToShow: 2,
        },
      };
      let result = instance.MediumScreen(10);
      expect(result).toEqual(expected);
      result = instance.MediumScreen(3).settings.slidesToShow;
      expect(result).toEqual(2);
      result = instance.MediumScreen(2).settings.slidesToShow;
      expect(result).toEqual(1);
    });
    it('SmallScreen', () => {
      const expected = {
        breakpoint: 815,
        settings: { slidesToShow: 1 },
      };
      expect(instance.SmallScreen()).toEqual(expected);
    });
    it('responsiveBreakPoints', () => {
      instance.LargeScreen = jest.fn(() => 'large');
      instance.NormalScreen = jest.fn(() => 'normal');
      instance.MediumScreen = jest.fn(() => 'medium');
      instance.SmallScreen = jest.fn(() => 'small');

      const expected = ['large', 'normal', 'medium', 'small'];
      expect(instance.responsiveBreakPoints()).toEqual(expected);
    });
    it('SlideToShow', () => {
      let result = instance.slidetoShow(10);
      expect(result).toBe(4);
      result = instance.slidetoShow(10, 3);
      expect(result).toBe(3);
      result = instance.slidetoShow(3);
      expect(result).toBe(3);
      result = instance.slidetoShow(2);
      expect(result).toBe(2);
      result = instance.slidetoShow(1);
      expect(result).toBe(1);
      result = instance.slidetoShow(0);
      expect(result).toBe(1);
    });
  });
});
