import { unitOfDistanceCoverter } from '../converter';

describe('unitOfDistanceConverter', () => {
  it('should convert by default meter to kilometer', () => {
    const result = unitOfDistanceCoverter(1000);

    expect(result).toBe(1);
  });

  it('should throw error when no value was sent', () => {
    expect(() => unitOfDistanceCoverter()).toThrow();
  });
});
