import expect from 'expect';
import { getFireBaseConifg } from '../firebaseConfigration';
import fireBaseConfig from '../firebaseConfig';
import fireBaseConfigLatest from '../firebaseConfig.latest';
import fireBaseConfigLive from '../firebaseConfig.live';
import fireBaseConfigStable from '../firebaseConfig.stable';

describe('firebaseConfig', () => {
  it('getFireBaseConifg', () => {
    let res = getFireBaseConifg();
    expect(res).toEqual(fireBaseConfig);
    process.env.ENV = 'latest';
    res = getFireBaseConifg();
    expect(res).toEqual(fireBaseConfigLatest);
    process.env.ENV = 'stable';
    res = getFireBaseConifg();
    expect(res).toEqual(fireBaseConfigStable);
    process.env.ENV = 'production';
    res = getFireBaseConifg();
    expect(res).toEqual(fireBaseConfigLive);
    process.env.ENV = 'development';
    res = getFireBaseConifg();
    expect(res).toEqual(fireBaseConfig);
  });
});
