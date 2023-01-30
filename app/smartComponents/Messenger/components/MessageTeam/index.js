import React from 'react';
import { MessageSimple } from '@ugr00p/stream-chat-react';
import { makeStyles } from '../../../../components/material-ui';
const styles = () => ({
  chatListPadding: {
    marginRight: 32,
    marginLeft: 16,
  },
});

const useStyles = makeStyles(styles);
export function UGMessageTeam(props) {
  const classes = useStyles();
  return (
    <div className={classes.chatListPadding}>
      <MessageSimple {...props} />
    </div>
  );
}

export default React.memo(UGMessageTeam);
