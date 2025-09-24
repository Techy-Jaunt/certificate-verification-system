import { MdLocationOn } from "react-icons/md";

export const Events = () => {
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
      title: (
        <>
          Data Science Career <br /> Panel{" "}
        </>
      ),
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
        Upcoming{" "}
        <span className="text-(--color-primary-400)">Alumni Events</span>
      </h1>
      <p className="mb-14 pt-6 text-center text-lg text-gray-600">
        Join your track community and attend exclusive events designed for
        continuous learning and networking
      </p>

      {/* Grid of Event Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 justify-items-center">
        {events.map((event, i) => {
          const progress = Math.round((event.attending / event.capacity) * 100);

          return (
            <div
              key={i}
              className="rounded-2xl shadow-md border border-(--color-normal-hover) p-6 bg-white hover:shadow-lg transition max-w-sm "
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium px-5 py-2 rounded-xl bg-(--color-primary-150) text-(--color-primary-900)">
                  {event.tag}
                </span>
                <p className="text-sm">45/60 attending</p>
              </div>

              {/* Title */}
              <h2 className="mt-4 text-base font-semibold text-(--color-darkened)">
                {event.title}
              </h2>

              {/* Description */}
              <p className="mt-2 text-(--color-darker) text-sm">
                {event.description}
              </p>

              {/* Details */}
              <div className="mt-4 space-y-1 text-sm text-(--color-darker)">
                <p className="flex items-center gap-1">
                  <img
                    src="/icons/calendar.png"
                    alt="calendar"
                    className="w-4 h-4"
                  />
                  <span>{event.date}</span>
                </p>
                <p className="flex items-center gap-1">
                  <img
                    src="/icons/clock.png"
                    alt="calendar"
                    className="w-4 h-4"
                  />
                  <span> {event.time}</span>
                </p>

                <p>
                  {event.isVirtual ? (
                    <span className="font-medium flex gap-1 items-center">
                      <img
                        src="/icons/location icon.png"
                        alt="calendar"
                        className="w-4 h-4"
                      />
                      Virtual
                    </span>
                  ) : (
                    <span className="font-medium flex gap-1 items-center">
                      <img
                        src="/icons/location icon.png"
                        alt="calendar"
                        className="w-4 h-4"
                      />
                      Lagos Tech Hub
                    </span>
                  )}
                </p>
              </div>

              {/* Progress bar and Button in one row */}
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="w-full bg-(--color-normal-hover) rounded-full h-2 ">
                    <div
                      className="bg-(--color-primary-300) h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="bg-(--color-primary-500) text-white py-1 px-4 rounded-lg hover:bg-blue-(--color-primary-950) transition whitespace-nowrap text-sm">
                  Book now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-700">
          Want to organize an event for your community?
        </p>
        <button className="mt-7  text-(--color-primary-500) font-medium border border-(--color-normal-active) rounded-lg  py-1 px-6 bg-transparent cursor-pointer transition-all hover:-translate-y-1 duration-300">
          Propose an Event
        </button>
      </div>
    </div>
  );
}
