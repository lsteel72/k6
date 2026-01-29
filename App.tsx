
import React, { useState, useEffect, useMemo } from 'react';
import { WebQuest, AdminUser, StudentResult } from './types';
import { webQuests } from './data/webquests';
import WebQuestCard from './components/WebQuestCard';
import WebQuestDetail from './components/WebQuestDetail';

const DASHBOARD_CONFIG: Record<number, any> = {
  3: { title: "KLASSEN 3", subtitle: "TECNOLOGIA", colors: "from-blue-500 to-emerald-500", icon: "🦎" },
  4: { title: "KLASSEN 4", subtitle: "TECNOLOGIA INICIAL", colors: "from-orange-500 to-red-600", icon: "🚀" },
  5: { title: "KLASSEN 5", subtitle: "TECNOLOGIA AVANZADA", colors: "from-yellow-400 to-lime-500", icon: "⚔️" },
  6: { title: "KLASSEN 6", subtitle: "TECNOLOGIA PROGRAMACION CREATIVA", colors: "from-blue-600 to-cyan-500", icon: "🎨" },
  7: { title: "KLASSEN 7", subtitle: "TECNOLOGIA HABILIDADES DIGITALES", colors: "from-magenta-500 to-purple-600", icon: "⌨️" }
};

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeClass, setActiveClass] = useState(6); // Iniciamos en Klassen 6
  const [lockedMissions, setLockedMissions] = useState<number[]>([]);
  // Inicializamos bloqueados 3, 4, 5 y 7
  const [lockedLevels, setLockedLevels] = useState<number[]>([3, 4, 5, 7]);
  const [selectedQuest, setSelectedQuest] = useState<WebQuest | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  const [forcedLevel, setForcedLevel] = useState<number | null>(null);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const initApp = () => {
      const params = new URLSearchParams(window.location.search);
      const kValue = params.get('k');
      
      if (kValue) {
        const level = parseInt(kValue);
        if (DASHBOARD_CONFIG[level]) {
          setForcedLevel(level);
          setActiveClass(level);
        }
      }

      // Cargar persistencia si existe, sino mantener el default de bloqueos
      const savedLocks = localStorage.getItem('lockedMissions');
      if (savedLocks) setLockedMissions(JSON.parse(savedLocks));
      
      const savedLevelLocks = localStorage.getItem('lockedLevels');
      if (savedLevelLocks) {
        setLockedLevels(JSON.parse(savedLevelLocks));
      } else {
        // Si es la primera vez, guardamos el estado inicial (K6 libre, resto bloqueado)
        localStorage.setItem('lockedLevels', JSON.stringify([3, 4, 5, 7]));
      }
      
      const savedUser = localStorage.getItem('adminUser');
      if (savedUser) {
        setAdminUser(JSON.parse(savedUser));
        setAuthMode('login');
      } else {
        setAuthMode('register');
      }

      setStudentResults(JSON.parse(localStorage.getItem('studentResults') || '[]'));
    };

    initApp();
  }, []);

  const toggleLevelLock = (level: number) => {
    const newLevelLocks = lockedLevels.includes(level)
      ? lockedLevels.filter(l => l !== level)
      : [...lockedLevels, level];
    setLockedLevels(newLevelLocks);
    localStorage.setItem('lockedLevels', JSON.stringify(newLevelLocks));
  };

  const toggleMissionLock = (id: number) => {
    const newLocks = lockedMissions.includes(id) 
      ? lockedMissions.filter(mId => mId !== id) 
      : [...lockedMissions, id];
    setLockedMissions(newLocks);
    localStorage.setItem('lockedMissions', JSON.stringify(newLocks));
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      const newUser = { username, passwordHash: btoa(password) };
      setAdminUser(newUser);
      localStorage.setItem('adminUser', JSON.stringify(newUser));
      setIsAdmin(true);
      setIsAuthModalOpen(false);
    } else {
      if (adminUser && username === adminUser.username && btoa(password) === adminUser.passwordHash) {
        setIsAdmin(true);
        setIsAuthModalOpen(false);
      } else {
        alert("❌ Credenciales incorrectas");
      }
    }
    setUsername('');
    setPassword('');
  };

  const filteredQuests = useMemo(() => 
    webQuests.filter(q => q.targetClass === activeClass),
    [activeClass]
  );

  const activeConfig = DASHBOARD_CONFIG[activeClass] || DASHBOARD_CONFIG[6];
  const isCurrentLevelLocked = lockedLevels.includes(activeClass);

  return (
    <div className="min-h-screen pb-20 bg-slate-900 overflow-x-hidden text-white font-['Fredoka']">
      <header className="py-12 px-6 flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-orange-500 via-yellow-400 to-red-600 shadow-xl"></div>
        
        {(!forcedLevel || isAdmin) && (
          <div className="flex bg-slate-800/40 p-2 rounded-[2.5rem] mb-12 gap-3 backdrop-blur-xl border border-white/5 shadow-2xl overflow-x-auto max-w-full no-scrollbar">
            {[3, 4, 5, 6, 7].map(num => (
              <div key={num} className="flex items-center gap-1 group">
                <button 
                  onClick={() => { setActiveClass(num); setShowResultsPanel(false); }}
                  className={`px-6 py-3 rounded-2xl font-black text-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${activeClass === num ? 'bg-white text-slate-900 scale-105 shadow-2xl' : 'text-slate-500 hover:text-white'}`}
                >
                  KLASSEN {num}
                  {lockedLevels.includes(num) && <span className="text-red-500">🔒</span>}
                </button>
                {isAdmin && (
                  <button 
                    onClick={() => toggleLevelLock(num)}
                    className={`p-2 rounded-xl transition-all ${lockedLevels.includes(num) ? 'bg-red-500' : 'bg-emerald-500 hover:scale-110'} shadow-lg`}
                  >
                    {lockedLevels.includes(num) ? '🔓' : '🔒'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-12 mb-8 animate-in zoom-in duration-1000">
          <div className="w-48 h-48 bg-white rounded-[3.5rem] p-8 shadow-2xl animate-bounce-slow flex items-center justify-center border-4 border-white/20">
            <span className="text-[100px] drop-shadow-2xl">{activeConfig.icon}</span>
          </div>
          <div className="text-center md:text-left">
            <h1 className={`text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${activeConfig.colors} uppercase italic leading-none`}>
              {activeConfig.title}
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-white/50 tracking-[0.3em] pixel-font mt-4 uppercase">
              {activeConfig.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-12 justify-center">
          <button onClick={() => isAdmin ? setIsAdmin(false) : setIsAuthModalOpen(true)} className={`px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:translate-y-1 ${isAdmin ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-slate-800 text-white border border-white/5 hover:bg-slate-700'}`}>
            {isAdmin ? '🔒 SALIR MODO ADMIN' : '👤 ACCESO DOCENTE'}
          </button>
          
          {isAdmin && (
            <div className="flex flex-wrap gap-4 items-center animate-in fade-in slide-in-from-right duration-500">
              <button onClick={() => setShowResultsPanel(!showResultsPanel)} className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-500 border border-white/10">
                {showResultsPanel ? '🏠 VER ACTIVIDADES' : '📊 VER REPORTES'}
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {showResultsPanel ? (
          <div className="bg-white rounded-[4rem] p-12 text-slate-800 shadow-2xl border-8 border-indigo-50 overflow-hidden animate-in zoom-in-95 duration-500">
             <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
               <h2 className="text-4xl font-black uppercase italic tracking-tighter">Panel de <span className="text-indigo-600">Resultados</span></h2>
               <div className="bg-slate-50 px-6 py-3 rounded-2xl font-black text-indigo-600 border border-slate-100 text-xl">
                  TOTAL: {studentResults.length}
               </div>
             </div>
             <div className="overflow-x-auto rounded-[2.5rem] border-4 border-slate-50 shadow-inner">
               <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em]">
                   <tr>
                     <th className="p-8">Estudiante</th>
                     <th className="p-8">Grupo</th>
                     <th className="p-8">Misión</th>
                     <th className="p-8 text-center">EVAL.</th>
                     <th className="p-8 text-center">Refl.</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y-2 divide-slate-50 font-medium">
                   {studentResults.length > 0 ? [...studentResults].reverse().map(r => (
                     <tr key={r.id} className="hover:bg-indigo-50/30 transition-colors">
                       <td className="p-8 font-black text-slate-900">{r.studentName}</td>
                       <td className="p-8 font-bold text-slate-400">{r.klasse}</td>
                       <td className="p-8 italic text-slate-500">{r.questTitle}</td>
                       <td className="p-8 text-center font-black text-xl text-indigo-600">{r.score}%</td>
                       <td className="p-8 text-center font-black text-xl">{r.reflection}</td>
                     </tr>
                   )) : (
                     <tr><td colSpan={5} className="p-24 text-center text-slate-300 font-bold italic text-3xl">Sin registros.</td></tr>
                   )}
                 </tbody>
               </table>
            </div>
          </div>
        ) : (
          <div className="relative min-h-[500px]">
            {isCurrentLevelLocked && !isAdmin && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-2xl rounded-[4rem] p-10 text-center border-4 border-dashed border-red-500/30 animate-in fade-in duration-500">
                <div className="text-[120px] mb-8 animate-pulse">🔒</div>
                <h2 className="text-5xl font-black text-white uppercase italic mb-6">ACCESO BLOQUEADO</h2>
                <p className="text-2xl text-slate-400 font-bold max-w-xl mx-auto">
                  La <span className="text-white italic">KLASSEN {activeClass}</span> está temporalmente cerrada. 
                  Tu docente la activará pronto.
                </p>
              </div>
            )}
            
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 transition-all duration-700 ${isCurrentLevelLocked && !isAdmin ? 'blur-md grayscale opacity-50' : ''}`}>
              {filteredQuests.map(quest => (
                <WebQuestCard 
                  key={quest.id} 
                  quest={quest} 
                  isLocked={lockedMissions.includes(quest.id)} 
                  isAdmin={isAdmin} 
                  onToggleLock={toggleMissionLock} 
                  onClick={setSelectedQuest} 
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-6 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[3.5rem] p-12 shadow-2xl relative border-t-[12px] border-indigo-600">
             <h2 className="text-4xl font-black text-center mb-10 uppercase italic text-slate-900">ADMIN LOGIN</h2>
             <form onSubmit={handleAuth} className="space-y-6">
               <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-6 bg-slate-100 rounded-3xl border-2 border-transparent focus:border-indigo-500 outline-none text-slate-900 font-bold text-lg" placeholder="Usuario" required />
               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-6 bg-slate-100 rounded-3xl border-2 border-transparent focus:border-indigo-500 outline-none text-slate-900 font-bold text-lg" placeholder="Contraseña" required />
               <button type="submit" className="w-full py-7 bg-indigo-600 text-white rounded-3xl font-black text-2xl hover:bg-indigo-700 shadow-xl transition-all">ENTRAR</button>
               <button type="button" onClick={() => setIsAuthModalOpen(false)} className="w-full text-slate-400 font-black uppercase text-xs tracking-widest mt-6">Volver</button>
             </form>
           </div>
        </div>
      )}

      {selectedQuest && <WebQuestDetail quest={selectedQuest} onClose={() => setSelectedQuest(null)} />}
    </div>
  );
};

export default App;
