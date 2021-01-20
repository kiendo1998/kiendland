import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPaypalCompletedPayments, defaultValue } from 'app/shared/model/paypal-completed-payments.model';

export const ACTION_TYPES = {
  FETCH_PAYPALCOMPLETEDPAYMENTS_LIST: 'paypalCompletedPayments/FETCH_PAYPALCOMPLETEDPAYMENTS_LIST',
  FETCH_PAYPALCOMPLETEDPAYMENTS: 'paypalCompletedPayments/FETCH_PAYPALCOMPLETEDPAYMENTS',
  CREATE_PAYPALCOMPLETEDPAYMENTS: 'paypalCompletedPayments/CREATE_PAYPALCOMPLETEDPAYMENTS',
  UPDATE_PAYPALCOMPLETEDPAYMENTS: 'paypalCompletedPayments/UPDATE_PAYPALCOMPLETEDPAYMENTS',
  DELETE_PAYPALCOMPLETEDPAYMENTS: 'paypalCompletedPayments/DELETE_PAYPALCOMPLETEDPAYMENTS',
  RESET: 'paypalCompletedPayments/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPaypalCompletedPayments>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PaypalCompletedPaymentsState = Readonly<typeof initialState>;

// Reducer

export default (state: PaypalCompletedPaymentsState = initialState, action): PaypalCompletedPaymentsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAYPALCOMPLETEDPAYMENTS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAYPALCOMPLETEDPAYMENTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAYPALCOMPLETEDPAYMENTS):
    case REQUEST(ACTION_TYPES.UPDATE_PAYPALCOMPLETEDPAYMENTS):
    case REQUEST(ACTION_TYPES.DELETE_PAYPALCOMPLETEDPAYMENTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PAYPALCOMPLETEDPAYMENTS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAYPALCOMPLETEDPAYMENTS):
    case FAILURE(ACTION_TYPES.CREATE_PAYPALCOMPLETEDPAYMENTS):
    case FAILURE(ACTION_TYPES.UPDATE_PAYPALCOMPLETEDPAYMENTS):
    case FAILURE(ACTION_TYPES.DELETE_PAYPALCOMPLETEDPAYMENTS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYPALCOMPLETEDPAYMENTS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYPALCOMPLETEDPAYMENTS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAYPALCOMPLETEDPAYMENTS):
    case SUCCESS(ACTION_TYPES.UPDATE_PAYPALCOMPLETEDPAYMENTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAYPALCOMPLETEDPAYMENTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/paypal-completed-payments';

// Actions

export const getEntities: ICrudGetAllAction<IPaypalCompletedPayments> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAYPALCOMPLETEDPAYMENTS_LIST,
  payload: axios.get<IPaypalCompletedPayments>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPaypalCompletedPayments> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAYPALCOMPLETEDPAYMENTS,
    payload: axios.get<IPaypalCompletedPayments>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPaypalCompletedPayments> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAYPALCOMPLETEDPAYMENTS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPaypalCompletedPayments> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYPALCOMPLETEDPAYMENTS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPaypalCompletedPayments> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAYPALCOMPLETEDPAYMENTS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
