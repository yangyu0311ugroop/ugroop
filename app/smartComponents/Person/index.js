import { Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DEFAULT } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import PersonPhoto from 'smartComponents/Person/parts/Photo';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import classnames from 'classnames';
import { CONFIG } from './config';
import styles from './styles';

export class Person extends PureComponent {
  componentWillMount = () => {
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXS,
    };
  };

  renderDefault = () => {
    const { id, className, hiddenSm, classes } = this.props;
    let name = (
      <GridItem
        className={classnames('j-text-ellipsis', classes.personKnownAsEllipsis)}
      >
        <KnownAs id={id} variant={VARIANTS.STRING_ONLY} ellipsis />
      </GridItem>
    );

    if (hiddenSm) {
      name = <Hidden smDown>{name}</Hidden>;
    }

    return (
      <GridContainer alignItems="center" className={className} wrap="nowrap">
        <GridItem>
          <PersonPhoto size={24} id={id} {...this.photoProps} />
        </GridItem>
        {name}
      </GridContainer>
    );
  };

  renderPersonType = () => {
    const { id, className, hiddenSm, classes } = this.props;
    let name = (
      <GridItem
        className={classnames('j-text-ellipsis', classes.personKnownAsEllipsis)}
      >
        <KnownAs id={id} variant={VARIANTS.STRING_ONLY} />
      </GridItem>
    );

    const personalText = (
      <GridItem className={classes.personalContainer}>(Personal)</GridItem>
    );

    if (hiddenSm) {
      name = <Hidden smDown>{name}</Hidden>;
    }

    return (
      <GridContainer alignItems="center" className={className} wrap="nowrap">
        <GridItem>
          <PersonPhoto size={24} id={id} {...this.photoProps} />
        </GridItem>
        {name}
        {personalText}
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
      [VARIANTS.PERSON_TYPE]: this.renderPersonType,
    });
  };
}
Person.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.number,
  hiddenSm: PropTypes.bool,

  // resaga
};

Person.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Person' }),
  resaga(CONFIG),
)(Person);
