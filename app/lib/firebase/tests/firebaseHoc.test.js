import React from 'react';
import toJSON from 'enzyme-to-json';
import { withFirebase } from '../context';
import A from '../../../htmlComponents/A';

const myComponent = <A>abcd</A>;

describe('FireBaseHOC', () => {
  it('shall match snapshot', () => {
    expect(toJSON(withFirebase(myComponent))).toMatchSnapshot();
  });
  it('shall match snapshot with props', () => {
    expect(
      toJSON(withFirebase(myComponent)({ someProps: 'abcd' })),
    ).toMatchSnapshot();
  });
});
