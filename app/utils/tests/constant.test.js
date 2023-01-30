import {
  invisibleDivMark,
  templateDayIdAnchor,
  toolBarIndex,
  scrollOptions,
  uploadStatus,
  photoSize,
  dateDisplay,
  navbarScroll,
} from '../constant';

describe('Constant', () => {
  it('uploadStatus', () => {
    expect(uploadStatus.error).toBe('error');
    expect(uploadStatus.success).toBe('success');
    expect(uploadStatus.pending).toBe('pending');
    expect(uploadStatus.editing).toBe('editing');
  });
  it('photoSize', () => {
    expect(photoSize.CROP).toBe('CROP');
    expect(photoSize.ORIGINAL).toBe('ORIGINAL');
  });
  it('scrollOptions', () => {
    expect(scrollOptions).toMatchSnapshot();
  });
  it('navbarScroll', () => {
    expect(navbarScroll).toBe('navbarScroll');
  });
  it('templateDayIdAnchor', () => {
    expect(templateDayIdAnchor(2)).toMatchSnapshot();
  });
  it('toolBarIndex', () => {
    expect(toolBarIndex(2)).toBe('ToolBar-2');
  });
  it('invisibleDivMark', () => {
    expect(invisibleDivMark).toBe('stickyBottomMark');
  });
  it('dateDisplay', () => {
    expect(dateDisplay.none).toBe('none');
    expect(dateDisplay.weekDay).toBe('weekDay');
    expect(dateDisplay.startDate).toBe('startDate');
  });
});
