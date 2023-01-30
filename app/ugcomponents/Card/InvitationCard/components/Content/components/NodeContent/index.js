import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIRMED } from 'datastore/invitationStore/constants';
import { URL_HELPERS, DO_NOTHING_FUNC } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import UGLink from 'components/Link';
import { CONFIG } from './config';
import style from './style';

export class NodeContent extends PureComponent {
  renderBody = () => {
    const { classes, content, className, disabled } = this.props;

    return (
      <span className={classnames(disabled && classes.disabled, className)}>
        {content}
      </span>
    );
  };

  render = () => {
    const {
      nodeId,
      disabled,
      target,
      classes,
      url,
      onClick,
      notificationStatus,
    } = this.props;

    const body = this.renderBody();

    if (disabled) {
      return body;
    }
    const link = LOGIC_HELPERS.ifElse(
      notificationStatus === CONFIRMED,
      URL_HELPERS.tours(nodeId),
      url,
    );

    return (
      <UGLink
        className={classes.root}
        to={link || URL_HELPERS.tours(nodeId)}
        target={target}
        onClick={onClick}
      >
        {body}
      </UGLink>
    );
  };
}

NodeContent.propTypes = {
  classes: PropTypes.object.isRequired,

  // from parent
  className: PropTypes.string,
  notificationStatus: PropTypes.string,
  disabled: PropTypes.bool,
  nodeId: PropTypes.number.isRequired,
  url: PropTypes.string,
  onClick: PropTypes.func,
  // from resaga
  target: PropTypes.string,
  content: PropTypes.string,
};

NodeContent.defaultProps = {
  className: '',
  disabled: false,
  content: '',
  target: '',
  url: undefined,
  onClick: DO_NOTHING_FUNC,
};

export default compose(
  withStyles(style, { name: 'NodeContent' }),
  resaga(CONFIG),
)(NodeContent);
