import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  Handshake,
  Menu,
  MessageCircle,
  Send,
  ShieldCheck,
  Users,
  X,
  Apple,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoAsset from "@/assets/freelas-logo.png.asset.json";
export type Audience = "contractor" | "professional" | "admin";
export const services = [
  "Limpeza e conservação",
  "Portaria e recepção",
  "Serviços gerais",
  "Bares e restaurantes",
  "Garçons",
  "Cozinheiras",
  "Segurança",
];
export function Logo({ small = false, context }: { small?: boolean; context?: "Coop" | "Empresas" | "App" | "Admin" | undefined }) {
  return (
    <Link to="/" className={`brand ${small ? "brand-small" : ""}`} aria-label="Freelas, início">
      <img className="official-logo" src={logoAsset.url} width={1920} height={623} alt="Freelas" />
      {context && <span className="brand-context">{context}</span>}
    </Link>
  );
}
export function Header({ context }: { context?: "Coop" | "Empresas" | "App" | "Admin" | undefined }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo context={context} />
        <nav
          id="public-navigation"
          className={open ? "public-nav nav-open" : "public-nav"}
          aria-label="Navegação principal"
          onClick={() => setOpen(false)}
        >
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "nav-active" }}>
            Início
          </Link>
          <Link to="/para-contratantes" activeProps={{ className: "nav-active" }}>
            Para contratantes
          </Link>
          <Link to="/para-profissionais" activeProps={{ className: "nav-active" }}>
            Para profissionais
          </Link>
          <span className="nav-mobile">
            <Link to="/login">Entrar</Link>
          </span>
        </nav>
        <div className="header-actions">
          <Button variant="ghost" asChild className="login-link">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild>
            <Link to="/cadastro-contratante">
              Cadastrar <ArrowRight />
            </Link>
          </Button>
          <Button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="public-navigation"
            variant="ghost"
            size="icon"
            className="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
    </header>
  );
}
export function DeveloperCredit() {
  return <span className="developer-credit">Desenvolvido por - <a href="https://rrv.digital" target="_blank" rel="noopener noreferrer">rrv.digital</a></span>;
}
function StoreIndicators() {
  return (
    <div className="store-area">
      <div className="store-heading"><strong>Freelas App</strong><span>Em breve</span></div>
      <div className="store-indicators" aria-label="Aplicativo em breve para iOS e Android">
        <div className="store-badge" aria-label="App Store, em breve"><Apple aria-hidden="true" /><div><small>Disponível em breve na</small><strong>App Store</strong></div></div>
        <div className="store-badge" aria-label="Google Play, em breve"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 3v18l16-9L4 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="m4 3 11 12M4 21l11-12" stroke="currentColor" strokeWidth="1.5"/></svg><div><small>Disponível em breve no</small><strong>Google Play</strong></div></div>
      </div>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Logo />
          <p>
            Pessoas, oportunidades e cooperação.
            <br />
            Juntos, fazemos acontecer.
          </p>
        </div>
        <div>
          <strong>Encontre seu caminho</strong>
          <Link to="/para-contratantes">Quero contratar</Link>
          <Link to="/para-profissionais">Quero trabalhar</Link>
        </div>
        <div>
          <strong>Freelas</strong>
          <span>Belo Horizonte e região metropolitana</span>
          <Link to="/admin">Área administrativa · Demo</Link>
          <StoreIndicators />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Freelas. Todos os direitos reservados.</span>
        <span>Protótipo demonstrativo · Sem operações reais</span>
        <DeveloperCredit />
      </div>
    </footer>
  );
}
export function DemoTag() {
  return (
    <span className="demo-tag">
      <span /> DEMONSTRAÇÃO
    </span>
  );
}
export function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState("");
  const replies: Record<string, string> = {
    "Conhecer serviços": `Atuamos com ${services.join(", ").toLowerCase()} em Belo Horizonte e região metropolitana.`,
    "Solicitar orçamento":
      "Conte o que você precisa. Nesta demonstração, seu pedido não será enviado. Você pode conhecer a área do contratante.",
    "Quero ser cooperado":
      "Que bom ter você por aqui! Acesse “Quero trabalhar” e conheça o cadastro de profissionais.",
    "Falar com atendimento":
      "Olá! Este atendimento é demonstrativo. Nenhuma mensagem é enviada a uma equipe real.",
  };
  function send(value: string) {
    if (!value.trim()) return;
    setMessages((prev) => [
      ...prev,
      value,
      replies[value] ??
        "Obrigado pela mensagem! Esta é uma conversa demonstrativa. Explore os serviços e as oportunidades da Freelas.",
    ]);
    setText("");
  }
  return (
    <div className="chat-float">
      {open && (
        <section className="chat-panel" aria-label="Atendimento demonstrativo">
          <div className="chat-head">
            <span className="chat-avatar">
              <MessageCircle />
            </span>
            <div>
              <strong>Olá, somos a Freelas</strong>
              <DemoTag />
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Fechar conversa"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </div>
          <div className="chat-body">
            <p className="chat-bubble">Que bom ver você por aqui! Como podemos ajudar?</p>
            {messages.map((m, i) => (
              <p key={i} className={`chat-bubble ${i % 2 === 0 ? "sent" : ""}`}>
                {m}
              </p>
            ))}
            {messages.length === 0 &&
              Object.keys(replies).map((option) => (
                <Button key={option} variant="outline" onClick={() => send(option)}>
                  {option}
                  <ChevronRight />
                </Button>
              ))}
          </div>
          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(text);
            }}
          >
            <Input
              aria-label="Mensagem"
              placeholder="Escreva sua mensagem..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button size="icon" aria-label="Enviar mensagem">
              <Send />
            </Button>
          </form>
        </section>
      )}
      <Button
        className="chat-trigger"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar atendimento" : "Abrir atendimento"}
      >
        {open ? <X /> : <MessageCircle />}
        <span>Vamos conversar?</span>
      </Button>
    </div>
  );
}
export function PublicLayout({
  children,
  theme = "contractor",
  brandContext,
}: {
  children: React.ReactNode;
  theme?: Audience;
  brandContext?: "Coop" | "Empresas" | "App" | "Admin";
}) {
  return (
    <div className={`theme-${theme}`}>
      <Header context={brandContext} />
      {children}
      <Footer />
      <Chat />
    </div>
  );
}
export function Steps({ professional = false }: { professional?: boolean }) {
  const items = professional
    ? [
        ["Crie seu perfil", "Conte sua experiência e o que você faz de melhor."],
        ["Encontre oportunidades", "Escolha trabalhos que combinam com você."],
        ["Conecte-se", "Converse e alinhe os detalhes do serviço."],
        ["Faça acontecer", "Trabalhe e construa novas conexões."],
      ]
    : [
        ["Cadastre-se", "Crie sua conta como pessoa física ou empresa."],
        ["Publique sua necessidade", "Conte o que precisa, onde e quando."],
        ["Encontre a pessoa certa", "Conheça os perfis e converse com profissionais."],
        ["Faça acontecer", "Combine os detalhes e comece essa parceria."],
      ];
  return (
    <div className="steps-grid">
      {items.map(([title, desc], i) => (
        <div className="how-step" key={title}>
          <div className="step-number">
            0{i + 1}
            {i < 3 && <ArrowRight />}
          </div>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      ))}
    </div>
  );
}
export function TrustBand() {
  return (
    <div className="trust-band container">
      {[
        [ShieldCheck, "Confiança em cada conexão", "Relações com mais tranquilidade"],
        [Users, "Pessoas em primeiro lugar", "Talentos e oportunidades reais"],
        [Handshake, "Cooperação que transforma", "Mais impacto para a comunidade"],
      ].map(([Icon, title, description]) => {
        const I = Icon as typeof ShieldCheck;
        return (
          <div className="trust-item" key={String(title)}>
            <I />
            <div>
              <strong>{String(title)}</strong>
              <p>{String(description)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="check-item">
      <Check />
      {children}
    </div>
  );
}
export const dashboardPaths = {
  contractor: "/app/contratante/dashboard",
  professional: "/app/profissional/dashboard",
  admin: "/admin",
} as const;
export function Avatar({ name, color = 0 }: { name: string; color?: number }) {
  return (
    <span className={`avatar avatar-${color % 4}`}>
      {name
        .split(" ")
        .map((x) => x[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}
export function meta(title: string, description: string) {
  return {
    meta: [
      { title: `${title} — Freelas` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — Freelas` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
