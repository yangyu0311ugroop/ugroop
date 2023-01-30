import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { DEFAULT, PERSON_DATA_STORE } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import NewIcon from 'viewComponents/Icon';
import { H6 } from 'viewComponents/Typography';
import AvatarById from 'ugcomponents/Person/AvatarById';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import { GENDER_OPTIONS } from 'smartComponents/Person/parts/Gender/constants';
import PersonGender from 'smartComponents/Person/parts/Gender';
import m from './messages';
import style from './style';
import { CONFIG } from './config';

export class Gender extends React.PureComponent {
  getValue = () => {
    const { value, userValue } = this.props;
    return value || userValue;
  };

  getPersonProps = () => {
    const { personId, variant, readOnly } = this.props;
    return {
      id: personId,
      dataStore: PERSON_DATA_STORE,
      variant,
      readOnly,
    };
  };

  renderExtraEditableOptions = () => {
    const { classes, userId, userValue } = this.props;
    return [
      {
        value: '',
        children: (
          <GridContainer wrap="nowrap" alignItems="center">
            <GridItem xs>{GENDER_OPTIONS[userValue]}</GridItem>
            <GridItem>
              <AvatarById
                userId={userId}
                xs
                imageSize={IMAGE_SIZES_CONSTANTS.XXS}
              />
            </GridItem>
          </GridContainer>
        ),
      },
      {
        value: 'hr',
        children: (
          <div className={classes.heading}>
            <div className={classes.hr} />
            <H6 dense weight="bold">
              <M {...m.heading} />
            </H6>
          </div>
        ),
        disabled: true,
      },
    ];
  };

  renderEditableValue = () => () => {
    const value = this.getValue();
    if (value) {
      return GENDER_OPTIONS[value];
    }
    return value;
  };

  renderEditable = () => {
    const { userConnected, userValue } = this.props;
    return userConnected && userValue ? (
      <PersonGender
        extraOptions={this.renderExtraEditableOptions()}
        renderEditableValue={this.renderEditableValue()}
        placeholder={null}
        {...this.getPersonProps()}
      />
    ) : (
      this.renderDefault()
    );
  };

  renderDefault = () => <PersonGender {...this.getPersonProps()} />;

  renderRow = () => {
    const value = this.renderEditableValue()();
    const gender = LOGIC_HELPERS.ifElse(
      value,
      <JText ellipsis nowrap>
        {value}
      </JText>,
      <JText ellipsis nowrap>
        Gender not Specified
      </JText>,
    );
    return (
      <GridContainer wrap="nowrap" alignItems="center">
        <GridItem>
          <NewIcon icon="user" size="extraSmall" color="darkGray" />
        </GridItem>
        <GridItem xs>{gender}</GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.EDITABLE]: this.renderEditable,
      [VARIANTS.ROW]: this.renderRow,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Gender.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  personId: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  userId: PropTypes.number,
  userConnected: PropTypes.bool,

  // resaga value
  value: PropTypes.string,
  userValue: PropTypes.string,
};

Gender.defaultProps = {
  id: null,
  personId: null,
  variant: null,
  readOnly: false,
  userId: null,
  userConnected: false,

  value: '',
  userValue: null,
};

export default compose(
  withStyles(style, { name: 'smartComponents/Node/parts/Gender' }),
  resaga(CONFIG),
)(Gender);
