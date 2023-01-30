import React from 'react';

const FirebaseContext = React.createContext(null);

export const renderComponent = firebase => (Component, props) => (
  <Component {...props} firebase={firebase} />
);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => renderComponent(firebase)(Component, props)}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
