import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT, LINK } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import Name from 'ugcomponents/Person/Name';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import styles from './styles';

export class ShareFrom extends React.PureComponent {
  renderLink = () => {
    const { value, classes, className, NameProps } = this.props;
    return (
      <Name
        id={value}
        variant={LINK}
        bold={false}
        className={classnames(classes.shareFromEllipsis, className)}
        {...NameProps}
      />
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderLink,
    });
  };
}

ShareFrom.propTypes = {
  // parent
  variant: PropTypes.string,
  classes: PropTypes.object,
  className: PropTypes.string,
  NameProps: PropTypes.object,

  // resaga value
  value: PropTypes.number,
};

ShareFrom.defaultProps = {
  variant: null,
  NameProps: {},

  value: 0,
};

export default compose(
  withStyles(styles, { name: 'ShareFrom' }),
  INVITATION_STORE_HOC.selectUserNodeProp({ path: 'shareFrom' }),
)(ShareFrom);
