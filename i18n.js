/* ============================================================
   i18n.js  ::  Traduccion drop-in para la Red enVenezuela
   Se inserta con UNA linea:  <script src="/i18n.js" defer></script>
   - Traduce buscando el texto en espanol (no hay que etiquetar el HTML).
   - Maneja emojis al inicio del texto (los conserva).
   - Lo que no este en el diccionario se queda en espanol (degrada bien).
   - Nunca toca: 171, dominios, credenciales, nombres (no estan en el dict).
   - Guarda el idioma en localStorage 'red_lang' (compartido en los 4 sitios).
   - Selector flotante que detecta el idioma del telefono la primera vez.
   ============================================================ */
(function () {
  "use strict";

  var LANGS = [
    { c: "es", n: "Espanol" }, { c: "en", n: "English" }, { c: "pt", n: "Portugues" },
    { c: "fr", n: "Francais" }, { c: "it", n: "Italiano" }, { c: "de", n: "Deutsch" },
    { c: "tr", n: "Turkce" }, { c: "zh", n: "Zhongwen" }, { c: "ar", n: "Arabiy" }
  ];

  /* Diccionario compartido. Clave = texto en espanol.
     Se amplia agregando frases; sirve para los 4 sitios. */
  var DICT = {
    en: {
      "Iniciar sesion": "Log in", "Iniciar sesión": "Log in",
      "Compartir": "Share",
      "Nuestra red de ayuda": "Our help network",
      "LA RED EN VIVO": "THE NETWORK, LIVE",
      "Emergencias 171": "Emergencies 171",
      "personas registradas": "people registered",
      "encontradas": "found",
      "dadas de alta": "discharged",
      "psicologos y psiquiatras": "psychologists and psychiatrists", "psicólogos y psiquiatras": "psychologists and psychiatrists",
      "disponibles ahora": "available now",
      "buscando empleo": "looking for work",
      "voluntarios activos": "active volunteers",
      "Hospitales en Venezuela": "Hospitals in Venezuela",
      "Psicologos en Venezuela": "Psychologists in Venezuela", "Psicólogos en Venezuela": "Psychologists in Venezuela",
      "Empleo en Venezuela": "Jobs in Venezuela",
      "La fundacion: envenezuela.app": "The foundation: envenezuela.app", "La fundación: envenezuela.app": "The foundation: envenezuela.app",
      "Necesitas hablar con alguien?": "Need to talk to someone?", "¿Necesitas hablar con alguien?": "Need to talk to someone?",
      "Perdiste tu trabajo?": "Lost your job?", "¿Perdiste tu trabajo?": "Lost your job?",
      "Perdiste tu trabajo? Quieres ayudar?": "Lost your job? Want to help?", "¿Perdiste tu trabajo? ¿Quieres ayudar?": "Lost your job? Want to help?",
      "Buscar persona": "Find a person",
      "Centros": "Centers",
      "Personas disponibles": "Available people",
      "Vacantes y voluntariado": "Openings and volunteering",
      "Encuentra a tu familiar ingresado": "Find your hospitalized relative",
      "Encuentra a tu ser querido ingresado": "Find your hospitalized loved one",
      "Registrar a una persona ingresada": "Register a hospitalized person",
      "Agregar un centro nuevo": "Add a new center",
      "Cerca de mi": "Near me", "Cerca de mí": "Near me",
      "Todos los estados": "All states", "Todas las ciudades": "All cities", "Todos los tipos": "All types",
      "Todos": "All", "Abiertos": "Open", "Sin reporte": "No report", "Con personas": "With people",
      "Reportar estado": "Report status", "Reportar dato falso": "Report false info",
      "Publicar mi perfil, gratis": "Post my profile, free",
      "Ir a psicologosenvenezuela.com": "Go to psicologosenvenezuela.com",
      "Ir a empleoenvenezuela.com": "Go to empleoenvenezuela.com",
      "Quiero que me avisen": "Notify me"
    },
    pt: {
      "Iniciar sesion": "Entrar", "Iniciar sesión": "Entrar",
      "Compartir": "Compartilhar",
      "Nuestra red de ayuda": "Nossa rede de ajuda",
      "LA RED EN VIVO": "A REDE AO VIVO",
      "Emergencias 171": "Emergencias 171",
      "personas registradas": "pessoas registradas",
      "encontradas": "encontradas",
      "dadas de alta": "com alta",
      "psicologos y psiquiatras": "psicologos e psiquiatras", "psicólogos y psiquiatras": "psicologos e psiquiatras",
      "disponibles ahora": "disponiveis agora",
      "buscando empleo": "buscando emprego",
      "voluntarios activos": "voluntarios ativos",
      "Hospitales en Venezuela": "Hospitais na Venezuela",
      "Psicologos en Venezuela": "Psicologos na Venezuela", "Psicólogos en Venezuela": "Psicologos na Venezuela",
      "Empleo en Venezuela": "Empregos na Venezuela",
      "La fundacion: envenezuela.app": "A fundacao: envenezuela.app", "La fundación: envenezuela.app": "A fundacao: envenezuela.app",
      "Necesitas hablar con alguien?": "Precisa falar com alguem?", "¿Necesitas hablar con alguien?": "Precisa falar com alguem?",
      "Perdiste tu trabajo?": "Perdeu seu emprego?", "¿Perdiste tu trabajo?": "Perdeu seu emprego?",
      "Perdiste tu trabajo? Quieres ayudar?": "Perdeu seu emprego? Quer ajudar?", "¿Perdiste tu trabajo? ¿Quieres ayudar?": "Perdeu seu emprego? Quer ajudar?",
      "Buscar persona": "Buscar pessoa",
      "Centros": "Centros",
      "Personas disponibles": "Pessoas disponiveis",
      "Vacantes y voluntariado": "Vagas e voluntariado",
      "Encuentra a tu familiar ingresado": "Encontre seu familiar internado",
      "Encuentra a tu ser querido ingresado": "Encontre seu ente querido internado",
      "Registrar a una persona ingresada": "Registrar uma pessoa internada",
      "Agregar un centro nuevo": "Adicionar um novo centro",
      "Cerca de mi": "Perto de mim", "Cerca de mí": "Perto de mim",
      "Todos los estados": "Todos os estados", "Todas las ciudades": "Todas as cidades", "Todos los tipos": "Todos os tipos",
      "Todos": "Todos", "Abiertos": "Abertos", "Sin reporte": "Sem reporte", "Con personas": "Com pessoas",
      "Reportar estado": "Reportar estado", "Reportar dato falso": "Reportar dado falso",
      "Publicar mi perfil, gratis": "Publicar meu perfil, gratis",
      "Ir a psicologosenvenezuela.com": "Ir para psicologosenvenezuela.com",
      "Ir a empleoenvenezuela.com": "Ir para empleoenvenezuela.com",
      "Quiero que me avisen": "Quero ser avisado"
    }
  };

  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, CODE: 1, TEXTAREA: 1 };
  var ORIG = new WeakMap();
  var LEAD = /^([☀-➿←-⇿︀-️\u{1F000}-\u{1FAFF}\s]+)(.+)$/u;
  var busy = false;

  function getLang() {
    try { return localStorage.getItem("red_lang") || "es"; } catch (e) { return "es"; }
  }
  function norm(s) { return s.replace(/\s+/g, " ").trim(); }

  function translate(lang) {
    var d = DICT[lang] || {};
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
    busy = true;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || SKIP[p.nodeName]) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest("[data-noi18n]")) return NodeFilter.FILTER_REJECT;
        if (!norm(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = w.nextNode())) {
      if (!ORIG.has(n)) ORIG.set(n, n.nodeValue);
      var orig = ORIG.get(n);
      var normed = norm(orig);
      var val = d[normed], lead = "";
      if (val == null) {
        var m = normed.match(LEAD);
        if (m && d[m[2]] != null) { lead = m[1]; val = d[m[2]]; }
      }
      n.nodeValue = (val != null) ? (lead + val) : orig;
    }
    document.querySelectorAll("[placeholder]").forEach(function (el) {
      if (!el.hasAttribute("data-es-ph")) el.setAttribute("data-es-ph", el.getAttribute("placeholder"));
      var k = norm(el.getAttribute("data-es-ph"));
      el.setAttribute("placeholder", d[k] != null ? d[k] : el.getAttribute("data-es-ph"));
    });
    busy = false;
  }

  function setLang(lang) {
    try { localStorage.setItem("red_lang", lang); } catch (e) {}
    translate(lang);
    var cur = document.getElementById("i18n-cur");
    if (cur) cur.textContent = lang.toUpperCase();
  }

  function buildSelector(current) {
    var wrap = document.createElement("div");
    wrap.setAttribute("data-noi18n", "");
    wrap.style.cssText = "position:fixed;left:14px;bottom:14px;z-index:99999;font-family:inherit";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.style.cssText = "display:flex;align-items:center;gap:.4rem;background:#fff;border:1px solid rgba(16,24,40,.15);border-radius:999px;padding:.5rem .8rem;font-weight:600;font-size:.85rem;color:#344054;box-shadow:0 8px 20px rgba(10,20,40,.18);cursor:pointer";
    btn.innerHTML = '<span aria-hidden="true">🌐</span><span id="i18n-cur">' + current.toUpperCase() + "</span>";
    var menu = document.createElement("div");
    menu.style.cssText = "position:absolute;left:0;bottom:calc(100% + 8px);background:#fff;border:1px solid rgba(16,24,40,.12);border-radius:12px;box-shadow:0 24px 56px -8px rgba(10,20,40,.24);padding:.35rem;max-height:60vh;overflow:auto;display:none;min-width:150px";
    LANGS.forEach(function (l) {
      var it = document.createElement("button");
      it.type = "button";
      it.textContent = l.n;
      it.style.cssText = "display:block;width:100%;text-align:left;background:none;border:0;padding:.55rem .7rem;border-radius:8px;font:inherit;font-size:.9rem;color:#101828;cursor:pointer";
      it.onmouseenter = function () { it.style.background = "#f1f3f8"; };
      it.onmouseleave = function () { it.style.background = "none"; };
      it.onclick = function () { setLang(l.c); menu.style.display = "none"; };
      menu.appendChild(it);
    });
    btn.onclick = function () { menu.style.display = menu.style.display === "none" ? "block" : "none"; };
    wrap.appendChild(menu); wrap.appendChild(btn);
    document.body.appendChild(wrap);
  }

  function start() {
    var lang = getLang();
    buildSelector(lang);
    if (lang !== "es") translate(lang);
    var mo = new MutationObserver(function () {
      if (busy) return;
      var l = getLang();
      if (l !== "es") translate(l);
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
