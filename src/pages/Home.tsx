import Hero  from '../components/Hero'
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Testimonial from '../components/Testimonial'
import Contact from '../components/Contact'
import AskedQuestions from '../components/AskedQuestions'
const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Testimonial/>
      <AskedQuestions/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home
