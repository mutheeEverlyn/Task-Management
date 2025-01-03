import  {Link}  from 'react-router-dom'
const Footer = () => {
  return (
    <>
    <div className="footer bg-gray-600 text-white text-center px-5 md:text-left md:grid md:grid-cols-2 lg:py-10">
      <div className="block mx-auto pt-10 md:mx-0" >MyTasks</div>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3">
      <ul>
        <li><button><Link to='/about'>About us</Link></button></li>
        <li><button><Link to='/contact-us'>Contact</Link></button></li>
        <li><button><Link to='/services'>Services</Link></button></li>
        <li><button>Login</button></li>
        <li><button>sign up</button></li>
        </ul>
        <ul>
        <li>facebook</li>
        <li>instagram</li>
        <li>twitter</li>
        <li>linkedin</li>
        </ul>
      WWW.MyTasks.com copyright @ 2024.All rights reserved</div>
    </div>
    </>
  )
}

export default Footer
