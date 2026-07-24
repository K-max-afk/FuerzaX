/* ═══════════════════════════════════════════════════════════
   FUERZAX — Física Extrema · script.js
   1BGU — Física · Contenido verificado (currículo Ecuador)
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── ESTADO DEL JUEGO ──────────────────────────────────── */
const estado = {
  nombre: '',
  personaje: { nombre: '', emoji: '' },
  energia: 0,
  cristales: 0,
  nivel: 1,
  misionesCompletadas: [],     // [{ id, estrellas, puntaje }]
  misionActualId: null,
  preguntaIdx: 0,
  respuestasCorrectas: 0,
  pantallaAnterior: 'pantalla-mapa'
};

/* ─── DATOS DE MISIONES (Física 1BGU — Ecuador) ────────── */
const MISIONES = [
  {
    id: 1,
    icono: '🏃',
    titulo: 'El Mundo del Movimiento',
    tema: 'Cinemática',
    portada: 'images/mision1.png',
    fizzy_intro: '¡Esta misión trata sobre el movimiento! Prepárate para descubrir cómo describimos los desplazamientos en el mundo real.',
    fizzy_quiz: 'Piensa en tus experiencias del día a día. ¡Las fórmulas de cinemática describen lo que ya viviste!',
    descripcion: 'El movimiento está en todos lados: cuando caminas, vas en bus o lanzas una pelota. La cinemática es la rama de la física que describe cómo se mueven los objetos.',
    vida_real: '<strong>🎯 Conéctate:</strong> Cuando viajas en bus por la ciudad vas lento (mucho tráfico), pero en la carretera vas rápido. Ese cambio de velocidad tiene un nombre científico: <em>aceleración</em>.',
    preguntas: [
      {
        texto: '¿Qué es la velocidad en física?',
        imagen: '',
        opciones: [
          'La fuerza que mueve un objeto',
          'El cambio de posición (desplazamiento) en un intervalo de tiempo',
          'La distancia total recorrida por un objeto',
          'La energía que posee un cuerpo en movimiento'
        ],
        correcta: 1,
        explicacion: 'La velocidad es v = Δx / Δt. Es un vector: tiene magnitud y dirección. No confundas velocidad (v) con rapidez (speed), que solo tiene magnitud. Unidad SI: m/s.',
        fizzy_ok:   '¡Exacto! v = Δx / Δt. ¡La velocidad incluye dirección, no solo magnitud!',
        fizzy_mal:  'Recuerda: velocidad = desplazamiento ÷ tiempo. Es un vector (tiene dirección). v = Δx/Δt'
      },
      {
        texto: 'Un auto parte del reposo y en 5 segundos alcanza 20 m/s. ¿Cuál es su aceleración?',
        imagen: '',
        opciones: [
          '100 m/s²',
          '25 m/s²',
          '4 m/s²',
          '0.25 m/s²'
        ],
        correcta: 2,
        explicacion: 'Usamos a = Δv / Δt = (20 – 0) / 5 = 4 m/s². La aceleración es el cambio de velocidad por unidad de tiempo. Parte del reposo significa v₀ = 0.',
        fizzy_ok:   '¡Perfecto! a = Δv/Δt = 20/5 = 4 m/s². ¡Dominas la cinemática!',
        fizzy_mal:  'Aplica a = Δv/Δt = (20-0)/5 = 4 m/s². Parte del reposo → v₀ = 0.'
      },
      {
        texto: '¿Qué tipo de movimiento describe un objeto que cae libremente (sin resistencia del aire)?',
        imagen: '',
        opciones: [
          'MRU – Movimiento Rectilíneo Uniforme (velocidad constante)',
          'MRUV – Movimiento Rectilíneo Uniformemente Variado',
          'Movimiento circular uniforme',
          'Movimiento oscilatorio'
        ],
        correcta: 1,
        explicacion: 'La caída libre es un MRUV con aceleración constante g ≈ 9.8 m/s² hacia abajo. La velocidad aumenta uniformemente: v = v₀ + g·t. Galileo demostró que todos los objetos caen igual (sin aire).',
        fizzy_ok:   '¡Brillante! Caída libre = MRUV con g = 9.8 m/s². Galileo lo demostró desde la Torre de Pisa.',
        fizzy_mal:  'Caída libre → la aceleración es constante (g = 9.8 m/s²) → es MRUV, no MRU.'
      }
    ]
  },
  {
    id: 2,
    icono: '💪',
    titulo: 'Fuerzas en Acción',
    tema: 'Leyes de Newton I y II',
    portada: 'images/mision2.png',
    fizzy_intro: '¡Isaac Newton cambió el mundo con tres leyes! Aprenderemos las dos primeras en esta misión.',
    fizzy_quiz: 'F = m·a es una de las ecuaciones más importantes de la física. ¡Tú puedes dominarla!',
    descripcion: 'Las Leyes de Newton explican por qué los objetos se mueven (o no). La Primera habla de inercia, la Segunda relaciona fuerza, masa y aceleración.',
    vida_real: '<strong>🎯 Conéctate:</strong> ¿Notaste que es más difícil empujar un auto que una bicicleta? Eso es la Segunda Ley: misma fuerza, distinta masa → distinta aceleración.',
    preguntas: [
      {
        texto: 'La Primera Ley de Newton (Ley de Inercia) establece que:',
        imagen: '',
        opciones: [
          'La fuerza es igual a masa por aceleración: F = m·a',
          'Todo objeto mantiene su estado de reposo o movimiento uniforme si la fuerza neta sobre él es cero',
          'A toda acción le corresponde una reacción igual y opuesta',
          'La aceleración de un objeto es inversamente proporcional a su peso'
        ],
        correcta: 1,
        explicacion: 'Primera Ley (Inercia): Un objeto en reposo permanece en reposo y uno en movimiento uniforme continúa así, a menos que una fuerza neta no nula actúe sobre él. La inercia es la resistencia al cambio de movimiento.',
        fizzy_ok:   '¡Correcto! La inercia es la tendencia de los objetos a resistir cambios en su movimiento. ¡Newton la comprendió todo!',
        fizzy_mal:  '1ª Ley: sin fuerza neta → el movimiento no cambia. La inercia resiste todo cambio.'
      },
      {
        texto: 'Aplicas una fuerza de 30 N a una caja de 6 kg en una superficie sin fricción. ¿Cuál es la aceleración?',
        imagen: '',
        opciones: [
          '180 m/s²',
          '36 m/s²',
          '5 m/s²',
          '0.2 m/s²'
        ],
        correcta: 2,
        explicacion: 'Segunda Ley de Newton: F = m·a → a = F/m = 30 N / 6 kg = 5 m/s². La aceleración es directamente proporcional a la fuerza e inversamente proporcional a la masa.',
        fizzy_ok:   '¡Excelente! F = m·a → a = F/m = 30/6 = 5 m/s². ¡Segunda Ley dominada!',
        fizzy_mal:  'Usa F = m·a → a = F/m = 30/6 = 5 m/s². Divide la fuerza entre la masa.'
      },
      {
        texto: 'Si duplicas la fuerza aplicada sobre un objeto (misma masa), ¿qué ocurre con su aceleración?',
        imagen: '',
        opciones: [
          'Se reduce a la mitad',
          'Se mantiene igual',
          'Se duplica',
          'Se cuadruplica'
        ],
        correcta: 2,
        explicacion: 'De F = m·a se obtiene a = F/m. Si F se duplica y m es constante, a también se duplica. La aceleración es directamente proporcional a la fuerza neta aplicada.',
        fizzy_ok:   '¡Perfecto! a ∝ F (con m constante). ¡La proporcionalidad directa en acción!',
        fizzy_mal:  'a = F/m. Si F×2 y m no cambia → a×2. ¡Proporcionalidad directa!'
      }
    ]
  },
  {
    id: 3,
    icono: '🔄',
    titulo: '¡Acción y Reacción!',
    tema: 'Tercera Ley de Newton',
    portada: 'images/mision3.png',
    fizzy_intro: '¡La Tercera Ley de Newton es fascinante! Las fuerzas siempre van en pares. ¿Listo para descubrirlos?',
    fizzy_quiz: 'Recuerda: las fuerzas de acción y reacción actúan sobre DISTINTOS cuerpos. ¡Eso es clave!',
    descripcion: 'La Tercera Ley dice que las fuerzas siempre aparecen en pares: si el cuerpo A ejerce una fuerza sobre B, entonces B ejerce una fuerza igual y opuesta sobre A.',
    vida_real: '<strong>🎯 Conéctate:</strong> Cuando nadas, empujas el agua hacia atrás con tus brazos (acción) y el agua te empuja hacia adelante (reacción). ¡Por eso avanzas!',
    preguntas: [
      {
        texto: 'La Tercera Ley de Newton establece que:',
        imagen: '',
        opciones: [
          'La fuerza neta es cero cuando un objeto está en reposo',
          'La aceleración es igual a la fuerza dividida para la masa',
          'Si A ejerce una fuerza sobre B, entonces B ejerce sobre A una fuerza de igual magnitud y dirección opuesta',
          'Los objetos más masivos caen más rápido'
        ],
        correcta: 2,
        explicacion: 'Tercera Ley (Acción–Reacción): F(A→B) = –F(B→A). Ambas fuerzas tienen la misma magnitud y línea de acción, pero sentidos opuestos. Actúan sobre cuerpos distintos, por eso no se anulan.',
        fizzy_ok:   '¡Exacto! Acción y reacción: misma magnitud, sentidos opuestos, sobre cuerpos diferentes.',
        fizzy_mal:  '3ª Ley: A empuja a B con fuerza F, y B empuja a A con fuerza –F. ¡Siempre en pares!'
      },
      {
        texto: 'Un cohete se propulsa expulsando gases hacia abajo a gran velocidad. ¿Por qué sube el cohete?',
        imagen: '',
        opciones: [
          'Porque los gases calientan el aire y lo hacen subir',
          'Porque los gases empujan el suelo y el suelo empuja el cohete',
          'Porque los gases salen hacia abajo (acción) y por reacción el cohete sube',
          'Porque el cohete pesa menos que el aire que desplaza'
        ],
        correcta: 2,
        explicacion: 'Tercera Ley aplicada: el cohete expulsa gases hacia abajo (acción) y los gases empujan al cohete hacia arriba (reacción). Este principio funciona incluso en el vacío del espacio, sin necesidad de apoyarse en nada.',
        fizzy_ok:   '¡Brillante! Eso es exactamente el principio de los cohetes: la Tercera Ley de Newton en el espacio.',
        fizzy_mal:  'El cohete expulsa gas ↓ (acción) → el gas empuja el cohete ↑ (reacción). ¡3ª Ley!'
      },
      {
        texto: 'Cuando la Tierra atrae a una manzana hacia abajo con fuerza F, la manzana:',
        imagen: '',
        opciones: [
          'No ejerce ninguna fuerza sobre la Tierra',
          'Atrae a la Tierra hacia arriba con la misma fuerza F',
          'Empuja al aire hacia abajo',
          'Solo ejerce fuerza cuando toca el suelo'
        ],
        correcta: 1,
        explicacion: '¡La manzana atrae a la Tierra con la misma fuerza F! Pero como M(Tierra) es inmensamente mayor, su aceleración a = F/M es imperceptible. La gravedad es mutua (Ley de Gravitación Universal de Newton).',
        fizzy_ok:   '¡Increíble! Sí, la manzana atrae a la Tierra. Pero la Tierra es tan masiva que su aceleración es mínima.',
        fizzy_mal:  'Por la 3ª Ley, la manzana SÍ atrae a la Tierra con igual fuerza, pero la Tierra apenas se mueve por su enorme masa.'
      }
    ]
  },
  {
    id: 4,
    icono: '⚡',
    titulo: 'Trabajo y Energía',
    tema: 'Trabajo · Energía · Conservación',
    portada: 'images/mision4.png',
    fizzy_intro: '¡La energía es la moneda del universo! En esta misión aprenderás cómo se transforma y conserva.',
    fizzy_quiz: '¿Recuerdas W = F·d·cos(θ) y Ec = ½mv²? ¡Son tus herramientas en esta misión!',
    descripcion: 'El trabajo físico ocurre cuando una fuerza produce desplazamiento. La energía puede ser cinética (movimiento) o potencial (posición), y siempre se conserva.',
    vida_real: '<strong>🎯 Conéctate:</strong> Al subir escaleras haces trabajo contra la gravedad y acumulas energía potencial. Si luego bajas corriendo, esa energía se convierte en cinética. ¡La energía no desaparece!',
    preguntas: [
      {
        texto: '¿En cuál de estos casos se realiza trabajo físico (W ≠ 0)?',
        imagen: '',
        opciones: [
          'Sostienes una mochila pesada de pie sin moverte',
          'Empujas una pared con toda tu fuerza pero no la mueves',
          'Empujas un auto varado y lo desplazas 4 metros en la dirección de la fuerza',
          'Llevas una caja horizontalmente a velocidad constante (fuerza vertical, desplazamiento horizontal)'
        ],
        correcta: 2,
        explicacion: 'W = F · d · cos(θ). Sin desplazamiento → W = 0. Si la fuerza es perpendicular al desplazamiento → cos(90°) = 0 → W = 0. Solo al empujar el auto (F y d en la misma dirección) hay trabajo real: W = F · 4 m.',
        fizzy_ok:   '¡Exacto! W = F·d·cos(θ). Sin desplazamiento en la dirección de la fuerza, no hay trabajo físico.',
        fizzy_mal:  'W = F·d·cos(θ). Necesitas fuerza Y desplazamiento en la misma dirección. ¡Solo el auto en movimiento cumple eso!'
      },
      {
        texto: 'Una pelota de 2 kg rueda a 3 m/s. ¿Cuál es su energía cinética?',
        imagen: '',
        opciones: [
          '3 J',
          '6 J',
          '9 J',
          '18 J'
        ],
        correcta: 2,
        explicacion: 'Ec = ½ · m · v² = ½ · 2 · (3)² = ½ · 2 · 9 = 9 J. La energía cinética depende del cuadrado de la velocidad: si duplicas v, Ec se cuadruplica. Unidad: Joule (J = kg·m²/s²).',
        fizzy_ok:   '¡Perfecto! Ec = ½mv² = ½·2·9 = 9 J. ¡Nota que la velocidad va al cuadrado!',
        fizzy_mal:  'Ec = ½·m·v² = ½·2·3² = ½·2·9 = 9 J. ¡No olvides elevar al cuadrado la velocidad!'
      },
      {
        texto: '¿Qué establece la Ley de Conservación de la Energía?',
        imagen: '',
        opciones: [
          'La energía cinética siempre es mayor que la potencial',
          'En un sistema aislado, la energía total permanece constante; solo cambia de forma',
          'La energía se destruye cuando hay fricción',
          'La energía se crea en las reacciones químicas'
        ],
        correcta: 1,
        explicacion: 'La energía no se crea ni se destruye: solo se transforma. Un péndulo convierte Ep ↔ Ec. Con fricción, parte se convierte en calor, pero el total (Ec + Ep + calor) se conserva. Este es uno de los principios más fundamentales de la física.',
        fizzy_ok:   '¡Excelente! Energía total = constante. Solo cambia de forma. ¡Ley fundamental del universo!',
        fizzy_mal:  'La energía NUNCA se destruye. Se transforma: cinética → potencial → calor → etc. La suma total siempre es la misma.'
      }
    ]
  },
  {
    id: 5,
    icono: '🌊',
    titulo: 'El Universo de las Ondas',
    tema: 'Ondas Mecánicas y Electromagnéticas',
    portada: 'images/mision5.png',
    fizzy_intro: '¡Las ondas llevan energía a través del espacio! El sonido, la luz, el wifi... ¡todo son ondas!',
    fizzy_quiz: 'Recuerda la ecuación fundamental: v = f · λ. Velocidad = frecuencia × longitud de onda.',
    descripcion: 'Una onda es una perturbación que transporta energía sin transportar materia de forma permanente. Las ondas mecánicas necesitan un medio; las electromagnéticas, no.',
    vida_real: '<strong>🎯 Conéctate:</strong> Cuando hablas con alguien, tu voz viaja como onda sonora (mecánica). Cuando ves colores, estás detectando ondas electromagnéticas de distintas frecuencias. ¡Tu cuerpo es un detector de ondas!',
    preguntas: [
      {
        texto: '¿Qué transporta una onda al propagarse?',
        imagen: '',
        opciones: [
          'Materia y energía a la vez',
          'Solo materia, sin energía',
          'Energía sin transportar materia de forma permanente',
          'Solo información, sin materia ni energía'
        ],
        correcta: 2,
        explicacion: 'Las ondas transportan energía (y en algunos casos información) sin que la materia se traslade permanentemente. Las olas del mar mueven el agua hacia arriba y abajo, pero el agua no viaja con la ola. Un corcho en el mar solo sube y baja.',
        fizzy_ok:   '¡Correcto! Energía sin desplazamiento permanente de materia. El corcho en el mar solo oscila. ¡Así funcionan las ondas!',
        fizzy_mal:  'Las ondas transfieren ENERGÍA, no materia. Observa un corcho en el mar: sube y baja, pero no avanza con la ola.'
      },
      {
        texto: 'La ecuación fundamental de las ondas es v = f · λ. Si una onda tiene frecuencia f = 440 Hz y longitud de onda λ = 0.78 m, ¿cuál es su velocidad?',
        imagen: '',
        opciones: [
          '56 m/s (440 / 0.78)',
          '343 m/s (440 × 0.78 ≈ 343)',
          '440 m/s',
          '780 m/s'
        ],
        correcta: 1,
        explicacion: 'v = f · λ = 440 Hz × 0.78 m ≈ 343 m/s. ¡Esa es exactamente la velocidad del sonido en el aire a 20°C! La nota La4 (440 Hz) tiene λ ≈ 0.78 m en el aire.',
        fizzy_ok:   '¡Fantástico! v = f·λ = 440×0.78 ≈ 343 m/s. ¡Es la velocidad del sonido en el aire! ¡Elegiste La4 musical!',
        fizzy_mal:  'v = f · λ = 440 × 0.78 ≈ 343 m/s. ¡Multiplica, no dividas! Ese es la velocidad del sonido en aire.'
      },
      {
        texto: 'El sonido viaja más rápido en:',
        imagen: '',
        opciones: [
          'El vacío (sin materia)',
          'El aire',
          'El agua',
          'Los sólidos (como el acero)'
        ],
        correcta: 3,
        explicacion: 'Velocidades aproximadas: vacío → el sonido NO se propaga (sin partículas), aire ≈ 343 m/s, agua ≈ 1480 m/s, acero ≈ 5000 m/s. En sólidos las partículas están más juntas y transmiten vibraciones más eficientemente. Las ondas electromagnéticas (luz) sí viajan en el vacío.',
        fizzy_ok:   '¡Correcto! Acero ≈ 5000 m/s > agua ≈ 1480 m/s > aire ≈ 343 m/s > vacío (imposible). ¡Los sólidos ganan!',
        fizzy_mal:  'Sólidos > líquidos > gases > vacío (imposible). Acero ≈ 5000 m/s. Partículas más juntas = vibración más rápida.'
      }
    ]
  }
];

/* ─── MENSAJES DE FIZZY ─────────────────────────────────── */
const FIZZY_MENSAJES = {
  inicio:    '¡Hola explorador! ¿Cómo te llamas? Tu nombre se guardará en la misión. 🚀',
  personaje: '¡Genial! Ahora elige tu explorador. Cada uno tiene habilidades únicas.',
  mapa:      '¡Aquí está tu mapa! Completa cada misión para avanzar. ¡La física espera!',
  mision_bloqueada: '¡Completa la misión anterior primero! Las fuerzas se construyen paso a paso.',
  felicidades: '¡INCREÍBLE! ¡Completaste todas las misiones! Eres un maestro de la física. ⚡',
  nivel_up:  '¡Subiste de nivel! Cada nivel demuestra tu dominio de la física.'
};

/* ─── AUDIO CON WEB AUDIO API ───────────────────────────── */
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function tocarNota(frecuencia, duracion, tipo = 'sine', volumen = 0.25) {
  try {
    const ctx = getAudioCtx();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = tipo;
    osc.frequency.value = frecuencia;
    gain.gain.setValueAtTime(volumen, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duracion);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duracion);
  } catch (e) { /* silencio si no hay contexto */ }
}

function sonidoCorrecto() {
  tocarNota(523, 0.12, 'sine', 0.2);
  setTimeout(() => tocarNota(659, 0.18, 'sine', 0.2), 100);
  setTimeout(() => tocarNota(784, 0.3,  'sine', 0.25), 200);
}

function sonidoIncorrecto() {
  tocarNota(220, 0.12, 'square', 0.15);
  setTimeout(() => tocarNota(180, 0.3, 'square', 0.12), 120);
}

function sonidoMisionCompleta() {
  const notas = [523, 659, 784, 1047];
  notas.forEach((f, i) => setTimeout(() => tocarNota(f, 0.25, 'sine', 0.2), i * 120));
}

function sonidoClic() {
  tocarNota(880, 0.05, 'sine', 0.1);
}

/* ─── MÚSICA DE FONDO ───────────────────────────────────── */
const musicaEl = () => document.getElementById('musica-fondo');
let musicaActiva = false;

function toggleMusica() {
  const audio = musicaEl();
  const btn   = document.getElementById('btn-play-pause');
  if (!audio.src || audio.src === window.location.href) {
    // No hay música configurada aún
    fizzyHablar('Agrega tu música: pon el archivo en audio/musica-fondo.mp3 y descomenta la línea en index.html 🎵');
    return;
  }
  if (musicaActiva) {
    audio.pause();
    btn.textContent = '▶';
    musicaActiva = false;
  } else {
    getAudioCtx(); // desbloquear audio en móviles
    audio.play().catch(() => {});
    btn.textContent = '⏸';
    musicaActiva = true;
  }
}

function cambiarVolumen(val) {
  const audio = musicaEl();
  audio.volume = parseFloat(val);
  document.getElementById('volumen-label').textContent = Math.round(val * 100) + '%';
}

/* ─── FIZZY ─────────────────────────────────────────────── */
let fizzyTimeout = null;

function fizzyHablar(texto, delay = 0) {
  clearTimeout(fizzyTimeout);
  fizzyTimeout = setTimeout(() => {
    const el = document.getElementById('fizzy-texto');
    el.style.opacity = '0';
    el.style.transform = 'translateY(4px)';
    setTimeout(() => {
      el.textContent = texto;
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200);
  }, delay);
}

/* ─── LOCAL STORAGE ─────────────────────────────────────── */
const CLAVE_LS = 'fuerzax_progreso_v2';

function guardarLS() {
  try { localStorage.setItem(CLAVE_LS, JSON.stringify(estado)); } catch (e) {}
}

function cargarLS() {
  try {
    const raw = localStorage.getItem(CLAVE_LS);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function borrarLS() {
  try { localStorage.removeItem(CLAVE_LS); } catch (e) {}
}

/* ─── NAVEGACIÓN ─────────────────────────────────────────── */
function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  const pantalla = document.getElementById(id);
  if (pantalla) pantalla.classList.add('activa');
  estado.pantallaAnterior = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  sonidoClic();
}

/* ─── PANTALLA INICIO ───────────────────────────────────── */
function iniciarApp() {
  const guardado = cargarLS();
  if (guardado && guardado.nombre) {
    document.getElementById('nombre-guardado').textContent = guardado.nombre;
    document.getElementById('progreso-guardado').classList.remove('oculto');
    fizzyHablar(`¡${guardado.nombre} ha vuelto! Continúa tu misión de física o comienza de nuevo. ⚡`);
  } else {
    fizzyHablar(FIZZY_MENSAJES.inicio);
  }
}

function guardarNombre() {
  const inputEl = document.getElementById('input-nombre');
  const nombre  = inputEl.value.trim();
  if (!nombre) {
    inputEl.style.borderColor = 'var(--red)';
    fizzyHablar('Necesito saber tu nombre para registrar tu misión. ¡Escríbelo!');
    setTimeout(() => { inputEl.style.borderColor = ''; }, 1500);
    return;
  }
  estado.nombre = nombre;
  guardarLS();
  mostrarPantalla('pantalla-personaje');
  document.getElementById('saludo-nombre').textContent = `¡Hola, ${nombre}! 👋`;
  fizzyHablar(FIZZY_MENSAJES.personaje);
}

function continuarPartida() {
  const guardado = cargarLS();
  if (!guardado) return;
  Object.assign(estado, guardado);
  mostrarPantalla('pantalla-mapa');
  actualizarMapa();
  fizzyHablar(`¡Bienvenido de vuelta, ${estado.nombre}! Continúa donde lo dejaste. 🚀`);
}

function nuevaPartida() {
  if (!confirm('¿Seguro que quieres borrar tu progreso y comenzar desde cero?')) return;
  borrarLS();
  document.getElementById('progreso-guardado').classList.add('oculto');
  document.getElementById('input-nombre').value = '';
  estado.nombre = '';
  estado.personaje = { nombre: '', emoji: '' };
  estado.energia = 0;
  estado.cristales = 0;
  estado.nivel = 1;
  estado.misionesCompletadas = [];
  fizzyHablar(FIZZY_MENSAJES.inicio);
}

/* ─── SELECCIÓN DE PERSONAJE ─────────────────────────────── */
function elegirPersonaje(nombre, emoji) {
  estado.personaje = { nombre, emoji };
  guardarLS();
  // Va a la lección antes que al mapa
  iniciarLeccion();
  fizzyHablar(`¡Genial! Eres un ${nombre}. Primero aprenderemos las 3 Leyes de Newton. ¡Vamos! 🚀`);
}

/* ─── MAPA DE MISIONES ──────────────────────────────────── */
function actualizarMapa() {
  // HUD
  document.getElementById('hud-avatar').textContent    = estado.personaje.emoji;
  document.getElementById('hud-nombre-hud').textContent = estado.nombre;
  document.getElementById('hud-energia').textContent   = estado.energia;
  document.getElementById('hud-cristales').textContent = estado.cristales;
  document.getElementById('hud-nivel').textContent     = estado.nivel;

  // Grid
  const grid = document.getElementById('grid-misiones');
  grid.innerHTML = '';

  MISIONES.forEach((m, idx) => {
    const completada = estado.misionesCompletadas.find(c => c.id === m.id);
    const bloqueada  = idx > 0 && !estado.misionesCompletadas.find(c => c.id === MISIONES[idx - 1].id);

    const card = document.createElement('div');
    card.className = 'mision-card' +
      (bloqueada  ? ' bloqueada'  : '') +
      (completada ? ' completada' : '');

    card.innerHTML = `
      <div class="mision-icono">${m.icono}</div>
      <div class="mision-card-num">Misión ${m.id}</div>
      <div class="mision-card-titulo">${m.titulo}</div>
      <div class="mision-card-tema">${m.tema}</div>
      <div class="mision-estrellas">${completada ? calcularEstrellas(completada.puntaje) : '☆☆☆'}</div>
      ${bloqueada  ? '<div class="mision-lock">🔒</div>' : ''}
    `;

    if (!bloqueada) {
      card.onclick = () => abrirMision(m.id);
    } else {
      card.onclick = () => fizzyHablar(FIZZY_MENSAJES.mision_bloqueada);
    }

    grid.appendChild(card);
  });

  // Barra de progreso general
  const pct = (estado.misionesCompletadas.length / MISIONES.length) * 100;
  document.getElementById('barra-progreso-general').style.width = pct + '%';
  document.getElementById('label-progreso-general').textContent =
    `${estado.misionesCompletadas.length} / ${MISIONES.length}`;

  fizzyHablar(FIZZY_MENSAJES.mapa);
}

function calcularEstrellas(puntaje) {
  const total = 3; // preguntas
  if (puntaje === total) return '⭐⭐⭐';
  if (puntaje >= 2)      return '⭐⭐☆';
  if (puntaje >= 1)      return '⭐☆☆';
  return '☆☆☆';
}

/* ─── MISIÓN: INTRO ─────────────────────────────────────── */
function abrirMision(id) {
  const mision = MISIONES.find(m => m.id === id);
  if (!mision) return;
  estado.misionActualId    = id;
  estado.preguntaIdx        = 0;
  estado.respuestasCorrectas = 0;

  // Cabecera
  document.getElementById('mision-titulo-cab').textContent = `${mision.icono} ${mision.titulo}`;
  document.getElementById('barra-mision').style.width = '0%';

  // Imagen portada
  const imgEl = document.getElementById('img-mision-portada');
  const phEl  = document.getElementById('ph-mision-portada');
  const lbEl  = document.getElementById('ph-mision-label');
  imgEl.src   = mision.portada;
  lbEl.textContent = `📷 ${mision.portada}`;
  phEl.classList.remove('imagen-ok');
  imgEl.onload  = () => phEl.classList.add('imagen-ok');
  imgEl.onerror = () => { imgEl.style.display = 'none'; };

  // Intro card
  document.getElementById('intro-tema').textContent     = mision.tema;
  document.getElementById('intro-titulo').textContent   = mision.titulo;
  document.getElementById('intro-vida-real').innerHTML  = mision.vida_real;
  document.getElementById('intro-concepto').textContent = mision.descripcion;

  // Sub-secciones
  document.getElementById('sub-intro').classList.remove('oculto');
  document.getElementById('sub-quiz').classList.add('oculto');
  document.getElementById('feedback-respuesta').classList.add('oculto');

  mostrarPantalla('pantalla-mision');
  fizzyHablar(mision.fizzy_intro);
}

/* ─── MISIÓN: QUIZ ──────────────────────────────────────── */
function iniciarQuiz() {
  document.getElementById('sub-intro').classList.add('oculto');
  document.getElementById('sub-quiz').classList.remove('oculto');
  mostrarPregunta();
}

function mostrarPregunta() {
  const mision   = MISIONES.find(m => m.id === estado.misionActualId);
  const pregunta = mision.preguntas[estado.preguntaIdx];
  const total    = mision.preguntas.length;

  // Contador y puntaje parcial
  document.getElementById('quiz-contador').textContent =
    `Pregunta ${estado.preguntaIdx + 1} de ${total}`;
  document.getElementById('quiz-puntaje-parcial').textContent =
    `⚡ ${estado.respuestasCorrectas}`;

  // Barra progreso misión
  document.getElementById('barra-mision').style.width =
    ((estado.preguntaIdx / total) * 100) + '%';

  // Texto pregunta
  document.getElementById('quiz-pregunta-texto').textContent = pregunta.texto;

  // Imagen de pregunta (si existe)
  const imgPEl  = document.getElementById('img-pregunta');
  const phPEl   = document.getElementById('ph-pregunta');
  const lbPEl   = document.getElementById('ph-pregunta-label');
  if (pregunta.imagen) {
    imgPEl.src = pregunta.imagen;
    imgPEl.style.display = '';
    lbPEl.textContent = `📷 ${pregunta.imagen}`;
    phPEl.classList.remove('imagen-ok');
    imgPEl.onload  = () => phPEl.classList.add('imagen-ok');
    imgPEl.onerror = () => { imgPEl.style.display = 'none'; };
  } else {
    phPEl.classList.remove('imagen-ok');
    imgPEl.style.display = 'none';
    lbPEl.textContent = '📷 (sin imagen de apoyo para esta pregunta)';
  }

  // Opciones
  const contenedor = document.getElementById('opciones-container');
  contenedor.innerHTML = '';
  pregunta.opciones.forEach((op, i) => {
    const btn = document.createElement('button');
    btn.className   = 'btn-opcion';
    btn.textContent = op;
    btn.onclick     = () => responder(i);
    contenedor.appendChild(btn);
  });

  // Ocultar feedback
  document.getElementById('feedback-respuesta').classList.add('oculto');
  fizzyHablar(mision.fizzy_quiz, 300);
}

function responder(idx) {
  const mision   = MISIONES.find(m => m.id === estado.misionActualId);
  const pregunta = mision.preguntas[estado.preguntaIdx];
  const botones  = document.querySelectorAll('.btn-opcion');
  const esCorrecta = idx === pregunta.correcta;

  // Deshabilitar botones
  botones.forEach(b => b.disabled = true);

  // Marcar correcta / incorrecta
  botones[pregunta.correcta].classList.add('correcta');
  if (!esCorrecta) {
    botones[idx].classList.add('incorrecta');
    document.getElementById('card-pregunta').classList.add('shake');
    setTimeout(() => document.getElementById('card-pregunta').classList.remove('shake'), 500);
  }

  // Sonido y puntaje
  if (esCorrecta) {
    sonidoCorrecto();
    estado.respuestasCorrectas++;
    estado.energia += 10;
    document.getElementById('quiz-puntaje-parcial').textContent =
      `⚡ ${estado.respuestasCorrectas}`;
  } else {
    sonidoIncorrecto();
  }

  // Feedback
  const fbEl     = document.getElementById('feedback-respuesta');
  const fbIcono  = document.getElementById('feedback-icono');
  const fbTexto  = document.getElementById('feedback-texto');
  const fbExpl   = document.getElementById('feedback-explicacion');
  const btnSig   = document.getElementById('btn-siguiente');

  fbIcono.textContent = esCorrecta ? '✅' : '❌';
  fbTexto.textContent = esCorrecta ? '¡Correcto! Excelente trabajo.' : 'Incorrecto. Sigue adelante.';
  fbExpl.textContent  = pregunta.explicacion;
  fbEl.classList.remove('oculto');

  const esUltima = estado.preguntaIdx >= mision.preguntas.length - 1;
  btnSig.textContent = esUltima ? 'Ver resultado 🎯' : 'Siguiente →';

  fizzyHablar(esCorrecta ? pregunta.fizzy_ok : pregunta.fizzy_mal, 200);
  guardarLS();
}

function siguientePregunta() {
  const mision = MISIONES.find(m => m.id === estado.misionActualId);
  estado.preguntaIdx++;

  if (estado.preguntaIdx >= mision.preguntas.length) {
    finalizarMision();
  } else {
    mostrarPregunta();
  }
}

/* ─── RESULTADO DE MISIÓN ───────────────────────────────── */
function finalizarMision() {
  sonidoMisionCompleta();
  const mision   = MISIONES.find(m => m.id === estado.misionActualId);
  const correctas = estado.respuestasCorrectas;
  const total     = mision.preguntas.length;
  const puntaje   = correctas;
  const estrellas = calcularEstrellas(puntaje);
  const cristalesGanados = correctas * 2;

  estado.cristales += cristalesGanados;
  estado.energia   += 20; // bonus por completar

  // Actualizar nivel
  const nivelAnterior = estado.nivel;
  estado.nivel = 1 + Math.floor(estado.cristales / 10);

  // Registrar misión completada (guardar mejor puntaje)
  const yaCompletada = estado.misionesCompletadas.find(c => c.id === mision.id);
  if (!yaCompletada) {
    estado.misionesCompletadas.push({ id: mision.id, puntaje, estrellas });
  } else if (puntaje > yaCompletada.puntaje) {
    yaCompletada.puntaje   = puntaje;
    yaCompletada.estrellas = estrellas;
  }
  guardarLS();

  // Mostrar resultado
  const pct = Math.round((correctas / total) * 100);
  const msj = pct === 100 ? '¡Perfecto! ¡Misión dominada!' :
              pct >= 66   ? '¡Muy bien! Sigue practicando.' :
                            '¡Buen intento! Repasa y vuelve a intentarlo.';

  document.getElementById('resultado-contenido').innerHTML = `
    <div class="resultado-titulo">${pct === 100 ? '🏆' : pct >= 66 ? '🎯' : '📚'} ${msj}</div>
    <p class="resultado-subtitulo">${mision.titulo}</p>
    <div class="resultado-estrellas">${estrellas}</div>
    <div class="resultado-stats">
      <div class="resultado-stat">✅ ${correctas} / ${total} correctas</div>
      <div class="resultado-stat">⚡ +${correctas * 10 + 20} energía</div>
      <div class="resultado-stat">💎 +${cristalesGanados} cristales</div>
    </div>
    <p style="color:var(--text-dim);font-size:0.85rem;margin-top:8px;">
      Nivel actual: 🏅 ${estado.nivel}
    </p>
  `;

  mostrarPantalla('pantalla-resultado');

  // Confeti si ≥ 2 correctas
  if (correctas >= 2) lanzarConfeti();

  // Toast de nivel up
  if (estado.nivel > nivelAnterior) {
    setTimeout(() => mostrarNivelUp(estado.nivel), 800);
  }

  // Fizzy final
  const todosCompletos = estado.misionesCompletadas.length === MISIONES.length;
  fizzyHablar(
    todosCompletos ? FIZZY_MENSAJES.felicidades :
    pct === 100    ? `¡${estado.nombre}, eres brillante! Misión ${mision.id} completada al 100%. 🏆` :
                     `Completaste la misión con ${pct}%. ¡Puedes repetirla para mejorar! 💪`
  );
}

/* ─── CONFETI ─────────────────────────────────────────────── */
function lanzarConfeti() {
  const contenedor = document.getElementById('confeti-container');
  const colores = ['#00f5ff','#39ff14','#9b5de5','#ffe500','#ff4757','#fff'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'confeti-pieza';
      p.style.left     = Math.random() * 100 + 'vw';
      p.style.background = colores[Math.floor(Math.random() * colores.length)];
      p.style.width    = (6 + Math.random() * 8) + 'px';
      p.style.height   = (6 + Math.random() * 8) + 'px';
      p.style.animationDuration = (2 + Math.random() * 2) + 's';
      p.style.animationDelay   = '0s';
      contenedor.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }, i * 30);
  }
}

/* ─── NIVEL UP TOAST ─────────────────────────────────────── */
function mostrarNivelUp(nivel) {
  const toast = document.createElement('div');
  toast.className = 'nivel-up-toast';
  toast.innerHTML = `<h2>🏅 ¡Nivel ${nivel}!</h2><p>¡Has subido de nivel!</p>`;
  document.body.appendChild(toast);
  tocarNota(1047, 0.5, 'sine', 0.2);
  setTimeout(() => { tocarNota(1319, 0.5, 'sine', 0.2); }, 200);
  setTimeout(() => toast.remove(), 2800);
  fizzyHablar(FIZZY_MENSAJES.nivel_up, 500);
}

/* ─── FONDO: PARTÍCULAS (Canvas) ───────────────────────── */
const CANVAS = document.getElementById('canvas-fondo');
const CTX    = CANVAS.getContext('2d');

let particulas  = [];
let animFrameId = null;

function redimensionarCanvas() {
  CANVAS.width  = window.innerWidth;
  CANVAS.height = window.innerHeight;
  initParticulas();
}

function initParticulas() {
  particulas = [];
  const n = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 14000));
  for (let i = 0; i < n; i++) {
    particulas.push({
      x:   Math.random() * CANVAS.width,
      y:   Math.random() * CANVAS.height,
      r:   1 + Math.random() * 2.5,
      vx:  (Math.random() - 0.5) * 0.4,
      vy:  (Math.random() - 0.5) * 0.4,
      alpha: 0.3 + Math.random() * 0.5,
      tipo: Math.random() < 0.2 ? 'atomo' : 'estrella'
    });
  }
}

function dibujarParticulas() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

  // Gradiente de fondo
  const grad = CTX.createLinearGradient(0, 0, 0, CANVAS.height);
  grad.addColorStop(0, '#07071a');
  grad.addColorStop(1, '#0d0d2b');
  CTX.fillStyle = grad;
  CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);

  particulas.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = CANVAS.width;
    if (p.x > CANVAS.width)  p.x = 0;
    if (p.y < 0) p.y = CANVAS.height;
    if (p.y > CANVAS.height) p.y = 0;

    CTX.save();
    CTX.globalAlpha = p.alpha;

    if (p.tipo === 'atomo') {
      // Dibujar átomo simple
      CTX.strokeStyle = 'rgba(0,245,255,0.5)';
      CTX.lineWidth   = 0.8;
      CTX.beginPath();
      CTX.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      CTX.stroke();
      CTX.fillStyle = 'rgba(155,93,229,0.6)';
      CTX.beginPath();
      CTX.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      CTX.fill();
    } else {
      // Dibujar estrella/partícula
      CTX.fillStyle = 'rgba(0,245,255,0.7)';
      CTX.beginPath();
      CTX.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      CTX.fill();
    }

    // Líneas de conexión entre partículas cercanas
    for (let j = i + 1; j < particulas.length; j++) {
      const q  = particulas[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) {
        CTX.strokeStyle = `rgba(0,245,255,${0.12 * (1 - d / 100)})`;
        CTX.lineWidth   = 0.5;
        CTX.beginPath();
        CTX.moveTo(p.x, p.y);
        CTX.lineTo(q.x, q.y);
        CTX.stroke();
      }
    }

    CTX.restore();
  });

  animFrameId = requestAnimationFrame(dibujarParticulas);
}

/* ─── FÓRMULAS FLOTANTES ────────────────────────────────── */
const FORMULAS = [
  'F = m·a', 'v = Δx/Δt', 'E = mc²', 'W = F·d·cosθ',
  'Ec = ½mv²', 'Ep = mgh', 'p = mv', 'a = Δv/Δt',
  'v = f·λ', 'F = G·m₁m₂/r²', 'P = W/t', 'ΔE = 0',
  'v² = v₀² + 2a·x', 'x = x₀ + v₀t + ½at²', 'F = kx',
  'PV = nRT', 'Q = m·c·ΔT', 'n = c/v', 'T = 2π√(L/g)'
];

function crearFormulasFlotantes() {
  const contenedor = document.getElementById('formulas-flotantes');
  const cantidad   = 12;

  for (let i = 0; i < cantidad; i++) {
    const el = document.createElement('div');
    el.className   = 'formula-float';
    el.textContent = FORMULAS[Math.floor(Math.random() * FORMULAS.length)];
    el.style.left  = (Math.random() * 95) + 'vw';
    el.style.animationDuration  = (18 + Math.random() * 20) + 's';
    el.style.animationDelay     = -(Math.random() * 30) + 's';
    el.style.fontSize           = (0.8 + Math.random() * 0.8) + 'rem';
    el.style.opacity            = 0.06 + Math.random() * 0.09;
    contenedor.appendChild(el);
  }
}

/* ─── INICIALIZACIÓN ─────────────────────────────────────── */
window.addEventListener('resize', redimensionarCanvas);
redimensionarCanvas();
dibujarParticulas();
crearFormulasFlotantes();
iniciarApp();

/* ═══════════════════════════════════════════════════════════
   LECCIÓN — LAS 3 LEYES DE NEWTON
   ═══════════════════════════════════════════════════════════ */

let leyActual = 0;
const TOTAL_LEYES = 3;

function iniciarLeccion() {
  leyActual = 0;
  mostrarPantalla('pantalla-leccion');
  actualizarCarrusel();
  initLeccionDots();
  fizzyHablar('¡Comencemos con las 3 Leyes de Newton! Toca las escenas para ver las animaciones 👆');
}

function initLeccionDots() {
  const container = document.getElementById('lec-dots');
  container.innerHTML = '';
  for (let i = 0; i < TOTAL_LEYES; i++) {
    const dot = document.createElement('div');
    dot.className = 'lec-dot' + (i === 0 ? ' activo' : '');
    dot.onclick = () => { leyActual = i; actualizarCarrusel(); };
    container.appendChild(dot);
  }
}

function actualizarCarrusel() {
  const track    = document.getElementById('lec-track');
  const counter  = document.getElementById('lec-counter');
  const btnAnt   = document.getElementById('btn-lec-ant');
  const btnSig   = document.getElementById('btn-lec-sig');
  const dots     = document.querySelectorAll('.lec-dot');

  track.style.transform = `translateX(-${leyActual * 100}%)`;
  counter.textContent   = `${leyActual + 1} / ${TOTAL_LEYES}`;
  btnAnt.disabled = leyActual === 0;

  dots.forEach((d, i) => d.classList.toggle('activo', i === leyActual));

  const esUltima = leyActual === TOTAL_LEYES - 1;
  btnSig.textContent  = esUltima ? '¡Jugar ahora! 🎮' : 'Siguiente ▶';
  btnSig.className    = 'btn-lec-sig' + (esUltima ? ' btn-jugar' : '');

  // Mensaje de Fizzy según la ley
  const msgs = [
    '1ª Ley: ¡La inercia explica por qué te vas hacia adelante cuando el bus frena! 🚌',
    '2ª Ley: F = m·a — ¡Es la ecuación más usada en física! Úsala en tu vida. 🚗',
    '3ª Ley: ¡Siempre en pares! El suelo te empuja a ti tanto como tú lo pisas. 🚀'
  ];
  fizzyHablar(msgs[leyActual], 200);
}

function navLey(dir) {
  const esUltima = leyActual === TOTAL_LEYES - 1;
  if (esUltima && dir === 1) {
    // Ir al juego
    iniciarJuegoNewton();
    return;
  }
  leyActual = Math.max(0, Math.min(TOTAL_LEYES - 1, leyActual + dir));
  actualizarCarrusel();
  sonidoClic();
}

function animarEscena(num) {
  const escena = document.getElementById('escena' + num);
  if (!escena) return;
  escena.classList.remove('animando');
  void escena.offsetWidth; // reflow para reiniciar animación
  escena.classList.add('animando');
  sonidoClic();
  setTimeout(() => escena.classList.remove('animando'), 2200);
}

/* ═══════════════════════════════════════════════════════════
   JUEGO NEWTON — 4 mini-retos interactivos
   ═══════════════════════════════════════════════════════════ */

const RETOS = [
  {
    tipo: 'conecta',
    badge: '🔗 Arrastra y Conecta',
    titulo: 'Conecta cada ley con su descripción',
    instruccion: 'Selecciona una descripción (izquierda) y luego haz clic en la ley correcta (derecha).',
    items: [
      { id: 'a', texto: 'Los objetos resisten cambiar su estado de movimiento. Si algo está quieto, sigue quieto; si va rápido, sigue igual.', ley: 1 },
      { id: 'b', texto: 'La aceleración de un objeto es directamente proporcional a la fuerza aplicada e inversamente proporcional a su masa.', ley: 2 },
      { id: 'c', texto: 'Cuando A ejerce una fuerza sobre B, simultáneamente B ejerce sobre A una fuerza de igual magnitud y dirección opuesta.', ley: 3 }
    ],
    leyes: [
      { num: 1, nombre: '1ª Ley', sub: 'Ley de la Inercia' },
      { num: 2, nombre: '2ª Ley', sub: 'F = m · a' },
      { num: 3, nombre: '3ª Ley', sub: 'Acción y Reacción' }
    ],
    explicacion: 'Inercia: los objetos no cambian solos su movimiento. F=ma: fuerza, masa y aceleración están relacionadas. Acción-Reacción: las fuerzas siempre vienen en pares.'
  },
  {
    tipo: 'escenario',
    badge: '🚌 Toma una Decisión',
    titulo: '¿Qué te sucede en el bus?',
    instruccion: 'Lee la situación y elige la respuesta correcta.',
    escena_tipo: 'bus',
    situacion: 'Vas de pie en un bus que viaja a 60 km/h. El conductor frena de golpe. ¿Qué le pasa a tu cuerpo?',
    escena_emoji: ['🚌', '🧍'],
    opciones: [
      { icono: '➡️', texto: 'Tu cuerpo se lanza hacia adelante', correcta: true,
        explicacion: '¡Correcto! Tu cuerpo tenía velocidad hacia adelante (inercia – 1ª Ley). El bus frena, pero tu cuerpo quiere seguir moviéndose en la misma dirección.' },
      { icono: '🚫', texto: 'Te quedas completamente quieto, sin moverte', correcta: false,
        explicacion: 'No. La 1ª Ley dice que tu cuerpo seguirá moviéndose hacia adelante a menos que una fuerza lo detenga. Solo tú mismo (agarrándote) o el cinturón pueden frenarte.' },
      { icono: '⬅️', texto: 'Tu cuerpo va hacia atrás junto con el bus', correcta: false,
        explicacion: 'Eso sucede cuando el bus acelera (arranca). Al frenar, el bus se detiene pero tu cuerpo sigue con su inercia hacia adelante.' }
    ]
  },
  {
    tipo: 'formula',
    badge: '🔢 Completa la Ecuación',
    titulo: 'Calcula la fuerza del auto de carreras',
    instruccion: 'Selecciona la masa y la aceleración correctas para calcular F = m × a.',
    escena_emoji: '🏎️',
    enunciado: 'Un auto de carreras tiene una masa de 800 kg y logra una aceleración de 5 m/s². ¿Cuánta fuerza necesita su motor?',
    masa_correcta: 800,
    acc_correcta: 5,
    resultado: 4000,
    masas:  [400, 800, 1200],
    accs:   [2, 5, 10],
    unidad: 'N'
  },
  {
    tipo: 'identifica',
    badge: '🔍 Identifica la Ley',
    titulo: '¿Qué ley de Newton ves en acción?',
    instruccion: 'Observa las tres situaciones y toca la que muestra la Tercera Ley (Acción y Reacción).',
    escenas: [
      { emoji: '🛹', titulo: 'Skater sin fricción', descripcion: 'Un skater rueda en hielo perfecto. Nadie lo empuja: sigue rodando para siempre.', ley_num: 1, correcta: false },
      { emoji: '🚗💨 vs 🚛', titulo: 'Dos autos: F igual, masa diferente', descripcion: 'Misma fuerza empuja un auto pequeño y un camión. El auto acelera mucho más.', ley_num: 2, correcta: false },
      { emoji: '🚀🔥', titulo: 'Cohete en despegue', descripcion: 'El cohete expulsa gas hacia abajo. Los gases empujan el cohete hacia arriba con igual fuerza.', ley_num: 3, correcta: true }
    ],
    explicacion: 'El cohete muestra la 3ª Ley perfectamente: los gases salen hacia abajo (acción) y el cohete sube (reacción). ¡Funciona incluso en el vacío del espacio!'
  }
];

// Estado del juego Newton
let retoIdx    = 0;
let juegoScore = 0;
let retoRespondido = false;

// Estado del reto "conecta"
let chipSeleccionado = null;
let asignaciones = {};   // slotLey -> chipId

// Estado del reto "formula"
let formulaMasa = null;
let formulaAcc  = null;

function iniciarJuegoNewton() {
  retoIdx    = 0;
  juegoScore = 0;
  chipSeleccionado   = null;
  asignaciones       = {};
  formulaMasa = null;
  formulaAcc  = null;
  mostrarPantalla('pantalla-juego');
  renderReto();
  fizzyHablar('¡Hora de jugar! Pon a prueba lo que aprendiste sobre las 3 Leyes. ¡Tú puedes! 🎮');
}

function actualizarHUDJuego() {
  const pct = (retoIdx / RETOS.length) * 100;
  document.getElementById('juego-barra-fill').style.width = pct + '%';
  document.getElementById('juego-pts').textContent = juegoScore;
}

function renderReto() {
  retoRespondido = false;
  chipSeleccionado = null;
  asignaciones = {};
  formulaMasa = null;
  formulaAcc  = null;

  document.getElementById('juego-sig-wrap').classList.add('oculto');
  actualizarHUDJuego();

  const reto = RETOS[retoIdx];
  const zona = document.getElementById('juego-zona');
  zona.innerHTML = '';

  if (reto.tipo === 'conecta')    renderConecta(reto, zona);
  if (reto.tipo === 'escenario')  renderEscenario(reto, zona);
  if (reto.tipo === 'formula')    renderFormula(reto, zona);
  if (reto.tipo === 'identifica') renderIdentifica(reto, zona);
}

/* ─── RETO 1: Conecta ───────────────────────────────────── */
function renderConecta(reto, zona) {
  // Mezclar descripciones
  const descs = [...reto.items].sort(() => Math.random() - 0.5);

  zona.innerHTML = `
    <div class="reto-card">
      <div class="reto-tipo-badge">${reto.badge}</div>
      <div class="reto-titulo">${reto.titulo}</div>
      <div class="reto-instruccion">${reto.instruccion}</div>
      <div class="conecta-grid">
        <div>
          <div class="conecta-col-titulo">Descripciones</div>
          ${descs.map(d => `
            <div class="desc-chip" id="chip-${d.id}" onclick="seleccionarChip('${d.id}')">
              ${d.texto}
            </div>`).join('')}
        </div>
        <div>
          <div class="conecta-col-titulo">Leyes</div>
          ${reto.leyes.map(l => `
            <div class="ley-slot" id="slot-${l.num}" onclick="asignarSlot(${l.num})">
              <span>${l.nombre}</span>
              <span class="slot-desc" style="color:var(--text-dim);font-weight:400">${l.sub}</span>
              <span id="slot-text-${l.num}" style="font-size:0.72rem;margin-top:4px;display:none;"></span>
            </div>`).join('')}
        </div>
      </div>
      <button class="conecta-verificar" id="btn-verificar-conecta" onclick="verificarConecta()" disabled>
        ✓ Verificar respuestas
      </button>
      <div id="feedback-conecta"></div>
    </div>
  `;
}

function seleccionarChip(id) {
  if (retoRespondido) return;
  // Deseleccionar el anterior
  document.querySelectorAll('.desc-chip').forEach(c => c.classList.remove('seleccionado'));
  chipSeleccionado = id;
  const el = document.getElementById('chip-' + id);
  if (el && !el.classList.contains('correcto') && !el.classList.contains('incorrecto')) {
    el.classList.add('seleccionado');
    fizzyHablar('¡Bien! Ahora haz clic en la ley que le corresponde. 👆');
    sonidoClic();
  }
}

function asignarSlot(leyNum) {
  if (retoRespondido || !chipSeleccionado) return;
  const slot = document.getElementById('slot-' + leyNum);
  if (slot && slot.dataset.asignado) return; // ya tiene chip

  // Reasignar si el chip ya estaba en otro slot
  Object.keys(asignaciones).forEach(key => {
    if (asignaciones[key] === chipSeleccionado) {
      delete asignaciones[key];
      const oldSlot = document.getElementById('slot-' + key);
      if (oldSlot) {
        delete oldSlot.dataset.asignado;
        const txt = document.getElementById('slot-text-' + key);
        if (txt) { txt.style.display = 'none'; txt.textContent = ''; }
      }
    }
  });

  asignaciones[leyNum] = chipSeleccionado;
  slot.dataset.asignado = chipSeleccionado;

  // Mostrar texto abreviado en el slot
  const reto = RETOS[0];
  const item  = reto.items.find(i => i.id === chipSeleccionado);
  const txt   = document.getElementById('slot-text-' + leyNum);
  if (txt && item) {
    txt.textContent = '"' + item.texto.substring(0, 45) + '…"';
    txt.style.display = 'block';
  }

  // Ocultar chip (queda en slot)
  const chip = document.getElementById('chip-' + chipSeleccionado);
  if (chip) { chip.style.opacity = '0.3'; chip.style.pointerEvents = 'none'; }

  chipSeleccionado = null;
  document.querySelectorAll('.desc-chip').forEach(c => c.classList.remove('seleccionado'));
  sonidoClic();

  // Habilitar verificar si todos los slots están llenos
  if (Object.keys(asignaciones).length === RETOS[0].leyes.length) {
    document.getElementById('btn-verificar-conecta').disabled = false;
  }
}

function verificarConecta() {
  retoRespondido = true;
  const reto   = RETOS[0];
  let correctas = 0;

  reto.leyes.forEach(l => {
    const chipId = asignaciones[l.num];
    const item   = reto.items.find(i => i.id === chipId);
    const slot   = document.getElementById('slot-' + l.num);
    const chip   = document.getElementById('chip-' + chipId);
    if (item && item.ley === l.num) {
      if (slot) slot.classList.add('correcto');
      if (chip) { chip.classList.add('correcto'); chip.style.opacity = '1'; }
      correctas++;
    } else {
      if (slot) slot.classList.add('incorrecto');
      if (chip) { chip.classList.add('incorrecto'); chip.style.opacity = '1'; }
    }
  });

  if (correctas === 3) {
    sonidoCorrecto();
    juegoScore += 30;
    mostrarFeedbackConecta(true, '¡Perfecto! Conectaste las 3 leyes correctamente.', reto.explicacion);
    fizzyHablar('¡EXCELENTE! ¡Las 3 leyes en el lugar correcto! Eres un físico en formación. 🏆');
  } else {
    sonidoIncorrecto();
    juegoScore += correctas * 8;
    mostrarFeedbackConecta(false, `${correctas} de 3 correctas. ¡Sigue practicando!`, reto.explicacion);
    fizzyHablar(`${correctas} de 3. No te rindas — la práctica hace al físico. 💪`);
  }
  actualizarHUDJuego();
  document.getElementById('btn-verificar-conecta').disabled = true;
  document.getElementById('juego-sig-wrap').classList.remove('oculto');
  guardarLS();
}

function mostrarFeedbackConecta(ok, titulo, explicacion) {
  const fb = document.getElementById('feedback-conecta');
  if (!fb) return;
  fb.innerHTML = `
    <div class="reto-feedback ${ok ? 'ok' : 'mal'}" style="margin-top:14px">
      <div class="reto-feedback-icon">${ok ? '🏆' : '📚'}</div>
      <div class="reto-feedback-body">
        <p><strong>${titulo}</strong></p>
        <p>${explicacion}</p>
      </div>
    </div>`;
}

/* ─── RETO 2: Escenario ─────────────────────────────────── */
function renderEscenario(reto, zona) {
  const opcionesHTML = reto.opciones.map((op, i) => `
    <button class="btn-escenario" id="esc-op-${i}" onclick="responderEscenario(${i})">
      <span class="btn-esc-icon">${op.icono}</span>
      <span>${op.texto}</span>
    </button>`).join('');

  zona.innerHTML = `
    <div class="reto-card">
      <div class="reto-tipo-badge">${reto.badge}</div>
      <div class="reto-titulo">${reto.titulo}</div>
      <div class="reto-instruccion">${reto.instruccion}</div>
      <div class="escenario-visual" id="esc-visual">
        <div class="esc-bus">
          <span class="esc-bus-emoji">🚌</span>
          <span class="esc-persona-bus">🧍</span>
        </div>
        <div class="escenario-label">1ª Ley · Inercia</div>
      </div>
      <p class="escenario-pregunta">${reto.situacion}</p>
      <div class="opciones-escenario">${opcionesHTML}</div>
      <div id="feedback-esc"></div>
    </div>`;

  // Animar el bus después de un segundo
  setTimeout(() => {
    const vis = document.getElementById('esc-visual');
    if (vis) vis.classList.add('esc-frena');
  }, 800);
}

function responderEscenario(idx) {
  if (retoRespondido) return;
  retoRespondido = true;
  const reto = RETOS[retoIdx];
  const op   = reto.opciones[idx];

  document.querySelectorAll('.btn-escenario').forEach(b => b.disabled = true);
  const btnEl = document.getElementById('esc-op-' + idx);
  if (btnEl) btnEl.classList.add(op.correcta ? 'correcto' : 'incorrecto');

  if (op.correcta) {
    // Marcar la correcta en verde siempre
    sonidoCorrecto();
    juegoScore += 25;
    fizzyHablar('¡Correcto! ¡La inercia en tu vida cotidiana! 🎯');
  } else {
    sonidoIncorrecto();
    // Mostrar cuál era la correcta
    reto.opciones.forEach((o, i) => {
      if (o.correcta) {
        const b = document.getElementById('esc-op-' + i);
        if (b) b.classList.add('correcto');
      }
    });
    fizzyHablar('Recuerda: la inercia hace que tu cuerpo quiera seguir moviéndose. 1ª Ley de Newton.');
  }

  const fb = document.getElementById('feedback-esc');
  if (fb) fb.innerHTML = `
    <div class="reto-feedback ${op.correcta ? 'ok' : 'mal'}" style="margin-top:12px">
      <div class="reto-feedback-icon">${op.correcta ? '✅' : '❌'}</div>
      <div class="reto-feedback-body"><p>${op.explicacion}</p></div>
    </div>`;

  actualizarHUDJuego();
  document.getElementById('juego-sig-wrap').classList.remove('oculto');
  guardarLS();
}

/* ─── RETO 3: Fórmula ───────────────────────────────────── */
function renderFormula(reto, zona) {
  const masasHTML = reto.masas.map(m => `
    <div class="token" id="tok-masa-${m}" onclick="seleccionarValor('masa', ${m})">${m} kg</div>`).join('');
  const accsHTML = reto.accs.map(a => `
    <div class="token" id="tok-acc-${a}" onclick="seleccionarValor('acc', ${a})">${a} m/s²</div>`).join('');

  zona.innerHTML = `
    <div class="reto-card formula-juego-wrap">
      <div class="reto-tipo-badge">${reto.badge}</div>
      <div class="reto-titulo">${reto.titulo}</div>
      <div class="reto-instruccion">${reto.instruccion}</div>
      <div class="escenario-formula">
        <div class="esc-formula-car">${reto.escena_emoji}</div>
        <p style="font-size:0.88rem;color:var(--text-dim);margin:8px 0">${reto.enunciado}</p>
        <div class="formula-ecuacion">
          <span style="color:var(--cyan);font-weight:900">F</span>
          <span>=</span>
          <div class="formula-slot-num" id="slot-masa" onclick="limpiarSlot('masa')">?</div>
          <span>×</span>
          <div class="formula-slot-num" id="slot-acc" onclick="limpiarSlot('acc')">?</div>
          <span>=</span>
          <div class="formula-slot-num" id="slot-res" style="min-width:90px">? ${reto.unidad}</div>
        </div>
      </div>
      <div class="formula-bancos">
        <div class="banco-grupo">
          <div class="banco-label">Masa (kg)</div>
          <div class="banco-tokens">${masasHTML}</div>
        </div>
        <div class="banco-grupo">
          <div class="banco-label">Aceleración (m/s²)</div>
          <div class="banco-tokens">${accsHTML}</div>
        </div>
      </div>
      <button class="btn-calcular" id="btn-calcular" onclick="calcularFormula()" disabled>
        ⚡ Calcular F = m × a
      </button>
      <div id="feedback-formula"></div>
    </div>`;
}

function seleccionarValor(tipo, valor) {
  if (retoRespondido) return;
  sonidoClic();
  if (tipo === 'masa') {
    // Desmarcar anterior
    RETOS[retoIdx].masas.forEach(m => {
      const t = document.getElementById('tok-masa-' + m);
      if (t) t.classList.remove('seleccionado');
    });
    formulaMasa = valor;
    const t = document.getElementById('tok-masa-' + valor);
    if (t) t.classList.add('seleccionado');
    const slot = document.getElementById('slot-masa');
    if (slot) { slot.textContent = valor + ' kg'; slot.classList.add('tiene-valor'); }
  } else {
    RETOS[retoIdx].accs.forEach(a => {
      const t = document.getElementById('tok-acc-' + a);
      if (t) t.classList.remove('seleccionado');
    });
    formulaAcc = valor;
    const t = document.getElementById('tok-acc-' + valor);
    if (t) t.classList.add('seleccionado');
    const slot = document.getElementById('slot-acc');
    if (slot) { slot.textContent = valor + ' m/s²'; slot.classList.add('tiene-valor'); }
  }
  // Actualizar resultado provisional
  const slotRes = document.getElementById('slot-res');
  const reto    = RETOS[retoIdx];
  if (formulaMasa && formulaAcc && slotRes) {
    slotRes.textContent = (formulaMasa * formulaAcc) + ' ' + reto.unidad;
  }
  // Habilitar botón si ambos seleccionados
  const btn = document.getElementById('btn-calcular');
  if (btn) btn.disabled = !(formulaMasa && formulaAcc);
}

function limpiarSlot(tipo) {
  if (retoRespondido) return;
  if (tipo === 'masa') {
    formulaMasa = null;
    RETOS[retoIdx].masas.forEach(m => {
      const t = document.getElementById('tok-masa-' + m);
      if (t) t.classList.remove('seleccionado');
    });
    const slot = document.getElementById('slot-masa');
    if (slot) { slot.textContent = '?'; slot.classList.remove('tiene-valor'); }
  } else {
    formulaAcc = null;
    RETOS[retoIdx].accs.forEach(a => {
      const t = document.getElementById('tok-acc-' + a);
      if (t) t.classList.remove('seleccionado');
    });
    const slot = document.getElementById('slot-acc');
    if (slot) { slot.textContent = '?'; slot.classList.remove('tiene-valor'); }
  }
  const btn = document.getElementById('btn-calcular');
  if (btn) btn.disabled = !(formulaMasa && formulaAcc);
}

function calcularFormula() {
  if (retoRespondido) return;
  retoRespondido = true;
  const reto       = RETOS[retoIdx];
  const resultado  = (formulaMasa || 0) * (formulaAcc || 0);
  const esCorrecto = formulaMasa === reto.masa_correcta && formulaAcc === reto.acc_correcta;

  document.getElementById('btn-calcular').disabled = true;

  const slotMasa = document.getElementById('slot-masa');
  const slotAcc  = document.getElementById('slot-acc');
  const slotRes  = document.getElementById('slot-res');

  if (esCorrecto) {
    sonidoCorrecto();
    juegoScore += 30;
    if (slotMasa) slotMasa.classList.add('correcto');
    if (slotAcc)  slotAcc.classList.add('correcto');
    if (slotRes)  slotRes.classList.add('correcto');
    fizzyHablar(`¡Perfecto! F = ${reto.masa_correcta} × ${reto.acc_correcta} = ${reto.resultado} N. ¡Eso es física aplicada! ⚡`);
  } else {
    sonidoIncorrecto();
    if (slotMasa) slotMasa.classList.add('incorrecto');
    if (slotAcc)  slotAcc.classList.add('incorrecto');
    fizzyHablar(`La respuesta era: F = ${reto.masa_correcta} kg × ${reto.acc_correcta} m/s² = ${reto.resultado} N. ¡Toma nota! 📝`);
  }

  const fb = document.getElementById('feedback-formula');
  if (fb) fb.innerHTML = `
    <div class="reto-feedback ${esCorrecto ? 'ok' : 'mal'}" style="margin-top:12px">
      <div class="reto-feedback-icon">${esCorrecto ? '🏆' : '📚'}</div>
      <div class="reto-feedback-body">
        <p><strong>F = m · a = ${reto.masa_correcta} × ${reto.acc_correcta} = <span style="color:var(--cyan)">${reto.resultado} N</span></strong></p>
        <p>${esCorrecto ? '¡Excelente cálculo! El auto de carreras necesita ' + reto.resultado + ' Newtons de fuerza.' : 'Recuerda: siempre identifica masa y aceleración del enunciado, luego multiplica.'}</p>
      </div>
    </div>`;

  actualizarHUDJuego();
  document.getElementById('juego-sig-wrap').classList.remove('oculto');
  guardarLS();
}

/* ─── RETO 4: Identifica ────────────────────────────────── */
function renderIdentifica(reto, zona) {
  const escenasHTML = reto.escenas.map((e, i) => `
    <div class="escena-mini" id="em-${i}" onclick="responderIdentifica(${i})">
      <div class="em-icon">${e.emoji}</div>
      <div style="font-size:0.8rem;font-weight:700;color:var(--text)">${e.titulo}</div>
      <div class="em-label">${e.descripcion}</div>
      <div class="em-ley">Ley ${e.ley_num}</div>
    </div>`).join('');

  zona.innerHTML = `
    <div class="reto-card">
      <div class="reto-tipo-badge">${reto.badge}</div>
      <div class="reto-titulo">${reto.titulo}</div>
      <div class="reto-instruccion">${reto.instruccion}</div>
      <div class="identifica-escenas">${escenasHTML}</div>
      <div id="feedback-identifica"></div>
    </div>`;

  // Animar los iconos en loop suave
  reto.escenas.forEach((_, i) => {
    const em = document.getElementById('em-' + i);
    if (em) em.classList.add('animando');
  });
}

function responderIdentifica(idx) {
  if (retoRespondido) return;
  retoRespondido = true;
  const reto = RETOS[retoIdx];
  const esc  = reto.escenas[idx];

  document.querySelectorAll('.escena-mini').forEach(e => {
    e.classList.remove('animando');
    e.classList.add('respondida');
  });

  const emEl = document.getElementById('em-' + idx);
  if (emEl) emEl.classList.add(esc.correcta ? 'correcto' : 'incorrecto');

  // Marcar la correcta siempre
  reto.escenas.forEach((e, i) => {
    if (e.correcta && i !== idx) {
      const el = document.getElementById('em-' + i);
      if (el) el.classList.add('correcto');
    }
  });

  if (esc.correcta) {
    sonidoCorrecto();
    juegoScore += 25;
    fizzyHablar('¡Exacto! El cohete es el ejemplo clásico de la 3ª Ley. ¡Eres un genio! 🚀');
  } else {
    sonidoIncorrecto();
    fizzyHablar('El cohete muestra la 3ª Ley: gas expulsado hacia abajo → cohete sube. ¡Memorízalo con esa imagen! 🚀');
  }

  const fb = document.getElementById('feedback-identifica');
  if (fb) fb.innerHTML = `
    <div class="reto-feedback ${esc.correcta ? 'ok' : 'mal'}" style="margin-top:12px">
      <div class="reto-feedback-icon">${esc.correcta ? '🚀' : '📚'}</div>
      <div class="reto-feedback-body">
        <p>${reto.explicacion}</p>
      </div>
    </div>`;

  actualizarHUDJuego();
  const btnSig = document.getElementById('btn-juego-sig');
  if (btnSig) {
    btnSig.textContent = '🏁 Ver mi resultado final';
  }
  document.getElementById('juego-sig-wrap').classList.remove('oculto');
  guardarLS();
}

/* ─── Navegación entre retos ────────────────────────────── */
function siguienteReto() {
  retoIdx++;
  if (retoIdx >= RETOS.length) {
    mostrarResultadoJuego();
    return;
  }
  renderReto();
  sonidoClic();
}

/* ─── Resultado final del juego Newton ──────────────────── */
function mostrarResultadoJuego() {
  const max  = 110; // máximo posible (30+25+30+25)
  const pct  = Math.round((juegoScore / max) * 100);
  const estrellas = pct >= 90 ? '⭐⭐⭐' : pct >= 60 ? '⭐⭐☆' : '⭐☆☆';
  const msj  = pct >= 90 ? '¡Maestro de Newton! 🏆'
             : pct >= 60 ? '¡Muy buen trabajo! 🎯'
             : '¡Sigue practicando! 📚';

  // Sumar al estado del juego
  estado.energia   += juegoScore;
  estado.cristales += Math.floor(juegoScore / 10);
  estado.nivel      = 1 + Math.floor(estado.cristales / 10);
  if (!estado.misionesCompletadas.find(m => m.id === 'newton')) {
    estado.misionesCompletadas.push({ id: 'newton', puntaje: juegoScore, estrellas });
  }
  guardarLS();

  document.getElementById('juego-barra-fill').style.width = '100%';
  document.getElementById('juego-pts').textContent = juegoScore;

  const zona = document.getElementById('juego-zona');
  zona.innerHTML = `
    <div class="juego-resultado-card">
      <div style="font-size:3rem;margin-bottom:8px">${pct >= 90 ? '🏆' : pct >= 60 ? '🎯' : '📚'}</div>
      <div class="juego-res-titulo">${msj}</div>
      <p class="juego-res-sub">Leyes de Newton — Juego completado</p>
      <div style="font-size:1.8rem;letter-spacing:6px;margin:10px 0">${estrellas}</div>
      <div class="juego-res-stats">
        <div class="juego-res-stat">⚡ ${juegoScore} puntos</div>
        <div class="juego-res-stat">💎 +${Math.floor(juegoScore/10)} cristales</div>
      </div>
      <p style="font-size:0.85rem;color:var(--text-dim);margin-top:10px">
        ¡Continúa explorando más temas de física en el Mapa de Misiones!
      </p>
      <button class="btn-principal" onclick="irAlMapa()" style="margin-top:18px">
        🗺️ Ir al Mapa de Misiones
      </button>
      <button class="btn-secundario" onclick="iniciarJuegoNewton()" style="margin-top:10px;width:100%">
        🔄 Repetir juego
      </button>
    </div>`;

  document.getElementById('juego-sig-wrap').classList.add('oculto');

  if (juegoScore >= 60) lanzarConfeti();
  fizzyHablar(pct >= 90
    ? `¡${estado.nombre}, eres increíble! Dominas las 3 Leyes de Newton. ¡Al mapa! 🏆`
    : `¡Completaste el juego! Puedes repetirlo para mejorar. ¡La física se aprende con práctica! 💪`
  , 300);
}

function irAlMapa() {
  mostrarPantalla('pantalla-mapa');
  actualizarMapa();
}
