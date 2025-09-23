import { useState } from "react";

export default function AlumniCommunity() {
  const [isHovered, setIsHovered] = useState(null);

  const features = [
    {
      id: 1,
      icon: "/icons/private community.png",
      title: "Private Community",
      description:
        "Access exclusive WhatsApp and Slack groups where alumni share job opportunities, collaborate on projects, and support each other.",
    },
    {
      id: 2,
      icon: "/icons/calendar.png",
      title: "Exclusive Events",
      description:
        "Attend alumni-only meetups, workshops, and networking events designed to advance your career and expand your professional network.",
    },

    {
      id: 3,
      icon: "/icons/job icon.png",
      title: "Career Support",
      description:
        "Get access to job referrals, career mentorship, resume reviews, and interview preparation from successful alumni and industry partners.",
    },
  ];

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  return (
    <div className="py-10 ">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 ">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-semibold text-(--color-darkened) mb-6 ">
            Join Our{" "}
            <span className="text-(--color-primary-500)">Alumni Community</span>
          </h1>
          <p className="text-lg text-(--color-darker) max-w-2xl mx-auto mb-12 leading-relaxed">
            Connect with fellow graduates, share opportunities and stay updated
            on exclusive events and resources designed for TechyJaunt alumni
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={` max-w-sm  bg-white rounded-2xl p-8 shadow border-[0.5px] border-(--color-normal-hover)
                        transition-all duration-500 transform hover:-translate-y-2 
                        ${isHovered === feature.id ? "scale-105" : ""}`}
              onMouseEnter={() => handleMouseEnter(feature.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="text-center">
                <div
                  className={`inline-flex p-4 rounded-full mb-6 transition-all duration-300 ${
                    feature.id === 1
                      ? "bg-(--color-normal-hover)"
                      : feature.id === 2
                      ? "bg-(--color-primary-100)"
                      : "bg-(--color-success-light)"
                  } ${isHovered === feature.id ? "scale-105" : ""}`}
                >
                  <img src={feature.icon} alt="" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
