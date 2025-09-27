import EventModal from "../modals/Event-modals";
import { useState } from "react";



const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null) 
  const events = [
    {
      tag: "UI/UX Design",
      title: "UI/UX Design Workshop: Advanced Prototyping",
      description:
        "Learn advanced prototyping techniques with Figma and interactive design patterns.",
      date: "Thursday, February 15, 2024",
      time: "6:00 PM - 8:00 PM",
      isVirtual: true,
      location: "",
      attending: 45,    
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
      isVirtual: false,
      location: "Lagos Tech Hub",
      attending: 32,
    },
    {
      tag: "Data Science",
      title: (
        <>
          Data Science Career <br /> Panel
        </>
      ),
      description:
        "Career insights from data science professionals working at top tech companies.",
      date: "Sunday, September 22, 2025",
      time: "6:00 PM - 8:00 PM",
      isVirtual: true,
      location: "",
      attending: 27,
    },
  ];

  return (
    <div className="w-full sm:w-[90%]  mx-auto py-16 " id="about">
      {/* About section */}
      <h2 className="text-3xl font-bold text-center" >
        About <span className="text-primary-950">TechyJaunt Alumni</span>
      </h2>
      <p className="mt-4 text-center text-gray-700 pt-2 px-5 sm:px-0 mx-auto">
        The TechyJaunt Alumni Community is a vibrant network of over 1,000
        graduates who have successfully completed our intensive technology
        training programs. Our alumni work at leading tech companies, have
        launched successful startups, and continue to drive innovation across
        various sectors. We provide ongoing support, networking opportunities,
        and career advancement resources to help our graduates thrive in their
        professional journeys.
      </p>

      {/* Upcoming Events heading */}
      <h1 className="text-3xl font-bold text-center mt-16">
        Upcoming <span className="text-primary-950">Alumni Events</span>
      </h1>
      <p className="mt-4 mb-10 text-center pt-2 text-gray-700 px-5 sm:px-0">
        Join your track community and attend exclusive events designed for
        continuous learning and networking
      </p>

      {/* Event cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 justify-items-center">
        {events.map((event, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-xl shadow border border-gray-200 p-6 bg-white max-w-sm w-full"
          >
            <div className="">
  {/* Tag and Attending */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-primary-150 text-primary-900">
                {event.tag}
              </span>
              <p className="text-sm text-gray-500">
                {event.attending} attending
              </p>
            </div>

            {/* Title */}
            <h2 className="mt-4 text-base font-semibold text-gray-900">
              {event.tag}
            </h2>

            {/* Description */}
            <p className="mt-2 text-sm text-gray-600">{event.description}</p>
            </div>
          

            {/* Details */}
            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <img
                  src="/icons/calendar.png"
                  alt="calendar"
                  className="w-4 h-4"
                />
                <span>{event.date}</span>
              </p>
              <p className="flex items-center gap-2">
                <img src="/icons/clock.png" alt="clock" className="w-4 h-4" />
                <span>{event.time}</span>
              </p>

              <p className="flex items-center gap-2">
                <img
                  src="/icons/location icon.png"
                  alt="location"
                  className="w-4 h-4"
                />
                {event.isVirtual ? "Virtual" : event.location}
              </p>
            </div>

            {/* Button */}
            <div className="mt-6">
              <button onClick={() => setSelectedEvent(event)} className="bg-primary-950 w-full text-white py-2 px-4 rounded-lg hover:bg-primary-950/80 transition text-sm font-medium">
                Register for Event
              </button>
            </div>
          </div>
        ))}
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-12">
        <button className="mt-6 text-sm font-semibold text-primary-950 font-medium border border-secondary-100 rounded-lg py-3 px-6 bg-transparent cursor-pointer transition-all hover:bg-blue-50">
          View Past Event
        </button>
      </div>
    </div>
  );
}

export default Events;