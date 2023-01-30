import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { URL_HELPERS } from 'appConstants';
import isURL from 'validator/lib/isURL';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage as M } from 'react-intl';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import { EVENT_UTILS } from 'utils/events';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { EditableTextForm } from 'smartComponents/Editables';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Text } from 'ugcomponents/Inputs';
import { isEmptyString } from 'utils/stringAdditions';
import P from 'viewComponents/Typography';
import m from './messages';
import inputs from './inputs';

import styles from './styles';

export class Url extends PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  handleURLClicked = e => {
    const { value } = this.props;
    if (!isEmptyString(value) && isURL(value)) {
      const formattedURL = URL_HELPERS.makeUrl(value);
      window.open(`//${formattedURL}`);
    }
    e.stopPropagation();
  };

  renderField = () => {
    const { value } = this.props;

    return (
      <GridItem>
        <Text value={value} {...inputs.url} {...inputs.urlField} />
      </GridItem>
    );
  };

  renderEditable = () => {
    const { readOnly, value, dataId } = this.props;
    if (EVENT_UTILS.participantCannotExecuteEvent(value)) return null;

    return (
      <GridItem>
        <EditableTextForm
          value={value}
          {...inputs.url}
          {...inputs.urlEditable}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
        >
          <EventPatchData dataId={dataId} subtype />
        </EditableTextForm>
      </GridItem>
    );
  };

  renderLabelValueStacked = () => {
    const { value, classes } = this.props;

    if (isEmptyString(value)) return null;
    const formattedURL = URL_HELPERS.makeUrl(value);

    return (
      <GridItem>
        <GridContainer>
          <GridItem>
            <P dense weight="bold">
              <M {...m.label} />
            </P>
          </GridItem>
          <GridItem>
            <P dense>
              <a
                className={classes.url}
                href={`//${formattedURL}`}
                target="_blank"
                onClick={this.handleURLClicked}
              >
                {value}
              </a>
            </P>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderLabelValueStacked={this.renderLabelValueStacked}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
      />
    );
  };
}

Url.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  value: PropTypes.string,
  dataId: PropTypes.number,
  readOnly: PropTypes.bool,

  // resaga props
};

Url.defaultProps = {
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'Url' }),
  EVENT_STORE_HOC.selectEventProp({ path: EVENT_PATHS.url }),
)(Url);
