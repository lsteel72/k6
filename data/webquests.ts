
import { WebQuest, Platform } from '../types';

const generateQuests = () => {
  const quests: WebQuest[] = [];
  
  const levels = [
    { class: 3, subtitle: "TECNOLOGIA", platforms: [Platform.KODU, Platform.CODESPARK, Platform.MINECRAFT, Platform.KODABLE, Platform.CANVAS], color: "from-blue-500 to-emerald-500", prefix: "TECNOLOGIA" },
    { class: 4, subtitle: "TECNOLOGIA INICIAL", platforms: [Platform.KODU, Platform.KODABLE, Platform.CANVAS, Platform.CODESPARK, Platform.MINECRAFT], color: "from-orange-500 to-red-600", prefix: "TECNOLOGIA INICIAL" },
    { class: 5, subtitle: "TECNOLOGIA AVANZADA", platforms: [Platform.KODU, Platform.KODABLE, Platform.OZARIA, Platform.CODE_COMBAT], color: "from-yellow-400 to-lime-500", prefix: "TECNOLOGIA AVANZADA" },
    { class: 6, subtitle: "PROGRAMACION CREATIVA", platforms: [Platform.OZARIA, Platform.ROBLOX, Platform.GAME_MAKER, Platform.MINECRAFT], color: "from-blue-600 to-cyan-500", prefix: "TECNOLOGIA PROGRAMACION CREATIVA" },
    { class: 7, subtitle: "HABILIDADES DIGITALES", platforms: [Platform.TYPING_MASTER, Platform.OZARIA, Platform.CODE_COMBAT, Platform.MINECRAFT], color: "from-magenta-500 to-purple-600", prefix: "TECNOLOGIA HABILIDADES DIGITALES" }
  ];

  const imageUrls = [
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    "https://images.unsplash.com/photo-1614728263952-84ea206f25ab",
    "https://images.unsplash.com/photo-1552664730-d307ca884978",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
    "https://images.unsplash.com/photo-1555680202-c86f0e12f086",
    "https://images.unsplash.com/photo-1593305841991-05c297ba4575",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    "https://images.unsplash.com/photo-1592609931095-54a2168ae893",
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8"
  ];

  levels.forEach((lvl) => {
    for (let i = 1; i <= 16; i++) {
      const platform = lvl.platforms[(i - 1) % lvl.platforms.length];
      const id = (lvl.class * 100) + i;
      quests.push({
        id: id,
        targetClass: lvl.class,
        title: `${lvl.prefix} ACTIVIDAD ${i}: Misión ${platform}`,
        description: `Explora las profundidades de ${platform} en el nivel ${lvl.class}. Domina los algoritmos y la creatividad digital.`,
        platform: platform,
        imageUrl: `${imageUrls[(i - 1) % imageUrls.length]}?auto=format&fit=crop&q=80&w=800`,
        kmkDefinition: `KMK ${lvl.class}.1: Competencia digital en entorno ${lvl.subtitle}.`,
        introduction: `¡Bienvenido a la actividad ${i} de KLASSEN ${lvl.class}! Hoy nos enfocaremos en ${platform}.`,
        task: `Completar el desafío de programación número ${i} usando herramientas de ${platform}.`,
        process: [
          `Paso 1: Inicia sesión en ${platform}.`,
          `Paso 2: Abre el módulo de la Actividad ${i}.`,
          `Paso 3: Sigue las instrucciones del tutorial integrado.`,
          `Paso 4: Realiza las pruebas necesarias para verificar tu código.`,
          `Paso 5: Guarda y sube tu resultado.`
        ],
        resources: [`Plataforma ${platform}`, "Manual de Usuario", "Video Tutorial"],
        evaluation: [
          {
            question: `¿Cuál es el objetivo principal de la Actividad ${i}?`,
            options: ["Aprender lógica", "Solo jugar", "Ver videos"],
            correctAnswer: 0
          },
          {
            question: `¿Qué herramienta estamos usando en esta misión?`,
            options: ["Papel y lápiz", platform, "Calculadora"],
            correctAnswer: 1
          }
        ],
        conclusion: `¡Felicidades! Has completado la actividad ${i} con éxito.`,
        color: lvl.color
      });
    }
  });

  return quests;
};

export const webQuests: WebQuest[] = generateQuests();
