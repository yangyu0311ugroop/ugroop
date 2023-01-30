import { defineMessages } from 'react-intl';

export default defineMessages({
  year: {
    id: 'app.Person.StudentDetail.TextOnly.year',
    defaultMessage: 'Year {year}',
  },
  class: {
    id: 'app.Person.StudentDetail.TextOnly.class',
    defaultMessage: 'Class {class}',
  },
  number: {
    id: 'app.Person.StudentDetail.TextOnly.number',
    defaultMessage: 'ID: {number}',
  },
  yearClass: {
    id: 'app.Person.StudentDetail.TextOnly.yearClass',
    defaultMessage: '{year}{separator}{class}',
  },
  yearClassNumber: {
    id: 'app.Person.StudentDetail.TextOnly.yearClassNumber',
    defaultMessage: '{yearClass}{separator}{number}',
  },
});
