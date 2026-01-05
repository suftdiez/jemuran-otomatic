import { useState } from 'react';
import { Home, Sun, RotateCcw, Loader2, Check } from 'lucide-react';
import { db, ref, set } from '../firebase';

const ControlPanel = () => {
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendCommand = async (perintah, mode, buttonType) => {
    setLoading(buttonType);
    setSuccess(null);
    
    try {
      await set(ref(db, '/jemuran/perintah'), perintah);
      await set(ref(db, '/jemuran/mode'), mode);
      
      console.log(`✅ Perintah "${perintah}" berhasil dikirim`);
      
      setSuccess(buttonType);
      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      console.error('❌ Gagal mengirim perintah:', error);
      alert('Gagal mengirim perintah');
    } finally {
      setLoading(null);
    }
  };

  const buttons = [
    {
      id: 'in',
      onClick: () => sendCommand('MASUK', 'Manual', 'in'),
      bg: 'bg-blue-600 hover:bg-blue-700',
      icon: Home,
      label: 'Masuk'
    },
    {
      id: 'out',
      onClick: () => sendCommand('KELUAR', 'Manual', 'out'),
      bg: 'bg-emerald-600 hover:bg-emerald-700',
      icon: Sun,
      label: 'Keluar'
    },
    {
      id: 'auto',
      onClick: () => sendCommand('AUTO', 'Otomatis', 'auto'),
      bg: 'bg-orange-500 hover:bg-orange-600',
      icon: RotateCcw,
      label: 'Auto'
    }
  ];

  return (
    <div className="bottom-bar transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          {buttons.map((btn) => {
            const Icon = btn.icon;
            const isLoading = loading === btn.id;
            const isSuccess = success === btn.id;
            
            return (
              <button
                key={btn.id}
                onClick={btn.onClick}
                disabled={loading !== null}
                className={`btn-pill flex items-center gap-2 ${btn.bg} text-white shadow-sm`}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isSuccess ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
                <span>{isSuccess ? 'OK!' : btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
