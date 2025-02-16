import { SelectBranch } from "./ui/SelectBranch";
import { WelcomeIfNoProfileForHospital } from "./ui/WelcomeIfNoProfileForHospital";

export default function HospitalDashboard() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-900 lg:p-8">
        <SelectBranch />
        <WelcomeIfNoProfileForHospital />
      </div>
    </>
  );
}
