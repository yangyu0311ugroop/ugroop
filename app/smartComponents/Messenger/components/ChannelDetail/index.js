import React, { useContext } from 'react';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'redux';
import { ChannelContext } from '@ugr00p/stream-chat-react';
import { CONFIG } from './config';
import { makeStyles } from '../../../../components/material-ui';
import ChannelDetailHeader from './components/channelDetailsHeader';
import ChannelDetailBody from './components/channelDetailBody';
import GridItem from '../../../../components/GridItem';
import GridContainer from '../../../../components/GridContainer';

const styles = ({ colors }) => ({
  frame: {
    margin: 0,
    width: '337px', // TODO: dynamically adjust the size based on the screen size
  },
  fixFrame: {
    position: 'absolute',
    right: 0,
    borderLeft: colors.borderColor,
  },
  noPadding: {
    padding: 0,
  },
});

const useStyles = makeStyles(styles);
function ChannelDetail(props) {
  const classes = useStyles();
  const className = classNames(
    classes.frame,
    props.width < 800 && classes.fixFrame,
  );

  const { thread } = useContext(ChannelContext);
  // If thread is active and window should hide on thread. Return null
  if (thread) {
    return null;
  }

  if (!props.openDetailChannel) {
    return null;
  }
  return (
    <div className={className}>
      <GridContainer spacing={0}>
        <GridItem xs={12} md={12}>
          <ChannelDetailHeader />
        </GridItem>
        <GridItem xs={12} md={12}>
          <ChannelDetailBody />
        </GridItem>
      </GridContainer>
    </div>
  );
}

ChannelDetail.propTypes = {
  openDetailChannel: PropTypes.bool,
  width: PropTypes.number,
};

export default compose(resaga(CONFIG))(React.memo(ChannelDetail));
