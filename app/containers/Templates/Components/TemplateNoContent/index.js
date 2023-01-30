import { withStyles } from '@material-ui/core/styles';
// import { ability } from 'apis/components/Ability/ability';
import { Can } from 'apis/components/Ability/components/Can';
import PropType from 'prop-types';
/**
 * Created by paulcedrick on 6/19/17.
 */
import React from 'react';
import { FormattedMessage as M, injectIntl } from 'react-intl';
import { compose } from 'redux';
import NewTour from 'smartComponents/Node/components/NewTour';
import { FOLDER, TEMPLATE } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import LoadingText from 'ugcomponents/Progress/LoadingText';
// import classnames from 'classnames';
import m from './messages';
import stylesheet from './styles';

export function UGTemplateNoContent(props) {
  const {
    classes,
    onDelete,
    canDelete,
    onAddFolderClicked,
    folderId,
    loading,
  } = props;

  const renderDeleteButton = () => {
    if (canDelete) {
      return (
        <Can do="delete" on={FOLDER}>
          <Button
            block
            dense
            noPadding
            size="extraSmall"
            className={classes.btn}
            onClick={onDelete}
            data-testid="delete-btn-folder"
          >
            <GridContainer
              direction="row"
              alignItems="center"
              spacing={1}
              wrap="nowrap"
            >
              <GridItem>
                <Icon size="small" icon="lnr-trash" bold color="danger" />
              </GridItem>
              <GridItem>
                <span className={classes.label}>Delete this folder</span>
              </GridItem>
            </GridContainer>
          </Button>
        </Can>
      );
    }
    return '';
  };

  // eslint-disable-next-line react/prop-types
  const renderNewTourButton = ({ onClick }) => (
    <Button
      block
      dense
      noPadding
      size="extraSmall"
      className={classes.btn}
      onClick={onClick}
    >
      <GridContainer
        direction="row"
        alignItems="center"
        spacing={1}
        wrap="nowrap"
      >
        <GridItem>
          <Icon size="small" icon="lnr-plus" bold color="success" />
        </GridItem>
        <GridItem>
          <span className={classes.label}>
            <M {...m.btnNewTourJourney} />
          </span>
        </GridItem>
      </GridContainer>
    </Button>
  );

  const renderCreateFolderButton = () => (
    <Button
      block
      dense
      noPadding
      size="extraSmall"
      className={classes.btn}
      onClick={onAddFolderClicked}
    >
      <GridContainer
        direction="row"
        alignItems="center"
        spacing={1}
        wrap="nowrap"
      >
        <GridItem>
          <Icon size="small" icon="lnr-plus" color="success" bold />
        </GridItem>
        <GridItem>
          <span className={classes.label}>
            <M {...m.btnFolder} />
          </span>
        </GridItem>
      </GridContainer>
    </Button>
  );

  if (loading) {
    return (
      <GridContainer
        direction="column"
        alignItems="center"
        spacing={2}
        className={classes.noContentLoading}
      >
        <GridItem>
          <LoadingText text="Loading..." />
        </GridItem>
      </GridContainer>
    );
  }

  return (
    <GridItem>
      <GridContainer
        direction="column"
        alignItems="center"
        spacing={2}
        className={classes.noContentMargin}
      >
        <GridItem>
          <GridContainer alignItems="center" spacing={2} justify="center">
            <GridItem>
              <Icon icon="lnr-papers" size="mediumXPlus" color="grey" />
            </GridItem>
            <GridItem>
              <Icon icon="lnr-plane" size="mediumXPlus" color="grey" />
            </GridItem>
            <GridItem>
              <Icon icon="lnr-folder" size="mediumXPlus" color="grey" />
            </GridItem>
            <GridItem>
              <Icon icon="lnr-document2" size="mediumXPlus" color="grey" />
            </GridItem>
            <GridItem>
              <Icon icon="lnr-link" size="mediumXPlus" color="grey" />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <div className={classes.subTitle}>
            <M {...m.noTour} />
          </div>
        </GridItem>
        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <Can do="create" on={TEMPLATE}>
                <NewTour folderId={folderId}>{renderNewTourButton}</NewTour>
              </Can>
            </GridItem>
            <GridItem>
              <Can do="create" on={FOLDER}>
                {renderCreateFolderButton()}
              </Can>
            </GridItem>
            <GridItem>{renderDeleteButton()}</GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </GridItem>
  );
}

UGTemplateNoContent.propTypes = {
  className: PropType.string,
  classes: PropType.object.isRequired,
  onAddFolderClicked: PropType.func.isRequired,
  onDelete: PropType.func.isRequired,
  canDelete: PropType.bool,
  intl: PropType.object.isRequired,
  folderId: PropType.number,
  loading: PropType.bool,
};

UGTemplateNoContent.defaultProps = {
  className: '',
  canDelete: false,
  loading: false,
};

export default compose(
  injectIntl,
  withStyles(stylesheet, { name: 'UGTemplateNoContent' }),
)(React.memo(UGTemplateNoContent));
