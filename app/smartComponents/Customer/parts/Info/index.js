import resaga from 'resaga';
import { compose } from 'redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { H5 } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import PersonPhoto from 'smartComponents/Person/parts/Photo';
import OrganisationPhoto from 'smartComponents/Organisation/parts/Photo';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import { CONFIG } from './config';
import styles from './styles';

export class Info extends PureComponent {
  renderImage = () => {
    const { orgId, userId, classes } = this.props;

    const name = this.renderName();

    const avatarProps = {
      className: classes.avatar,
      letterClassName: classes.letter,
    };

    const photoProps = {
      name,
      letterAvatar: true,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.SMALL,
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      avatarProps,
    };

    return LOGIC_HELPERS.ifElse(
      orgId,
      <OrganisationPhoto id={orgId} {...photoProps} />,
      <PersonPhoto id={userId} {...photoProps} />,
    );
  };

  renderName = () => {
    const { orgName, knownAs } = this.props;

    return LOGIC_HELPERS.ifElse(orgName, orgName, knownAs);
  };

  render() {
    const { orgId, userId, subheader } = this.props;

    const show = LOGIC_HELPERS.ifElse([userId, orgId], true, false, true);

    if (!show) return null;

    return (
      <GridItem>
        <GridContainer spacing={2} alignItems="center">
          <GridItem>{this.renderImage()}</GridItem>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <H5 dense weight="bold">
                  {this.renderName()}
                </H5>
              </GridItem>
              {subheader}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  }
}

Info.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  orgId: PropTypes.any,
  userId: PropTypes.number,
  subheader: PropTypes.node,

  // resaga
  orgName: PropTypes.string,
  knownAs: PropTypes.string,
};

Info.defaultProps = {
  orgName: '',
  knownAs: '',
  subheader: null,
};

export default compose(
  resaga(CONFIG),
  withStyles(styles, { name: 'Info' }),
)(Info);
