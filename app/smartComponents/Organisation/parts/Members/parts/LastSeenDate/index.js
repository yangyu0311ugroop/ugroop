import { DEFAULT, ORG_FORM_NAME } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import momentHelper from 'utils/helpers/moment';
import { compose } from 'redux';
import resaga from 'resaga';
import { injectIntl } from 'react-intl';
import omit from 'lodash/omit';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { H1, P } from 'viewComponents/Typography';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import { isEmptyString } from 'utils/stringAdditions';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';

export class LastSeenDate extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'lastSeenDate', 'id', 'classes']);

  renderTextField = () => (
    <TextField
      name={ORG_FORM_NAME}
      value={this.props.lastSeenDate}
      label={this.props.intl.formatMessage(m.label)}
      InputLabelProps={this.getInputLabelProps}
      {...this.getStrippedOwnProps()}
    />
  );

  renderTextOnly = () => {
    const { lastSeenDate, classes, isTableMobile } = this.props;
    const date = momentHelper.getDateFromUnixFormat(
      lastSeenDate,
      isTableMobile ? 'MMM. DD, YYYY' : 'MMMM DD, YYYY',
    );

    const lastSeenDateFormated = !isEmptyString(lastSeenDate) ? (
      <span className="j-text-ellipsis">
        <abbr title={date} className={classes.noUnderline}>
          {date}
        </abbr>
      </span>
    ) : (
      <span className="j-text-ellipsis">
        <abbr title="Not Active Yet" className={classes.noUnderline}>
          Not Active Yet
        </abbr>
      </span>
    );

    if (isTableMobile) {
      return (
        <GridContainer
          direction="row"
          spacing={0}
          className={classes.lastSeenFontMobile}
        >
          <GridItem>
            <span className={classes.lastSeen}>Last Seen:</span>&nbsp;
          </GridItem>
          <GridItem>
            {!isEmptyString(lastSeenDate) ? date : 'Not Active Yet'}
          </GridItem>
        </GridContainer>
      );
    }

    return <P {...this.getStrippedOwnProps()}>{lastSeenDateFormated}</P>;
  };

  renderDefault = () => {
    const { classes, lastSeenDate } = this.props;
    const lastSeenDateFormated = !isEmptyString(lastSeenDate)
      ? momentHelper.getDateFromUnixFormat(lastSeenDate, 'MMMM DD, YYYY')
      : 'Not Active Yet';

    return (
      <React.Fragment>
        <H1
          className={classes.lastSeenDate}
          noMargin
          {...this.getStrippedOwnProps()}
        >
          {`Created ${lastSeenDateFormated}`}
        </H1>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [ORG_FIELD_VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderDefault,
    });
  };
}

LastSeenDate.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,

  // resaga props
  lastSeenDate: PropTypes.string,
  resaga: PropTypes.object,
  isTableMobile: PropTypes.bool,
};

LastSeenDate.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  lastSeenDate: '',
  isTableMobile: false,
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'LastSeenDate' }),
  resaga(CONFIG),
)(LastSeenDate);
