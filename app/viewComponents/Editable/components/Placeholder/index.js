/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from 'components/material-ui';
import classNames from 'classnames';
import P from 'viewComponents/Typography';
import style from './style';

export class EditablePlaceholder extends React.PureComponent {
  render = () => {
    const { classes, children, className } = this.props;
    return (
      <P dense className={classNames(classes.p, className)}>
        {children}
      </P>
    );
  };
}

EditablePlaceholder.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
  className: PropTypes.string,
};

EditablePlaceholder.defaultProps = {
  children: null,
  className: null,
};

export default compose(
  withStyles(style, { name: 'viewComponents/Editable/Placeholder' }),
)(EditablePlaceholder);
