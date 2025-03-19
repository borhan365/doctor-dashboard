import LandingPage from "@/app/home/page";
import PublicLayout from "./PublicLayout";

export default async function Home() {
  return (
    <PublicLayout>
      <LandingPage />
    </PublicLayout>
  );
}
