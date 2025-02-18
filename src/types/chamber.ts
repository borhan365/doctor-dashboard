export interface TimeSlot {
  id?: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxPatients: number;
}

export interface DaySchedule {
  id?: string;
  day: string;
  fromTime: string;
  toTime: string;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
}

export interface Chamber {
  id: string;
  hospitalId: string;
  hospitalData?: {
    id: string;
    name: string;
    address: string;
  };
  floorNumber: string;
  roomNumber: string;
  shift: string;
  address: string;
  city: string;
  newPatientFee: number;
  oldPatientFee: number;
  followUpFee: number;
  followUpFeeNote?: string;
  followUpFeeNoteBn?: string;
  contactNumbers: string[];
  slotDuration: number;
  breakTime: number;
  maxPatients: number;
  availableDays: DaySchedule[];
  doctor?: {
    name: string;
    bnName?: string;
    prefix?: string;
  };
}

export type CreateChamberInput = Omit<Chamber, "id" | "hospitalData"> & {
  doctorId: string;
};
