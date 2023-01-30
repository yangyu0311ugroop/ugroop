import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
const styleSheet = {
  root: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
};

function Ul(props) {
  const { classes, className, component } = props;
  const ComponentToRender = component;
  let content = '';

  // If we have items, render them
  if (props.items) {
    content = props.items.map((item, index) => (
      // eslint-disable-next-line
      <ComponentToRender key={`item-${index}`} item={item} />
    ));
  } else if (ComponentToRender) {
    // Otherwise render a single component
    content = <ComponentToRender />;
  } else {
    content = props.children;
  }

  return <ul className={classNames(classes.root, className)}>{content}</ul>;
}

Ul.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  items: PropTypes.array,
  component: PropTypes.any,
  children: PropTypes.node,
};
Ul.defaultProps = {
  items: null,
};

const StyleUl = withStyles(styleSheet, { name: 'Ul' })(Ul);
export const UlTest = Ul;
export default StyleUl;
