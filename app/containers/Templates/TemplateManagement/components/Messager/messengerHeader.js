import Container from 'components/Container';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { isMobile } from 'react-device-detect';
import resaga from 'resaga';
import Hr from 'components/Hr';
import { CONTENT, HEADING } from 'appConstants';
import { HEADER_CONFIG } from './config';
import OpenDiscussion from '../../../../../smartComponents/Node/components/OpenDiscussion';
import { Hidden, makeStyles } from '../../../../../components/material-ui';
import { useMessengerContext } from '../../../../StreamChat/messageStateContext';
import NodeProp from '../../../../../smartComponents/Node/components/NodeProp';

const styles = ({ colors }) => ({
  tabHeader: {
    borderBottom: colors.borderColor,
    background: 'white',
    zIndex: 99999,
  },
  vw100: {
    maxWidth: '100vw',
  },
  tourName: {
    color: 'rgba(76, 86, 115, 1)',
    cursor: 'pointer',
    padding: '4px 12px !important',
    margin: '8px 12px !important',
  },
  discussionIcon: {
    cursor: 'pointer',
    marginRight: 15,
  },
  betaheader: {
    borderTop: '1px solid rgba(220,220,220,0.5)',
    background: 'lightgoldenrodyellow',
    transition: 'background 0.1s',
  },
  betaBadge: {
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  titleXs: {
    fontSize: 16,
    whiteSpace: 'normal',
  },
});

const useStyles = makeStyles(styles);

export function MessengerHeader(props) {
  const classes = useStyles();
  const [, dispatchCtx] = useMessengerContext();
  const handleClick = () => {
    const { history, location } = props;
    const { pathname } = location;
    return history.push(pathname);
  };

  const openChannelSlide = () => {
    if (isMobile) {
      dispatchCtx.toggleChannelSliderValue();
    }
  };
  const { id, tourName } = props;
  return (
    <div className={classes.tabHeader}>
      <Container padding={false}>
        <GridContainer direction="column" spacing={0} noWrap>
          <GridItem className={classes.vw100}>
            <Container padding={false}>
              <Hr noMarginTop noMarginBottom />
              <div>
                <GridContainer alignItems="center" noWrap spacing={0}>
                  <GridItem
                    className={classes.tourName}
                    data-testid="tourNameLink"
                    onClick={handleClick}
                  >
                    <Hidden smDown>
                      <NodeProp
                        id={id}
                        variant={HEADING}
                        valueKey={CONTENT}
                        component={GridItem}
                        editable={false}
                        bold
                        showEmpty
                        required
                        isCustomData={false}
                        value={tourName}
                      />
                    </Hidden>
                    <Hidden mdUp>
                      <NodeProp
                        id={id}
                        valueKey={CONTENT}
                        component={GridItem}
                        editable={false}
                        bold
                        showEmpty
                        required
                        isCustomData={false}
                        className={classes.titleXs}
                        value={tourName}
                      />
                    </Hidden>
                  </GridItem>
                  <GridItem xs />
                  <GridItem className={classes.discussionIcon}>
                    <OpenDiscussion id={id} onClick={openChannelSlide} />
                  </GridItem>
                </GridContainer>
              </div>
            </Container>
          </GridItem>
        </GridContainer>
      </Container>
    </div>
  );
}

MessengerHeader.propTypes = {
  // hoc props
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  id: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  tourName: PropTypes.string,
};

MessengerHeader.defaultProps = {};

export default compose(
  withRouter,
  resaga(HEADER_CONFIG),
)(React.memo(MessengerHeader));
