import {
  ENABLE_DISPLEVEL,
  DISABLE_DISPLEVEL,
  SET_DATA_FORMAT,
  SET_TAB,
  SELECT_DEVICE_SUCCESS
} from "../actions/actionTypes";

import { unique } from '../utils';

export interface IDeviceDetailState {
  activeDataFormat?: string,
  activeTab: string,
  enabledDisplevels: string[],
}

export default function deviceViewer(state: IDeviceDetailState = {
  activeTab: 'properties',
  enabledDisplevels: []
}, action) {
  switch (action.type) {
    case ENABLE_DISPLEVEL: {
      const {displevel} = action;
      const enabledDisplevels = [...state.enabledDisplevels, displevel];
      return {...state, enabledDisplevels};
    }

    case DISABLE_DISPLEVEL: {
      const {displevel} = action;
      const enabledDisplevels = state.enabledDisplevels.filter(level => level !== displevel);
      return {...state, enabledDisplevels};
    }

    case SELECT_DEVICE_SUCCESS: {
      const device = action.device;
      const commands = device.commands || [];
      const attributes = device.attributes || [];

      const enabledDisplevels = unique(commands.map(cmd => cmd.displevel));
      const activeDataFormat = attributes.length ? attributes[0].dataformat : null;

      return {...state, enabledDisplevels, activeDataFormat, activeTab: 'server'};
    }

    case SET_DATA_FORMAT:
      return {...state, activeDataFormat: action.format};

    case SET_TAB:
      return {...state, activeTab: action.tab};

    default:
      return state;
  }
}
