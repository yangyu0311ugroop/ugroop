import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'ugcomponents/Icon';
import Button from 'ugcomponents/Buttons/Button';
import { FormattedMessage as M } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import H6 from 'components/H6';
import styles from './styles';
import m from '../../messages';

export class DialogTitleContent extends PureComponent {
  render() {
    let title;
    const { classes, onClose, template, dialogTitle, type } = this.props;
    const values = { type: type === 'template' ? 'tour' : type };

    // Set default title base on template
    if (template === 'add') {
      title = <M {...m.addTitle} values={values} />;
    } else if (template === 'delete') {
      title = <M {...m.deleteTitle} values={values} />;
    } else if (template === 'confirm') {
      title = <M {...m.confirmTitle} values={values} />;
    } else {
      title = <M {...m.customTitle} />;
    }
    return (
      <div className={classes.root}>
        <H6 className={classes.title}>{!dialogTitle ? title : dialogTitle}</H6>
        <Button className={classes.button} onClick={onClose}>
          <Icon icon="lnr-cross" className={classes.close} />
        </Button>
      </div>
    );
  }
}

DialogTitleContent.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  type: PropTypes.string,
  template: PropTypes.string,
  dialogTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

DialogTitleContent.defaultProps = {
  onClose: e => e.preventDefault(),
  type: 'ONE',
};

export default withStyles(styles, { name: 'DialogTitleContent' })(
  DialogTitleContent,
);
