export function generateTimeSlots(
  startTime: string,
  endTime: string,
  slotDuration: number,
) {
  const slots = [];
  const start = new Date(`2000/01/01 ${startTime}`);
  const end = new Date(`2000/01/01 ${endTime}`);

  // Handle case where end time is on next day
  if (end < start) {
    end.setDate(end.getDate() + 1);
  }

  let currentSlot = new Date(start);

  while (currentSlot < end) {
    // Format to 24-hour time
    const slotStart = formatTo24Hour(currentSlot);

    // Calculate end time for this slot
    const slotEndTime = new Date(currentSlot.getTime() + slotDuration * 60000);

    // Don't add slot if it exceeds end time
    if (slotEndTime > end) break;

    const slotEnd = formatTo24Hour(slotEndTime);

    slots.push({
      startTime: slotStart,
      endTime: slotEnd,
      isAvailable: true,
      maxPatients: 1,
    });

    // Move to next slot start time
    currentSlot = slotEndTime;
  }

  return slots;
}

// Format time to 24-hour format (HH:mm)
export function formatTo24Hour(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Format time for display (12-hour format)
export function formatTimeForDisplay(time: string) {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Convert 12-hour format to 24-hour format
export function convertTo24Hour(time12h: string): string {
  if (!time12h) return "";
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = String(parseInt(hours, 10) + 12);
  }

  return `${hours.padStart(2, "0")}:${minutes}`;
}

// Add this helper function
export function formatDaySchedule(availableDays: any[]) {
  return availableDays.map((day) => ({
    day: day.day,
    fromTime: day.fromTime || "",
    toTime: day.toTime || "",
    isAvailable: day.isAvailable,
    timeSlots: day.timeSlots.map((slot: any) => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
      isAvailable: slot.isAvailable,
      maxPatients: 1,
    })),
  }));
}
