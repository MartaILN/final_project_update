import React from 'react';

const AboutPage = () => {
	 return (
					   <section
							className="w-full flex justify-center relative bg-beige-100 text-gray-800 px-6 py-[2px] md:px-20"
							style={{marginTop: '180px'}}
						>
			 {/* Poloprůhledný overlay pro lepší čitelnost */}
			 <div className="absolute inset-0 bg-white bg-opacity-70 z-0"></div>
	<div className="max-w-5xl w-full mx-auto relative z-10 rounded-2xl shadow-2xl p-4 pt-[0px] flex flex-col items-center text-center" style={{ marginTop: '0px', paddingTop: '0px', paddingBottom: '0px' }}>
				 {/* Úvodní nadpis */}
																				   <h1 className="text-2xl font-normal mb-[0.36em] text-center" style={{color: '#424242'}}>O aplikaci</h1>
																				 <div className="text-center">
																					   <span style={{ fontFamily: 'Pacifico, cursive', fontSize: '2.7em', color: '#f5ecd7', fontStyle: 'italic', transform: 'skew(-10deg)', display: 'inline-block', marginTop: '0', textShadow: '2px 2px 8px rgba(0,0,0,0.25)' }}>
																						 My Trip
																					 </span>
																				 </div>
						<p className="text-lg text-green-700 mb-10" style={{marginBottom: '40px'}}>
							 Plánujte cestování jednoduše a efektivně. My Trip vám pomůže s každým detailem — od rozpočtu po aktivity.
						 </p>

				{/* Moderní karty s obrázky */}
				<div className="grid grid-cols-3 gap-10 mb-[2px]">
					 {/* Plánování trasy */}
					 <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition-transform hover:-translate-y-2 duration-300">
						   <img src="https://img.icons8.com/ios-filled/100/07689f/map.png" alt="Plánování trasy" className="mb-[6px]" style={{height:'80px'}} />
						   <h2 className="text-xl font-normal mb-[-2px] text-center" style={{color: '#424242'}}>Plánování trasy</h2>
						 <p className="text-gray-700">Zadejte odkud kam, kdy a jak cestujete.</p>
					 </div>
					 {/* Rozpočet */}
					 <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition-transform hover:-translate-y-2 duration-300">
						   <img src="https://img.icons8.com/ios-filled/100/43d19e/money.png" alt="Rozpočet" className="mb-[6px]" style={{height:'80px'}} />
						   <h2 className="text-xl font-normal mb-[-2px] text-center" style={{color: '#424242'}}>Rozpočet</h2>
						 <p className="text-gray-700">Sledujte náklady na ubytování, dopravu, jídlo i aktivity.</p>
					 </div>
					 {/* Aktivity */}
					 <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition-transform hover:-translate-y-2 duration-300">
						   <img src="https://img.icons8.com/ios-filled/100/07689f/calendar--v2.png" alt="Aktivity" className="mb-[6px]" style={{height:'80px'}} />
						   <h2 className="text-xl font-normal mb-[-2px] text-center" style={{color: '#424242'}}>Aktivity</h2>
						 <p className="text-gray-700">Přidejte si denní plán, poznámky a odkazy.</p>
					 </div>
				 </div>

			 </div>
		 </section>
	 );
};

export default AboutPage;
