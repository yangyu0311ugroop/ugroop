import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { moment } from 'utils';
import { H6 } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DEFAULT, TEXT_WITH_LABEL } from 'appConstants';
import { CONFIG } from './config';
import styles from './styles';

export class LastAccessAt extends PureComponent {
  contentClassName = () => {
    const { classes, className, indent } = this.props;

    return classnames(
      classes.default,
      LOGIC_HELPERS.ifElse(indent, classes.indent),
      className,
    );
  };

  iAm = () => {
    const { me, id } = this.props;
    return me === id;
  };

  renderTextWithlabel = () => {
    const {
      classes,
      lastAccess,
      showNoAccessPlaceHolder,
      renderActualTime,
    } = this.props;
    const today = moment.getDateToday().toISOString();
    if (!lastAccess) {
      if (showNoAccessPlaceHolder) {
        return <H6 noMargin>Not active yet</H6>;
      }
      return '';
    }

    const content = (
      <div className={classes.withLabel}>
        <H6 noMargin className={classes.label}>
          Last active
        </H6>
        <H6 noMargin>
          {!renderActualTime && this.iAm()
            ? moment.renderFromNow(today)
            : moment.renderFromNow(lastAccess)}
        </H6>
      </div>
    );
    return content;
  };

  renderDefault = () => {
    const { lastAccess } = this.props;
    if (!lastAccess) {
      return null;
    }

    return (
      <span className={this.contentClassName()}>
        {moment.renderFromNow(lastAccess)}
      </span>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [TEXT_WITH_LABEL]: this.renderTextWithlabel,
      [DEFAULT]: this.renderDefault,
    });
  };
}
LastAccessAt.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  id: PropTypes.number,
  me: PropTypes.number,
  indent: PropTypes.bool,
  variant: PropTypes.string,
  className: PropTypes.string,
  showNoAccessPlaceHolder: PropTypes.bool,
  renderActualTime: PropTypes.bool,
  // resaga props
  lastAccess: PropTypes.string,
};

LastAccessAt.defaultProps = {
  className: '',
  lastAccess: '',
  indent: false,
  showNoAccessPlaceHolder: false,
  renderActualTime: false,
};

export default compose(
  withStyles(styles, { name: 'Time' }),
  resaga(CONFIG),
)(LastAccessAt);
