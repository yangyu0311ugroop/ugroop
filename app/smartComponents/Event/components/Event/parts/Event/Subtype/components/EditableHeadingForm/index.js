/**
 * Created by stephenkarpinskyj on 12/7/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { withStyles } from 'components/material-ui';
import GridItem from 'components/GridItem';
import Type from 'smartComponents/Event/components/Event/parts/Event/Type';
import { EditableSelectForm } from 'smartComponents/Editables';
import { EventHeading } from 'viewComponents/Event/components/Heading';
import subtypeUtils from '../../utils';
import style from './style';

export class SubtypeEditableHeadingForm extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  makeOptions = () => {
    const { type, filterOptions } = this.props;

    return subtypeUtils.makeSubtypeOptions(type, filterOptions);
  };

  renderValue = value => {
    const { type } = this.props;
    const { name } = EVENT_HELPERS.getEventSubtypeConstants(type, value);
    return <EventHeading>{name}</EventHeading>;
  };

  render = () => {
    const { classes, dataId, value, name, readOnly } = this.props;

    const options = this.makeOptions();

    return (
      <GridItem>
        <EditableSelectForm
          value={value}
          name={name}
          options={options}
          renderValue={this.renderValue}
          onSubmit={this.handleSubmit}
          SelectProps={{
            MenuProps: {
              classes: { paper: classes.selectMenuPaper },
            },
          }}
          readOnly={readOnly}
        >
          <Type dataId={dataId} variant={EVENT_CONSTANTS.VARIANTS.data} />
        </EditableSelectForm>
      </GridItem>
    );
  };
}

SubtypeEditableHeadingForm.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  dataId: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
  filterOptions: PropTypes.func,
};

SubtypeEditableHeadingForm.defaultProps = {
  dataId: 0,
  value: '',
  type: '',
  readOnly: false,
};

export default compose(
  withStyles(style, { name: 'smartComponents/Event/Subtype/EditableHeading' }),
  resaga(),
)(SubtypeEditableHeadingForm);
