import React from 'react';

const AboutPage = () => {
	return (
		<section className="bg-beige-100 text-gray-800 px-6 py-12 md:px-20" style={{
			backgroundImage: "url('/mountain.jpg')",
			backgroundSize: "cover",
			backgroundPosition: "center",
		}}>
			<div className="max-w-5xl mx-auto">
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
						{ icon: '🚗', title: 'Typ dopravy', text: 'Vyberte si způsob cestování, který vám vyhovuje.', color: 'text-green-600' },
					].map((item, index) => (
						<div key={index} className="bg-white rounded-lg shadow p-6">
							<h2 className={`text-xl font-semibold mb-2 ${item.color}`}>
								{item.icon} {item.title}
							</h2>
							<p>{item.text}</p>
						</div>
					))}
				</div>

				{/* Design a filozofie */}
				<div className="mb-12">
					<h2 className="text-2xl font-bold text-blue-700 mb-4">🎨 Design, který vás provede cestou</h2>
					<ul className="list-disc list-inside text-gray-700 space-y-2">
						<li><strong>Barvy:</strong> modrá pro klid, zelená pro přírodu, béžová pro zemitost</li>
						<li><strong>Styl:</strong> minimalistický, intuitivní, vhodný pro mobil i desktop</li>
						<li><strong>Rozhraní:</strong> přehledné formuláře, snadná editace, rychlý přehled o cestách</li>
					</ul>
				</div>

				{/* Kdo jsme */}
				<div className="mb-12">
					<h2 className="text-2xl font-bold text-green-700 mb-4">🤝 Kdo jsme</h2>
					<p className="text-gray-700">
						Jsme tým cestovatelů a vývojářů, kteří chtěli vytvořit nástroj, který bude opravdu užitečný. My Trip vznikl z potřeby mít vše na jednom místě — bez složitostí, bez zbytečností.
					</p>
				</div>

				{/* CTA */}
				<div className="text-center">
					<a href="#registrace" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition">
						📲 Začněte plánovat
					</a>
				</div>
			</div>
		</section>
	);
};

export default AboutPage;
