import React, { useContext } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ChannelContext } from '@ugr00p/stream-chat-react';
import { H5, H6 } from 'viewComponents/Typography';
import { makeStyles } from '../../../../../components/material-ui';
import GridContainer from '../../../../../components/GridContainer';
import GridItem from '../../../../../components/GridItem';
import Button from '../../../../../viewComponents/Button';
import { VARIANTS } from '../../../../../variantsConstants';
import { setChannelOpen } from '../../ChannelHeader/actions';
import Icon from '../../../../../ugcomponents/Icon';
const styles = ({ colors }) => ({
  frame: {
    height: '64px',
    background: 'white',
    color: colors.darkgray,
    borderRight: colors.borderColor,
    borderBottom: colors.borderColor,
    borderTop: colors.borderColor,
    padding: '4px 4px 4px 16px',
    margin: 0,
  },
  noPadding: {
    padding: 0,
  },
});

const useStyles = makeStyles(styles);
function ChannelDetailHeader(props) {
  const classes = useStyles();
  const { channel } = useContext(ChannelContext);
  const closeDetail = () => {
    props.setChannelOpen(false)();
  };
  return (
    <GridContainer
      className={classes.frame}
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={0}
      noWrap
    >
      <GridItem>
        <GridContainer direction="column" spacing={0} noWrap>
          <GridItem className={classes.noPadding}>
            <H5 noMargin weight="black">
              Details
            </H5>
          </GridItem>
          <GridItem className={classes.noPadding}>
            <H6 noMargin>{channel.data.name}</H6>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <Button
          variant={VARIANTS.INLINE}
          color="darkgray"
          size="extraSmall"
          tooltipProps={{
            title: 'Leave',
          }}
          weight="light"
          noMargin
          onClick={closeDetail}
        >
          <Icon icon="lnr-cross2" />
        </Button>
      </GridItem>
    </GridContainer>
  );
}

ChannelDetailHeader.propTypes = {
  // hoc props
  setChannelOpen: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    setChannelOpen: value => () => dispatch(setChannelOpen(value)),
  };
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
)(React.memo(ChannelDetailHeader));
