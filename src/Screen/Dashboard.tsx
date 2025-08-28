import Orb from '../Components/Background'
import RotatingText from '../Components/RotatingText'
import TrueFocus from '../Components/TrueFocus'

const Dashboard = () => {
  return (
    <>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6">
        {/* Main Heading */}
        <Orb />
        <TrueFocus />
        {/* Sub Heading */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-300 flex items-center gap-2">
          <span>Aspiring</span>
          <RotatingText texts={["Web Developer", "Software Engineer"]} 
          mainClassName="px-1 sm:px-1 md:px-2 bg-indigo-600 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000} />
        </h2>
      </div>
    </>
  )
}

export default Dashboard
