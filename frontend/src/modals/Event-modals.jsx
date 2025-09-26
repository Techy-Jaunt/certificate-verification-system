const EventModal = ({ event, onClose }) => {
    if (!event) return null; // don't render if no event selected

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-bold">Register for Event</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-large ml-4"
                        type="button"
                    >
                        ✕
                    </button>
                </div>
                <p className="text-blue-600 font-semibold">{event.tag}</p>
                <p className="text-sm text-gray-600 mb-4">
                    {event.date}, at {event.time}
                </p>

                {/* Form inputs */}
                <form className="space-y-3">    
                    <label className="block text-sm font-bold text-gray-700 mb-1 ">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <label className="block text-sm font-bold text-gray-700 mb-1 ">
                        Email Address *
                    </label>
                    <input
                        type="Email address"
                        placeholder="youremail@example.com"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <label className="block text-sm font-bold text-gray-700 mb-1 ">
                        Phone Number *
                    </label>
                    <input
                        label="Phone number"
                        placeholder="+234 xxx xxx xxxx"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <label className="block text-sm font-bold text-gray-700 mb-1 ">
                       What do you expect from this event?
                    </label>
                    <textarea
                        placeholder="Share your expectations and thoughts..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        rows="3"
                    ></textarea>
                    <p className="text-sm text-gray-400 pb-8 m-1">0/500 characters</p>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Register Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
