// Basic notification settings structure
export interface NotificationSetting {
  enabled: boolean;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  textColor: string;
  displayDuration: number | null;
  dismissible: boolean;
  showOnce: boolean;
  startDate: string | null;
  endDate: string | null;
  targetUserRoles?: string[];
  targetPages?: string[];
}

// Structure for doctor notification settings
export interface DoctorNotificationSettings {
  headerTop?: NotificationSetting;
  popup?: NotificationSetting;
}

// Main push notification settings structure from API
export interface PushNotificationSettings {
  id?: string;
  doctorSettings?: DoctorNotificationSettings;
  userSettings?: any;
  frontendSettings?: any;
}

// API response structure
export interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
  error?: string;
  details?: any;
}
