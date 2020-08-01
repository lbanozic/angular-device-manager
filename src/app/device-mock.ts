import { Device } from './device';

export const DEVICES: Device[] = [
  {
    min: -100,
    max: 100,
    batteryLevel: 92,
    signalStrength: 8,
  },
  {
    reading: -5,
    incomingDate: new Date(),
    min: 0,
    max: 100,
    batteryLevel: 67,
    signalStrength: 10,
  },
  {
    batteryLevel: 30,
    signalStrength: 9,
  },
  {
    reading: 19,
    incomingDate: getDateWithMinutesOffset(-3),
    max: 20,
    batteryLevel: 47,
    signalStrength: 8,
  },
  {
    reading: 16,
    incomingDate: getDateWithMinutesOffset(-1),
    min: 0,
    max: 10,
    batteryLevel: 26,
    signalStrength: 3,
  },
  {
    reading: -4,
    incomingDate: new Date(),
    min: -50,
    batteryLevel: 81,
    signalStrength: 5,
  },
  {
    min: 0,
    max: 100,
    batteryLevel: 16,
    signalStrength: 7,
  },
  {
    reading: 2,
    incomingDate: getDateWithMinutesOffset(-4),
    min: 0,
    max: 50,
    batteryLevel: 65,
    signalStrength: 2,
  },
  {
    reading: 11,
    incomingDate: new Date(),
    batteryLevel: 72,
    signalStrength: 9,
  },
  {
    reading: 1,
    incomingDate: new Date(),
    min: 0,
    max: 200,
    batteryLevel: 98,
    signalStrength: 1,
  },
  {
    max: 150,
    batteryLevel: 25,
    signalStrength: 4,
  },
  {
    reading: -1,
    incomingDate: getDateWithMinutesOffset(-1),
    min: 0,
    max: 150,
    batteryLevel: 57,
    signalStrength: 6,
  },
  {
    reading: -9,
    incomingDate: getDateWithMinutesOffset(-10),
    min: -5,
    max: 500,
    batteryLevel: 100,
    signalStrength: 5,
  },
  {
    reading: 5,
    incomingDate: getDateWithMinutesOffset(-7),
    min: 0,
    max: 1000,
    batteryLevel: 6,
    signalStrength: 8,
  },
  {
    reading: 2,
    incomingDate: new Date(),
    min: 0,
    max: 100,
    batteryLevel: 52,
    signalStrength: 10,
  },
];

function getDateWithMinutesOffset(minutesOffset: number): Date {
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + minutesOffset);
  return currentDate;
}
