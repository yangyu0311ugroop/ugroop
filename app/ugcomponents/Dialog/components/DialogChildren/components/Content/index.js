import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Icon from 'viewComponents/Icon';
import { H3, H5 } from 'viewComponents/Typography';
import classnames from 'classnames';
import { FormattedMessage as M } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import m from '../../messages';

export class HeadlineContent extends PureComponent {
  render() {
    let icon;
    let text;
    const {
      classes,
      headlineIcon,
      headlineTitle,
      headlineText,
      headlineClass,
      hideIcon,
      hideTitle,
      type,
      template,
      simplifyDialog,
    } = this.props;
    const values = { type: type === 'template' ? 'tour' : type };

    // Set default text and icon base on template
    if (template === 'add') {
      icon = 'lnr-plus-circle';
      text = <M {...m.addText} values={values} />;
    } else if (template === 'delete') {
      icon = 'lnr-trash3';
      text = <M {...m.deleteText} values={values} />;
    } else if (template === 'confirm') {
      icon = 'lnr-checkmark-circle';
      text = <M {...m.confirmText} values={values} />;
    } else {
      icon = 'lnr-checkmark-circle';
      text = <M {...m.customText} />;
    }

    return (
      <div
        className={classnames(
          classes.root,
          headlineClass,
          LOGIC_HELPERS.ifElse(simplifyDialog, classes.simplifyContent),
        )}
      >
        {!hideIcon && (
          <Icon
            icon={!headlineIcon ? icon : headlineIcon}
            className={classnames({
              [classes.pinkIcon]: template === 'delete',
              [classes.blueIcon]: template === 'custom',
              [classes.greenIcon]: template === 'confirm' || template === 'add',
            })}
          />
        )}
        {!hideTitle && <H3 textAlign="center">{headlineTitle}</H3>}
        <H5>{!headlineText ? text : headlineText}</H5>
      </div>
    );
  }
}

HeadlineContent.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  template: PropTypes.string,
  headlineIcon: PropTypes.string,
  headlineTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  headlineText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
  headlineClass: PropTypes.string,
  hideIcon: PropTypes.bool,
  simplifyDialog: PropTypes.bool,
  hideTitle: PropTypes.bool,
};

HeadlineContent.defaultProps = {
  type: 'one',
};

export default withStyles(styles, { name: 'HeadlineContent' })(HeadlineContent);
