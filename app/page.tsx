import LandingPageLeft from "@/app/components/LandingPageLeft";
import LandingPageRight from "@/app/components/LandingPageRight";

export default function Home() {
  return (
    <main className="grid grid-cols-2">
      <LandingPageLeft />
      <LandingPageRight />
    </main>
  )
}
