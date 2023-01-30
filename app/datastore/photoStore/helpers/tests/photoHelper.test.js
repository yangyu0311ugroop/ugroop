import photoHelper from '../photoHelper';

describe('upsert', () => {
  let photos;
  beforeEach(() => {
    photos = { 1: { id: 1, content: 'abcd' } };
  });
  it('should call merge', () => {
    expect(photoHelper.upsert({ id: 1, content: 'ef' })(photos)).toEqual({
      1: { id: 1, content: 'ef' },
    });
  });
  it('should call insert', () => {
    expect(photoHelper.upsert({ id: 2, content: 'ef' })(photos)).toEqual({
      1: { id: 1, content: 'abcd' },
      2: { id: 2, content: 'ef' },
    });
  });
});

describe('upsertEnumerable', () => {
  let photos;
  let empty;
  beforeEach(() => {
    photos = { 1: { id: 1, content: 'abcd', metaInfo: { x: 1 } } };
    empty = {};
  });
  it('should call insert', () => {
    const insertdata = {
      3: { id: 3, content: 'ef' },
      4: { id: 4, content: 'wd' },
    };
    expect(photoHelper.upsertEnumerable(insertdata)(photos)).toEqual({
      1: { id: 1, content: 'abcd', metaInfo: { x: 1 } },
      3: { id: 3, content: 'ef' },
      4: { id: 4, content: 'wd' },
    });
  });
  it('should call insert', () => {
    const insertdata = {
      3: { id: 3, content: 'ef' },
      4: { id: 4, content: 'wd' },
    };
    expect(photoHelper.upsertEnumerable(insertdata)(empty)).toEqual(insertdata);
  });
  it('should call insert', () => {
    const insertdata = {
      3: { id: 3, content: 'ef' },
      4: { id: 4, content: 'wd' },
    };
    expect(photoHelper.upsertEnumerable(insertdata)(undefined)).toEqual(
      insertdata,
    );
  });
});

describe('remove', () => {
  let photos;
  beforeEach(() => {
    photos = { 1: { id: 1, content: 'abcd' } };
  });
  it('should call delete', () => {
    expect(photoHelper.remove(1)(photos)).toEqual({});
  });
  it('should do nothibg', () => {
    expect(photoHelper.remove(2)(photos)).toEqual(photos);
  });
});
