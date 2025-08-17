import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        setTrip(null);
      } else {
        setTrip(data);
      }
      setLoading(false);
    };
    fetchTrip();
  }, [id]);

  if (loading) return <div>Načítám...</div>;
  if (!trip) return <div>Cesta nebyla nalezena.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4 text-[#07689f]">Detail cesty</h1>
      <div className="mb-2 text-lg"><b>Datum:</b> {trip.date} – {trip.returnDate}</div>
      <div className="mb-2 text-lg"><b>Start:</b> {trip.start}</div>
      <div className="mb-2 text-lg"><b>Destinace:</b> {trip.destination}</div>
      <div className="mb-2 text-lg"><b>Doprava:</b> {trip.transport}</div>
      {trip.budget && (
        <div className="mb-2 text-lg"><b>Rozpočet:</b> {JSON.stringify(trip.budget)}</div>
      )}
      {trip.activities && (
        <div className="mb-2 text-lg"><b>Aktivity:</b> {JSON.stringify(trip.activities)}</div>
      )}
      {trip.note && (
        <div className="mb-2 text-lg"><b>Poznámka:</b> {trip.note}</div>
      )}
    </div>
  );
}
