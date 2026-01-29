
import React from 'react';
import { WebQuest } from '../types';

interface WebQuestCardProps {
  quest: WebQuest;
  isLocked: boolean;
  isAdmin: boolean;
  onToggleLock: (id: number) => void;
  onClick: (quest: WebQuest) => void;
}

const WebQuestCard: React.FC<WebQuestCardProps> = ({ quest, isLocked, isAdmin, onToggleLock, onClick }) => {
  return (
    <div 
      className={`relative group rounded-[2.5rem] overflow-hidden transition-all duration-300 h-80 cursor-pointer shadow-xl
        ${isLocked && !isAdmin ? 'opacity-40 grayscale pointer-events-none' : 'hover:-translate-y-3 hover:shadow-2xl active:scale-95'}
      `}
      onClick={() => onClick(quest)}
    >
      <div className="absolute inset-0">
         <img src={quest.imageUrl} alt={quest.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
         <div className={`absolute inset-0 bg-gradient-to-t ${quest.color} opacity-80 group-hover:opacity-70 transition-opacity`}></div>
      </div>
      
      <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
        <div className="flex justify-between items-start">
          <span className="bg-white/30 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">
            {quest.platform}
          </span>
          {isLocked && (
            <div className="bg-red-500 p-2 rounded-xl shadow-lg animate-pulse">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-black mb-2 leading-tight uppercase italic drop-shadow-md">
            {quest.title.split(': ')[1] || quest.title}
          </h3>
          <p className="text-sm text-white/90 font-medium line-clamp-2 leading-snug">
            {quest.description}
          </p>
        </div>

        {isAdmin && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock(quest.id);
            }}
            className={`mt-4 w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95
              ${isLocked ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'}
            `}
          >
            {isLocked ? '🔓 DESBLOQUEAR' : '🔒 BLOQUEAR'}
          </button>
        )}
      </div>

      {!isLocked && !isAdmin && (
        <div className="absolute bottom-6 right-6 bg-yellow-400 text-slate-900 p-3 rounded-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default WebQuestCard;
