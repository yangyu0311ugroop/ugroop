const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  page: {
    backgroundColor: '#ffffff',
    paddingTop: 0,
    paddingBottom: 60,
  },
  pageNumber: {
    fontSize: 8,
    textAlign: 'center',
    color: '#c0c8d0',
  },
  text: {
    margin: 4,
    fontSize: 12,
    textAlign: 'justify',
    color: 'black',
  },
  fields: {
    margin: 2,
    fontSize: 10,
    textAlign: 'left',
    color: '#253b53',
    whiteSpace: 'noWrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // marginLeft: 0,
  },
  fieldsNumber: {
    textAlign: 'right',
    /* margin: 2,
    fontSize: 10,
    color: 'black',
    whiteSpace: 'noWrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis', */
  },
  column: {
    margin: 2,
    fontSize: 10,
    textAlign: 'left',
    whiteSpace: 'noWrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#2b344d', // '#6682a3',
  },
  xs: {
    flexBasis: '25%',
  },
  header: {
    fontSize: 12,
    textAlign: 'center',
    // color: 'grey',
    fontWeight: 700,
  },
  emptyStr: {
    color: '#bdbec4',
    // fontStyle: 'italic',
    // fontFamily: 'Lato Italic',
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 0,
    left: 0,
    right: 0,
    color: 'grey',
    backgroundColor: '#2b344d',
  },
  footerBadge: {
    alignItems: 'flex-end',
    justifySelf: 'flex-end',
    paddingRight: 8,
  },
  logo: {
    height: 'auto',
    width: 20,
    justifyContent: 'right',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: '#1a2b49',
    textAlign: 'left',
    padding: 8,
  },
  footerLabel: {
    fontSize: 16,
    color: '#1a2b49',
    textAlign: 'left',
  },
  footerSubLabel: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
  },
  headerColumnRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 8,
    paddingLeft: 8,
    // borderBottom: 'solid 1px black',
    borderTopWidth: 1,
    borderTopColor: '#8898aa',
    borderTopStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#8898aa',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    marginBottom: 4,
  },
  participantRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 4,
  },
  colm: {
    width: '2%',
  },
  col0: {
    width: '2%',
  },
  col1: {
    width: '23%',
  },
  col2: {
    width: '6%',
  },
  col3: {
    // flexBasis: '10%',
    width: '13%',
  },
  col4: {
    width: '10%',
  },
  col5: {
    width: '12%',
  },
  col6: {
    width: '12%',
  },
  col7: {
    width: '17%',
    // width: '15%',
  },
  textCenter: {
    textAlign: 'center',
  },
  group: {
    backgroundColor: '#ebf1f8',
    // display: 'flex',
    // flexDirection: 'row',
    paddingRight: 8,
    paddingLeft: 2,
    paddingBottom: 2,
    paddingTop: 2,
    margin: 2,
    flexDirection: 'column',
  },
  fieldsText: {
    paddingLeft: 6,
    margin: 2,
    fontSize: 10,
    textAlign: 'left',
    color: '#0a0a0a',
    whiteSpace: 'noWrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  grids: {
    width: '36%',
  },
  dietary: {
    borderColor: '#55cd3d',
  },
  medical: {
    borderColor: '#aab20c',
  },
  knob: {
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '10px',
    height: '10px',
    borderRadius: 10,
    fontSize: 8,
    borderWidth: 6,
    backgroundColor: '#55cd3d',
    // transform: 'rotate(136deg)',
  },
  medAll: {
    borderTopColor: '#aab20c',
    borderLeftColor: '#aab20c',
    borderRightColor: '#55cd3d',
    borderBottomColor: '#55cd3d',
  },
};

export default styles;
