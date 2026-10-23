import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Gamepad2, Wrench, Headphones, Disc3, MapPin, MessageCircle, Instagram, Zap, ShieldCheck, Star, ArrowRight, Menu, X } from "lucide-react";
import hero from "@/assets/hero.jpg";
import logo from "@/assets/logo.png";

const WHATS = "https://wa.me/5561981250789";
const INSTA = "https://instagram.com/laragames2024";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lara Games — Consoles, Games e Manutenção | Feira dos Importados" },
      { name: "description", content: "Seu dinheiro vira diversão: consoles, jogos, acessórios e manutenção especializada na Feira dos Importados do SIA, Banca D56." },
      { property: "og:title", content: "Lara Games — Consoles, Games e Manutenção" },
      { property: "og:description", content: "PS5, Xbox, Nintendo Switch, retrô, acessórios e assistência técnica em Brasília." },
    ],
  }),
  component: Index,
});

const categories = [
  { id: "consoles", label: "Consoles", icon: Gamepad2 },
  { id: "games", label: "Games", icon: Disc3 },
  { id: "acessorios", label: "Acessórios", icon: Headphones },
] as const;

const products: Record<string, { name: string; tag: string; desc: string }[]> = {
  consoles: [
    { name: "PS5 Slim Digital", tag: "Novo", desc: "Lacrado com garantia" },
    { name: "Nintendo Switch OLED", tag: "Destaque", desc: "Tela OLED de 7''" },
    { name: "Xbox 360 Desbloqueado", tag: "Custo-benefício", desc: "Clássicos inesquecíveis" },
    { name: "Nintendo 64 & Retrô", tag: "Raridade", desc: "Para colecionadores" },
  ],
  games: [
    { name: "Astro Bot", tag: "PS5", desc: "Aventura premiada" },
    { name: "Gran Turismo 7", tag: "PS5", desc: "Simulação de corrida" },
    { name: "Super Mario Wonder", tag: "Switch", desc: "Diversão em família" },
    { name: "Clássicos Retrô", tag: "Vários", desc: "Grande variedade" },
  ],
  acessorios: [
    { name: "DualSense PS5", tag: "Original", desc: "Várias cores" },
    { name: "Controle Xbox", tag: "Velocity Green", desc: "Shock Blue e mais" },
    { name: "Headsets Gamer", tag: "Som imersivo", desc: "Para todas as plataformas" },
    { name: "Colecionáveis", tag: "Geek", desc: "Chaveiros e bonecos" },
  ],
};

const services = [
  { title: "Limpeza completa", desc: "Remoção de poeira e higienização interna do console." },
  { title: "Troca de pasta térmica", desc: "Fim do superaquecimento e do barulho da ventoinha." },
  { title: "Reparo de controles", desc: "Analógico com drift, botões e gatilhos." },
  { title: "Desbloqueio & upgrade", desc: "Xbox 360, PS2 e retrôs prontos para jogar." },
];

function Index() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Shop />
      <Repair />
      <Stats />
      <Visit />
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Lara Games · Seu dinheiro vira diversão aqui
      </footer>
      <motion.a
        href={WHATS}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-pink"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        whileHover={{ rotate: 12 }}
      >
        <MessageCircle />
      </motion.a>
    </main>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Loja", "#loja"],
    ["Manutenção", "#manutencao"],
    ["Onde estamos", "#visita"],
  ];
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="glass fixed inset-x-0 top-0 z-40"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <a href="#" className="flex min-w-0 items-center gap-3">
          <img src={logo} alt="Lara Games" className="h-10 w-10 shrink-0 rounded-full" />
          <span className="truncate font-display text-lg font-black tracking-widest">LARA GAMES</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="group relative text-sm font-semibold uppercase tracking-wider">
              {l}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-brand transition-all group-hover:w-full" />
            </a>
          ))}
          <a href={WHATS} target="_blank" rel="noreferrer" className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground transition hover:scale-105">
            Chamar no Whats
          </a>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-4 px-5 pb-5">
              {links.map(([l, h]) => (
                <a key={h} href={h} onClick={() => setOpen(false)} className="font-semibold uppercase">{l}</a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]));
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]));

  const onMove = (e: MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const words = ["Seu", "dinheiro", "vira", "diversão"];

  return (
    <section ref={ref} onMouseMove={onMove} className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={hero} alt="Console e controle com luzes neon" width={1600} height={1008} className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent"
          >
            <Zap className="h-3.5 w-3.5" /> Feira dos Importados · SIA D56
          </motion.span>
          <h1 className="font-display text-5xl font-black uppercase leading-[0.95] sm:text-7xl">
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 60, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 120 }}
                className={`mr-4 inline-block ${i === 3 ? "text-gradient" : ""}`}
              >
                {w}
              </motion.span>
            ))}
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="block text-primary">
              aqui.
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 max-w-lg text-lg text-muted-foreground"
          >
            Consoles, games, acessórios e manutenção especializada. Do PS5 ao Nintendo 64 — tudo num só lugar.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }} className="mt-10 flex flex-wrap gap-4">
            <a href="#loja" className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-4 font-bold text-primary-foreground shadow-glow transition hover:scale-105">
              Ver produtos <ArrowRight className="transition group-hover:translate-x-1" />
            </a>
            <a href="#manutencao" className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-4 font-bold transition hover:bg-primary">
              <Wrench className="h-5 w-5" /> Manutenção
            </a>
          </motion.div>
        </div>

        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="absolute inset-0 rounded-full bg-gradient-brand opacity-40 blur-3xl"
          />
          <motion.img
            src={logo}
            alt="Logo Lara Games"
            animate={{ y: [0, -16, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative h-full w-full rounded-full border-4 border-primary/40 object-cover shadow-glow"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["PS5", "Xbox Series", "Nintendo Switch", "Xbox 360", "PS2", "N64", "Super Nintendo", "DualSense", "Retrô", "Colecionáveis"];
  return (
    <div className="-rotate-1 border-y-2 border-accent bg-accent py-4 text-accent-foreground">
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-xl font-black uppercase">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t} <Star className="h-5 w-5 fill-current text-pink" />
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
      <span className="text-sm font-bold uppercase tracking-[0.3em] text-pink">{kicker}</span>
      <h2 className="mt-2 font-display text-4xl font-black uppercase sm:text-5xl">{title}</h2>
    </motion.div>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]));
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]));
  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      className="group relative rounded-2xl bg-card p-px"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 transition group-hover:opacity-100" />
      <div className="relative h-full rounded-2xl bg-card p-6">{children}</div>
    </motion.div>
  );
}

function Shop() {
  const [cat, setCat] = useState<string>("consoles");
  return (
    <section id="loja" className="mx-auto max-w-7xl px-5 py-28">
      <SectionTitle kicker="Loja" title="Escolha sua próxima aventura" />
      <div className="mb-10 flex flex-wrap gap-3">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCat(id)}
            className={`relative flex items-center gap-2 rounded-full px-6 py-3 font-bold transition ${cat === id ? "text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
          >
            {cat === id && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-primary shadow-glow" />}
            <Icon className="relative h-5 w-5" />
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={cat}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -20 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {(products[cat] ?? []).map((p) => (
            <motion.div key={p.name} variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}>
              <TiltCard>
                <div className="mb-6 grid aspect-[4/3] place-items-center rounded-xl bg-secondary grid-bg">
                  <Gamepad2 className="h-16 w-16 text-primary transition group-hover:scale-125 group-hover:text-pink" />
                </div>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{p.tag}</span>
                <h3 className="mt-4 font-display text-lg font-bold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <a
                  href={`${WHATS}?text=${encodeURIComponent(`Olá! Tenho interesse em: ${p.name}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-pink"
                >
                  Consultar preço <ArrowRight className="h-4 w-4" />
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function Repair() {
  const [active, setActive] = useState(0);
  return (
    <section id="manutencao" className="relative overflow-hidden bg-secondary/40 py-28">
      <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-pink/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <SectionTitle kicker="Assistência técnica" title="Manutenção ON na Lara Games" />
          <p className="mb-8 text-muted-foreground">Qualidade e segurança garantidas. Seu console volta silencioso, frio e pronto pra jogatina.</p>
          <div className="space-y-3">
            {services.map((s, i) => (
              <motion.button
                key={s.title}
                onClick={() => setActive(i)}
                whileHover={{ x: 8 }}
                className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition ${active === i ? "border-pink bg-card shadow-pink" : "bg-card/50"}`}
              >
                <span className={`font-display text-2xl font-black ${active === i ? "text-accent" : "text-muted-foreground"}`}>0{i + 1}</span>
                <span className="font-bold">{s.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
              className="glass w-full rounded-3xl p-10"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} className="mb-8 inline-block">
                <Wrench className="h-16 w-16 text-accent" />
              </motion.div>
              <h3 className="font-display text-3xl font-black">{services[active]!.title}</h3>
              <p className="mt-4 text-lg text-muted-foreground">{services[active]!.desc}</p>
              <div className="mt-8 flex items-center gap-2 text-sm text-primary">
                <ShieldCheck className="h-5 w-5" /> Garantia no serviço
              </div>
              <a
                href={`${WHATS}?text=${encodeURIComponent(`Olá! Quero um orçamento de: ${services[active]!.title}`)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-full bg-gradient-brand px-7 py-4 font-bold text-primary-foreground"
              >
                Pedir orçamento
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    ["+600", "Gamers seguindo"],
    ["+20", "Plataformas"],
    ["100%", "Testado na loja"],
    ["D56", "Nossa banca"],
  ];
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-24 lg:grid-cols-4">
      {stats.map(([n, l], i) => (
        <motion.div
          key={l}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center"
        >
          <div className="text-gradient font-display text-5xl font-black">{n}</div>
          <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{l}</div>
        </motion.div>
      ))}
    </section>
  );
}

function Visit() {
  return (
    <section id="visita" className="mx-auto max-w-7xl px-5 pb-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-brand p-px"
      >
        <div className="grid gap-10 rounded-3xl bg-card p-10 md:grid-cols-2 md:p-14">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Localização</span>
            <h2 className="mt-2 font-display text-4xl font-black uppercase">Vem jogar com a gente</h2>
            <p className="mt-4 flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-pink" /> Feira dos Importados do SIA — Banca D56, Brasília/DF
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={WHATS} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground transition hover:scale-105">
                <MessageCircle className="h-5 w-5" /> (61) 98125-0789
              </a>
              <a href={INSTA} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-pink px-6 py-3 font-bold transition hover:bg-pink">
                <Instagram className="h-5 w-5" /> @laragames2024
              </a>
            </div>
          </div>
          <iframe
            title="Mapa Feira dos Importados"
            src="https://www.google.com/maps?q=Feira+dos+Importados+SIA+Brasilia&output=embed"
            className="h-72 w-full rounded-2xl border-0 grayscale invert-[0.9]"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
}
