"use client";

import { EmailVerificationSection } from "./settings/ui/EmailVerificationSection";
import PaymentCompleteSteps from "./ui/PaymentCompleteSteps";
import ProfileCompleteSteps from "./ui/ProfileCompleteSteps";
import WelcomeIfRegisteredDoctor from "./ui/WelcomeIfRegisteredDoctor";

function DoctorDashboard() {
  // const { user } = useSessionStore();

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "/images/user/default-user.webp",
  };

  return (
    <>
      {/* After creating profile */}
      <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-900 lg:p-8">
        {/* Messages */}
        <EmailVerificationSection user={user} />

        {/* Welcome Section */}
        <WelcomeIfRegisteredDoctor />

        {/* Payment Complete Steps */}
        <PaymentCompleteSteps />

        {/* Profile Complete Steps */}
        <ProfileCompleteSteps />

        {/* Create Your Profile Section */}
        {/* <WelcomeIfNoProfileForDoctor /> */}

        {/* Stats Grid */}
        {/* <DashboardDoctorStats title="Total Appointments" value="28" /> */}

        {/* Main Content */}
        {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Notifications />
          <AppointmentList appointments={MockDataForDoctorDashboard.appointments} />
          <RecentInvoices invoices={MockDataForDoctorDashboard.invoices} />
        </div> */}
      </div>
    </>
  );
}

export default DoctorDashboard;
