import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import momentHelper from 'utils/helpers/moment';
import DateTimeTooltip from 'viewComponents/Date';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { CONFIG } from './config';
import styles from './styles';

export class CreatedAt extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { classes, isTableMobile } = this.props;
    if (isTableMobile) {
      return (
        <GridContainer
          direction="row"
          spacing={0}
          className={classes.createdAtFontMobile}
        >
          <GridItem>
            <span className={classes.memberSince}>Created At:</span>&nbsp;
          </GridItem>
          <GridItem>
            {momentHelper.renderCalendarDate(this.props.createdAt)}
          </GridItem>
        </GridContainer>
      );
    }
    return (
      <DateTimeTooltip dateTime={this.props.createdAt}>
        <span>{momentHelper.renderCalendarDate(this.props.createdAt)}</span>
      </DateTimeTooltip>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

CreatedAt.propTypes = {
  // hoc props
  classes: PropTypes.func,
  // parent props
  variant: PropTypes.string,

  // resaga props
  createdAt: PropTypes.string,
  isTableMobile: PropTypes.bool,
};

CreatedAt.defaultProps = {
  createdAt: '',
  variant: '',
  isTableMobile: false,
};

export default compose(
  withStyles(styles, { name: 'CreatedAt' }),
  resaga(CONFIG),
)(CreatedAt);
