import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
export default function TripList({
  trips = [],
  user = null,
  onEdit = () => {},
  onDelete = () => {},
  onToggleDone = () => {},
}) {
  const [showEmailInputId, setShowEmailInputId] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const navigate = useNavigate();
  // Funkce pro odeslání e-mailu přes backend
  const sendEmailViaBackend = async (tripId, email) => {
    const url = `${window.location.origin}/trip/${tripId}`;
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Sdílení cesty',
          text: `Podívej se na tuto cestu: ${url}`,
        }),
      });
      const data = await response.json();
      if (data.success) {
        // Přidání e-mailu do shared_with v Supabase
        const trip = trips.find(t => t.id === tripId);
        const currentShared = Array.isArray(trip.shared_with) ? trip.shared_with : [];
        if (!currentShared.includes(email)) {
          await supabase
            .from('trips')
            .update({ shared_with: [...currentShared, email] })
            .eq('id', tripId);
        }
        alert('E-mail byl odeslán!');
        navigate(`/trip/${tripId}`);
      } else {
        alert('Chyba při odesílání: ' + data.error);
      }
    } catch (error) {
      alert('Chyba: ' + error.message);
    }
    setShowEmailInputId(null);
    setEmailInput('');
  };

  if (!trips.length) {
    return (
      <div style={{ paddingTop: 8 }}>
        <p style={{ textAlign: 'center', color: '#888' }}>Žádné cesty nejsou k dispozici.</p>
      </div>
    );
  }

  return (
    <div className="pt-0">
      <ul className="list-none p-0">
        {trips.map((trip) => {
          // Zjisti, zda je uživatel owner nebo pouze ve shared_with
          const currentEmail = user?.email || '';
          const currentId = user?.id || '';
          const isOwner = trip.user_id === currentId;
          const isShared = Array.isArray(trip.shared_with) && trip.shared_with.includes(currentEmail) && !isOwner;
          return (
            <li
              key={trip.id}
              className={`mb-[20px] rounded-[4px] shadow-lg transition-colors p-8 ${isShared ? 'bg-[#ffe6e6]' : (trip.done ? 'bg-[#e6ffe6]' : 'bg-[#fdf6e3]')} border border-[#e6dcc2] mb-[20px] ${isShared ? 'opacity-80' : ''}`}
            >
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-[20px] mb-2 p-[20px] bg-[#e3f2fd] rounded-[4px] relative">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-5 w-full">
                    <div className="flex items-center w-full gap-5">
                      <input
                        type="checkbox"
                        checked={!!trip.done}
                        onChange={() => !isShared && onToggleDone(trip.id, !trip.done)}
                        className="w-8 h-8 accent-[#40a798] flex-shrink-0 align-middle"
                        disabled={isShared}
                      />
                      <div className="flex-1">
                        <div className="text-3xl font-extrabold text-[#07689f] mb-1 ml-[20px]">{trip.date} – {trip.returnDate}</div>
                        <div className="text-lg text-[#07689f] ml-[20px]">{trip.start} <span className="mx-2">→</span> {trip.destination} <span className="italic">({trip.transport})</span></div>
                      </div>
                      <button
                        onClick={() => !isShared && onDelete(trip.id)}
                        className={`bg-[#fa8072] text-white px-3 py-1 rounded-[4px] text-sm flex items-center justify-center h-[30px] border-0 transition-colors ${isShared ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#c0392b]'}`}
                        aria-label="Smazat cestu"
                        disabled={isShared}
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line x1="4" y1="4" x2="14" y2="14" stroke="#fdf6e3" strokeWidth="2" strokeLinecap="round" />
                          <line x1="14" y1="4" x2="4" y2="14" stroke="#fdf6e3" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {trip.budget && typeof trip.budget === 'object' && (
                <div className="bg-[#fdf6e3] rounded-xl p-4 shadow-sm pl-[20px] pt-5 mt-[20px]">
                  <div className="font-bold text-[#40a798] mb-2 flex items-center gap-2">Rozpočet:</div>
                  <table className="w-1/2 border-collapse text-base pl-[75px] mt-[10px]">
                    <thead>
                      <tr className="bg-[#f5f5f5]">
                        <th className="text-left p-2 border border-[#ccc]">Kategorie</th>
                        <th className="text-left p-2 border border-[#ccc]">Částka (Kč)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(trip.budget).map(([key, value]) => (
                        value ? (
                          <tr key={key}>
                            <td className="p-2 border border-[#ccc]">{
                              key === 'accommodation' ? 'Ubytování' :
                              key === 'transport' ? 'Doprava' :
                              key === 'food' ? 'Jídlo' :
                              key === 'activities' ? 'Aktivity' :
                              key === 'other' ? 'Ostatní' : key
                            }</td>
                            <td className="p-2 border border-[#ccc]">{value} Kč</td>
                          </tr>
                        ) : null
                      ))}
                      {/* Celkem */}
                      <tr className="bg-[#eaf6ea] font-bold">
                        <td className="p-2 border border-[#ccc]">Celkem</td>
                        <td className="p-2 border border-[#ccc]">
                          {Object.values(trip.budget).reduce((sum, val) => sum + (Number(val) || 0), 0)} Kč
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            {(() => {
              let activities = [];
              let links = [];
              if (Array.isArray(trip.activities)) {
                activities = trip.activities;
              } else if (typeof trip.activities === 'string' && trip.activities) {
                try { activities = JSON.parse(trip.activities); } catch {}
              }
              if (Array.isArray(trip.links)) {
                links = trip.links;
              } else if (typeof trip.links === 'string' && trip.links) {
                try { links = JSON.parse(trip.links); } catch {}
              }
              const filteredActivities = activities.filter(a => a && a.trim() !== '');
              const filteredLinks = links.filter(l => l && l.trim() !== '');
              return (
                <div className="px-6 pb-2">
                  {filteredActivities.length > 0 && (
                    <div className="mb-1 pl-[20px] mt-[20px]">
                      <span className="font-bold">Aktivity:</span>
                      <ul className="ml-5 list-disc mt-[10px]">
                        {filteredActivities.map((a, i) => (
                          <li key={i} className="mb-1">
                            <span>{a}</span>
                            {filteredLinks[i] && (
                              <a href={filteredLinks[i]} target="_blank" rel="noopener noreferrer" className="text-[#07689f] ml-[20px] underline">[odkaz]</a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {filteredLinks.length > filteredActivities.length && (
                    <div className="mb-1 pl-[20px] mt-[20px]">
                      <span className="font-bold mb-[10px] block">Další odkazy:</span>
                      <ul className="ml-5 list-disc mt-0">
                        {filteredLinks.slice(filteredActivities.length).map((l, i) => (
                          <li key={i} className="mb-1">
                            <a href={l} target="_blank" rel="noopener noreferrer" className="text-[#07689f] underline">{l}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {trip.note && (
                    <div className="mt-[20px] break-words whitespace-pre-line pl-[20px]">
                      <span className="font-bold">Poznámka:</span> {trip.note}
                    </div>
                  )}
                  <div className="flex gap-2 mt-[20px] mb-[20px]">
                    <button
                      onClick={() => !isShared && onEdit(trip)}
                      className={`bg-[#07689f] text-[#f5ecd7] rounded-[4px] p-[5px] font-bold ml-[50px] border-0 transition-colors ${isShared ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#359184]'}`}
                      disabled={isShared}
                    >Upravit</button>
                    {trip.public === true && !isShared && (
                      <>
                        <button
                          onClick={() => setShowEmailInputId(trip.id)}
                          className="bg-[#40a798] text-[#f5ecd7] rounded-[4px] p-[5px] font-bold hover:bg-[#359184] transition-colors ml-[50px] border-0"
                          style={{ marginRight: '20px' }}
                        >Sdílet e-mailem</button>
                        {showEmailInputId === trip.id && (
                          <div className="mt-2 flex flex-row gap-2 items-center">
                            <input
                              type="email"
                              placeholder="Zadejte e-mailovou adresu"
                              value={emailInput}
                              onChange={e => setEmailInput(e.target.value)}
                                className="p-[5px] rounded-[4px] border border-[#40a798] w-[180px] text-base focus:outline-none bg-white"
                                style={{ height: '30px', marginRight: '10px' }}
                            />
                            <button
                              onClick={() => sendEmailViaBackend(trip.id, emailInput)}
                              className={`rounded-[4px] p-[5px] font-bold transition-colors text-[#07689f] ${emailInput ? 'bg-[#f5ecd7] hover:bg-[#e6dcc2]' : 'bg-[#f5ecd7] cursor-not-allowed'}`}
                              style={{ height: '30px', marginRight: '10px', border: '2px solid #40a798' }}
                              disabled={!emailInput}
                            >Odeslat</button>
                            <button
                              onClick={() => { setShowEmailInputId(null); setEmailInput(''); }}
                              className="rounded-[4px] bg-[#fa8072] text-white hover:bg-[#c0392b] transition-colors flex items-center justify-center border-0"
                              style={{ height: '30px', width: '30px', padding: '0', minWidth: '30px', border: 'none' }}
                            >
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: 'auto' }}>
                                <line x1="4" y1="4" x2="14" y2="14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                                <line x1="14" y1="4" x2="4" y2="14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })()}
              </div>
          </li>
        );
        })}
      </ul>
    </div>
  );
}