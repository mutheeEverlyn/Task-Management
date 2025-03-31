import service1 from '../assets/service1.jpg'
import service2 from '../assets/service2.jpg'
import service3 from '../assets/service3.jpg'
import NavBar from './NavBar'
import Footer from './Footer'

const Services = () => {
  return (
    <>
      <NavBar />
      <div className="w-full  flex flex-col items-center bg-gray-100 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-6xl w-full px-5 place-items-center">
          <div className="space-y-3 order-1 sm:order-1 sm:pr-8">
            <p className="text-blue-500 text-2xl font-serif">
              Capture tasks at the speed of thought
            </p>
          </div>
          <div className="order-2 sm:order-2">
            <img src={service1} alt="service1" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center bg-gray-100 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-6xl w-full px-5 place-items-center">
          <div className="order-1 sm:order-1">
            <img src={service2} alt="service2" className="rounded-lg shadow-lg" />
          </div>
          <div className="space-y-3 order-2 sm:order-2 sm:pl-8">
            <p className="text-blue-500 text-2xl font-serif">
              Organize, prioritize, and get things done at your preferred time
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center bg-gray-100 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-6xl w-full px-5 place-items-center">
          <div className="space-y-3 order-1 sm:order-1 sm:pr-8">
            <p className="text-blue-500 text-2xl font-serif">
              User-friendly interface that is easy to navigate and personalize
            </p>
          </div>
          <div className="order-2 sm:order-2">
            <img src={service3} alt="service3" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Services