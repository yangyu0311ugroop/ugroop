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
import Name from 'smartComponents/Organisation/parts/Name';
import OrganisationPhoto from 'smartComponents/Organisation/parts/Photo';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import classnames from 'classnames';
import { CONFIG } from './config';
import styles from './styles';

export class Organisation extends PureComponent {
  componentWillMount = () => {
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXS,
    };
  };

  renderDefault = () => {
    const { id, minimise, className, hiddenSm, ellipsisClassName } = this.props;

    let name = (
      <GridItem className={classnames('j-text-ellipsis', ellipsisClassName)}>
        <Name id={id} variant={VARIANTS.STRING_ONLY} />
      </GridItem>
    );

    if (hiddenSm) {
      name = <Hidden smDown>{name}</Hidden>;
    }

    return (
      <GridContainer alignItems="center" className={className} wrap="nowrap">
        {!minimise && (
          <OrganisationPhoto
            size={24}
            id={id}
            {...this.photoProps}
            component={GridItem}
          />
        )}

        {name}
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}
Organisation.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.number,
  minimise: PropTypes.bool,
  active: PropTypes.bool,
  hiddenSm: PropTypes.bool,
  collapsed: PropTypes.bool,
  children: PropTypes.func,
  ellipsisClassName: PropTypes.string,

  // resaga

  // customisable props
  maxRender: PropTypes.number,
};

Organisation.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Organisation' }),
  resaga(CONFIG),
)(Organisation);
