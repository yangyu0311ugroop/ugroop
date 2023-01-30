/**
 * Created by Yang on 5/9/17.
 */
import { updateState } from '../index';

const state = {
  photo: [{ id: 1, status: 'error' }, { id: 2, status: 'error' }],
};
const emptyState = {
  photo: [],
};

describe('Test Update State', () => {
  it('update State shall update key value correctly', () => {
    const { cloneState, index } = updateState(
      state.photo,
      { id: 1 },
      ['status'],
      ['success'],
    );
    expect(cloneState[0].status).toBe('success');
    expect(index).toBe(0);
  });
  it('update State shall update with empty value', () => {
    const { cloneState } = updateState(
      emptyState.photo,
      { id: 1 },
      ['status'],
      ['success'],
    );
    expect(cloneState).toEqual(emptyState.photo);
  });
});
