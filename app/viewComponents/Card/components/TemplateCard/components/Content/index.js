import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import P, { H4 } from 'viewComponents/Typography';
import UGCardContent from 'ugcomponents/Card/UGCardContent';
import mHelper from 'utils/helpers/moment';
import { isEmptyString } from 'utils/stringAdditions';
import styles from './styles';

export class Content extends PureComponent {
  renderTemplateTitle = () => {
    const { classes, title, baseUrl, queryParam } = this.props;

    return (
      <Link className={classes.cardLink} to={`${baseUrl}?${queryParam}`}> {/*eslint-disable-line*/}
        <H4 className={classes.cardItemTitle}>
          <TextTruncate lines={2} text={title} maxCalculateTimes={1} />
        </H4>
      </Link>
    );
  };

  renderStartSection = start => {
    const { classes } = this.props;
    const startSection = !isEmptyString(start) ? (
      <div className={classes.startDateContainer}>
        <P weight="light" dense className={classes.startDate}>
          Start - {start}
        </P>
      </div>
    ) : (
      ''
    );

    return startSection;
  };

  renderDescription = () => {
    const { classes, description } = this.props;
    return (
      <div className={classes.templateItemBodyContainer}>
        <TextTruncate lines={4} text={description} maxCalculateTimes={1} />
      </div>
    );
  };

  render() {
    const { classes, renderAdditionalContent, startDate, weekDay } = this.props;

    let start = '';

    if (!isEmptyString(startDate)) {
      start = mHelper.renderDate(startDate);
    } else if (!isEmptyString(weekDay)) {
      start = mHelper.getDay(weekDay);
    }

    return (
      <UGCardContent className={classes.templateContent}>
        {this.renderTemplateTitle()}
        {this.renderStartSection(start)}
        {this.renderDescription()}
        {renderAdditionalContent}
      </UGCardContent>
    );
  }
}

Content.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  renderAdditionalContent: PropTypes.node,
  queryParam: PropTypes.string,
  startDate: PropTypes.string,
  weekDay: PropTypes.number,
};

Content.defaultProps = {
  renderAdditionalContent: '',
  queryParam: '',
};

export default withStyles(styles, { name: 'TemplateContent' })(Content);
