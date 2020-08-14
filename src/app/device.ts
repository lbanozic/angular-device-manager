export enum DeviceStatus {
  Alarm = 'Alarm',
  NoData = 'NoData',
  Ok = 'Ok',
}

export interface Device {
  devui: string;
  name: string;
  reading?: number;
  creationDate: Date;
  incomingDate?: Date;
  min?: number;
  max?: number;
  batteryLevel: number;
  signalStrength: number;
  status: DeviceStatus;
}

export interface DeviceReading {
  devui: string;
  reading: number;
  incomingDate: Date;
  batteryLevel: number;
  signalStrength: number;
}
