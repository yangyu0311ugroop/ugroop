import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class AddButton extends PureComponent {
  renderCardButton = () => {
    const { classes, onClick, children } = this.props;

    return (
      <Button
        color="primary"
        size="xs"
        className={classes.smallText}
        onClick={onClick}
      >
        <GridContainer alignItems="center">
          <GridItem>
            <Icon size="xsmall" icon="lnr-plus" bold />
          </GridItem>
          <GridItem>{children}</GridItem>
        </GridContainer>
      </Button>
    );
  };

  render = () => {
    const { classes, onClick, children, card } = this.props;

    if (card) {
      return this.renderCardButton();
    }

    return (
      <Button
        size="xs"
        variant={VARIANTS.OUTLINE}
        className={classes.root}
        onClick={onClick}
      >
        <GridContainer alignItems="center" spacing={2}>
          <GridItem>
            <div className={classes.addIcon}>
              <Icon icon="lnr-plus" size="xsmall" bold paddingRight />
            </div>
          </GridItem>
          <GridItem>{children}</GridItem>
        </GridContainer>
      </Button>
    );
  };
}

AddButton.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  onClick: PropTypes.func,
  children: PropTypes.node,

  card: PropTypes.bool,

  // resaga props
};

AddButton.defaultProps = {
  children: 'Add',
};

export default compose(
  withStyles(styles, { name: 'AddButton' }),
  resaga(CONFIG),
)(AddButton);
