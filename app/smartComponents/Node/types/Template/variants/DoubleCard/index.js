import {
  Category,
  CONTENT,
  SMALL_BADGE,
  SUB_TITLE,
  TEXT,
  URL_HELPERS,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Star from 'smartComponents/Node/components/Star';
import CreatedBy from 'smartComponents/Node/parts/CreatedBy';
import Duration from 'smartComponents/Node/parts/Duration';
import Hashkey from 'smartComponents/Node/parts/Hashkey';
import Photo from 'smartComponents/Node/parts/Photo';
import StartDate from 'smartComponents/Node/parts/StartDate';
import Subtitle from 'smartComponents/Node/parts/Subtitle';
import TourBy from 'smartComponents/Node/parts/TourBy';
import TourRoles from 'smartComponents/Node/parts/TourRoles';
import Status from 'smartComponents/Node/parts/Status';
import LastUpdateAt from 'smartComponents/RecentActivity/parts/LastUpdateAt';
import Icon from 'ugcomponents/Icon';
import NavLink from 'ugcomponents/NavLink';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { withRouter } from 'react-router-dom';
import { CONFIG } from './config';
import styles from './styles';
import PublishedBy from '../../../../../MarketPlace/components/publisherBy';
import ActionButtonsCell from '../../components/ActionButtonsCell';

export class DoubleCard extends PureComponent {
  componentWillMount = () => {
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXXS,
    };
  };

  renderTitle = () => {
    const { classes, id, showPublish } = this.props;
    const link = !showPublish
      ? URL_HELPERS.tours(id)
      : URL_HELPERS.productDetail({ category: Category.FeaturedTours, id });
    return (
      <GridItem className={classnames(classes.ellipsisDiv, classes.relative1)}>
        <NavLink to={link} className={classes.navTitle} stopPropogationLink>
          <NodeProp
            id={id}
            valueKey={CONTENT}
            editable={false}
            showEmpty
            ellipsis
            className={classes.content}
            ellipsisClassName={classes.ellipsisDiv}
          />
        </NavLink>
      </GridItem>
    );
  };

  // renderPublished = () => {
  //   const { classes, personal, id, me, createdBy } = this.props;
  //
  //   // do not render if this is organisation tour, or user is the owner
  //   // if (!personal) return null;
  //
  //   // if (featuredTour) {
  //   if ([1278, 1879, 1443, 1928].indexOf(id) !== -1) {
  //     return (
  //       <GridItem title="Featured">
  //         <GridContainer
  //           alignItems="center"
  //           spacing={0}
  //           className={classes.published}
  //         >
  //           <GridItem>
  //             <Icon size="xsmall" icon="lnr-earth" paddingRight />
  //           </GridItem>
  //           <GridItem>Published</GridItem>
  //         </GridContainer>
  //       </GridItem>
  //     );
  //   }
  //
  //   return null;
  // };

  renderSource = () => {
    if (this.props.showPublish) {
      return <PublishedBy id={this.props.id} />;
    }
    return <TourBy id={this.props.id} />;
  };

  renderPhoto = () => {
    const { classes, id } = this.props;

    return (
      <div
        className={classnames(
          classes.tourPhoto,
          // classes.absolute
        )}
      >
        <Photo
          resizeSize={500}
          editable={false}
          showPreview={false}
          id={id}
          classNames={{
            imageClassName: classes.minHeightUnset,
            containerClassName: classes.minHeightUnset,
          }}
          overlayClassName={classes.overlay}
          borderRadius={false}
        />
      </div>
    );
  };

  renderStarButton = ({ starred, ...props }) => {
    const { classes } = this.props;

    const icon = LOGIC_HELPERS.ifElse(starred, 'lnr-star', 'lnr-star-empty');

    return (
      <Button
        dense
        size="extraSmall"
        className={classnames(
          LOGIC_HELPERS.ifElse(starred, classes.unstar, classes.starred),
        )}
        {...props}
      >
        <Icon size="normal" bold icon={icon} />
      </Button>
    );
  };

  renderLastViewed = ({ timeSince, time }) => {
    const { classes } = this.props;

    return (
      <GridItem>
        <div
          className={classnames(classes.subtitle, classes.viewed)}
          title={`Last viewed by you: ${time}`}
        >
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>
              <Icon icon="lnr-eye" size="xsmall" paddingRight />
            </GridItem>
            <GridItem>You viewed {timeSince} ago</GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderContent = () => {
    const { classes, id, me, createdBy, isActionBtn } = this.props;

    return (
      <div className={classnames(classes.grid, classes.tourGrid)}>
        <GridContainer
          direction="column"
          spacing={0}
          className={classnames(classes.card)}
        >
          {<GridItem>{this.renderPhoto()}</GridItem>}
          <GridItem>
            <GridContainer
              direction="column"
              className={classnames(classes.subtitle)}
            >
              <GridItem>
                <GridContainer
                  alignItems="center"
                  wrap="nowrap"
                  className={classes.info}
                >
                  <StartDate
                    id={id}
                    variant={SMALL_BADGE}
                    component={GridItem}
                    className={classes.startDate}
                  />
                  <GridItem>
                    <GridContainer direction="column" spacing={0}>
                      {this.renderTitle()}

                      <GridItem className={classes.subtitle}>
                        <GridContainer
                          alignItems="center"
                          wrap="nowrap"
                          spacing={0}
                        >
                          <GridItem>by</GridItem>
                          <GridItem>&nbsp;</GridItem>
                          <GridItem>
                            <CreatedBy
                              id={id}
                              variant={TEXT}
                              bold={false}
                              className={classnames(
                                classes.createdBy,
                                'j-text-ellipsis',
                              )}
                            />
                          </GridItem>
                          <GridItem>&nbsp;</GridItem>
                          <GridItem>{me === createdBy && '(You)'}</GridItem>
                          <Hashkey id={id} component={GridItem} />
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </GridItem>

              {/* {!minimalView && ( */}
              {/*  <Description id={id} className={classes.description}> */}
              {/*    {this.renderDescription} */}
              {/*  </Description> */}
              {/* )} */}

              <Subtitle
                id={id}
                component={GridItem}
                className={classnames(
                  'j-text-ellipsis',
                  classes.ellipsis3,
                  classes.description,
                )}
              />

              <GridItem>
                <GridContainer alignItems="center">
                  <Status id={id} variant={SMALL_BADGE}>
                    <StartDate
                      id={id}
                      variant={SUB_TITLE}
                      component={GridItem}
                    />
                  </Status>
                  <Duration id={id} />

                  <TourRoles id={id} className={classes.subtitle} />

                  {/* {this.renderPublished()} */}

                  <LastUpdateAt id={id}>{this.renderLastViewed}</LastUpdateAt>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>

          <GridItem>
            <Hr half />
            <GridContainer alignItems="center">
              <GridItem xs>
                <GridContainer
                  direction="row"
                  spacing={0}
                  alignItems="center"
                  justify="space-between"
                  noWrap
                >
                  <GridItem>{this.renderSource()}</GridItem>
                  {isActionBtn && (
                    <GridItem>
                      <ActionButtonsCell
                        id={id}
                        // canMove={checkFolders} no need to check the folder as it can move to other tour
                        canMove
                        sizeOptionBtn="extraSmall"
                      />
                    </GridItem>
                  )}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <Star id={id}>{this.renderStarButton}</Star>
      </div>
    );
  };

  onClickNav = ev => {
    ev.stopPropagation();
    const { history, id, showPublish } = this.props;
    const link = !showPublish
      ? URL_HELPERS.tours(id)
      : URL_HELPERS.productDetail({ category: Category.FeaturedTours, id });
    return history.push(link);
  };

  renderClickNav = children => (
    <Button
      block
      dense
      noPadding
      size="extraSmall"
      textAlign="left"
      onClick={this.onClickNav}
    >
      {children}
    </Button>
  );

  render = () => {
    const { isClickable } = this.props;
    const content = this.renderContent();
    if (isClickable) return this.renderClickNav(content);
    return content;
  };
}

DoubleCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  showPublish: PropTypes.bool,
  // resaga props
  me: PropTypes.number,
  createdBy: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  checkFolders: PropTypes.bool,
  isActionBtn: PropTypes.bool,
  isClickable: PropTypes.bool,
};

DoubleCard.defaultProps = {
  isActionBtn: false,
  isClickable: false,
};

export default compose(
  withStyles(styles, { name: 'DoubleCard' }),
  withRouter,
  resaga(CONFIG),
)(DoubleCard);
