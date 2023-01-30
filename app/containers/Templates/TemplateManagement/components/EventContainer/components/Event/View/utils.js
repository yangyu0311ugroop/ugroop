import { EVENT_CONSTANTS } from 'utils/constants/events';

export const constructActivityDetails = props => {
  const {
    bookingNumber,
    bookingPersonCount,
    bookedBy,
    supplierName: supplier,
    supplierPhone: supplierPhoneNumber,
    iconOverride,
    subtype,

    activityDetailStartValue,
    activityDetailEndValue,
  } = props;

  switch (subtype) {
    case EVENT_CONSTANTS.ACTIVITIES.MATCH.type: {
      const cycling = EVENT_CONSTANTS.ACTIVITIES.MATCH.iconOverrides.filter(
        icon => icon.type === 'Cycling',
      );

      switch (iconOverride) {
        case cycling[0].type: {
          const activityDetailStart = JSON.parse(activityDetailStartValue);
          const activityDetailEnd = JSON.parse(activityDetailEndValue);

          const {
            name: activityDetailStartName,
            placeId: activityDetailStartPlaceId,
            icon: activityDetailStartIcon,
          } = activityDetailStart;

          const {
            name: activityDetailEndName,
            placeId: activityDetailEndPlaceId,
            icon: activityDetailEndIcon,
          } = activityDetailEnd;
          const activityDetails = {
            start: {
              name: activityDetailStartName,
              placeId: activityDetailStartPlaceId,
              icon: activityDetailStartIcon,
            },
            end: {
              name: activityDetailEndName,
              placeId: activityDetailEndPlaceId,
              icon: activityDetailEndIcon,
            },
          };

          return {
            bookingNumber,
            bookingPersonCount,
            bookedBy,
            supplier,
            supplierPhoneNumber,
            iconOverride,
            activityDetails,
          };
        }

        default: {
          return {
            bookingNumber,
            bookingPersonCount,
            bookedBy,
            supplier,
            supplierPhoneNumber,
            iconOverride,
          };
        }
      }
    }
    default: {
      return {
        bookingNumber,
        bookingPersonCount,
        bookedBy,
        supplier,
        supplierPhoneNumber,
        iconOverride,
      };
    }
  }
};

export const constructFlightDetails = props => {
  const {
    startAirportName,
    startAirportCity,
    startIataCode,
    endAirportName,
    endAirportCity,
    endIataCode,
    airline,
    flightNumber,
    gate,
    terminal,
    flightTravelClass,
    flightBooking,
  } = props;

  return {
    start: {
      airport: {
        name: startAirportName,
        cityName: startAirportCity,
        iataCode: startIataCode,
      },
    },
    end: {
      airport: {
        name: endAirportName,
        cityName: endAirportCity,
        iataCode: endIataCode,
      },
    },
    airline,
    flightNumber,
    gate,
    terminal,
    travelClass: flightTravelClass,
    flightBookingId: flightBooking,
  };
};

export const defaultEventBookingTransportation = props => {
  const {
    transportationDetailBookerName,
    transportationDetailBookingNumber,
    transportationDetailBookingPersonCount,
    transportationDetailSupplierName,
    transportationDetailSupplierPhone,
  } = props;

  return {
    eventBooking: {
      bookingNumber: transportationDetailBookingNumber,
      bookedBy: transportationDetailBookerName,
      supplierName: transportationDetailSupplierName,
      supplierNumber: transportationDetailSupplierPhone,
      personCount: transportationDetailBookingPersonCount,
    },
  };
};

export const defaultTransportationStart = props => {
  const { startName: name, startPlaceId: placeId, startIcon: icon } = props;

  return {
    start: {
      name,
      placeId,
      icon,
    },
  };
};

export const defaultTransportationEnd = props => {
  const { endName: name, endPlaceId: placeId, endIcon: icon } = props;

  return {
    end: {
      name,
      placeId,
      icon,
    },
  };
};

export const defaultTransportationDetail = (props, additional = {}) => ({
  common: {
    ...defaultEventBookingTransportation(props),
    ...defaultTransportationStart(props),
    ...defaultTransportationEnd(props),
    ...additional,
  },
});

export const constructTransportationDetails = props => {
  const { subtype } = props;
  switch (subtype) {
    case EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type:
      return {
        detail: {
          ...constructFlightDetails(props),
        },
      };
    default:
      return {
        detail: {
          ...defaultTransportationDetail(props),
        },
      };
  }
};

export const getEventDetails = props => {
  const {
    description,
    locationIcon,
    locationName,
    placeId,
    name,
    url,
    subtype,
    type,
  } = props;
  const model = {
    description,
    name,
    type,
    url,
  };
  switch (type) {
    case EVENT_CONSTANTS.TYPES.TRANSPORTATIONS.type: {
      return {
        ...model,
        detail: {
          ...constructTransportationDetails(props),
          type: subtype,
        },
      };
    }
    case EVENT_CONSTANTS.TYPES.ACTIVITIES.type: {
      return {
        ...model,
        detail: {
          type: subtype,
          ...constructActivityDetails(props),
        },
        location: {
          icon: locationIcon,
          name: locationName,
          placeId,
        },
      };
    }
    default:
      return {
        ...model,
        detail: {
          type: subtype,
          ...constructActivityDetails(props),
        },
        location: {
          icon: locationIcon,
          name: locationName,
          placeId,
        },
      };
  }
};
