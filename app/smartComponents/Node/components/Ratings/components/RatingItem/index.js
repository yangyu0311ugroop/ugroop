import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import Hr from 'components/Hr';
import { RatingField } from 'viewComponents/Inputs';
import P from 'viewComponents/Typography';
import { Content, CreatedAt, Name } from 'smartComponents/Node/parts';
import { StyledSimpleRTE } from 'ugcomponents/Inputs';

import { CONFIG } from './config';
import styles from './styles';

export class RatingItem extends PureComponent {
  renderRating = () => {
    const { rating } = this.props;
    return (
      <GridItem>
        <Box display="flex">
          <RatingField value={rating} readOnly />
        </Box>
      </GridItem>
    );
  };

  renderRaterName = () => {
    const { createdBy } = this.props;
    return (
      <GridItem>
        <P weight="bold" dense>
          <Name userId={createdBy} />
        </P>
      </GridItem>
    );
  };

  renderRatingHeader = () => (
    <GridItem>
      <GridContainer justify="space-between">
        {this.renderRaterName()}
      </GridContainer>
    </GridItem>
  );

  renderRatingComment = () => {
    const { id } = this.props;

    return (
      <GridItem>
        <Content id={id} variant={VARIANTS.RENDER_PROP}>
          {content => <StyledSimpleRTE value={content} readOnly />}
        </Content>
      </GridItem>
    );
  };

  // TODO: Support uploading images in ratings
  // renderRatingPhotos = () => {
  //   const { classes } = this.props;
  //
  //   return (
  //     <GridItem>
  //       <GridContainer>
  //         <GridItem>
  //           <Img className={classes.img} src="http://lorempixel.com/400/200" />
  //         </GridItem>
  //         <GridItem>
  //           <Img className={classes.img} src="http://lorempixel.com/400/200" />
  //         </GridItem>
  //         <GridItem>
  //           <Img className={classes.img} src="http://lorempixel.com/400/200" />
  //         </GridItem>
  //         <GridItem>
  //           <Img className={classes.img} src="http://lorempixel.com/400/200" />
  //         </GridItem>
  //       </GridContainer>
  //     </GridItem>
  //   );
  // };

  renderRatingDate = () => {
    const { id } = this.props;

    return (
      <GridItem>
        <P dense subtitle>
          <CreatedAt id={id} showFromNow />
        </P>
      </GridItem>
    );
  };

  renderRateDetails = () => <>{this.renderRatingComment()}</>;

  renderRaterAvatar = () => {
    const { createdBy } = this.props;

    return (
      <GridItem>
        <GridContainer alignItems="center">
          <GridItem>
            <Name userId={createdBy} variant={VARIANTS.AVATAR} />
          </GridItem>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              {this.renderRatingHeader()}
              <GridItem>
                <GridContainer alignItems="center" spacing={0}>
                  {this.renderRating()}
                  <Box mr={1} componet={GridItem} />
                  {this.renderRatingDate()}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  render = () => (
    <GridContainer direction="column" spacing={0}>
      <Hr noMarginTop halfMarginBottom />
      {this.renderRaterAvatar()}
      {this.renderRateDetails()}
    </GridContainer>
  );
}

RatingItem.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.number,

  // resaga props
  rating: PropTypes.number,
  createdBy: PropTypes.number,
};

RatingItem.defaultProps = {
  createdBy: 0,
};

export default compose(
  withStyles(styles, { name: 'RatingItem' }),
  resaga(CONFIG),
)(RatingItem);
