import HomePage from "@/components/HomePage/page";
import PublicLayout from "./PublicLayout";

export default async function Home() {
  return (
    <PublicLayout>
      <HomePage />
    </PublicLayout>
  );
}
