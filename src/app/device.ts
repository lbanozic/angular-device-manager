export enum DeviceStatus {
  Alarm = 'Alarm',
  NoData = 'NoData',
  Ok = 'Ok',
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
  status: DeviceStatus;
}
