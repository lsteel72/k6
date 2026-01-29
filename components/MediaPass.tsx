
import React from 'react';

interface MediaPassProps {
  onClose: () => void;
}

const MediaPass: React.FC<MediaPassProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden bg-white rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Banner de Colores (Alemania - Colombia) */}
        <div className="flex h-6 w-full shadow-inner">
          <div className="flex-1 bg-black"></div>
          <div className="flex-1 bg-red-600"></div>
          <div className="flex-1 bg-yellow-400"></div>
          <div className="flex-1 bg-blue-600"></div>
          <div className="flex-1 bg-red-600"></div>
        </div>

        <div className="p-8 text-slate-800">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="pixel-font text-3xl text-indigo-600 mb-2">MEDIEN PASS</h2>
              <p className="text-xl font-bold tracking-widest text-slate-500">CURSO 25 / 26</p>
            </div>
            <div className="w-24 h-24 bg-slate-100 rounded-xl flex flex-col items-center justify-center border-4 border-dashed border-slate-300 relative overflow-hidden">
               <img src="https://api.dicebear.com/7.x/bottts/svg?seed=iguana" alt="Iguana Mascot" className="w-16 h-16 opacity-20 absolute" />
               <span className="text-[10px] text-slate-400 text-center font-bold relative z-10">FOTO DEL<br/>AVENTURERO</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="border-b-2 border-slate-200 pb-2">
              <span className="text-sm uppercase font-bold text-slate-400 block">Nombre del Estudiante:</span>
              <span className="text-xl font-medium">________________________________________</span>
            </div>
            <div className="border-b-2 border-slate-200 pb-2">
              <span className="text-sm uppercase font-bold text-slate-400 block">Grado / Klassen:</span>
              <span className="text-xl font-medium">Klassen 3 - Colegio Alemán Barranquilla</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square bg-slate-50 border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-300 text-2xl font-bold hover:bg-yellow-50 hover:border-yellow-200 transition-colors cursor-default">
                {i}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-end italic text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">🦎</div>
              <div>
                <p>Firma del Docente:</p>
                <p className="font-bold text-slate-600 mt-1">Herr Tech-Master</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-transform active:scale-95"
            >
              ¡LISTO PARA EL RETO!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPass;
