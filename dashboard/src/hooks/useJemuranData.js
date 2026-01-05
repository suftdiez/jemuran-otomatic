import { useState, useEffect } from 'react';
import { db, ref, onValue } from '../firebase';

const useJemuranData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const jemuranRef = ref(db, '/jemuran');
    
    const unsubscribe = onValue(
      jemuranRef,
      (snapshot) => {
        const val = snapshot.val();
        if (val) {
          setData({
            suhu: val.suhu ?? 0,
            kelembapan: val.kelembapan ?? 0,
            cahaya: val.cahaya ?? 0,
            status_hujan: val.status_hujan ?? 'Kering',
            posisi: val.posisi ?? 'Di Dalam',
            mode: val.mode ?? 'Otomatis'
          });
          setIsConnected(true);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Firebase error:', err);
        setError(err.message);
        setLoading(false);
        setIsConnected(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { data, loading, error, isConnected };
};

export default useJemuranData;
