"use client";

import { useDoctorProfileByUser } from "@/hooks/doctor/getDoctorProfileByUser";
import Loading from "../../Components/Loading/page";
import { ProfileIndex } from "./ui/ProfileIndex";

function UpdateDoctorProfileScreen() {
  const user = {
    id: "1234567890",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
    doctorProfile: {
      id: "1234567890",
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://via.placeholder.com/150",
    },
  };

  const { data, isLoading } = useDoctorProfileByUser(user?.id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mx-auto mb-4 mt-10 flex max-w-5xl flex-col gap-4">
        <h1 className="text-xl font-bold text-black">
          {data ? "Update Doctor Profile" : "Create Doctor Profile"}
        </h1>

        {/* <ProfileCompleteSteps doctorProfile={data?.doctorProfile} /> */}
      </div>
      <ProfileIndex />
    </>
  );
}

export default UpdateDoctorProfileScreen;
