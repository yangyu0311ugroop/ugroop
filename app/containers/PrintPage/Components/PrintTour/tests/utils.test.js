import { PRINT_TOUR_HELPER } from '../utils';

describe('datastore/discussionStore/utils', () => {
  describe('#handleVideo()', () => {
    it('handleVideo matches snapshot', () => {
      const description =
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/cuL7hC0SeaY?showinfo=0"></iframe><p><br></p>';
      const result = PRINT_TOUR_HELPER.handleVideo(description);
      expect(result).toMatchSnapshot();
    });
    it('handleVideo matches the snapshot w/o video', () => {
      const description = 'some data';
      const result = PRINT_TOUR_HELPER.handleVideo(description);
      expect(result).toMatchSnapshot();
    });
    it('handleVideo matches the snapshot if no description', () => {
      const result = PRINT_TOUR_HELPER.handleVideo();
      expect(result).toMatchSnapshot();
    });
  });
});
