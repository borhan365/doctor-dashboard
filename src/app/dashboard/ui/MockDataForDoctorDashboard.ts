export const MockDataForDoctorDashboard = {
  stats: {
    totalPatients: {
      value: 978,
      change: { value: "15% From Last Week", type: "increase" as const },
    },
    patientsToday: {
      value: 80,
      change: { value: "15% From Yesterday", type: "decrease" as const },
    },
    appointmentsToday: {
      value: 50,
      change: { value: "20% From Yesterday", type: "increase" as const },
    },
  },
  appointments: [
    {
      id: "Apt0001",
      name: "Adrian Marshall",
      avatar:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-02.jpg",
      date: "11 Nov 2024",
      time: "10:45 AM",
      type: "General",
    },
    {
      id: "Apt0002",
      name: "Kelly Stevens",
      avatar:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-03.jpg",
      date: "10 Nov 2024",
      time: "11:00 AM",
      type: "Clinic Consulting",
    },
    {
      id: "Apt0003",
      name: "Samuel Anderson",
      avatar:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-04.jpg",
      date: "03 Nov 2024",
      time: "02:00 PM",
      type: "General",
    },
    {
      id: "Apt0004",
      name: "Catherine Griffin",
      avatar:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-05.jpg",
      date: "01 Nov 2024",
      time: "04:00 PM",
      type: "Clinic Consulting",
    },
    // {
    //   id: "Apt0005",
    //   name: "Robert Hutchinson",
    //   avatar:
    //     "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-06.jpg",
    //   date: "28 Oct 2024",
    //   time: "05:30 PM",
    //   type: "General",
    // },
  ],
  upcomingAppointment: {
    id: "Apt0001",
    name: "Adrian Marshall",
    avatar:
      "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-02.jpg",
    type: "General visit",
    time: "10:45 AM",
  },
  invoices: [
    {
      id: "Apt0001",
      name: "Adrian Marshall",
      avatar:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-03.jpg",
      amount: 450,
      date: "11 Nov 2024",
    },
    {
      id: "Apt0002",
      name: "Kelly Stevens",
      avatar:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-04.jpg",
      amount: 500,
      date: "10 Nov 2024",
    },
    {
      id: "Apt0003",
      name: "Samuel Anderson",
      avatar:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-05.jpg",
      amount: 320,
      date: "03 Nov 2024",
    },
    {
      id: "Apt0004",
      name: "Catherine Griffin",
      avatar:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-06.jpg",
      amount: 240,
      date: "01 Nov 2024",
    },
    {
      id: "Apt0005",
      name: "Robert Hutchinson",
      avatar:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-06.jpg",
      amount: 380,
      date: "28 Oct 2024",
    },
  ],
  notifications: [
    {
      id: "1",
      type: "booking",
      message: "Booking Confirmed on 21 Mar 2024 10:30 AM",
      time: "Just Now",
    },
    {
      id: "2",
      type: "review",
      message: "You have a New Review for your Appointment",
      time: "5 Days ago",
    },
    {
      id: "3",
      type: "appointment",
      message: "You have Appointment with Ahmed by 01:20 PM",
      time: "12:55 PM",
    },
    {
      id: "4",
      type: "payment",
      message: "Sent an amount of $200 for an Appointment by 01:20 PM",
      time: "2 Days ago",
    },
    {
      id: "5",
      type: "review",
      message: "You have a New Review for your Appointment",
      time: "5 Days ago",
    },
  ],
  clinics: [
    {
      id: "1",
      name: "Sofi's Clinic",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-02.jpg",
      price: 900,
      hours: [
        { day: "Tue", time: "07:00 AM - 09:00 PM" },
        { day: "Wed", time: "07:00 AM - 09:00 PM" },
      ],
    },
    {
      id: "2",
      name: "The Family Dentistry Clinic",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-03.jpg",
      price: 600,
      hours: [
        { day: "Sat", time: "07:00 AM - 09:00 PM" },
        { day: "Tue", time: "07:00 AM - 09:00 PM" },
      ],
    },
  ],
};