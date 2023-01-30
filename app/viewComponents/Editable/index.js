/**
 * Created by stephenkarpinskyj on 20/7/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import InlineButton from 'ugcomponents/Buttons/InlineButton'; // TODO: Use fake button
import ReadOnlyWrapper from './components/ReadOnly';
import style from './style';

export EditableAction from './components/Action';
export EditableActions from './components/Actions';
export EditableFormActions from './components/FormActions';
export EditableLabel from './components/Label';
export EditableMenuItemClear from './components/MenuItemClear';
export EditableMenuItemInput from './components/MenuItemInput';
export EditableMenuItemSubmit from './components/MenuItemSubmit';
export EditableMenuItemValue from './components/MenuItemValue';
export EditablePlaceholder from './components/Placeholder';

/**
 * Wrapper component to make something look interactable + respond to click events
 */
export class Editable extends React.PureComponent {
  renderReadOnly = children => {
    const {
      bold,
      Typography,
      className,
      onMouseEnter,
      onMouseLeave,
    } = this.props;
    const props = {
      bold,
      Typography,
      className,
      onMouseEnter,
      onMouseLeave,
    };
    return <ReadOnlyWrapper {...props}>{children}</ReadOnlyWrapper>;
  };

  render = () => {
    const {
      classes,
      children,
      readOnly,
      fullWidth,
      className,
      onClick,
      Typography,
      displayFlex,
      ...rest
    } = this.props;
    const rootStyle = classNames(
      classes.root,
      fullWidth && classes.fullWidth,
      displayFlex && classes.displayFlex,
    );
    const contentStyle = classNames(
      classes.content,
      fullWidth && classes.fullWidth,
      className,
    );
    if (children) {
      if (readOnly) {
        return this.renderReadOnly(children);
      }
      return (
        <div className={rootStyle}>
          <InlineButton
            onClick={onClick}
            className={contentStyle}
            component="div"
            spanBlock
            isEllipsis
            testId="editableInlineButton"
            {...rest}
          >
            {children}
          </InlineButton>
        </div>
      );
    }
    return null;
  };
}

Editable.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
  onClick: PropTypes.func,
  readOnly: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  Typography: PropTypes.string,
  bold: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  displayFlex: PropTypes.bool,
};

Editable.defaultProps = {
  children: null,
  onClick: () => {},
  readOnly: false,
  fullWidth: false,
  Typography: 'P',
  bold: false,
  onMouseEnter: null,
  onMouseLeave: null,
  displayFlex: false,
};

export default compose(withStyles(style, { name: 'viewComponents/Editable' }))(
  Editable,
);
