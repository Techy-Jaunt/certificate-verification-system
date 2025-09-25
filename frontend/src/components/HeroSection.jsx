import CountUp from 'react-countup';

const HeroSection = () => {
	return (
		<section className="bg-blue-50 py-16 px-6 text-center sm:mx-12">
			{/*  */}
			<h1 className="text-4xl md:text-4xl font-bold mb-4 leading-12">
				Welcome to TechyJaunt{' '}
				<span className="text-blue-600">Alumni Community</span>
			</h1>

			{/*  */}
			<p className="text-gray-700 max-w-2xl mx-auto mb-10">
				Join our thriving community of tech professionals who have transformed
				their careers through TechyJaunt
			</p>

			{/*  */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:max-w-lg mx-auto">
				<div className="border border-blue-500 rounded-2xl p-6 w-40 mx-auto">
					<p className="text-4xl font-bold text-green-600">
						<CountUp end={1000} duration={3} separator="," />
						<span>+</span>
					</p>
					<p className="text-gray-900 text-lg mt-3">Alumni</p>
				</div>

				<div className="border border-blue-500 rounded-2xl p-6 w-40 mx-auto">
					<p className="text-4xl font-bold text-purple-600">
						<CountUp end={6} duration={2} separator="," />
					</p>
					<p className="text-gray-900 text-lg mt-3">Communities</p>
				</div>

				<div className="border border-blue-500 rounded-2xl p-6 w-40 mx-auto">
					<p className="text-4xl font-bold text-red-600">
						<CountUp end={6} duration={2} separator="," />
					</p>
					<p className="text-gray-900 text-lg mt-3">Tech Tracks</p>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
