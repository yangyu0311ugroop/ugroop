import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// TODO: add UGROOP style
export const styles = () => ({});

// eslint-disable-next-line react/prefer-stateless-function
export class TabConversation extends PureComponent {
  render = () => {
    const { tab } = this.props;

    return (
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <Typography type="title">{tab.content}</Typography>
          <br />
          <Typography type="body1">
            <i>This page is under construction</i>
          </Typography>
        </Grid>
      </Grid>
    );
  };
}

TabConversation.propTypes = {
  tab: PropTypes.object,
};

export default withStyles(styles)(TabConversation);
