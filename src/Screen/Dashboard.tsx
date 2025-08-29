import { Card } from "@/components/ui/card"
import Orb from "@/components/shared/Background"
import RotatingText from "@/components/shared/RotatingText"
import TrueFocus from "@/components/shared/TrueFocus"
import EducationSection from "@/components/shared/EducationSection"

const Dashboard = () => {
  return (
    <div className="relative w-full">
      {/* Orb background */}
      <Orb />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <Card className="relative z-10 p-6 md:p-10 bg-transparent border-0 shadow-none flex flex-col items-center gap-6">
          <TrueFocus />
          <h2 className="text-xl md:text-2xl font-bold text-gray-200 flex items-center gap-2">
            <span>Aspiring</span>
            <RotatingText
              texts={["Web Developer", "Software Engineer"]}
              mainClassName="px-2 bg-indigo-600 text-white overflow-hidden py-1 rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </h2>
        </Card>
      </section>

      {/* Education Section */}
      <EducationSection />
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <Card className="relative z-10 p-6 md:p-10 bg-transparent border-0 shadow-none flex flex-col items-center gap-6">
          <TrueFocus />
          <h2 className="text-xl md:text-2xl font-bold text-gray-200 flex items-center gap-2">
            <span>Aspiring</span>
            <RotatingText
              texts={["Web Developer", "Software Engineer"]}
              mainClassName="px-2 bg-indigo-600 text-white overflow-hidden py-1 rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </h2>
        </Card>
      </section>
    </div>
  )
}

export default Dashboard
