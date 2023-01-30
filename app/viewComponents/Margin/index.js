import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmptyString } from 'utils/stringAdditions';
import { convertStyleClass } from 'utils/style-utils';
import styles from './styles';

export const MarginWrapper = ({
  classes,
  children,
  top,
  left,
  bottom,
  right,
  className,
  isInline,
  all,
}) => {
  if (isInline) {
    return (
      <span
        className={classnames(
          {
            [convertStyleClass(
              classes,
              `marginTop${all.toUpperCase()}`,
            )]: !isEmptyString(all),
            [convertStyleClass(
              classes,
              `marginBottom${all.toUpperCase()}`,
            )]: !isEmptyString(all),
            [convertStyleClass(
              classes,
              `marginLeft${all.toUpperCase()}`,
            )]: !isEmptyString(all),
            [convertStyleClass(
              classes,
              `marginRight${all.toUpperCase()}`,
            )]: !isEmptyString(all),
          },
          convertStyleClass(classes, `marginTop${top.toUpperCase()}`),
          convertStyleClass(classes, `marginLeft${left.toUpperCase()}`),
          convertStyleClass(classes, `marginBottom${bottom.toUpperCase()}`),
          convertStyleClass(classes, `marginRight${right.toUpperCase()}`),
          className,
        )}
      >
        {children}
      </span>
    );
  }
  return (
    <div
      className={classnames(
        {
          [convertStyleClass(
            classes,
            `marginTop${all.toUpperCase()}`,
          )]: !isEmptyString(all),
          [convertStyleClass(
            classes,
            `marginBottom${all.toUpperCase()}`,
          )]: !isEmptyString(all),
          [convertStyleClass(
            classes,
            `marginLeft${all.toUpperCase()}`,
          )]: !isEmptyString(all),
          [convertStyleClass(
            classes,
            `marginRight${all.toUpperCase()}`,
          )]: !isEmptyString(all),
        },
        convertStyleClass(classes, `marginTop${top.toUpperCase()}`),
        convertStyleClass(classes, `marginLeft${left.toUpperCase()}`),
        convertStyleClass(classes, `marginBottom${bottom.toUpperCase()}`),
        convertStyleClass(classes, `marginRight${right.toUpperCase()}`),
        className,
      )}
    >
      {children}
    </div>
  );
};

MarginWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isInline: PropTypes.bool,
  top: PropTypes.oneOf(['', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  left: PropTypes.oneOf(['', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  bottom: PropTypes.oneOf(['', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  right: PropTypes.oneOf(['', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  all: PropTypes.oneOf(['', 'sm', 'md', 'lg', 'xl', 'xxl']),
};

MarginWrapper.defaultProps = {
  top: '',
  left: '',
  bottom: '',
  right: '',
  className: '',
  isInline: false,
  all: '',
};

export default withStyles(styles, { name: 'MarginWrapper' })(MarginWrapper);
