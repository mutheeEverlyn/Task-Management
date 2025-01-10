import HeroPic from "../assets/HeroPic.jpg"
const Hero = () => {
  return (
    <>
     <div className="w-full max-w-full min-h-[620px] flex">
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
        <div className="space-y-5 order-1 sm:order-1 sm:pr-32 ">
          <p className="text-blue-400 text-2xl font-serif">
              Welcome to MyTasks.This platform helps you to manage your Tasks effectively
            </p>
        </div>
        <div className="order-2 sm:order-2">
           <img src={HeroPic} alt="hero pic" />
        </div>
      </div>
    </div> 
    </>
  )
}

export default Hero
