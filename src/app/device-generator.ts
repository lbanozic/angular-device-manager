import { Device, DeviceStatus } from './device';

export const DEVICES: Device[] = getRandomDevices(100);

function getRandomDevices(numberOfDevices: number): Device[] {
  const randomDevices: Device[] = [];

  for (let i = 0; i < numberOfDevices; i++) {
    const newDevice: Device = {
      name: getRandomDeviceName(),
      devui: getRandomDevui(),
      batteryLevel: getRandomBatteryLevel(),
      signalStrength: getRandomSignalStrength(),
      status: DeviceStatus.Ok,
    };

    let min: number;
    let max: number;

    if (getRandomBoolean()) {
      min = getRandomMin();
      newDevice.min = min;
    }

    if (getRandomBoolean()) {
      max = getRandomMax();
      while (min > max) {
        max = getRandomMax();
      }
      newDevice.max = max;
    }

    if (getRandomBoolean()) {
      newDevice.reading = getRandomReading();
    }

    newDevice.status = getDeviceStatus(newDevice);

    randomDevices.push(newDevice);
  }

  return randomDevices;
}

function getDeviceStatus(device: Device): DeviceStatus {
  if (device.reading < device.min || device.reading > device.max) {
    return DeviceStatus.Alarm;
  }
  return DeviceStatus.Ok;
}

function getRandomDeviceName(): string {
  const firstPart = [
    'Avogadro',
    'Pavlov',
    'Eddington ',
    'Trajectory',
    'Molecule',
    'Harmonic',
    'Wave',
    'Solar',
    'Sherrington',
    'Phase',
    'Germain',
    'Motion',
    'Fusion',
    'Diffraction',
    'Pendulum',
    'Molecule',
    'Cosmic',
    'Hydro',
    'von Liebig',
    'Daimler',
    'Electronegativity',
    'Optic',
    'Turing',
    'Dark',
    'Wright',
    'Liquid',
    'Focus',
    'Drift',
  ];
  const secondPart = [
    'Modifier',
    'Aspirator',
    'Meter',
    'Expander',
    'Communicator',
    'Grappler',
    'Scrambler',
    'Transistor',
    'Diverter',
    'Crumbler',
    'Collider',
    'Reactor',
    'Cleaver',
    'Measurer',
    'Shuffler',
    'Analyser',
    'Surveyor',
    'Receiver',
    'Arranger',
    'Extrapolator',
    'Pump',
    'Twister',
    'Morpher',
    'Meter',
    'Burner',
    'Positioner',
    'Reverter',
    'Oscillator',
  ];
  return `${firstPart[Math.floor(Math.random() * firstPart.length)]} ${
    secondPart[Math.floor(Math.random() * secondPart.length)]
  }`;
}

function getRandomDevui(): string {
  const hexChars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ];
  const hexCharsLength = hexChars.length;
  const getRandomHexChar = () =>
    hexChars[Math.floor(Math.random() * hexCharsLength)];
  return `#${getRandomHexChar()}${getRandomHexChar()}${getRandomHexChar()}${getRandomHexChar()}${getRandomHexChar()}${getRandomHexChar()}`;
}

function getRandomReading(): number {
  return getRandomNumberInRange(-20, 20);
}

function getRandomMin(): number {
  return Math.round(getRandomNumberInRange(-1000, 500) / 10) * 10;
}

function getRandomMax(): number {
  return Math.round(getRandomNumberInRange(-500, 1000) / 10) * 10;
}

function getRandomBatteryLevel() {
  return getRandomNumberInRange(0, 100);
}

function getRandomSignalStrength() {
  return getRandomNumberInRange(1, 10);
}

function getRandomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean(): boolean {
  return Math.random() >= 0.25;
}
