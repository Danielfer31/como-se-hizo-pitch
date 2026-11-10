/* Datos de la historia. Citas y hechos tomados de _investigacion/*.md (sesiones reales de Codex y Claude).
   Sin credenciales, correos, teléfonos, rutas de usuario ni direcciones de red. */
window.STORY = {
  titulo: "Cómo se hizo",
  subtitulo: "Tres piezas, tres semanas y una pregunta: ¿qué hace la IA y qué decidimos nosotros?",
  equipo: [
    { id: "daniel", nombre: "Daniel", completo: "Daniel Fernando De León Castro", ficha: "assets/personajes/ficha_daniel.jpg", corte: "assets/personajes/cut/daniel.webp", cara: "assets/personajes/cut/daniel_cara.webp" },
    { id: "hector", nombre: "Héctor", completo: "Héctor Jamez Jara Londoño", ficha: "assets/personajes/ficha_hector.jpg", corte: "assets/personajes/cut/hector.webp", cara: "assets/personajes/cut/hector_cara.webp" },
    { id: "victor", nombre: "Víctor", completo: "Víctor Andrés Losada Bermeo", ficha: "assets/personajes/ficha_victor.jpg", corte: "assets/personajes/cut/victor.webp", cara: "assets/personajes/cut/victor_cara.webp" }
  ],
  /* Lema de la portada: el método descrito en la viñeta de cierre («pedir, comprobar, decidir y declarar»). Reparto de voces ilustrativo. */
  lema: [
    { quien: "daniel", texto: "Pedir." },
    { quien: "hector", texto: "Comprobar." },
    { quien: "victor", texto: "Decidir y declarar." }
  ],
  /* Voces: audios en assets/voces/<persona>/<vineta>_<paso>.mp3 (ver voces_guion.md).
     Una voz solo suena si su persona la autorizó por escrito: poner true aquí. sintetica: true si es clon. */
  voces: { carpeta: "assets/voces/", formato: "mp3", sintetica: true, autorizadas: { daniel: true, hector: true, victor: true } },
  pasos: ["Historia", "Prompt", "Resultado", "Decisión"],
  carriles: [
    { id: "podcast", nombre: "Podcast", color: "#0B7A75" },
    { id: "comic", nombre: "Cómic", color: "#B7791F" },
    { id: "video", nombre: "Video", color: "#B4443A" }
  ],
  actos: [
    { id: 0, nombre: "Prólogo", carril: null, rango: "24 oct" },
    { id: 1, nombre: "Acto I · El podcast", carril: "podcast", rango: "24 – 27 oct" },
    { id: 2, nombre: "Acto II · El cómic", carril: "comic", rango: "27 – 28 oct" },
    { id: 3, nombre: "Acto III · El video", carril: "video", rango: "4 – 9 nov" },
    { id: 4, nombre: "Cierre", carril: null, rango: "9 nov" }
  ],
  vinetas: [
    {
      id: "p0", acto: 0, carril: null, fecha: "24 oct · 10:46", herramienta: "Codex",
      titulo: "«Analicemos esta actividad»",
      narracion: "Todo empezó con un enlace de Moodle y una frase. Un curso de transmedia con IA, tres compañeros y tres piezas por hacer: un podcast, un cómic y un video.",
      alt: "Los tres integrantes del equipo frente a una pantalla con el enlace de la actividad, en una mesa de trabajo.",
      globos: [{ quien: "hector", texto: "Analicemos esta actividad." }],
      pestanas: {
        prompt: "«Analicemos esta actividad.» (con el enlace de Moodle)",
        resultado: "Codex leyó la consigna: podcast de 3 a 5 minutos, formato entrevista, 2 o 3 integrantes, PDF con guion y una rúbrica de cuatro criterios.",
        decision: "Grabarse en persona. La guía permitía voces sintéticas o grabación propia, y los audios muestran que el equipo eligió hablar por sí mismo."
      },
      evidencia: []
    },
    {
      id: "a1", acto: 1, carril: "podcast", fecha: "24 oct · 11:33", herramienta: "Codex",
      titulo: "Tres expertos que se contradicen",
      narracion: "Antes de escribir una línea, el equipo pidió a la IA que debatiera la pregunta desde varios lados. Tres expertos virtuales discutieron y una revisión cruzada los obligó a corregirse.",
      alt: "Tres figuras de expertos virtuales debatiendo sobre una mesa mientras el equipo toma notas.",
      globos: [{ quien: "victor", texto: "Revisemos las fuentes, para tener la precisión con APA 7." }],
      pestanas: {
        prompt: "«Desarrollemos un sistema multiagénticos de expertos que permita desarrollar desde varias perspectivas las preguntas antes de desarrollar el guion.»",
        resultado: "Tres expertos (educación transmedia, IA crítica, podcast y colaboración) y un contraste cruzado. Tesis: la tecnología abre posibilidades, pero su presencia no prueba aprendizaje. Un borrador citaba «Wang et al. (2024)»; la fuente correcta era Deng et al. (2025).",
        decision: "«Revisemos las fuentes, para tener la precisión con APA 7.» Se verificaron todas las citas antes de usarlas."
      },
      evidencia: []
    },
    {
      id: "a2", acto: 1, carril: "podcast", fecha: "24 oct · 11:53", herramienta: "Codex",
      titulo: "El reloj no cuadra",
      narracion: "Quince minutos, tres, seis y medio, siete y cuarenta y siete. La duración cambió cuatro veces hasta que el docente autorizó la versión larga. Los papeles quedaron claros: Víctor anfitrión; Héctor y Daniel, expertos.",
      alt: "Un reloj gigante sobre la mesa con cifras de minutos que cambian mientras los tres integrantes discuten.",
      globos: [{ quien: "daniel", texto: "Podemos hacerlo un poco más extenso." }],
      pestanas: {
        prompt: "«Este guion será la guía que usaremos nosotros para hacer el podcast, por tanto tiene que estar todo textual y referenciado.»",
        resultado: "La IA supuso 15–18 minutos; la consigna pedía 3–5. Se escribió un guion de 6:30 con 27 intervenciones y el audio final quedó en 7:47. El título «Aprender entre pantallas» lo propuso la IA.",
        decision: "«Podemos hacerlo un poco más extenso, 6-7 minutos.» El 27 de octubre el docente autorizó una versión más larga; el guion se dejó tal como se escribió."
      },
      evidencia: []
    },
    {
      id: "a3", acto: 1, carril: "podcast", fecha: "24 oct · 16:25", herramienta: "Codex",
      titulo: "Cuatro pantallas, un solo guion",
      narracion: "Para grabar sin tropezar con las palabras, nació un teleprompter: tres pantallas privadas, una por persona, y una de coordinación. Cada quien veía solo su parlamento.",
      alt: "Tres personas con una tableta o portátil cada una, leyendo su propio texto, y una cuarta pantalla con el control.",
      globos: [{ quien: "hector", texto: "Que solo muestre lo de cada quien." }],
      pestanas: {
        prompt: "«Vamos a crear una app que permita ver el guion en el momento que se esté grabando, la idea es que vayamos viendo lo que tiene que decir cada quien.»",
        resultado: "Una app local con tres pantallas privadas y una de coordinación, desarrollada con subagentes y revisores independientes. Dos fallos reales: el servidor arrancó encerrado en el aislamiento y «no cargaba»; y el indicador «Sincronizado» mentía si se caía la transmisión en vivo. Se corrigieron.",
        decision: "«Cada integrante con su propia pantalla, pero que estén coordinados los 4, y que solo muestre lo de cada quien.»"
      },
      evidencia: []
    },
    {
      id: "a4", acto: 1, carril: "podcast", fecha: "25 oct · 08:07", herramienta: "Codex",
      titulo: "El ruido fantasma y la IA que no quiso adivinar",
      narracion: "Las voces son humanas, las de los tres. En el audio, los silencios seguían sonando. Después, al preparar el reproductor, la IA se negó a adivinar quién hablaba en cada momento.",
      alt: "Una mesa de grabación con micrófonos y una onda de audio; la figura de una IA levanta las manos y dice que no sabe quién habla.",
      globos: [{ quien: "victor", texto: "Cuando nadie está hablando siguen habiendo ruidos." }],
      pestanas: {
        prompt: "«Cuando se esté reproduciendo el audio se muestre quién es el panelista que está hablando.»",
        resultado: "La transcripción no identifica a quien habla y la IA se negó a atribuir voces «por intuición». Con análisis acústico dejó 49 intervalos (≈5:20) identificados y el resto en neutro, con el aviso «Identificación automática parcial». Antes, una puerta de ruido bajó los silencios de −49 a −117 dBFS (versión final de 7:47).",
        decision: "El equipo aceptó una identificación parcial y honesta antes que una completa e inventada. El podcast se publicó el 25 de octubre."
      },
      evidencia: [
        { src: "assets/evidencia/a4_presentadores.jpg", titulo: "Los tres presentadores del podcast (retratos de IA derivados de una foto, ya publicados).", tipo: "ilustracion" },
        { src: "assets/evidencia/a4_reproductor.jpg", titulo: "Captura del reproductor con aviso de identificación parcial.", tipo: "captura" }
      ]
    },
    {
      id: "c1", acto: 2, carril: "comic", fecha: "27 oct · 17:20", herramienta: "Claude · Codex",
      titulo: "Un barrio que no existe",
      narracion: "Para el cómic, Claude escribe la historia y Codex dibuja. Nace «Lo que el río sabe»: en Montería, una IA inventa el barrio «Villa Esmeralda» y un estudiante que vive allí lo desmiente.",
      alt: "Un caño con basura junto a casas de zinc en Montería y una tableta que muestra un dato inventado marcado en rojo.",
      globos: [{ quien: "daniel", texto: "Me gusta que sea en Montería." }],
      pestanas: {
        prompt: "«Quiero que hagamos una página web que sea con un cómic, que generemos las imágenes mediante MCP de Codex ChatGPT…»",
        resultado: "Título «Lo que el río sabe», 8 escenas, cinco personajes y una IA sin cuerpo: una tableta con chat. El dato inventado de la historia (el barrio y un 87 %) es deliberadamente ficticio. Tropiezo: unos 25 minutos tratando de que Claude entrara a Moodle, hasta que se pegó la consigna.",
        decision: "«Me gusta que sea en Montería.» El equipo eligió Montería como escenario."
      },
      evidencia: [{ src: "assets/evidencia/c1_portada.jpg", titulo: "Portada del cómic publicado.", tipo: "ilustracion" }]
    },
    {
      id: "c2", acto: 2, carril: "comic", fecha: "27 oct · 17:44", herramienta: "Claude · Codex",
      titulo: "Las fichas con nombres cambiados",
      narracion: "Cada imagen salió de una ejecución de Codex lanzada desde Claude. El primer intento falló tres veces, y el archivo de Andrés mostraba a Yeimi. Nada se borró: todo fue a una carpeta de descartes.",
      alt: "Varias fichas de personaje sobre una mesa; una etiqueta equivocada cubre a un estudiante y una falda demasiado corta está marcada con una cruz.",
      globos: [{ quien: "hector", texto: "Apruebo las fichas." }],
      pestanas: {
        prompt: "Ficha de Yeimi: «15-year-old Colombian schoolgirl… navy pleated skirt reaching below the knee… Bright, quick, a little impatient.»",
        resultado: "Cinco fichas y ocho bocetos. Fallos: una opción de Codex que ya no existía, un modelo que la cuenta no aceptaba, una opción que se tragaba el texto del prompt, nombres de archivo cruzados y una falda demasiado corta.",
        decision: "«Renombra los archivos y regenera la ficha de Mariana y la de Yeimi con falda de uniforme a la rodilla.» Los errores se archivaron en «descartes», no se eliminaron."
      },
      evidencia: [
        { src: "assets/evidencia/c2_yeimi_descartada.jpg", titulo: "Ficha descartada: falda demasiado corta.", tipo: "ilustracion" },
        { src: "assets/evidencia/c2_mariana_ficha.jpg", titulo: "Ficha aprobada de Mariana.", tipo: "ilustracion" }
      ]
    },
    {
      id: "c3", acto: 2, carril: "comic", fecha: "27 oct · 19:00", herramienta: "Claude · Codex",
      titulo: "La tableta mágica y la hoja en espejo",
      narracion: "La IA del cómic aparecía como una pantalla con ondas de luz que no parecía real. Luego, al pasar la hoja, la página giraba en espejo con los globos al revés. Se corrigieron antes de publicar.",
      alt: "Una tableta con rayos de luz de fantasía junto a una página que se voltea con el texto invertido.",
      globos: [{ quien: "victor", texto: "Ese computador no se ve realista." }],
      pestanas: {
        prompt: "«Debemos cambiar… las imágenes donde sale computador, porque ese computador no se ve realista.»",
        resultado: "Una auditoría listó 10 fallos, entre ellos logos de Nike en los tenis, Mariana repetida en un tríptico y una tableta encendida cuando el guion la decía apagada. Se fijó una regla: tableta escolar con funda de goma gris y, si se ve la pantalla, se ve al personaje de espaldas.",
        decision: "«Apruebo el plan: corrige los fallos y amplía a 3 viñetas por escena (24 en total).»"
      },
      evidencia: [
        { src: "assets/evidencia/c3_dispositivo_irreal.jpg", titulo: "Viñeta descartada: dispositivo irreal.", tipo: "ilustracion" },
        { src: "assets/evidencia/c3_pantalla_al_reves.jpg", titulo: "Viñeta descartada: pantalla al revés.", tipo: "ilustracion" }
      ]
    },
    {
      id: "c4", acto: 2, carril: "comic", fecha: "28 oct", herramienta: "Claude · Pixabay",
      titulo: "¿A qué suena el Sinú?",
      narracion: "El río del primer montaje sonaba como una corriente fuerte. Al probar el cómic, el equipo se dio cuenta de que ese sonido desentonaba con el Sinú que quería retratar. También hubo que corregir lo que se oía.",
      imagen: "assets/vinetas/c4-sinu.jpg",
      alt: "Yeimi y Andrés escuchan a don Aurelio en la ribera. Yeimi sostiene un celular y Andrés toma apuntes.",
      pestanas: {
        prompt: "«El río Sinú es más tranquilo, no tiene tanta corriente». El equipo pidió un ambiente más suave, con aves y viento.",
        resultado: "El ruido sintetizado se sustituyó por grabaciones de río, aves y viento. El cómic incorporó 14 sonidos de Pixabay en total, entre ambiente y expresiones de los personajes.",
        decision: "Dejar el ambiente en segundo plano y hacer que el lector decida si quiere activarlo. El equipo comprobó las imágenes y los sonidos al publicar el cómic en GitHub Pages."
      },
      evidencia: [{ src: "assets/evidencia/c4_final.jpg", titulo: "Final del cómic: la pregunta al río.", tipo: "ilustracion" }]
    },
    {
      id: "v1", acto: 3, carril: "video", fecha: "4 nov · 18:34", herramienta: "Claude · edge-tts · FFmpeg",
      titulo: "«Es un cómic narrado»",
      narracion: "La primera versión del video eran las viñetas con voces encima. El equipo la vio y dijo que no era la idea. Todo el trabajo del día se descartó, pero no se borró.",
      alt: "Una sala de edición donde el equipo mira una pantalla con viñetas y niega con la cabeza.",
      globos: [{ quien: "hector", texto: "Esa no es la idea." }],
      pestanas: {
        prompt: "«Es que el video termina siendo un comic narrado y esa no es la idea, tenemos que cambiar el producto que genera.»",
        resultado: "Dos versiones con voces sintéticas y FFmpeg: 2:40 y 2:59. Claude respondió: «Tienes razón… mi video repetía el cómic con voz encima.»",
        decision: "Elegir la ruta del avatar presentador, «la A (avatar)»: una pieza nueva que continúa el cómic en vez de contarlo otra vez."
      },
      evidencia: [{ src: "assets/evidencia/v1_comic_narrado.jpg", titulo: "Fotograma de la primera versión, el «cómic narrado».", tipo: "captura" }]
    },
    {
      id: "v2", acto: 3, carril: "video", fecha: "5 nov · 15:53", herramienta: "Codex · HeyGen",
      titulo: "Nace la profesora Mariana",
      narracion: "Mariana, la profesora del cómic, vuelve a su aula a la mañana siguiente. Codex dibujó su retrato en dos minutos y HeyGen la convirtió en avatar. Solo tenía tres videos gratis, de un minuto cada uno.",
      alt: "La profesora Mariana de frente, con gafas redondas y pelo rizado, en su aula con el río al fondo.",
      globos: [{ quien: "victor", texto: "Me gusta, seguir." }],
      pestanas: {
        prompt: "«Front-facing medium close-up of Profe Mariana, 38, Colombian social-studies teacher: round glasses, curly hair gathered in a low bun, linen blouse, warm calm expression…»",
        resultado: "Retrato aprobado, aunque con aretes dorados que no estaban en la ficha del personaje. Avatar «Profe Mariana» en HeyGen con voz «Juliana» (español de Colombia) y tres tramos de 42, 42 y 40 segundos en 720p. Uno apareció como «Borrador» y hubo que comprobar que sí se había enviado.",
        decision: "«Primero reviso la voz»; luego «Me gusta, seguir.» Se rechazó pagar el plan de 29 o 49 USD al mes."
      },
      evidencia: [{ src: "assets/evidencia/v2_mariana.jpg", titulo: "Retrato de la profesora Mariana generado con Codex.", tipo: "ilustracion" }]
    },
    {
      id: "v3", acto: 3, carril: "video", fecha: "6 nov · 10:03", herramienta: "Claude · HeyGen",
      titulo: "La puerta de pago",
      narracion: "Al pulsar «Descargar», HeyGen pidió pagar. Claude se negó a esquivar el cobro. El equipo grabó la pantalla mientras se reproducían los tres tramos y siguió adelante.",
      alt: "Una puerta con un letrero de precio cerrada frente al equipo; al lado, una pantalla que se graba a sí misma.",
      globos: [{ quien: "daniel", texto: "Ya tengo las grabaciones." }],
      pestanas: {
        prompt: "«Ya tengo las grabaciones de la parte 1, 2 y 3, que tiene como nombre 4. Editemos y organicemos el video, pero también hay que agregar más edición, datos, imágenes, introducción, créditos, el QR.»",
        resultado: "La ventana ofrecía planes de 29 y 49 USD al mes. Claude respondió: «No compré nada; tampoco intenté sacar el video por otro camino, porque sería saltarme el cobro.» Tres archivos de pantalla (uno llamado «Parte 4» era en realidad el tramo 3).",
        decision: "Grabar la pantalla y declarar la marca de agua de HeyGen en los créditos."
      },
      evidencia: [{ src: "assets/evidencia/v3_tramo.jpg", titulo: "Fotograma de la grabación de pantalla del tramo 1.", tipo: "captura" }]
    },
    {
      id: "v4", acto: 3, carril: "video", fecha: "6 – 9 nov", herramienta: "Claude · FFmpeg · Codex",
      titulo: "Montaje, letras y 50 megas",
      narracion: "Con intro, datos, rótulos, subtítulos, ambiente del río y un QR, el video llegó a 2:59. Faltaba que cupiera: el aula acepta archivos de 50 MB y el video pesaba 90.",
      imagen: "assets/vinetas/v4-montaje.png",
      alt: "Tres integrantes del equipo sentados en el estudio al atardecer, junto a un monitor con la línea de tiempo del video y una imagen del río.",
      globos: [],
      pestanas: {
        prompt: "«Haz los títulos y textos más estéticos.»",
        resultado: "Tipografía serif y acento ámbar tomado del atardecer del cómic. Errores propios corregidos: el aviso «Activar Windows» visible en la captura, rótulos poco legibles sobre fondos claros, un fallo de render por un contador mal puesto, el apellido «Lozada» en los créditos y el retrato atribuido a «ChatGPT» cuando lo hizo Codex. Copia ligera de 39 MB para el aula.",
        decision: "Corregir cada error antes de entregar y publicar la versión final con los créditos verificados."
      },
      evidencia: [
        { src: "assets/evidencia/v4_intro.jpg", titulo: "Intro del video.", tipo: "captura" },
        { src: "assets/evidencia/v4_dato.jpg", titulo: "Tarjeta de dato «87 %».", tipo: "captura" },
        { src: "assets/evidencia/v4_creditos.jpg", titulo: "Créditos con QR y declaración de uso de IA.", tipo: "captura" }
      ]
    },
    {
      id: "fin", acto: 4, carril: null, fecha: "9 nov", herramienta: "Equipo",
      titulo: "El círculo se cierra",
      narracion: "El cómic enseñaba que una IA puede inventar un dato y que hay que verificarlo. El proceso mismo lo cumplió: los errores de la IA y los del equipo se detectaron, se corrigieron y se contaron aquí.",
      alt: "Los tres integrantes en la orilla del río al atardecer, mirando un código QR que flota sobre el agua.",
      globos: [{ quien: "mariana", texto: "Antes de creerle a la máquina, pregúntale al río." }],
      pestanas: {
        prompt: "Tres piezas, un solo método: pedir, comprobar, decidir y declarar.",
        resultado: "Un podcast (7:47), un cómic web de 24 viñetas y un video de 2:59, más el informe del proceso.",
        decision: "Entregar con transparencia: qué hizo la IA, qué decidió el equipo y qué no funcionó."
      },
      evidencia: [{ src: "assets/evidencia/fin_qr.jpg", titulo: "QR al cómic «Lo que el río sabe».", tipo: "captura" }]
    }
  ],
  tablaIA: [
    ["Podcast", "Investigación en paralelo, guion, teleprompter, limpieza de audio, reproductor, escena transmedia", "Grabarse en persona, aceptar una identificación parcial de voces, publicar"],
    ["Cómic", "Historia, fichas, 24 viñetas, web interactiva, PDF, auditoría", "Montería como escenario, aprobar fichas, corregir errores, ajustar el sonido del Sinú y publicar"],
    ["Video", "Guion, retrato, avatar, montaje, subtítulos, informe", "Descartar el cómic narrado, elegir el avatar, grabar la pantalla, corregir créditos"]
  ],
  enlaces: [
    { texto: "Cómic «Lo que el río sabe»", url: "https://danielfer31.github.io/lo-que-el-rio-sabe/" },
    { texto: "Podcast «Aprender entre pantallas»", url: "https://danielfer31.github.io/aprender-entre-pantallas/" }
  ]
};
