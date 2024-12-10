import Hero  from '../components/Hero'
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import About from '../components/About'
import Testimonial from '../components/Testimonial'
import Contact from '../components/Contact'
import Services from '../components/Services'
import AskedQuestions from '../components/AskedQuestions'
const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <About/>
      <Services/>
      <Testimonial/>
      <AskedQuestions/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home
