import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { withParticipants } from 'smartComponents/Node/hoc/withParticipants';
import { Page, Text, View, Document, BlobProvider } from '@react-pdf/renderer';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';
import filter from 'lodash/filter';
import {
  horizontalSide,
  padFacadeURL,
  postMetaInfo,
  queryImageURL,
} from 'utils/helpers/request';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { FORMATS_DATE_TIME as frmt } from 'utils/constants/dateTime';
import Icon from 'ugcomponents/Icon';
import { DEFAULT, PEOPLE_TAB_OPTIONS, PRINT_ORIENTATION } from 'appConstants';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { PARTICIPANT_LINKEE, TOUR_PARTICIPANT } from 'utils/modelConstants';
import { capitalizeFirstLetter, isEmptyString } from 'utils/stringAdditions';
import momentjs from 'moment';
import { CONFIG, CONFIG2, CONFIG3, CONFIG_PERSON, CONFIG4 } from './config';
import Footer from '../Footer';
import Header from '../Header';
import styles from './styles';

export class PrintParticipants extends PureComponent {
  state = {
    ready: false,
  };

  componentDidMount() {
    this.readySet = setTimeout(() => {
      this.setState({ ready: true });
    }, 1);
    this.paxNumber = 0;
  }

  componentWillUnmount = () => {
    clearTimeout(this.readySet);
  };

  getPhoto = () => {
    const { orgPhoto, photoMetaInfo } = this.props;
    const templateQueryImage = 1000;
    let photo = '';
    if (!isEmptyString(orgPhoto)) {
      const meta = postMetaInfo({
        x: photoMetaInfo.x,
        y: photoMetaInfo.y,
        width: photoMetaInfo.width,
        height: photoMetaInfo.height,
      });
      const side = horizontalSide(photoMetaInfo.rotate);

      photo = queryImageURL(
        orgPhoto,
        true,
        templateQueryImage,
        meta,
        side,
        photoMetaInfo.rotate,
      );
    }
    if (photo) return padFacadeURL(photo);
    return null;
  };

  renderHeader = (title, showLegend = true) => {
    const { content, ownerName, orgName, startDate, duration } = this.props;
    const photo = this.getPhoto();
    let tourDate = `${duration} - day tour`;
    if (startDate) {
      const start = momentjs(startDate);
      const end = momentjs(startDate)
        .add(duration - 1, 'day')
        .hour(23)
        .minute(59)
        .second(59);
      tourDate = `${start.format('D MMM')} - ${end.format(
        'D MMM YYYY',
      )} (${duration} day${LOGIC_HELPERS.ifElse(duration > 1, 's')})`;
    }

    return (
      <Header
        content={content}
        photo={photo}
        travelBy={LOGIC_HELPERS.ifElse(orgName, orgName, ownerName)}
        startDate={tourDate}
        reportTitle={title}
        duration={duration}
        showLegend={showLegend}
      />
    );
  };

  colStype = (value, colStyle) =>
    LOGIC_HELPERS.ifElse(value, colStyle, { ...colStyle, ...styles.emptyStr });

  isEmptyValue = val => LOGIC_HELPERS.ifElse(val, val, 'Not specified');

  getName = (firstName, lastName, middleName) => {
    const composedName = `${(
      lastName || ''
    ).toUpperCase()}, ${capitalizeFirstLetter(
      LOGIC_HELPERS.ifElse(!firstName, '', firstName),
    )} ${capitalizeFirstLetter(
      LOGIC_HELPERS.ifElse(!middleName, '', middleName),
    )}`;
    return composedName;
  };

  participantVal = (id, index) => {
    const {
      participantsContent,
      personDetails,
      phoneList,
      userDetails,
      rooms,
      groups,
      groupIds,
    } = this.props;
    const person = get(personDetails, `${index}`, {});
    const phonePerson = get(phoneList, `${index}`, '');
    const customData = get(participantsContent, `${index}.customData`, {});
    const roomType = get(rooms, `${index}`, '');
    const group = get(groups, `${index}`, '');
    const groupId = get(groupIds, `${index}`, 0);
    let medicals = get(personDetails, `${index}.medicals`, []);
    let dietaries = get(personDetails, `${index}.dietaries`, []);
    const userMedicals = get(userDetails, `${index}.medicals`, []);
    const userDietaries = get(userDetails, `${index}.dietaries`, []);

    medicals = medicals.concat(userMedicals);
    dietaries = dietaries.concat(userDietaries);

    const { birthDate, middleName, gender, id: personId } = person;
    const { firstName, lastName, dob, phone, ageType, personType } = customData;
    const phoneNo = LOGIC_HELPERS.ifElse(phonePerson, phonePerson, phone);

    let genderText = capitalizeFirstLetter(gender || '');
    genderText = LOGIC_HELPERS.ifElse(
      ['M', 'F'].includes(genderText.charAt(0)),
      genderText.charAt(0),
      '',
    );

    let birth = LOGIC_HELPERS.ifElse(birthDate, birthDate, dob);
    birth = LOGIC_HELPERS.ifElse(birth, MOMENT_HELPERS.renderDate(birth), '');
    /* const name = LOGIC_HELPERS.ifElse(
      knownAs,
      knownAs,
      `${firstName} ${lastName}`,
    ); */
    const composedName = this.getName(firstName, lastName, middleName);
    return {
      index,
      id,
      groupId,
      group,
      composedName,
      genderText,
      birth,
      ageType,
      phoneNo,
      roomType,
      personType,
      medicals,
      dietaries,
      hasMedicals: !!medicals.length,
      hasDietaries: !!dietaries.length,
      personId,
    };
  };

  renderPax = data => {
    const {
      id,
      composedName,
      genderText,
      birth,
      ageType,
      phoneNo,
      roomType,
      personType,
      hasMedicals,
      hasDietaries,
    } = data;
    this.paxNumber += 1;
    const single = LOGIC_HELPERS.ifElse(
      hasMedicals,
      styles.medical,
      styles.dietary,
    );
    const knobClass = LOGIC_HELPERS.ifElse(
      hasMedicals && hasDietaries,
      styles.medAll,
      single,
    );
    return (
      <View key={id} style={styles.participantRow}>
        <View style={{ ...styles.colm }}>
          {(hasMedicals || hasDietaries) && (
            <Text style={{ ...styles.knob, ...knobClass }} />
          )}
        </View>
        <Text
          style={{ ...styles.fields, ...styles.col0, ...styles.fieldsNumber }}
        >{`${this.paxNumber}. `}</Text>
        <Text style={{ ...styles.fields, ...styles.col1 }}>{composedName}</Text>
        <Text
          style={this.colStype(genderText, {
            ...styles.fields,
            ...styles.col2,
            ...styles.textCenter,
          })}
        >
          {genderText}
        </Text>
        <Text
          style={this.colStype(birth, { ...styles.fields, ...styles.col3 })}
        >
          {this.isEmptyValue(birth)}
        </Text>
        <Text
          style={this.colStype(ageType, {
            ...styles.fields,
            ...styles.col4,
            ...styles.textCenter,
          })}
        >
          {this.isEmptyValue(ageType)}
        </Text>
        <Text
          style={this.colStype(phoneNo, { ...styles.fields, ...styles.col5 })}
        >
          {this.isEmptyValue(phoneNo)}
        </Text>
        <Text
          style={this.colStype(roomType, {
            ...styles.fields,
            ...styles.col6,
            paddingLeft: 6,
          })}
        >
          {this.isEmptyValue(roomType)}
        </Text>
        <Text
          style={this.colStype(personType, {
            ...styles.fields,
            ...styles.col7,
            paddingLeft: 6,
          })}
        >
          {this.isEmptyValue(personType)}
        </Text>
      </View>
    );
  };

  headerColumn = () => (
    <View style={styles.headerColumnRow} fixed>
      {/* <Text style={styles.text}>#. </Text> */}
      <Text style={{ ...styles.colm }} />
      <Text
        style={{ ...styles.column, ...styles.col0, ...styles.fieldsNumber }}
      >
        #
      </Text>
      <Text style={{ ...styles.column, ...styles.col1 }}>NAME</Text>
      <Text style={{ ...styles.column, ...styles.col2 }}>GENDER</Text>
      <Text style={{ ...styles.column, ...styles.col3 }}>DATE OF BIRTH</Text>
      <Text
        style={{
          ...styles.column,
          ...styles.col4,
          ...styles.textCenter,
        }}
      >
        ADULT or CHILD
      </Text>
      <Text style={{ ...styles.column, ...styles.col5 }}>PHONE</Text>
      <Text style={{ ...styles.column, ...styles.col6, marginRight: 0 }}>
        ROOM TYPE
      </Text>
      <Text style={{ ...styles.column, ...styles.col7, marginRight: 0 }}>
        PARTICIPATING AS
      </Text>
    </View>
  );

  headerColumnMedical = () => (
    <View style={styles.headerColumnRow} fixed>
      {/* <Text style={styles.text}>#. </Text> */}
      <Text
        style={{ ...styles.column, ...styles.col0, ...styles.fieldsNumber }}
      >
        #
      </Text>
      <Text style={{ ...styles.column, ...styles.col1 }}>NAME</Text>
      <Text style={{ ...styles.column, ...styles.grids }}>
        MEDICAL CONDITION
      </Text>
      <Text style={{ ...styles.column, ...styles.grids }}>DIETARIES</Text>
    </View>
  );

  renderGroup = ({ groupId, group }, data) => {
    if (!groupId)
      return <View style={styles.group}>{data.map(this.renderPax)}</View>;

    const children = data.filter(child => child.groupId === groupId);
    return (
      <View style={styles.group}>
        <Text style={{ ...styles.fieldsText }}>{group}</Text>
        {children.map(this.renderPax)}
      </View>
    );
  };

  renderContent = () => {
    const { filteredParticipants } = this.props;
    this.paxNumber = 0;
    const sorted = sortBy(filteredParticipants.map(this.participantVal), [
      'group',
      'composedName',
    ]);
    const grouped = remove(sorted, ({ groupId }) => !!groupId);
    const groupData = uniqBy(
      grouped.map(({ groupId, group }) => ({ groupId, group })),
      'groupId',
    );
    const groupContent = groupData.map(grpData =>
      this.renderGroup(grpData, grouped),
    );
    const nonGroup = this.renderGroup({}, sorted);
    return (
      <View>
        {groupContent}
        {nonGroup}
      </View>
    );
  };

  renderPaxList = () => {
    const { currentUser, paxLabel } = this.props;
    const content = this.renderContent();
    const reportTitle = `List of ${paxLabel} ( ${this.getTabSelected()} )`;
    const printDate = momentjs().format(frmt.DAY_DATE_TIME_SECONDS);
    return (
      <Page style={styles.page} orientation={PRINT_ORIENTATION.LANDSCAPE} wrap>
        {this.renderHeader(reportTitle)}
        <Footer printDate={printDate} printedBy={currentUser} />
        {this.headerColumn()}
        {content}
      </Page>
    );
  };

  filterMedicals = (person = {}) => {
    const { medicals, dietaries } = person;
    return (
      !!person &&
      ((!!medicals && !!medicals.length) || (!!dietaries && !!dietaries.length))
    );
  };

  renderPaxMedical = (data, index) => {
    const { personId, composedName, medicals: pm, dietaries: pd } = data;
    const { medicals, dietaries } = this.props;
    // const name = this.getName(firstName, lastName, middleName);
    const medical = filter(medicals, parm => !!parm && pm.includes(parm.id));
    const dietary = filter(dietaries, parm => !!parm && pd.includes(parm.id));
    const medContent = medical.map(val => (
      <Text style={{ ...styles.fields }}>{`${val.description}:${
        val.action
      }`}</Text>
    ));
    const dietContent = dietary.map(val => (
      <Text style={{ ...styles.fields }}>{val.description}</Text>
    ));

    return (
      <View key={personId} style={styles.participantRow}>
        <Text
          style={{ ...styles.fields, ...styles.col0, ...styles.fieldsNumber }}
        >{`${index + 1}. `}</Text>
        <Text style={{ ...styles.fields, ...styles.col1 }}>{composedName}</Text>
        <View style={styles.grids}>{medContent}</View>
        <View style={styles.grids}>{dietContent}</View>
      </View>
    );
  };

  renderMedical = () => {
    const { currentUser, filteredParticipants, paxLabel } = this.props;
    const printDate = momentjs().format(frmt.DAY_DATE_TIME_SECONDS);

    const personMedical = sortBy(
      filteredParticipants.map(this.participantVal).filter(this.filterMedicals),
      ['composedName'],
    );

    if (!personMedical.length) return null;
    const details = personMedical.map(this.renderPaxMedical);

    const content = <View>{details}</View>;
    return (
      <Page style={styles.page} orientation={PRINT_ORIENTATION.LANDSCAPE}>
        {this.renderHeader(`${paxLabel} Medical Conditions & Dietaries`, false)}
        <Footer printDate={printDate} printedBy={currentUser} />
        {this.headerColumnMedical()}
        {content}
      </Page>
    );
  };

  renderDocument = () => {
    const paxList = this.renderPaxList();
    const medicalList = this.renderMedical();
    return (
      <Document title={this.props.content}>
        {paxList}
        {medicalList}
      </Document>
    );
  };

  renderLoading = ({ loading, url }) => {
    const { handleClose } = this.props;
    if (!loading) {
      window.open(url);
      handleClose();
    }
    return 'loading...';
  };

  renderIcon = ({ loading }) => (
    <Icon
      icon="lnr-printer"
      size="mediumPlus"
      title={`Print ${this.props.paxLabel}`}
      color={LOGIC_HELPERS.ifElse(!loading, 'dark', 'gray')}
    />
  );

  getTabSelected = () => {
    const { peopleTabOptionSelected, paxLabel } = this.props;

    return LOGIC_HELPERS.switchCase(peopleTabOptionSelected, {
      [PEOPLE_TAB_OPTIONS.MAYBE_PARTICIPANTS]: 'Maybe',
      [PEOPLE_TAB_OPTIONS.NOT_GOING_PARTICIPANTS]: 'Not Going',
      [PEOPLE_TAB_OPTIONS.GOING_PARTICIPANTS]: 'Going',
      [DEFAULT]: `All ${paxLabel}`,
    });
  };

  render = () => {
    const { ready, paxLabel } = this.state;

    const { filteredParticipants } = this.props;
    if (!ready) return null;
    if (!filteredParticipants.length) return `No ${paxLabel} yet`;
    return (
      <BlobProvider document={this.renderDocument()}>
        {this.renderLoading}
      </BlobProvider>
    );
  };
}

PrintParticipants.propTypes = {
  // hoc props
  filteredParticipants: PropTypes.array,
  // parent props
  // resaga props
  content: PropTypes.string,
  participantsContent: PropTypes.array,
  personDetails: PropTypes.array,
  phoneList: PropTypes.array,
  handleClose: PropTypes.func,
  ownerName: PropTypes.string,
  orgName: PropTypes.string,
  startDate: PropTypes.string,
  peopleTabOptionSelected: PropTypes.string,
  orgPhoto: PropTypes.string,
  photoMetaInfo: PropTypes.object,
  currentUser: PropTypes.string,
  rooms: PropTypes.array,
  groups: PropTypes.array,
  groupIds: PropTypes.array,
  medicals: PropTypes.array,
  dietaries: PropTypes.array,
  duration: PropTypes.number,
  userDetails: PropTypes.array,
  paxLabel: PropTypes.string,
};

PrintParticipants.defaultProps = {
  filteredParticipants: [],
  participantsContent: [],
  personDetails: [],
  phoneList: [],
  rooms: [],
  groups: [],
  groupIds: [],
  userDetails: [],
};

export default compose(
  // withStyles(styles, { name: 'PrintParticipants' }),
  resaga(CONFIG),
  withParticipants,
  INVITATION_STORE_HOC.selectUserNodeIds({
    nodeIds: 'filteredParticipants',
    roles: [PARTICIPANT_LINKEE, TOUR_PARTICIPANT],
    outputProp: 'userNodeIds',
  }),
  resaga(CONFIG2),
  resaga(CONFIG3),
  resaga(CONFIG_PERSON),
  resaga(CONFIG4),
)(PrintParticipants);
