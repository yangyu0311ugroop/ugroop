import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { VARIANTS } from 'variantsConstants';
import { pluralizeText } from 'utils/stringAdditions';
import get from 'lodash/get';
import { THE_BIG_DOT } from 'appConstants';
import { H6 } from 'viewComponents/Typography';

import UpdatedAt from 'smartComponents/Node/parts/UpdatedAt';
import CreatedAt from 'smartComponents/Node/parts/CreatedAt';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import JText from 'components/JText';
import styles from './styles';

export class ListItemSubtitle extends PureComponent {
  renderFullName = o => (
    <KnownAs
      id={typeof o === 'object' ? get(o, 'id', 0) : o}
      variant={VARIANTS.STRING_ONLY}
    />
  );

  renderDurationText = () => {
    const { duration } = this.props;
    if (!duration) {
      return '';
    }

    const durationCount = `${duration} ${pluralizeText('Day', duration)}`;

    return (
      <React.Fragment>
        <GridItem>{durationCount}</GridItem>
        <GridItem>{THE_BIG_DOT}</GridItem>
      </React.Fragment>
    );
  };

  render = () => {
    const { id, lastModifiedBy, type, createdBy, classes } = this.props;

    if (type === 'createdBy') {
      return (
        <CreatedAt id={id} variant={VARIANTS.SIMPLE_TOOLTIP}>
          <H6 dense subtitle>
            Created by
            <JText ellipsis>{this.renderFullName(createdBy)}</JText>
          </H6>
        </CreatedAt>
      );
    }

    return (
      <UpdatedAt id={id} variant={VARIANTS.SIMPLE_TOOLTIP}>
        <GridContainer alignItems="baseline" direction="column" spacing={0}>
          <GridItem>Last updated by</GridItem>
          <GridItem>
            <GridContainer
              alignItems="center"
              wrap="nowrap"
              className={classes.textNoWrap}
            >
              <GridItem>{this.renderFullName(lastModifiedBy)}</GridItem>
              <GridItem>{THE_BIG_DOT}</GridItem>
              {this.renderDurationText()}
              <GridItem>
                <UpdatedAt id={id} />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </UpdatedAt>
    );
  };
}

ListItemSubtitle.propTypes = {
  // parent
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  id: PropTypes.number,
  lastModifiedBy: PropTypes.object,
  createdBy: PropTypes.object,
  duration: PropTypes.number,
};

ListItemSubtitle.defaultProps = {};

export default withStyles(styles, { name: 'ListItemSubtitle' })(
  ListItemSubtitle,
);
