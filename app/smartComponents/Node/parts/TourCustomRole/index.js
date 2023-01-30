import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT, TOUR_SETTINGS } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridItem from 'components/GridItem';
import { H4 } from 'viewComponents/Typography';
import { Text } from 'ugcomponents/Inputs';
import { EditableForm, EditableTextForm } from 'smartComponents/Editables';
import withResaga from 'resaga';
import { useSelector } from 'react-redux';
import { CHANGE_CUSTOM_USER_ROLE, TEMPLATE_API } from 'apis/constants';
import { SETTINGS_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import GridContainer from 'components/GridContainer';
import Icon from 'ugcomponents/Icon';
import JText from 'components/JText';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { INVITATION_STORE_RESELECTORS } from 'datastore/invitationStore/selectorsViaConnect';
import inputs from './inputs';

export const TourCustomRole = memo(props => {
  const {
    variant,
    readOnly,
    renderRole,
    isOwner,
    id,
    nodeId,
    showAsValue,
  } = props;
  let userRole = '';
  let { userId, role } = props;

  const userNodeCustomRole = useSelector(state =>
    INVITATION_STORE_RESELECTORS.getUserNodeCustomRole(state, props.id),
  );
  role = useSelector(state =>
    INVITATION_STORE_RESELECTORS.getUserNodeRole(state, props.id),
  );
  userId = useSelector(state =>
    INVITATION_STORE_RESELECTORS.getUserNodeUserId(state, props.id),
  );

  const ownerCustomRole = useSelector(state =>
    SETTINGS_STORE_RESELECTORS.getNodeSettingValue(state, {
      id: props.nodeId,
      key: TOUR_SETTINGS.OWNER_CUSTOM_ROLE,
    }),
  );

  userRole = LOGIC_HELPERS.ifElse(isOwner, ownerCustomRole, userNodeCustomRole);

  const upsertSetting = (value, obj) => {
    const key = TOUR_SETTINGS.OWNER_CUSTOM_ROLE;

    TEMPLATE_API_HELPERS.upsertSetting(
      {
        id: nodeId,
        settingId: id || 0,
        key,
        value,
        onSuccess: obj.onSuccess,
        onError: obj.onError,
      },
      props,
    );
  };

  const handleSubmit = ({ model, onSuccess, onError }) => {
    if (isOwner) return upsertSetting(model.userRole, { onSuccess, onError });
    return props.resaga.dispatchTo(TEMPLATE_API, CHANGE_CUSTOM_USER_ROLE, {
      payload: {
        id: nodeId,
        userId,
        userNodeId: id,
        data: {
          role,
          userRole: model.userRole,
        },
      },
      onSuccess,
      onError,
    });
  };

  const renderTextOnly = () =>
    !!userRole && (
      <GridItem>
        <H4 dense weight="bold">
          {userRole}
        </H4>
      </GridItem>
    );

  const valueOnly = () => userRole || renderRole;

  const renderTextField = () => (
    <GridItem xs>
      <Text value={userRole} {...inputs.base} {...inputs.field} />
    </GridItem>
  );

  const renderEditable = () => (
    <GridItem>
      <EditableTextForm
        value={userRole}
        {...inputs.base}
        {...inputs.editable}
        onSubmit={handleSubmit}
        readOnly={readOnly}
      />
    </GridItem>
  );

  const renderForm = () => (
    <GridContainer direction="column">{renderTextField()}</GridContainer>
  );

  const renderTitle = value =>
    LOGIC_HELPERS.ifElse(
      value,
      'Edit Custom User Role',
      'Add Custom User Role',
    );

  const renderValue = () => {
    if (showAsValue) {
      return (
        <JText ellipsis italic bold title={renderTitle(userRole)}>
          {valueOnly()}
        </JText>
      );
    }
    return (
      <JText ellipsis italic bold title={renderTitle(userRole)}>
        {LOGIC_HELPERS.ifElse(
          userRole,
          `(${userRole})`,
          readOnly ? null : <Icon icon="lnr-chevron-down" size="xsmall" />,
        )}
      </JText>
    );
  };

  const rederEditablePopper = () => {
    if (readOnly && !userRole) return renderValue();
    return (
      <EditableForm
        isRow
        value={userRole}
        renderValue={renderValue}
        onSubmit={handleSubmit}
        readOnly={readOnly}
        placeholder={renderValue()}
      >
        {renderForm()}
      </EditableForm>
    );
  };
  return LOGIC_HELPERS.switchCase(variant, {
    [VARIANTS.TEXT_ONLY]: renderTextOnly,
    [VARIANTS.TEXT_FIELD]: renderTextField,
    [VARIANTS.POPPER]: rederEditablePopper,
    [VARIANTS.VALUE_ONLY]: valueOnly,
    [DEFAULT]: renderEditable,
  });
});

TourCustomRole.propTypes = {
  id: PropTypes.number, // userNodeId or setting id
  nodeId: PropTypes.number,
  userId: PropTypes.number,
  resaga: PropTypes.object.isRequired,
  role: PropTypes.string,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  isOwner: PropTypes.bool,
  renderRole: PropTypes.string,
  showAsValue: PropTypes.string,
};
TourCustomRole.defaultProps = {
  id: 0,
  nodeId: 0,
  variant: null,
  readOnly: false,
};
export default withResaga()(TourCustomRole);
