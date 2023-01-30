import ReactResizeDetector from 'react-resize-detector';
import { Collapse } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import React, { PureComponent } from 'react';
import GridContainer from '../../components/GridContainer';
import GridItem from '../../components/GridItem';
import JText from '../../components/JText';
import Button from '../../viewComponents/Button';
import { VARIANTS } from '../../variantsConstants';
import styles from './styles';
import { CONFIG } from './config';

import { LOGIC_HELPERS } from '../../utils/helpers/logic';
import { UPSERT_PERSONAL_PREFERENCES, USER_API } from '../../apis/constants';
import JDialog from '../JDialog';

export class SeeMore extends PureComponent {
  state = {
    dimensions: { height: 276 },
    openDialog: false,
    loading: false,
    collapse: this.props.isCollapeSeeMore,
  };

  onResize = (_, height) => {
    this.setState({
      dimensions: { height },
    });
  };

  handleCollapseChange = () => {
    const { collapse } = this.state;
    this.setState({ collapse: !collapse });
  };

  renderBody = () => (
    <GridContainer direction="column">
      <GridItem>
        <JText md nowrap={false}>
          This will disable the See More feature. Changes will be reflected.
          across your uGroop account. Are you sure you want to continue?
        </JText>
      </GridItem>
      <GridItem>
        <JText italic gray md nowrap={false}>
          You can always turn on this feature in
          <strong>{' USER SETTINGS > PREFERENCE'}</strong>
        </JText>
      </GridItem>
    </GridContainer>
  );

  handleSwitchChangeSeeMore = value => {
    const { userId } = this.props;
    this.props.resaga.dispatchTo(USER_API, UPSERT_PERSONAL_PREFERENCES, {
      payload: {
        id: userId,
        data: {
          seeMoreDisabled: value,
        },
      },
      onSuccess: this.updateDisableSeeMoreSuccess,
    });
  };

  updateDisableSeeMoreSuccess = () => {
    this.setState({ loading: false });
    this.closeDisabledSeeMoreDialog();
  };

  closeDisabledSeeMoreDialog = () => {
    this.setState({ openDialog: false });
  };

  toggleDisableSeeMore = value => () => {
    this.setState({ loading: true });
    this.handleSwitchChangeSeeMore(LOGIC_HELPERS.ifElse(value, '0', '1'));
  };

  renderSeeMoreDialog = () => {
    const { openDialog, loading } = this.state;
    return (
      <JDialog
        open={openDialog}
        onClose={this.closeDisabledSeeMoreDialog}
        headerNoWrap
        header={
          <JText bold uppercase>
            Disable See more/See less
          </JText>
        }
        hideSubmitButton
        submitButton="Continue"
        maxWidth="xs"
        loading={loading}
      >
        <GridContainer direction="column">
          <GridItem>{this.renderBody()}</GridItem>
          <GridItem>{this.renderFormActions()}</GridItem>
        </GridContainer>
      </JDialog>
    );
  };

  renderFormActions = () => {
    const { loading } = this.state;
    return (
      <GridContainer wrap="nowrap">
        <GridItem xs />
        <GridItem>
          <Button
            size="xs"
            color="black"
            variant="outline"
            dense
            disabled={loading}
            onClick={this.closeDisabledSeeMoreDialog}
          >
            Cancel
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="xs"
            color={loading ? 'gray' : 'primary'}
            onClick={this.toggleDisableSeeMore('0')}
            disabled={loading}
            dense
          >
            {loading ? 'Loading...' : 'Disable'}
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  openDisabledSeeMoreDialog = () => {
    this.setState({ openDialog: true });
  };

  render = () => {
    const {
      seeMoreDisabled,
      isMinHeightCollapse,
      children,
      classes,
      renderSeeMore,
      readOnly,
      editing,
    } = this.props;
    const { collapse, dimensions } = this.state;

    const seeMoreSettings = seeMoreDisabled !== '0';

    const minHeightCollapse = LOGIC_HELPERS.ifElse(
      isMinHeightCollapse,
      250,
      105,
    );

    const adjustDimension = dimensions.height - 2; // decrease the excess height, so that see more not appear even no content
    return (
      <React.Fragment>
        {readOnly &&
        adjustDimension > minHeightCollapse &&
        !editing &&
        seeMoreSettings &&
        renderSeeMore ? (
          <>
            <Collapse in={collapse} collapsedHeight={minHeightCollapse}>
              <ReactResizeDetector handleHeight onResize={this.onResize}>
                {children}
              </ReactResizeDetector>
            </Collapse>
            <GridContainer
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <GridItem>
                <JText italic onClick={this.handleCollapseChange} blue md>
                  {collapse ? 'See less...' : 'See more...'}
                </JText>
              </GridItem>
              {seeMoreSettings && (
                <GridItem>
                  <>
                    <Button
                      size="extraSmall"
                      dense
                      variant={VARIANTS.INLINE}
                      className={classes.createButton}
                      onClick={this.openDisabledSeeMoreDialog}
                    >
                      Disable see more
                    </Button>
                    {this.renderSeeMoreDialog()}
                  </>
                </GridItem>
              )}
            </GridContainer>
          </>
        ) : (
          children
        )}
      </React.Fragment>
    );
  };
}

SeeMore.propTypes = {
  // hoc props
  userId: PropTypes.number,
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  children: PropTypes.array,

  seeMoreDisabled: PropTypes.string,
  isMinHeightCollapse: PropTypes.number,
  isCollapeSeeMore: PropTypes.bool,
  renderSeeMore: PropTypes.bool,
  editing: PropTypes.bool,
  readOnly: PropTypes.bool,
  // resaga props
};

SeeMore.defaultProps = {
  isCollapeSeeMore: false,
};

export default compose(
  withStyles(styles, { name: 'SeeMore' }),
  resaga(CONFIG),
)(SeeMore);
