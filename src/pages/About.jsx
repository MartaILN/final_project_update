import React from 'react';

const AboutPage = () => {
	return (
		<section
			className="min-h-screen w-full flex items-center justify-center relative bg-beige-100 text-gray-800 px-6 py-12 md:px-20 overflow-hidden"
		>
			{/* Poloprůhledný overlay pro lepší čitelnost */}
			<div className="absolute inset-0 bg-white bg-opacity-70 z-0"></div>
			<div className="max-w-4xl w-full mx-auto relative z-10 rounded-2xl shadow-2xl p-4 pt-1 flex flex-col items-start text-left" style={{ marginTop: '0px' }}>
				{/* Úvodní nadpis */}
				<h1 className="text-4xl font-bold text-blue-700 mb-4">🌍 O aplikaci My Trip</h1>
				<p className="text-lg text-green-700 mb-10">
					Plánujte cestování jednoduše a efektivně. My Trip vám pomůže s každým detailem — od rozpočtu po aktivity.
				</p>

				{/* Funkce aplikace */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					{[
						{ icon: '🗺️', title: 'Plánování trasy', text: 'Zadejte odkud kam, kdy a jak cestujete.', color: 'text-blue-600' },
						{ icon: '💸', title: 'Rozpočet', text: 'Sledujte náklady na ubytování, dopravu, jídlo i aktivity.', color: 'text-green-600' },
						{ icon: '📅', title: 'Aktivity', text: 'Přidejte si denní plán, poznámky a odkazy.', color: 'text-blue-600' },
					].map((item, index) => (
						<div key={index} className="bg-white rounded-lg shadow p-6">
							<h2 className={`text-xl font-semibold mb-2 ${item.color}`}>
								{item.icon} {item.title}
							</h2>
							<p>{item.text}</p>
						</div>
					))}
				</div>


			</div>
		</section>
	);
};

export default AboutPage;
