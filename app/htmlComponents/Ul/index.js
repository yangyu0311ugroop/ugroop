import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from './styles';

function Ul(props) {
  const { classes, className, component, items, children } = props;
  const ComponentToRender = component;
  let content = '';

  if (items) {
    content = items.map(
      (item, index) => <ComponentToRender key={`item-${index}`} item={item} />, // eslint-disable-line
    );
  } else if (ComponentToRender) {
    content = <ComponentToRender />;
  } else {
    content = children;
  }

  return <ul className={classNames(classes.root, className)}>{content}</ul>;
}

Ul.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  items: PropTypes.array,
  component: PropTypes.func,
  children: PropTypes.node,
};

Ul.defaultProps = {
  items: null,
};

export const UlTest = Ul;
export default withStyles(styles, { name: 'Ul' })(Ul);
