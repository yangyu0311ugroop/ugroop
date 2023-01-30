import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import momentHelper from 'utils/helpers/moment';
import { isEmptyString } from 'utils/stringAdditions';
import DateTimeTooltip from 'viewComponents/Date';
import { CONFIG } from './config';
import styles from './styles';

export class CreatedAt extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { createdAt } = this.props;
    return !isEmptyString(createdAt) ? (
      <DateTimeTooltip dateTime={createdAt}>
        <span>{momentHelper.renderDate(createdAt)}</span>
      </DateTimeTooltip>
    ) : (
      ''
    );
  };

  renderTextWithLabelInline = () => {
    const { createdAt, label } = this.props;
    return !isEmptyString(createdAt) ? (
      <React.Fragment>
        {label}
        <DateTimeTooltip dateTime={createdAt}>
          <span>{momentHelper.renderDate(createdAt)}</span>
        </DateTimeTooltip>
      </React.Fragment>
    ) : (
      ''
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.TEXT_WITH_LABEL_INLINE]: this.renderTextWithLabelInline,
      [DEFAULT]: this.renderDefault,
    });
  };
}

CreatedAt.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  label: PropTypes.node,

  // resaga props
  createdAt: PropTypes.string,
};

CreatedAt.defaultProps = {
  createdAt: '',
  variant: '',
  label: '',
};

export default compose(
  withStyles(styles, { name: 'CreatedAt' }),
  resaga(CONFIG),
)(CreatedAt);
