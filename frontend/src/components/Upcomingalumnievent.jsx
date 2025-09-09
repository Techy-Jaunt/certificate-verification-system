import { MdLocationOn } from "react-icons/md";

export default function Events() {
  const events = [
    {
      tag: "UI/UX Design",
      title: "UI/UX Design Workshop: Advanced Prototyping",
      description:
        "Learn advanced prototyping techniques with Figma and interactive design patterns.",
      date: "Thursday, February 15, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "",
      isVirtual: true,
      attending: 20,
      capacity: 50,
    },
    {
      tag: "Frontend Development",
      title: (
        <>
          Frontend Developers <br /> Meet-up
        </>
      ),
      description:
        "Network with fellow frontend developers and discuss the latest React trends.",
      date: "Thursday, February 20, 2025",
      time: "7:00 PM - 9:00 PM",
      location: "Lagos Tech Hub",
      islocation: true,
      attending: 20,
      capacity: 50,
    },
    {
      tag: "Data Science",
      title: (<>Data Science Career <br /> Panel </>),
      description:
        "Career insights from data science professionals working at top tech companies.",
      date: "Sunday, September 22, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "",
      isVirtual: true,
      attending: 20,
      capacity: 50,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center">
        Upcoming <span className="text-blue-600">Alumni Events</span>
      </h1>
      <p className="mt-2 text-center text-gray-600">
        Join your track community and attend exclusive events designed for continuous learning and networking
      </p>

      {/* Grid of Event Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {events.map((event, i) => {
          const progress = Math.round((event.attending / event.capacity) * 100);

          return (
            <div
              key={i}
              className="rounded-2xl shadow-md border-0 p-6 bg-white hover:shadow-xl transition"
            >
              <div className='flex items-center justify-between'>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                {event.tag}
              </span>
              <p className="text-sm">45/60 attending</p>
            </div>

              {/* Title */ }
          <h2 className="mt-4 text-lg font-semibold text-gray-800">
            {event.title}
          </h2>

          {/* Description */ }
          <p className="mt-2 text-gray-600 text-sm">{event.description}</p>

          {/* Details */ }
          <div className="mt-4 space-y-1 text-sm text-gray-500">
            <p>📅 {event.date}</p>
            <p>🕖 {event.time}</p>
            <p>
              {event.isVirtual ? (
                <span className="font-medium">🌍 Virtual</span>
              ) : (
                <span className="font-medium">
                  <MdLocationOn className="inline mr-1" />
                  Lagos Tech Hub
                </span>
              )}
            </p>
          </div>

          {/* Progress bar and Button in one row */ }
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <button className="bg-blue-600 text-white py-1 px-2 rounded-xl hover:bg-blue-700 transition whitespace-nowrap">
              Book now
            </button>
          </div>
            </div>
      );
        })}
    </div>

      {/* Footer CTA */ }
  <div className="text-center mt-12">
    <p className="text-gray-700">
      Want to organize an event for your community?
    </p>
    <button className="mt-7  text-blue-600 font-medium hover:underline border-gray-100 bg-transparent cursor-pointer">
      Propose an Event
    </button>
  </div>
    </div >
  );
}
