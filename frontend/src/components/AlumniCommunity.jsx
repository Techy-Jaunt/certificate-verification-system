import { useState } from "react";

export default function AlumniCommunity() {
  const [isHovered, setIsHovered] = useState(null);

  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      title: "Private Community",
      description:
        "Access exclusive WhatsApp and Slack groups where alumni share job opportunities, collaborate on projects, and support each other."
    },
    {
      id: 2,
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Exclusive Events",
      description:
        "Attend alumni-only meetups, workshops, and networking events designed to advance your career and expand your professional network."
    },
    {
      id: 3,
      icon: (
        <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      ),
      title: "Career Support",
      description:
        "Get access to job referrals, career mentorship, resume reviews, and interview preparation from successful alumni and industry partners."
    }
  ];

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  return (
    <div className="min-h-screen bg-white-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Join Our Alumni Community
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Connect with fellow graduates, share opportunities and stay updated on exclusive
            events and resources designed for TechyJaunt alumni
          </p>

          {/* CTA Button */}
          <button
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                     text-white px-12 py-4 rounded-full text-lg font-semibold 
                     transform hover:scale-105 transition-all duration-300 
                     shadow-lg hover:shadow-xl"
            onMouseEnter={() => handleMouseEnter("cta")}
            onMouseLeave={handleMouseLeave}
          >
            <span className="flex items-center justify-center">
              Join Alumni Community
              <svg
                className={`ml-2 w-5 h-5 transition-transform duration-300 ${
                  isHovered === "cta" ? "translate-x-1" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                        transition-all duration-500 transform hover:-translate-y-2 
                        ${isHovered === feature.id ? "scale-105" : ""}`}
              onMouseEnter={() => handleMouseEnter(feature.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="text-center">
                <div
                  className={`inline-flex p-4 rounded-full mb-6 transition-all duration-300 ${
                    feature.id === 1
                      ? "bg-blue-100"
                      : feature.id === 2
                      ? "bg-purple-100"
                      : "bg-green-100"
                  } ${isHovered === feature.id ? "scale-110" : ""}`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>

                <p className="text-gray-600 leading-relaxed text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
