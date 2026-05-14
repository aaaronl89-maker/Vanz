import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #07070E;
    --surface: #0F0F1A;
    --card: #141422;
    --border: #1E1E32;
    --accent: #7C3AFF;
    --accent-light: #9D6FFF;
    --teal: #00D4AA;
    --yellow: #FFB800;
    --text: #F0F0FF;
    --muted: #5A5A7A;
    --sub: #8888AA;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
    line-height: 1.6;
  }

  /* NOISE OVERLAY */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  /* NAV */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(180deg, var(--bg) 0%, transparent 100%);
  }

  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 24px;
    background: linear-gradient(135deg, var(--accent), var(--teal));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1px;
  }

  .nav-cta {
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 100px;
    padding: 10px 22px;
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
    letter-spacing: 0.3px;
  }

  .nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 120px 24px 80px;
    position: relative;
    overflow: hidden;
  }

  .hero-glow {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, #7C3AFF22 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .hero-glow-2 {
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, #00D4AA15 0%, transparent 70%);
    top: 30%; right: -100px;
    pointer-events: none;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #7C3AFF15;
    border: 1px solid #7C3AFF40;
    border-radius: 100px;
    padding: 6px 16px;
    font-size: 12px;
    color: var(--accent-light);
    margin-bottom: 32px;
    font-weight: 500;
    letter-spacing: 0.5px;
    animation: fadeUp 0.6s ease forwards;
  }

  .hero-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .hero-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(48px, 8vw, 88px);
    line-height: 1.0;
    letter-spacing: -3px;
    margin-bottom: 8px;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  .hero-title .line-2 {
    background: linear-gradient(135deg, var(--accent), var(--teal));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
  }

  .hero-sub {
    font-size: clamp(16px, 2.5vw, 20px);
    color: var(--sub);
    max-width: 480px;
    margin: 24px auto 40px;
    font-weight: 300;
    line-height: 1.6;
    animation: fadeUp 0.6s 0.2s ease both;
  }

  .hero-sub strong { color: var(--text); font-weight: 500; }

  .hero-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeUp 0.6s 0.3s ease both;
    margin-bottom: 60px;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    color: white;
    border: none;
    border-radius: 14px;
    padding: 16px 32px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 8px 32px #7C3AFF40;
    letter-spacing: 0.2px;
  }

  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px #7C3AFF60; }

  .btn-secondary {
    background: transparent;
    color: var(--sub);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }

  .btn-secondary:hover { border-color: var(--sub); color: var(--text); }

  .hero-note {
    font-size: 12px;
    color: var(--muted);
    animation: fadeUp 0.6s 0.4s ease both;
  }

  .hero-note span { color: var(--teal); }

  /* SOCIAL PROOF */
  .social-proof {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    padding: 0 24px 80px;
    animation: fadeUp 0.6s 0.5s ease both;
  }

  .proof-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--muted);
  }

  .proof-dot { color: var(--teal); font-size: 16px; }

  /* FEATURES */
  .section {
    padding: 100px 24px;
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
  }

  .section-tag {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent);
    font-weight: 600;
    margin-bottom: 16px;
    display: block;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(32px, 4vw, 52px);
    letter-spacing: -2px;
    line-height: 1.1;
    margin-bottom: 16px;
  }

  .section-sub {
    font-size: 16px;
    color: var(--sub);
    max-width: 500px;
    font-weight: 300;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    margin-top: 60px;
  }

  .feature-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 28px;
    transition: border-color 0.3s, transform 0.3s;
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .feature-card:hover { border-color: #7C3AFF40; transform: translateY(-4px); }
  .feature-card:hover::before { opacity: 1; }

  .feature-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    margin-bottom: 16px;
  }

  .feature-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 8px;
    letter-spacing: -0.3px;
  }

  .feature-desc { font-size: 14px; color: var(--sub); line-height: 1.6; }

  /* HOW IT WORKS */
  .how-it-works { background: var(--surface); }

  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 40px;
    margin-top: 60px;
    position: relative;
  }

  .step { text-align: center; }

  .step-num {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--teal));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 20px;
    margin: 0 auto 20px;
    box-shadow: 0 8px 24px #7C3AFF40;
  }

  .step-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .step-desc { font-size: 14px; color: var(--sub); }

  /* PRICING */
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-top: 60px;
  }

  .price-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 28px 24px;
    transition: transform 0.3s, border-color 0.3s;
    position: relative;
  }

  .price-card:hover { transform: translateY(-4px); }

  .price-card.featured {
    border-color: var(--accent);
    background: linear-gradient(160deg, #141422, #1a1430);
    box-shadow: 0 0 60px #7C3AFF20;
  }

  .popular-badge {
    position: absolute;
    top: -12px; left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    color: white;
    font-size: 11px;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    padding: 4px 14px;
    border-radius: 100px;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .price-period {
    font-size: 12px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
  }

  .price-amount {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 40px;
    letter-spacing: -2px;
    line-height: 1;
    margin-bottom: 4px;
  }

  .price-amount sup {
    font-size: 18px;
    vertical-align: super;
    letter-spacing: 0;
    font-weight: 600;
  }

  .price-per-month {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .price-save {
    display: inline-block;
    background: #00D4AA20;
    color: var(--teal);
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 100px;
    margin-bottom: 20px;
  }

  .price-divider {
    height: 1px;
    background: var(--border);
    margin: 20px 0;
  }

  .price-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }

  .price-features li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: var(--sub);
  }

  .price-features li::before {
    content: '✓';
    color: var(--teal);
    font-weight: 700;
    font-size: 12px;
    flex-shrink: 0;
  }

  .price-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
  }

  .price-btn:hover { opacity: 0.85; transform: translateY(-1px); }

  .price-btn.filled { background: linear-gradient(135deg, var(--accent), var(--accent-light)); color: white; }
  .price-btn.outline { background: transparent; border: 1px solid var(--border); color: var(--sub); }

  /* ADHD SECTION */
  .adhd-section {
    background: linear-gradient(135deg, #0F0F1A, #12102A);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .adhd-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    margin-top: 60px;
  }

  @media (max-width: 768px) {
    .adhd-grid { grid-template-columns: 1fr; gap: 40px; }
    .hero-title { letter-spacing: -2px; }
    nav { padding: 16px 20px; }
    .section { padding: 70px 20px; }
  }

  .adhd-list { display: flex; flex-direction: column; gap: 20px; margin-top: 10px; }

  .adhd-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .adhd-icon {
    width: 40px; height: 40px;
    border-radius: 12px;
    background: #7C3AFF15;
    border: 1px solid #7C3AFF30;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .adhd-item-title { font-weight: 600; font-size: 14px; margin-bottom: 3px; }
  .adhd-item-desc { font-size: 13px; color: var(--sub); }

  .adhd-visual {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  .adhd-visual::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, #7C3AFF20, transparent 70%);
    pointer-events: none;
  }

  .mini-block {
    background: var(--surface);
    border-radius: 14px;
    padding: 14px;
    margin-bottom: 10px;
    border-left: 3px solid var(--accent);
  }

  .mini-block-title { font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 6px; }
  .mini-block-text { font-size: 13px; color: var(--sub); line-height: 1.5; }

  .mini-kp {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--surface);
    border-radius: 10px;
    margin-bottom: 6px;
    font-size: 12px;
    border-left: 3px solid var(--teal);
    color: var(--sub);
  }

  /* CTA FINAL */
  .final-cta {
    text-align: center;
    padding: 120px 24px;
    position: relative;
    overflow: hidden;
  }

  .final-cta::before {
    content: '';
    position: absolute;
    width: 800px; height: 800px;
    border-radius: 50%;
    background: radial-gradient(circle, #7C3AFF15 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .final-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 5vw, 64px);
    letter-spacing: -2px;
    line-height: 1.1;
    max-width: 700px;
    margin: 0 auto 24px;
  }

  .final-title span {
    background: linear-gradient(135deg, var(--accent), var(--teal));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .final-sub { font-size: 16px; color: var(--sub); margin-bottom: 40px; }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--border);
    padding: 40px 24px;
    text-align: center;
  }

  .footer-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 20px;
    background: linear-gradient(135deg, var(--accent), var(--teal));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
  }

  .footer-text { font-size: 13px; color: var(--muted); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const features = [
  { icon: "🧠", bg: "#7C3AFF15", title: "Bloques inteligentes", desc: "La IA divide cualquier documento en bloques ordenados y manejables. Sin agobios, sin paredes de texto." },
  { icon: "✨", bg: "#00D4AA15", title: "Texto simplificado", desc: "Cada bloque se reescribe con frases cortas y palabras simples. Lo esencial, sin relleno." },
  { icon: "⭐", bg: "#FFB80015", title: "Quiz adaptativo", desc: "Preguntas que se adaptan a tu nivel. Sin acceso al texto durante el quiz — los puntos son legítimos." },
  { icon: "🗺️", bg: "#7C3AFF15", title: "Mind Maps automáticos", desc: "Visualiza las conexiones entre conceptos. Ideal para materias complejas con muchas ideas relacionadas." },
  { icon: "🔥", bg: "#FF475715", title: "Rachas y logros", desc: "Sistema de gamificación que te mantiene motivado. Puntos, rachas y ranking global entre usuarios." },
  { icon: "🎧", bg: "#00D4AA15", title: "Voz y métodos de estudio", desc: "Escucha el texto en voz alta. Elige entre Pomodoro, 52/17 o tiempo libre para gestionar tu foco." },
];

const steps = [
  { num: "1", title: "Sube tu contenido", desc: "PDF, texto, enlace web o vídeo de YouTube. Google Drive y Dropbox también." },
  { num: "2", title: "La IA lo prepara", desc: "En segundos divide el contenido en bloques con texto simplificado y puntos clave." },
  { num: "3", title: "Estudia y avanza", desc: "Bloque a bloque, con tu método favorito, acumulando puntos y manteniendo tu racha." },
];

const plans = [
  { period: "1 MES", amount: "7", save: null, perMonth: "7€/mes", features: ["Documentos ilimitados", "Todos los métodos de estudio", "Quiz adaptativo", "Mind Maps", "Voz en texto", "Gamificación completa"], featured: false },
  { period: "3 MESES", amount: "18", save: "Ahorras 3€", perMonth: "6€/mes", features: ["Todo lo del plan mensual", "Prioridad en procesamiento", "Estadísticas avanzadas", "Soporte prioritario"], featured: false },
  { period: "6 MESES", amount: "32", save: "Ahorras 10€", perMonth: "5,3€/mes", features: ["Todo lo anterior", "Acceso anticipado a nuevas funciones", "Exportar mind maps en PDF"], featured: true },
  { period: "12 MESES", amount: "55", save: "Ahorras 29€", perMonth: "4,6€/mes", features: ["Todo lo anterior", "El mejor precio posible", "Insignia exclusiva en el ranking"], featured: false },
];

export default function App() {
  const [annual, setAnnual] = useState(false);
  const fadeRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.15 });
    fadeRefs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const addRef = (el) => { if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el); };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">VANZ</div>
        <button className="nav-cta">Empezar gratis →</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <div className="hero-badge">Diseñado para cerebros con TDAH</div>
        <h1 className="hero-title">
          Estudia menos.
          <span className="line-2">Aprende más.</span>
        </h1>
        <p className="hero-sub">
          Sube cualquier documento y VANZ lo convierte en bloques <strong>simples, ordenados y fáciles de recordar.</strong>
        </p>
        <div className="hero-actions">
          <button className="btn-primary">Prueba gratis 7 días →</button>
          <button className="btn-secondary">Ver cómo funciona</button>
        </div>
        <p className="hero-note">Sin tarjeta de crédito · <span>7 días gratis</span> · Cancela cuando quieras</p>
      </section>

      <div className="social-proof">
        <div className="proof-item"><span className="proof-dot">✓</span> PDF, YouTube y más</div>
        <div className="proof-item"><span className="proof-dot">✓</span> Quiz sin trampa posible</div>
        <div className="proof-item"><span className="proof-dot">✓</span> Funciona en móvil y web</div>
      </div>

      {/* FEATURES */}
      <section className="section">
        <div ref={addRef} className="fade-up">
          <span className="section-tag">Funcionalidades</span>
          <h2 className="section-title">Todo lo que necesita<br />tu cerebro para aprender</h2>
          <p className="section-sub">Sin distracciones, sin paredes de texto, sin agobios. Solo aprendizaje real.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} ref={addRef} className="feature-card fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="feature-icon" style={{ background: f.bg }}>{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ADHD SECTION */}
      <section className="section adhd-section" style={{ maxWidth: "100%", padding: "100px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div ref={addRef} className="fade-up">
            <span className="section-tag">Por qué VANZ</span>
            <h2 className="section-title">Hecho para cerebros<br />que piensan diferente</h2>
          </div>
          <div className="adhd-grid">
            <div ref={addRef} className="fade-up">
              <div className="adhd-list">
                {[
                  { icon: "📖", title: "Comprensión lectora difícil", desc: "El texto original se reescribe en frases cortas, sin palabras innecesarias." },
                  { icon: "🧩", title: "Dificultad para memorizar", desc: "Los puntos clave y el quiz adaptativo fijan el conocimiento de verdad." },
                  { icon: "⚡", title: "Abrumador empezar", desc: "Ves un bloque a la vez. Tu cerebro sabe exactamente qué hacer ahora." },
                  { icon: "🏆", title: "Falta de motivación", desc: "Las rachas, puntos y logros hacen que quieras seguir estudiando." },
                ].map((item, i) => (
                  <div key={i} className="adhd-item">
                    <div className="adhd-icon">{item.icon}</div>
                    <div>
                      <div className="adhd-item-title">{item.title}</div>
                      <div className="adhd-item-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div ref={addRef} className="adhd-visual fade-up">
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>Bloque 4 de 8 · Biología Celular</div>
              <div className="mini-block">
                <div className="mini-block-title">📖 Texto simplificado</div>
                <div className="mini-block-text">La célula eucariota tiene un núcleo real rodeado por una membrana. Es más compleja que la procariota. La tienen animales, plantas y hongos.</div>
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", margin: "12px 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>🔑 Puntos clave</div>
              <div className="mini-kp">Tiene núcleo real con membrana nuclear</div>
              <div className="mini-kp">Más compleja que la célula procariota</div>
              <div className="mini-kp">Presente en animales, plantas y hongos</div>
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <div style={{ flex: 1, background: "#7C3AFF20", border: "1px solid #7C3AFF40", borderRadius: 10, padding: "8px 10px", textAlign: "center", fontSize: 12, color: "var(--accent-light)" }}>⭐ Quiz</div>
                <div style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 10px", textAlign: "center", fontSize: 12, color: "var(--muted)" }}>🗺️ Mind Map</div>
                <div style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 10px", textAlign: "center", fontSize: 12, color: "var(--muted)" }}>🗣️ Feynman</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div ref={addRef} className="fade-up">
          <span className="section-tag">Cómo funciona</span>
          <h2 className="section-title">En tres pasos<br />ya estás aprendiendo</h2>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={i} ref={addRef} className="step fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="section" style={{ maxWidth: "100%", background: "var(--surface)", padding: "100px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div ref={addRef} className="fade-up" style={{ textAlign: "center" }}>
            <span className="section-tag">Precios</span>
            <h2 className="section-title">Elige tu plan</h2>
            <p style={{ color: "var(--sub)", fontSize: 15, marginTop: 8 }}>7 días gratis en todos los planes · Sin compromiso</p>
          </div>
          <div className="pricing-grid" style={{ marginTop: 60 }}>
            {plans.map((p, i) => (
              <div key={i} ref={addRef} className={`price-card fade-up ${p.featured ? "featured" : ""}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                {p.featured && <div className="popular-badge">⭐ MÁS POPULAR</div>}
                <div className="price-period">{p.period}</div>
                <div className="price-amount"><sup>€</sup>{p.amount}</div>
                <div className="price-per-month">{p.perMonth}</div>
                {p.save && <div className="price-save">{p.save}</div>}
                <div className="price-divider" />
                <ul className="price-features">
                  {p.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
                <button className={`price-btn ${p.featured ? "filled" : "outline"}`}>
                  {p.featured ? "Empezar ahora →" : "Elegir plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div ref={addRef} className="fade-up">
          <h2 className="final-title">Tu cerebro no es el problema.<br /><span>El método sí lo era.</span></h2>
          <p className="final-sub">Prueba VANZ gratis durante 7 días. Sin tarjeta de crédito.</p>
          <button className="btn-primary" style={{ fontSize: 16, padding: "18px 40px" }}>Empezar gratis ahora →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">VANZ</div>
        <p className="footer-text">Estudia menos. Aprende más. · © 2025 VANZ</p>
      </footer>
    </>
  );
}
