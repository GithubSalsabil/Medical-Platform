import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faUserMd, faDumbbell, faStethoscope, faBrain, faSyringe, faAppleAlt, faRunning } from '@fortawesome/free-solid-svg-icons';
import wlogo from '@/images/wlogo.png'; 
import blogo from '@/images/blogo.png'; 
import Link from 'next/link';
export default function Home() {
  return (
    <div className="bg-white text-gray-900">
    {/* Hero Section */}
    <section 
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://img1.wsimg.com/isteam/stock/Ddj9aVd/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=h:1000,cg:true)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
  
  <div className="flex flex-col items-center mb-6">
  <div className="mb-2">
    <Image src={wlogo} alt="logo" width={180} height={180} />
  </div>

  <p className="mt-4 text-lg font-light mb-6 text-center italic" style={{ color: '#ecfeff' }}>
  Welcome to SelfCare, your trusted companion in health management.<br />
  Take charge of your well-being with our advanced prediction system and connect with outstanding doctors to guide your journey.
</p>


</div>

  </div>
    </section>
    <section className="about-application py-20 bg-white">
  <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 items-center gap-12">
    {/* Left Content: Image/Graphic */}
    <div className="relative">
      <Image
        src={blogo}
        alt="Health Analytics"
        className="w-full max-w-lg mx-auto"
      />
    </div>
    {/* Right Content: Text */}
    <div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        Empower Your Health<br />
        With Intelligent Tools
      </h2>
      <p className="text-gray-700 mt-6 text-lg md:text-xl leading-relaxed">
        Take control of your health with cutting-edge analytics and personalized insights. Our platform helps you predict and prevent serious health conditions such as heart disease, diabetes, and more — giving you the power to make informed decisions for a healthier life.
      </p>
      
      <div className="mt-8 flex gap-4">
      <Link href="/evaluation">
        <button className="bg-gradient-to-r from-blue-300 to-blue-950 text-black px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-lg">
          Explore Features
        </button>
        </Link>
        <Link href="/login">
        <button className="text-gradient-to-r from-blue-300 to-blue-950 border border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100">
          Contact Us
        </button>
        </Link>
      </div>
    </div>
  </div>
</section>
<section className="services bg-gradient-to-r from-blue-300 to-blue-950 py-16 text-center">
  <div className="container mx-auto px-6">
    {/* Title */}
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-white">Our Services</h2>
      <p className="text-white mt-2 max-w-2xl mx-auto">
        Explore our tailored services to predict, prevent, and manage health risks.
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Service Card */}
      <div className="p-6 bg-white rounded-md shadow-md hover:shadow-lg transition">
        <div className="mb-4 flex justify-center items-center h-16 w-16 bg-gray-100 rounded-full">
          <FontAwesomeIcon icon={faBrain} className="text-purple-800 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Stroke Risk Prediction</h3>
        <p className="text-gray-600 mt-2 text-sm">
          Assess your risk of stroke with precision.
        </p>
      </div>
      <div className="p-6 bg-white rounded-md shadow-md hover:shadow-lg transition">
        <div className="mb-4 flex justify-center items-center h-16 w-16 bg-gray-100 rounded-full">
          <FontAwesomeIcon icon={faSyringe} className="text-yellow-950 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Diabetes Risk</h3>
        <p className="text-gray-600 mt-2 text-sm">
          Get personalized insights into your diabetes risk.
        </p>
      </div>
      <div className="p-6 bg-white rounded-md shadow-md hover:shadow-lg transition">
        <div className="mb-4 flex justify-center items-center h-16 w-16 bg-gray-100 rounded-full">
          <FontAwesomeIcon icon={faStethoscope} className="text-blue-950 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Parkinson Disease Prediction</h3>
        <p className="text-gray-600 mt-2 text-sm">
          Understand your Parkinson health risks with advanced tools.
        </p>
      </div>
      <div className="p-6 bg-white rounded-md shadow-md hover:shadow-lg transition">
        <div className="mb-4 flex justify-center items-center h-16 w-16 bg-gray-100 rounded-full">
          <FontAwesomeIcon icon={faHeartbeat} className="text-red-800 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Heart Disease Prediction</h3>
        <p className="text-gray-600 mt-2 text-sm">
          Stay informed about potential heart-related conditions.
        </p>
      </div>
      <div className="p-6 bg-white rounded-md shadow-md hover:shadow-lg transition">
        <div className="mb-4 flex justify-center items-center h-16 w-16 bg-gray-100 rounded-full">
          <FontAwesomeIcon icon={faUserMd} className="text-sky-800 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Medical Consultations</h3>
        <p className="text-gray-600 mt-2 text-sm">
          Find experienced doctors to support your health.
        </p>
      </div>
      <div className="p-6 bg-white rounded-md shadow-md hover:shadow-lg transition">
        <div className="mb-4 flex justify-center items-center h-16 w-16 bg-gray-100 rounded-full">
          <FontAwesomeIcon icon={faAppleAlt} className="text-green-700 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Nutrition Guidance</h3>
        <p className="text-gray-600 mt-2 text-sm">
          Connect with nutritionists for personalized plans.
        </p>
      </div>
    </div>
  </div>
</section>




<section className="about-application py-12 bg-gray-50">
  <div className="container mx-auto px-6">
  <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What Our Application Can Do for You</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Why Use Our Application */}
      <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Why Use Our Application?</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Your health is our priority. Our application helps you not only predict disease risks but also provides actionable advice to enhance your well-being. Gain access to:
        </p>
        <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
          <li>Lists of specialized doctors</li>
          <li>Tailored exercise programs</li>
          <li>Nutritional recommendations</li>
        </ul>
      </div>

      {/* What We Offer */}
      <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-bold text-gray-800 mb-4">What We Offer</h3>
        <p className="text-gray-600 mb-4 text-sm">
          With our application, you can:
        </p>
        <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
          <li>Assess your risk of diseases</li>
          <li>Receive personalized advice</li>
          <li>Track your health progress</li>
        </ul>
      </div>
    </div>
  </div>
</section>

    {/* Best Practices Section */}
    <section className="best-practices bg-gradient-to-r from-blue-300 to-blue-950 py-16 text-center">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center text-white mb-8">
      Best Practices for Your Health
    </h2>
    <p className="text-lg text-white text-center mb-12 max-w-2xl mx-auto">
      Follow these essential practices to optimize your health and well-being:
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Practice 1 */}
      <div className="p-6 bg-white rounded-md shadow-md hover:shadow-lg transition">
        <div className="mb-4 flex justify-center items-center h-16 w-16 bg-blue-100 rounded-full">
          <FontAwesomeIcon icon={faStethoscope} className="text-blue-950 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Regular Checkups</h3>
        <p className="text-gray-600 mt-2 text-sm">
          Stay proactive about your health by scheduling regular checkups with professionals.
        </p>
      </div>

      {/* Practice 2 */}
      <div className="p-6 bg-white rounded-md shadow-md hover:shadow-lg transition">
        <div className="mb-4 flex justify-center items-center h-16 w-16 bg-green-100 rounded-full">
          <FontAwesomeIcon icon={faAppleAlt} className="text-green-600 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Balanced Diet</h3>
        <p className="text-gray-600 mt-2 text-sm">
          Eating a healthy and balanced diet is crucial for maintaining optimal health.
        </p>
      </div>

      {/* Practice 3 */}
      <div className="p-6 bg-white rounded-md shadow-md hover:shadow-lg transition">
        <div className="mb-4 flex justify-center items-center h-16 w-16 bg-orange-100 rounded-full">
          <FontAwesomeIcon icon={faRunning} className="text-yellow-950 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Physical Activity</h3>
        <p className="text-gray-600 mt-2 text-sm">
          Incorporate daily exercise to improve your physical and mental health.
        </p>
      </div>
    </div>

    <p className="text-center text-lg text-white mt-12">
      Take your first step toward a healthier life with SelfCare!
    </p>
  </div>
</section>

{/* Latest News Section */}
<section className="latest-news py-16 bg-white">
  <div className="container mx-auto text-center px-6">
    <h2 className="text-4xl font-bold text-gray-800 mb-8">
      Latest News & Articles
    </h2>
    <p className="text-lg text-gray-700 mb-6">
      Stay informed about the latest trends in health and well-being.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Article 1 */}
      <Link href="/evaluation/newsDiabete">
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Prevent Diabetes?</h3>
        <p className="text-gray-600">
          Adopt a healthy lifestyle to prevent diabetes and improve overall well-being.
        </p>
      </div>
      </Link>

      {/* Article 2 */}
      <Link href="/evaluation/newxHeart">
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">The Benefits of Heart Health</h3>
        <p className="text-gray-600">
          Discover the habits that strengthen your heart health and promote longevity.
        </p>
      </div></Link>

      {/* Article 3 */}
      <Link href="/evaluation/newsStroke">
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Early Signs of a Stroke</h3>
        <p className="text-gray-600">
          Learn to identify early signs of a stroke for better prevention and quick action.
        </p>
      </div>
      </Link>
    </div>
  </div>
</section>

 {/* Testimonials Section */}
<section className="testimonials bg-gradient-to-r from-blue-300 to-blue-950 py-16 text-center">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-white mb-12">What Our Happy Users Say</h2>
    <p className="text-white text-lg mb-8">
      Our users are feeling healthier, happier, and more confident about their well-being!
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="p-6 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
        <div className="mb-4 flex justify-center">
          <img className="h-20 w-20 rounded-full object-cover" src="/p2.jpg" alt="Jean Dupont" />
        </div>
        <p className="text-gray-600 italic">"SelfCare helped me understand the risks to my health and take steps to stay fit and healthy."</p>
        <h3 className="mt-4 font-bold text-gray-800">Jean Dupont</h3>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
        <div className="mb-4 flex justify-center">
          <img className="h-20 w-20 rounded-full object-cover" src="/p3.jpg"  alt="Marie Leblanc" />
        </div>
        <p className="text-gray-600 italic">"An easy-to-use app that allowed me to track my health daily."</p>
        <h3 className="mt-4 font-bold text-gray-800">Marie Leblanc</h3>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
        <div className="mb-4 flex justify-center">
          <img className="h-20 w-20 rounded-full object-cover" src="/p1.jpg" alt="Paul Martin" />
        </div>
        <p className="text-gray-600 italic">"I recommend SelfCare to anyone who wants to take control of their well-being."</p>
        <h3 className="mt-4 font-bold text-gray-800">Paul Martin</h3>
      </div>
    </div>
  </div>
</section>




     
    {/* Footer Section */}
    <footer className="footer bg-neutral text-neutral-content items-center p-4">
  <aside className="grid-flow-col items-center">
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      className="fill-current">
      <path
        d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
    </svg>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
      </svg>
    </a>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
      </svg>
    </a>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
      </svg>
    </a>
  </nav>
</footer>
    </div>
    
  );
}
