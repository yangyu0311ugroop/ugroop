import PropTypes from 'prop-types';
import React from 'react';
import SimpleRTE from 'ugcomponents/Inputs/SimpleRTE';
import styles from './styles';
import { makeStyles } from '../../../../../../../../components/material-ui';
import OrgUserInvitee from './Invitee';
const useStyles = makeStyles(styles);
function Content(props) {
  const classes = useStyles();
  const { userId, expandContent } = props;
  const { email, templateId, minimise, orgId } = props;

  const renderAddPersonalMessage = () => {
    if (!expandContent) return '';

    return (
      <div className={classes.roleContainer}>
        <SimpleRTE name="pm" />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <OrgUserInvitee
        noanimate
        userId={userId}
        email={email}
        templateId={templateId}
        minimise={minimise}
        hideRole={!expandContent}
        orgId={orgId}
      />
      {expandContent && renderAddPersonalMessage()}
    </div>
  );
}

Content.propTypes = {
  email: PropTypes.string,
  userId: PropTypes.number,
  templateId: PropTypes.number,
  orgId: PropTypes.number,
  minimise: PropTypes.bool,
  expandContent: PropTypes.bool,
};

Content.defaultProps = {
  email: '',
  userId: 0,
};

export default React.memo(Content);
