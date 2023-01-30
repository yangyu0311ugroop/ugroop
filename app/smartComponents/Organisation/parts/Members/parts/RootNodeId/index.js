import { withStyles } from '@material-ui/core/styles';
import { ORGANISATION_API, SETUP_PERSONAL_TOUR } from 'apis/constants';
import { DEFAULT, DO_NOTHING, INVALID_ROOT_NODE_ID } from 'appConstants';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import UGLink from 'components/Link';
import classnames from 'classnames';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class RootNodeId extends PureComponent {
  setupPersonalTours = () => {
    const { rootNodeId, orgId, id } = this.props;

    if (!rootNodeId) {
      return this.props.resaga.dispatchTo(
        ORGANISATION_API,
        SETUP_PERSONAL_TOUR,
        {
          payload: { id: orgId, userId: id },
          onSuccess: this.redirectToRootNodeId,
          onError: this.redirectToAccessDenied,
        },
      );
    }

    return DO_NOTHING;
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'rootNodeId', 'id', 'classes']);

  redirectToRootNodeId = ({ rootNodeId }) => {
    const { url, history } = this.props;

    if (rootNodeId) {
      return history.push(`${url}${rootNodeId}`);
    }

    return DO_NOTHING;
  };

  redirectToAccessDenied = () => {
    const { url, history } = this.props;

    // Force the display of Access Denied by redirecting to an invalid ID
    return history.push(`${url}${INVALID_ROOT_NODE_ID}`);
  };

  renderDefault = () => {
    const {
      classes,
      rootNodeId,
      url,
      children,
      current,
      activePaddingClassName,
    } = this.props;

    if (current === rootNodeId) {
      return (
        <div className={classnames(classes.active, activePaddingClassName)}>
          {children}
        </div>
      );
    }

    return <UGLink to={`${url}${rootNodeId}`}>{children}</UGLink>;
  };

  renderButtonForNoRootNodeId = () => {
    const { classes, children } = this.props;

    return (
      <Button
        variant={VARIANTS.INLINE}
        className={classes.link}
        onClick={this.setupPersonalTours}
        noPadding
      >
        {children}
      </Button>
    );
  };

  render = () => {
    const { rootNodeId, variant } = this.props;

    if (!rootNodeId) {
      return this.renderButtonForNoRootNodeId();
    }

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

RootNodeId.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.node.isRequired,
  url: PropTypes.string,
  variant: PropTypes.string,
  id: PropTypes.number, // userId
  orgId: PropTypes.number,
  current: PropTypes.number,

  // resaga props
  rootNodeId: PropTypes.number,

  activePaddingClassName: PropTypes.string,
};

RootNodeId.defaultProps = {
  rootNodeId: 0,
  url: '',
};

export default compose(
  withRouter,
  injectIntl,
  withStyles(styles, { name: 'RootNodeId' }),
  resaga(CONFIG),
)(RootNodeId);
