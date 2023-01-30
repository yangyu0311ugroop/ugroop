import helper from 'utils/helpers/dataUriToBlob';
import ImageUtility from 'utils/imageUtils';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { CropperBody } from '../cropperBody';
const mockedDispatchFn = jest.fn();
const styles = {};
const fakeImage = {
  size: { width: 2, height: 2 },
  resource: 'data:text/plain;charset=utf-8;base64,cmVzaXplSW1hZ2U=',
};

const body = (
  <CropperBody
    classes={styles}
    dispatchUpload={mockedDispatchFn}
    filename="myname"
    fileImage={fakeImage}
  />
);

describe('Cropper Body', () => {
  it('shall render properly', () => {
    const wrapperBody = shallow(body);
    expect(toJSON(wrapperBody)).toMatchSnapshot();
  });
  it('componentWillMount', () => {
    const mockFn = jest.fn(() => ({
      then: cb => {
        cb('imageData');
      },
    }));
    ImageUtility.BlobtoDataURL = mockFn;
    const wrapperBody = shallow(body);
    wrapperBody.setProps({
      loadFromUrl: true,
      originalImageBlob: { blob: 'blob' },
    });
    wrapperBody.instance().componentWillMount();
    expect(wrapperBody.state().image).toBe('imageData');
  });
  it('componentWillMount if fileImage is not null', () => {
    const wrapperBody = shallow(body);
    wrapperBody.setProps({
      loadFromUrl: false,
      originalImageBlob: { blob: 'blob' },
    });
    wrapperBody.setProps({
      image: null,
    });
    wrapperBody.instance().componentWillMount();
    expect(wrapperBody.state().image).toBe(
      'data:text/plain;charset=utf-8;base64,cmVzaXplSW1hZ2U=',
    );
  });
  it('componentWillMount if fileImage is null', () => {
    const wrapperBody = shallow(body);
    wrapperBody.setState({ image: null });
    wrapperBody.setProps({
      fileImage: null,
    });
    wrapperBody.setProps({
      loadFromUrl: false,
      originalImageBlob: { blob: 'blob' },
    });
    wrapperBody.instance().componentWillMount();
    expect(wrapperBody.state().image).toBe(null);
  });

  it('componentWillReceiveProps with new image', () => {
    helper.dataUriToBlob = jest.fn(() => 'blob');
    const wrapperBody = shallow(body);
    wrapperBody.instance().componentWillReceiveProps({ fileImage: fakeImage });
    expect(wrapperBody.state().image).toBe(
      'data:text/plain;charset=utf-8;base64,cmVzaXplSW1hZ2U=',
    );
  });
  it('componentWillReceiveProps with no image', () => {
    const wrapperBody = shallow(body);
    wrapperBody.instance().setState = jest.fn();
    wrapperBody.instance().componentWillReceiveProps({ fileImage: null });
    expect(wrapperBody.instance().setState).not.toHaveBeenCalled();
  });

  describe('Orientation ', () => {
    let rendered;

    beforeEach(() => {
      rendered = shallow(
        <CropperBody
          classes={styles}
          dispatchUpload={mockedDispatchFn}
          fileImage={fakeImage}
          filename="myname"
        />,
      );
    });

    it('Rotation is 0 degrees ', () => {
      rendered.setProps({
        orientation: 0,
        canvasWidth: 400,
        canvasHeight: 300,
      });

      expect(
        rendered
          .find('r')
          .at(0)
          .props().width,
      ).toBe(400);
      expect(
        rendered
          .find('r')
          .at(0)
          .props().height,
      ).toBe(300);
    });

    it('Rotation is 90 degrees ', () => {
      rendered.setProps({
        orientation: 90,
        canvasWidth: 400,
        canvasHeight: 300,
      });

      expect(
        rendered
          .find('r')
          .at(0)
          .props().width,
      ).toBe(300);
      expect(
        rendered
          .find('r')
          .at(0)
          .props().height,
      ).toBe(400);
    });

    it('Rotation is 180 degrees ', () => {
      rendered.setProps({
        orientation: 180,
        canvasWidth: 400,
        canvasHeight: 300,
      });

      expect(
        rendered
          .find('r')
          .at(0)
          .props().width,
      ).toBe(400);
      expect(
        rendered
          .find('r')
          .at(0)
          .props().height,
      ).toBe(300);
    });

    it('Rotation is 270 degrees ', () => {
      rendered.setProps({
        orientation: 270,
        canvasWidth: 400,
        canvasHeight: 300,
      });

      expect(
        rendered
          .find('r')
          .at(0)
          .props().width,
      ).toBe(300);
      expect(
        rendered
          .find('r')
          .at(0)
          .props().height,
      ).toBe(400);
    });
  });
});
