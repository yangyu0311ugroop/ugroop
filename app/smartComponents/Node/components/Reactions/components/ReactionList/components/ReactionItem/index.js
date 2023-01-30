import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import { VARIANTS } from 'variantsConstants';
import P from 'viewComponents/Typography';
import Photo from 'smartComponents/Person/parts/Photo';
import { Name } from 'ugcomponents/Person';

import { GET_USER_NODE, GET_USER_NODE_CONTENT, CONFIG } from './config';
import styles from './styles';

// TODO: Add role to each user that liked the photo in galelry
export class ReactionItem extends PureComponent {
  // Seems like node role is not that reliable when getting the role of a particular participant
  // need to investigate a bit further. For now, i'll disable it.
  // renderRole = () => roles => {
  //   const { createdBy } = this.props;
  //   console.log({ roles, createdBy });
  //   const role = TOUR_ROLE_MAPPER[roles[0]];
  //   return (
  //     <P weight="bold" subtitle>
  //       {role}
  //     </P>
  //   );
  // };

  /**
   <GridItem>
   <NodeRole userId={createdBy} nodeId={templateId} key={id}>
   {this.renderRole()}
   </NodeRole>
   </GridItem>
   */

  render = () => {
    const { classes, userId } = this.props;

    return (
      <GridContainer className={classes.root} alignItems="center" wrap="nowrap">
        <GridItem>
          <Photo
            id={userId}
            editable={false}
            size={IMAGE_SIZES_CONSTANTS.XXS}
            variant={VARIANTS.READ_ONLY}
          />
        </GridItem>
        <GridItem xs>
          <GridContainer alignItems="center" justify="space-between">
            <GridItem>
              <P dense>
                <Name bold={false} id={userId} />
              </P>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

ReactionItem.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  userId: PropTypes.number,
};

ReactionItem.defaultProps = {
  userId: 0,
};

export default compose(
  withStyles(styles, { name: 'ReactionItem' }),
  resaga(GET_USER_NODE),
  resaga(GET_USER_NODE_CONTENT),
  resaga(CONFIG),
)(ReactionItem);
