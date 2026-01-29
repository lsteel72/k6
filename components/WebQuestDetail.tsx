
import React, { useState } from 'react';
import { WebQuest, StudentResult } from '../types';
import { studentLists } from '../data/students';

interface WebQuestDetailProps {
  quest: WebQuest;
  onClose: () => void;
}

const WebQuestDetail: React.FC<WebQuestDetailProps> = ({ quest, onClose }) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'tarea' | 'recursos' | 'proceso' | 'evaluacion' | 'reflexion'>('intro');
  const [quizScores, setQuizScores] = useState<number[]>(new Array(quest.evaluation.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [reflectionValue, setReflectionValue] = useState(5);
  
  const [studentName, setStudentName] = useState('');
  const [klasse, setKlasse] = useState(`K${quest.targetClass}A`);

  const handleAnswer = (questionIdx: number, answerIdx: number) => {
    if (showResults) return;
    const newScores = [...quizScores];
    newScores[questionIdx] = answerIdx;
    setQuizScores(newScores);
  };

  const calculateScore = () => {
    let correct = 0;
    quest.evaluation.forEach((q, i) => {
      if (quizScores[i] === q.correctAnswer) correct++;
    });
    return (correct / quest.evaluation.length) * 100;
  };

  const saveResult = () => {
    if (!studentName) {
      alert("⚠️ ¡IDENTIFICACIÓN! Selecciona tu nombre antes de terminar.");
      return;
    }
    if (quizScores.includes(-1)) {
      alert("⚠️ ¡EVALUACIÓN INCOMPLETA! Responde todas las preguntas.");
      setActiveTab('evaluacion');
      return;
    }

    const existingResults: StudentResult[] = JSON.parse(localStorage.getItem('studentResults') || '[]');
    const result: StudentResult = {
      id: crypto.randomUUID(),
      studentName,
      klasse,
      questTitle: quest.title,
      score: Math.round(calculateScore()),
      reflection: reflectionValue,
      date: new Date().toLocaleString()
    };

    localStorage.setItem('studentResults', JSON.stringify([...existingResults, result]));
    setShowResults(true);
  };

  // Generar opciones de grupos para el nivel actual (ej. K3A, K3B...)
  const klasseOptions = Object.keys(studentLists).filter(k => k.startsWith(`K${quest.targetClass}`));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/98 backdrop-blur-3xl animate-in fade-in duration-300">
      <div className="max-w-5xl mx-auto my-8 bg-white rounded-[3.5rem] overflow-hidden text-slate-800 shadow-2xl relative border-8 border-yellow-400">
        
        <div className="bg-yellow-400 p-8 flex items-center gap-6 border-b-8 border-slate-900">
          <div className="bg-white p-4 rounded-[1.5rem] border-4 border-slate-900 shadow-[6px_6px_0_rgba(0,0,0,1)]">
            <span className="text-5xl">🦎</span>
          </div>
          <div>
            <h1 className="pixel-font text-2xl md:text-3xl text-slate-900 uppercase tracking-tighter leading-none">{quest.title.split(': ')[0]}</h1>
            <p className="text-sm font-black text-slate-700 mt-2 opacity-60 uppercase">HUB DE APRENDIZAJE KLASSEN {quest.targetClass}</p>
          </div>
          <button onClick={onClose} className="ml-auto bg-slate-900 text-white p-4 rounded-full hover:scale-110 active:scale-95 transition-all">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="3" strokeLinecap="round"/></svg>
          </button>
        </div>

        {!showResults && (
          <div className="flex flex-wrap bg-white border-b-2 border-slate-100 p-4 gap-3">
            {[
              { id: 'intro', icon: '🌟', label: 'Inicio' },
              { id: 'tarea', icon: '🎒', label: 'Tarea' },
              { id: 'recursos', icon: '🛠️', label: 'Recursos' },
              { id: 'proceso', icon: '👣', label: 'PROCESO' },
              { id: 'evaluacion', icon: '📝', label: 'EVALUACIÓN' },
              { id: 'reflexion', icon: '🐱', label: 'Reflexión' }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id as any)} 
                className={`flex-1 min-w-[120px] p-5 rounded-[2rem] transition-all duration-300 border-b-8 ${activeTab === tab.id ? `bg-emerald-50 border-emerald-500 text-emerald-600 scale-105 shadow-xl` : 'bg-white border-transparent text-slate-300 hover:bg-slate-50'}`}
              >
                <div className="text-3xl mb-1">{tab.icon}</div>
                <div className="font-black text-[11px] uppercase tracking-widest">{tab.label}</div>
              </button>
            ))}
          </div>
        )}

        <div className="p-12 min-h-[600px] bg-white">
          {showResults ? (
            <div className="animate-in zoom-in duration-700 text-center">
               <div className="p-16 bg-emerald-50 rounded-[4rem] border-8 border-emerald-200">
                  <div className="text-[150px] mb-8 drop-shadow-2xl">🏆</div>
                  <h4 className="text-6xl font-black text-emerald-900 mb-6 uppercase italic">{studentName}</h4>
                  <p className="text-3xl font-bold text-emerald-600 mb-12 uppercase tracking-[0.2em]">¡MISIÓN COMPLETADA EN KLASSEN {quest.targetClass}!</p>
                  
                  <div className="flex flex-wrap justify-center gap-10 mb-12">
                      <div className="bg-white p-10 rounded-[3rem] border-4 border-emerald-500 shadow-2xl min-w-[250px]">
                        <p className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">RESULTADO</p>
                        <p className="text-8xl font-black text-emerald-600">{Math.round(calculateScore())}%</p>
                      </div>
                      <div className="bg-white p-10 rounded-[3rem] border-4 border-indigo-500 shadow-2xl min-w-[250px]">
                        <p className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">TU REFLEXIÓN</p>
                        <p className="text-8xl font-black text-indigo-600">{reflectionValue}/10</p>
                      </div>
                  </div>
                  <button onClick={onClose} className="px-16 py-8 bg-slate-900 text-white rounded-[2.5rem] font-black text-3xl hover:bg-black transition-all shadow-xl">VOLVER AL DASHBOARD</button>
               </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-8 duration-500">
              {activeTab === 'intro' && (
                <div className="space-y-10">
                  <h3 className="text-6xl font-black text-emerald-500 uppercase italic leading-none">Introducción</h3>
                  <div className="text-3xl leading-relaxed text-slate-700 font-medium bg-slate-50 p-12 rounded-[3.5rem] border-l-[16px] border-emerald-500 shadow-inner italic">
                    {quest.introduction}
                  </div>
                  <img src={quest.imageUrl} alt={quest.title} className="w-full h-auto rounded-[3.5rem] shadow-2xl border-8 border-white object-cover max-h-[500px]" />
                </div>
              )}

              {activeTab === 'evaluacion' && (
                <div className="space-y-12">
                  <h3 className="text-6xl font-black text-emerald-500 uppercase italic">EVALUACIÓN</h3>
                  {quest.evaluation.map((q, qIdx) => (
                    <div key={qIdx} className="p-12 bg-slate-50 rounded-[4rem] border-4 border-white shadow-2xl">
                      <p className="text-3xl font-black text-slate-800 mb-10 leading-tight">{qIdx + 1}. {q.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {q.options.map((opt, oIdx) => (
                          <button 
                            key={oIdx} 
                            onClick={() => handleAnswer(qIdx, oIdx)} 
                            className={`p-8 rounded-[2rem] text-left font-black text-xl border-4 transition-all duration-300 ${quizScores[qIdx] === oIdx ? 'bg-emerald-600 text-white border-emerald-900 shadow-2xl scale-105' : 'bg-white text-slate-500 border-slate-100 hover:border-emerald-200'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reflexion' && (
                <div className="space-y-12">
                  <h3 className="text-6xl font-black text-emerald-500 uppercase italic text-center">Reflexión Final</h3>
                  <div className="bg-indigo-600 p-12 rounded-[4rem] shadow-2xl border-b-[16px] border-indigo-950 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <label className="block text-xs font-black uppercase mb-6 tracking-[0.3em] opacity-60">Selecciona tu Grupo:</label>
                        <div className="grid grid-cols-2 gap-4">
                           {klasseOptions.map(k => (
                             <button key={k} onClick={() => { setKlasse(k); setStudentName(""); }} className={`py-6 rounded-[1.5rem] font-black text-2xl border-4 transition-all ${klasse === k ? 'bg-white text-indigo-600 border-yellow-400' : 'bg-indigo-800/50 border-white/10 text-white/40'}`}>
                               {k}
                             </button>
                           ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase mb-6 tracking-[0.3em] opacity-60">Tu Nombre:</label>
                        <select value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full px-8 py-6 rounded-[1.5rem] bg-indigo-900 text-white font-black text-2xl outline-none border-4 border-indigo-500 appearance-none shadow-inner cursor-pointer">
                          <option value="">-- ELIGE TU NOMBRE --</option>
                          {studentLists[klasse]?.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-16 rounded-[4rem] border-8 border-white shadow-2xl text-center">
                    <p className="text-3xl font-black text-slate-400 uppercase tracking-widest mb-12 italic">¿Qué tan fácil fue esta Actividad?</p>
                    <div className="relative h-64 mb-16 flex items-center justify-center">
                       <div className="absolute inset-x-0 h-4 bg-slate-200 rounded-full shadow-inner"></div>
                       <input type="range" min="1" max="10" step="1" value={reflectionValue} onChange={(e) => setReflectionValue(parseInt(e.target.value))} className="w-full h-full opacity-0 cursor-pointer relative z-20" />
                       <div className="absolute z-10 transition-all duration-500 ease-out flex flex-col items-center" style={{ left: `${(reflectionValue - 1) * 11.11}%` }}>
                          <div className="text-[140px] animate-bounce-slow drop-shadow-2xl">🐱</div>
                          <div className="bg-yellow-400 text-slate-900 px-10 py-4 rounded-[1.5rem] font-black text-5xl border-4 border-slate-900 shadow-2xl -mt-6">
                            {reflectionValue}
                          </div>
                       </div>
                    </div>
                    <div className="flex justify-between font-black text-xl text-slate-300 uppercase italic">
                       <span>1 - Nivel Dios</span>
                       <span>10 - ¡Súper Easy!</span>
                    </div>
                  </div>

                  <button onClick={saveResult} className="w-full py-12 bg-emerald-600 text-white rounded-[4rem] font-black text-5xl shadow-[0_20px_0_rgb(5,150,105)] active:translate-y-4 transition-all hover:bg-emerald-500 uppercase tracking-widest italic">🚀 ENVIAR MISIÓN</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebQuestDetail;
