import { CONTENT } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import OrganisationName from 'smartComponents/Node/parts/OrganisationName';
import Photo from 'smartComponents/Node/parts/Photo';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class SimpleView extends PureComponent {
  componentWillMount = () => {
    const { classes } = this.props;

    this.photoClassNames = {
      containerClassName: classes.templateImageContainer,
    };
    this.photoPlaceholderProps = { showOverlay: false };
  };

  isActive = () => false;

  renderContent = () => {
    const { id, classes, showOrganisation } = this.props;

    return (
      <>
        <GridItem>
          <NodeProp
            id={id}
            valueKey={CONTENT}
            editable={false}
            showEmpty
            ellipsis
            className={classes.contentCompressed}
            ellipsisClassName={LOGIC_HELPERS.ifElse(
              classes.ellipsisDivCompressed,
            )}
          />
        </GridItem>
        {showOrganisation && (
          <OrganisationName
            id={id}
            component={GridItem}
            className={classes.orgName}
            ellipsisClassName={LOGIC_HELPERS.ifElse(
              classes.ellipsisDivCompressed,
            )}
          />
        )}
      </>
    );
  };

  render = () => {
    const { id, classes, fullWidth, flexWidth } = this.props;

    return (
      <GridItem
        key={id}
        className={classnames(
          fullWidth && classes.fullWidth,
          flexWidth && classes.flexWidth,
        )}
      >
        <div
          className={classnames(
            classes.tourGridCompressed,
            classes.relativeCompressed,
          )}
        >
          <GridContainer alignItems="center" spacing={0}>
            <GridItem
              className={classnames(
                classes.grow,
                classes.tourTitle,
                classes.padding8,
              )}
            >
              <div className={classes.tourContent}>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>{this.renderContent()}</GridItem>
                </GridContainer>
              </div>
            </GridItem>

            <div className={classes.tourPhotoCompressed}>
              <Photo
                resizeSize={256}
                placeholderProps={this.photoPlaceholderProps}
                editable={false}
                id={id}
                classNames={this.photoClassNames}
              />
            </div>
          </GridContainer>
        </div>
      </GridItem>
    );
  };
}

SimpleView.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  showOrganisation: PropTypes.bool,
  fullWidth: PropTypes.bool,
  flexWidth: PropTypes.bool,

  // resaga props
};

SimpleView.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'SimpleView' }),
  resaga(CONFIG),
)(SimpleView);
