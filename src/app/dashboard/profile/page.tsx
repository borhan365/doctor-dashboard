"use client";

import Loading from "../../Components/Loading/page";
import { ProfileIndex } from "./ui/ProfileIndex";
import ProfileCompleteSteps from "../ui/ProfileCompleteSteps";
import { useDoctorProfileByUser } from "@/hooks/doctor/getDoctorProfileByUser";

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
    }
  }

  const { data, isLoading } = useDoctorProfileByUser(user?.id);


  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col gap-4 mx-auto max-w-5xl mt-10 mb-4">
        <h1 className="text-xl font-bold text-black">
          {data?.doctorProfile ? "Update Doctor Profile" : "Create Doctor Profile"}
        </h1>
        
        {/* <ProfileCompleteSteps doctorProfile={data?.doctorProfile} /> */}
      </div>
      <ProfileIndex initialData={data?.doctorProfile} />
    </>
  );
}

export default UpdateDoctorProfileScreen;
