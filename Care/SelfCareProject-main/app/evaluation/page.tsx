import Link from 'next/link';

export default function Evaluation() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/top-view-donut-vs-fruit_23-2148194532.jpg?semt=ais_hybrid')",
          height: "650px",
          width: "100%",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 p-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Evaluate Your Health</h1>
          <p className="text-lg">Discover and assess health risks with our specialized tests.</p>
        

      {/* Evaluation Flow */}
     
<div className="flex flex-wrap justify-center items-center space-x-8 px-8 my-10">
          <div className="flex items-center space-x-4">
          <div className="w-14 h-1 bg-gradient-to-r from-blue-300 to-blue-950"></div>
            <Link
              href="/evaluation/avc"
              className="bg-gradient-to-r from-blue-300 to-blue-950 shadow-lg p-6 rounded-full flex items-center justify-center w-40 h-40 hover:bg-blue-100 transition"
            >
              <h3 className="text-xl font-semibold text-gray-700 text-center">Stroke Test</h3>
            </Link>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-300 to-blue-950"></div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/evaluation/diabete"
              className="bg-gradient-to-r from-blue-300 to-blue-950 shadow-lg p-6 rounded-full flex items-center justify-center w-40 h-40 hover:bg-white transition"
            >
              <h3 className="text-xl font-semibold text-gray-700 text-center">Diabetes Test</h3>
            </Link>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-300 to-blue-950"></div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/evaluation/heart"
              className="bg-gradient-to-r from-blue-300 to-blue-950 shadow-lg p-6 rounded-full flex items-center justify-center w-40 h-40 hover:bg-blue-100 transition"
            >
              <h3 className="text-xl font-semibold text-gray-700 text-center">Heart Test</h3>
            </Link>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-300 to-blue-950"></div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/evaluation/parkinson"
              className="bg-gradient-to-r from-blue-300 to-blue-950 shadow-lg p-6 rounded-full flex items-center justify-center w-40 h-40 hover:bg-blue-100 transition"
            >
              <h3 className="text-xl font-semibold text-gray-700 text-center">Parkinson's Test</h3>
            </Link>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-300 to-blue-950"></div>
          </div>

          <Link
            href="/evaluation/mentalHealth"
            className="bg-gradient-to-r from-blue-300 to-blue-950 shadow-lg p-6 rounded-full flex items-center justify-center w-40 h-40 hover:bg-blue-100 transition"
          >
            <h3 className="text-xl font-semibold text-gray-700 text-center">Mental Health Test</h3>
          </Link>
        </div>
      </div>
    </div></div>
    
  );
}
