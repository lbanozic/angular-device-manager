export enum DeviceStatus {
  Alarm = 'alarm',
  NoData = 'no_data',
  Ok = 'ok',
}

export interface Device {
  devui: string;
  name: string;
  reading?: number;
  incomingDate?: Date;
  min?: number;
  max?: number;
  batteryLevel: number;
  signalStrength: number;
}
