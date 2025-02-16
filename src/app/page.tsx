import ForDoctors from "@/app/for-doctors/page";
import PublicLayout from "./PublicLayout";

export default async function Home() {
  return (
    <PublicLayout>
      <ForDoctors />
    </PublicLayout>
  );
}
