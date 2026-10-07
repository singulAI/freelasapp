import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  Home,
  Image,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, DeveloperCredit, DemoTag, Logo, services, type Audience } from "./shared";
const jobs = [
  {
    title: "Auxiliar de limpeza",
    org: "Instituto Horizonte",
    area: "Limpeza e conservação",
    location: "Belo Horizonte · Centro",
    type: "Temporário",
    date: "12 out",
    time: "08h às 17h",
    count: 8,
  },
  {
    title: "Recepcionista",
    org: "Clínica Bem Viver",
    area: "Portaria e recepção",
    location: "Belo Horizonte · Savassi",
    type: "Meio período",
    date: "14 out",
    time: "13h às 18h",
    count: 6,
  },
  {
    title: "Garçom para evento",
    org: "Associação Nova Vida",
    area: "Garçons",
    location: "Contagem · Eldorado",
    type: "Freelancer",
    date: "16 out",
    time: "18h às 23h",
    count: 10,
  },
];
export function Dashboard({ role = "contractor" }: { role?: Audience }) {
  const professional = role === "professional";
  const admin = role === "admin";
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [view, setView] = useState("Visão geral");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todas as áreas");
  const [modal, setModal] = useState("");
  const [notice, setNotice] = useState("");
  const [applied, setApplied] = useState<string[]>([]);
  const [published, setPublished] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [conversation, setConversation] = useState(role === "professional" ? "Instituto Horizonte" : "Mariana Santos");
  const [tab, setTab] = useState("Todas");
  const [notifications, setNotifications] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!modal && !mobile) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    const dialog = modal ? dialogRef.current : sidebarRef.current;
    dialog?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModal("");
        setMobile(false);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, select, textarea, [tabindex="0"]'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [modal, mobile]);
  const nav = admin
    ? [
        [LayoutDashboard, "Visão geral"],
        [FileText, "Conteúdo"],
        [Image, "Mídia"],
        [Building2, "Contratantes"],
        [Users, "Cooperados"],
        [BriefcaseBusiness, "Oportunidades"],
        [MessageSquare, "Atendimento"],
        [Sparkles, "Inteligência Artificial"],
        [Settings, "Configurações"],
      ]
    : professional
      ? [
          [LayoutDashboard, "Visão geral"],
          [BriefcaseBusiness, "Oportunidades"],
          [FileText, "Candidaturas"],
          [MessageSquare, "Mensagens"],
          [Users, "Meu perfil"],
          [ShieldCheck, "Documentos"],
          [Settings, "Configurações"],
        ]
      : [
          [LayoutDashboard, "Visão geral"],
          [Users, "Profissionais"],
          [BriefcaseBusiness, "Oportunidades"],
          [FileText, "Candidaturas"],
          [MessageSquare, "Mensagens"],
          [Settings, "Configurações"],
        ];
  function changeView(name: string) {
    setMobile(false);
    setView(name);
    setMobile(false);
    setQuery("");
  }
  const filtered = jobs.filter(
    (j) =>
      (filter === "Todas as áreas" || filter === j.area) &&
      `${j.title} ${j.org} ${j.location}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className={`dashboard-layout theme-${role} ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside ref={sidebarRef} tabIndex={mobile ? -1 : undefined} className={`dashboard-sidebar ${mobile ? "sidebar-mobile-open" : ""}`}>
        <Logo small context={admin ? "Admin" : professional ? "Coop" : "Empresas"} />
        <div className="workspace-select">
          <span className="workspace-icon">
            {admin ? <ShieldCheck /> : professional ? <Users /> : <Building2 />}
          </span>
          {!collapsed && (
            <div>
              <strong>
                {admin
                  ? "Administração"
                  : professional
                    ? "Área do profissional"
                    : "Área do contratante"}
              </strong>
              <small>
                {admin ? "Lílian · Demo" : professional ? "Mariana Santos" : "Juliana · Demo"}
              </small>
            </div>
          )}
        </div>
        <span className="sidebar-label">{collapsed ? "" : "PRINCIPAL"}</span>
        <nav aria-label="Navegação do painel">
          {nav.map(([Icon, name]) => {
            const I = Icon as typeof Users;
            return (
              <Button
                variant="ghost"
                key={String(name)}
                title={String(name)}
                className={view === name ? "sidebar-item active" : "sidebar-item"}
                onClick={() => changeView(String(name))}
              >
                <I />
                {!collapsed && <span>{String(name)}</span>}
                {name === "Mensagens" && !collapsed && <small>2</small>}
              </Button>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          {!collapsed && (
            <div className="sidebar-help">
              <CircleHelp />
              <strong>Conte com a gente</strong>
              <p>Boas conexões começam com uma boa conversa.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setMobile(false);
                  admin
                    ? setNotice("Atendimento disponível na próxima etapa.")
                    : setView("Mensagens");
                }}
              >
                Falar com a Freelas <ArrowRight />
              </Button>
            </div>
          )}
          <Button variant="ghost" className="sidebar-item" asChild>
            <Link to="/">
              <Home />
              {!collapsed && "Voltar ao site"}
            </Link>
          </Button>
          <Button variant="ghost" className="sidebar-item" asChild>
            <Link to="/login">
              <LogOut />
              {!collapsed && "Sair da demonstração"}
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="collapse-button"
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
            {!collapsed && "Recolher menu"}
          </Button>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-breadcrumb">
            <Button
              size="icon"
              variant="ghost"
              className="dashboard-mobile-menu"
              aria-label="Abrir menu do painel"
              aria-expanded={mobile}
              onClick={() => setMobile(!mobile)}
            >
              <Menu />
            </Button>
            <span>{admin ? "Administração" : professional ? "Profissional" : "Contratante"}</span>
            <ChevronRight size={14} />
            <strong>{view}</strong>
          </div>
          <div className="dashboard-header-right">
            <DemoTag />
            <div className="notification-wrapper">
              <Button
                size="icon"
                variant="ghost"
                aria-label="Notificações"
                onClick={() => setNotifications(!notifications)}
              >
                <Bell />
                <span className="notification-dot" />
              </Button>
              {notifications && (
                <div className="notification-panel">
                  <strong>Suas notificações</strong>
                  <p>Uma nova conexão espera por você.</p>
                  <p>Confira as oportunidades desta semana.</p>
                  <small>Dados demonstrativos</small>
                </div>
              )}
            </div>
            <Avatar
              name={admin ? "Lílian" : professional ? "Mariana Santos" : "Juliana"}
              color={professional ? 1 : 0}
            />
          </div>
        </header>
        <main className="dashboard-content">
          {notice && (
            <div role="status" className="dashboard-notice">
              <CircleHelp size={18} />
              {notice}
              <Button
                size="icon"
                variant="ghost"
                aria-label="Fechar aviso"
                onClick={() => setNotice("")}
              >
                <X />
              </Button>
            </div>
          )}
          <div className="dashboard-page-heading">
            <div>
              <span className="eyebrow">
                {admin ? "UM OLHAR SOBRE A FREELAS" : "QUARTA-FEIRA, 7 DE OUTUBRO"}
              </span>
              <h1>
                {view === "Visão geral"
                  ? admin
                    ? "Visão geral da plataforma"
                    : professional
                      ? "Olá, Mariana"
                      : "Olá, Juliana"
                  : view}
              </h1>
              <p>
                {view === "Visão geral"
                  ? admin
                    ? "Acompanhe as conexões que fazem a rede crescer."
                    : professional
                      ? "Vamos encontrar sua próxima oportunidade?"
                      : "Vamos fazer boas conexões hoje?"
                  : "Tudo o que você precisa, mais perto de você."}
              </p>
            </div>
            {!professional && !admin && (
              <Button onClick={() => setModal("Publicar oportunidade")}>
                <Plus /> Nova oportunidade
              </Button>
            )}
            {professional && (
              <Button variant="outline" onClick={() => changeView("Meu perfil")}>
                <Users /> Meu perfil <ArrowRight />
              </Button>
            )}
            {admin && (
              <span className="period-tag">
                <CalendarDays size={15} /> Outubro de 2026 <ChevronDown size={14} />
              </span>
            )}
          </div>
          {view === "Visão geral" && (
            <>
              <div className="stat-grid">
                {(admin
                  ? [
                      [Users, "Cooperados", "128", "12 novos neste mês"],
                      [Building2, "Contratantes", "46", "6 novos neste mês"],
                      [BriefcaseBusiness, "Oportunidades", "32", "8 abertas nesta semana"],
                      [TrendingUp, "Conexões realizadas", "84", "18 neste mês"],
                    ]
                  : professional
                    ? [
                        [BriefcaseBusiness, "Oportunidades disponíveis", "12", "Perto de você"],
                        [
                          FileText,
                          "Minhas candidaturas",
                          String(3 + applied.length),
                          "1 em análise",
                        ],
                        [Users, "Conexões realizadas", "05", "Seu talento faz a diferença"],
                        [Star, "Avaliação do perfil", "4,9", "Com base em 8 avaliações"],
                      ]
                    : [
                        [
                          BriefcaseBusiness,
                          "Oportunidades abertas",
                          published ? "09" : "08",
                          "2 novas nesta semana",
                        ],
                        [FileText, "Candidaturas recebidas", "24", "6 aguardando sua análise"],
                        [Users, "Profissionais conectados", "16", "4 novas conexões"],
                        [Star, "Avaliação da organização", "4,8", "Construindo boas relações"],
                      ]
                ).map(([Icon, title, total, sub]) => {
                  const I = Icon as typeof Users;
                  return (
                    <div className="stat-card" key={String(title)}>
                      <div>
                        <span>{String(title)}</span>
                        <I />
                      </div>
                      <strong>{String(total)}</strong>
                      <small>
                        <ArrowUpRight size={13} />
                        {String(sub)}
                      </small>
                    </div>
                  );
                })}
              </div>
              {admin ? (
                <>
                  <div className="admin-chart-grid">
                    <section className="chart-section">
                      <div className="panel-heading">
                        <h2>Conexões ao longo do tempo</h2>
                        <span>Últimos 6 meses</span>
                      </div>
                      <div className="bar-chart">
                        {[38, 57, 49, 76, 65, 91].map((h, i) => (
                          <div key={i}>
                            <div className={`bar bar-height-${h}`}>
                              <span>{h}</span>
                            </div>
                            <small>{["Mai", "Jun", "Jul", "Ago", "Set", "Out"][i]}</small>
                          </div>
                        ))}
                      </div>
                      <div className="chart-legend">
                        <span /> Conexões realizadas · Dados demo
                      </div>
                    </section>
                    <section className="admin-services">
                      <h2>Áreas em destaque</h2>
                      {[
                        "Limpeza e conservação",
                        "Portaria e recepção",
                        "Garçons",
                        "Serviços gerais",
                      ].map((s, i) => (
                        <div className="service-meter" key={s}>
                          <div>
                            <span>{s}</span>
                            <strong>{[38, 27, 21, 14][i]}%</strong>
                          </div>
                          <div>
                            <span className={`meter-${i}`} />
                          </div>
                        </div>
                      ))}
                      <small>Distribuição ilustrativa das oportunidades</small>
                    </section>
                  </div>
                  <section className="table-panel">
                    <div className="panel-heading">
                      <h2>Atividade recente</h2>
                      <DemoTag />
                    </div>
                    <div className="table-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>Organização / profissional</th>
                            <th>Atividade</th>
                            <th>Data</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            "Instituto Horizonte",
                            "Mariana Santos",
                            "Clínica Bem Viver",
                            "Lucas Oliveira",
                          ].map((n, i) => (
                            <tr key={n}>
                              <td>
                                <div className="table-name">
                                  <Avatar name={n} color={i} />
                                  <strong>{n}</strong>
                                </div>
                              </td>
                              <td>
                                {
                                  [
                                    "Nova oportunidade",
                                    "Cadastro de cooperado",
                                    "Nova conexão",
                                    "Perfil atualizado",
                                  ][i]
                                }
                              </td>
                              <td>07 out, 2026</td>
                              <td>
                                <span className="status-pill">
                                  {i === 1 ? "Em análise" : "Concluído"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <section className="dashboard-welcome-band">
                    <span className="welcome-icon">
                      {professional ? <Sparkles /> : <HeartIcon />}
                    </span>
                    <div>
                      <h2>
                        {professional
                          ? "Seu talento pode abrir novas portas."
                          : "Uma boa equipe começa com uma boa conexão."}
                      </h2>
                      <p>
                        {professional
                          ? "Encontre oportunidades que combinam com sua experiência."
                          : "Explore perfis e encontre quem faz acontecer com você."}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => changeView(professional ? "Oportunidades" : "Profissionais")}
                    >
                      {professional ? "Explorar oportunidades" : "Encontrar profissionais"}{" "}
                      <ArrowRight />
                    </Button>
                  </section>
                  <section className="dashboard-jobs">
                    <div className="panel-heading">
                      <h2>
                        {professional ? "Oportunidades para você" : "Suas oportunidades recentes"}
                      </h2>
                      <Button variant="link" onClick={() => changeView("Oportunidades")}>
                        Ver todas <ArrowRight />
                      </Button>
                    </div>
                    <div className="job-grid">
                      {jobs.map((job, i) => (
                        <JobCard
                          key={job.title}
                          job={job}
                          index={i}
                          professional={professional}
                          applied={applied.includes(job.title)}
                          onAction={() =>
                            professional
                              ? setModal(job.title)
                              : setModal(`Candidaturas: ${job.title}`)
                          }
                        />
                      ))}
                    </div>
                  </section>
                  <div className="dashboard-bottom-grid">
                    <section className="people-panel">
                      <div className="panel-heading">
                        <h2>
                          {professional ? "Minhas candidaturas" : "Profissionais recomendados"}
                        </h2>
                        <Button
                          variant="link"
                          onClick={() =>
                            changeView(professional ? "Candidaturas" : "Profissionais")
                          }
                        >
                          Ver todos <ArrowRight />
                        </Button>
                      </div>
                      {["Mariana Santos", "Lucas Oliveira", "Camila Souza"].map((n, i) => (
                        <div className="person-row" key={n}>
                          <Avatar name={professional ? (jobs[i]?.org ?? n) : n} color={i} />
                          <div>
                            <strong>{professional ? (jobs[i]?.title ?? n) : n}</strong>
                            <span>{professional ? (jobs[i]?.org ?? n) : services[i]}</span>
                          </div>
                          {professional ? (
                            <span className="status-pill">
                              {i === 0 ? "Em análise" : "Enviada"}
                            </span>
                          ) : (
                            <>
                              <span className="rating">
                                <Star size={12} />
                                4,{9 - i}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setModal(`Perfil: ${n}`)}
                              >
                                Ver perfil
                              </Button>
                            </>
                          )}
                        </div>
                      ))}
                    </section>
                    <section className="agenda-panel">
                      <div className="panel-heading">
                        <h2>Sua agenda</h2>
                        <CalendarDays size={18} />
                      </div>
                      <span className="agenda-month">OUTUBRO 2026</span>
                      <div className="week-strip">
                        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d, i) => (
                          <div className={i === 2 ? "today" : ""} key={d}>
                            <small>{d}</small>
                            <strong>{5 + i}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="agenda-event">
                        <span className="agenda-event-dot" />
                        <div>
                          <strong>
                            {professional
                              ? "Conversa com Instituto Horizonte"
                              : "Conversa com Mariana Santos"}
                          </strong>
                          <p>Hoje · 14h30</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Abrir conversa"
                          onClick={() => changeView("Mensagens")}
                        >
                          <ArrowRight />
                        </Button>
                      </div>
                    </section>
                  </div>
                </>
              )}
            </>
          )}
          {view === "Oportunidades" && (
            <>
              <div className="dashboard-filters">
                <div className="search-field">
                  <Search />
                  <Input
                    placeholder="Buscar oportunidades..."
                    aria-label="Buscar oportunidades"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <select
                  aria-label="Filtrar por área"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>Todas as áreas</option>
                  {services.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="job-grid">
                {filtered.map((job, i) => (
                  <JobCard
                    key={job.title}
                    job={job}
                    index={i}
                    professional={professional}
                    applied={applied.includes(job.title)}
                    onAction={() =>
                      setModal(professional ? job.title : `Candidaturas: ${job.title}`)
                    }
                  />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="empty-state">
                  <Search />
                  <h2>Nenhuma oportunidade encontrada</h2>
                  <p>Experimente outra palavra ou área de atuação.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery("");
                      setFilter("Todas as áreas");
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
            </>
          )}
          {view === "Profissionais" && (
            <>
              <div className="search-field">
                <Search />
                <Input
                  placeholder="Buscar profissionais..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="professional-grid">
                {["Mariana Santos", "Lucas Oliveira", "Camila Souza", "Pedro Lima"]
                  .filter((n) => n.toLowerCase().includes(query.toLowerCase()))
                  .map((n, i) => (
                    <article className="professional-card" key={n}>
                      <Avatar name={n} color={i} />
                      <h2>{n}</h2>
                      <p>{services[i]}</p>
                      <span className="rating">
                        <Star size={14} /> 4,9
                      </span>
                      <span className="job-location">
                        <MapPin size={14} /> Belo Horizonte
                      </span>
                      <Button variant="outline" onClick={() => setModal(`Perfil: ${n}`)}>
                        Ver perfil <ArrowRight />
                      </Button>
                    </article>
                  ))}
              </div>
            </>
          )}
          {view === "Candidaturas" && (
            <section className="table-panel">
              <div className="table-tabs">
                {["Todas", "Em análise", "Enviada"].map((t) => (
                  <Button
                    key={t}
                    variant="ghost"
                    className={tab === t ? "selected" : ""}
                    onClick={() => setTab(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>{professional ? "Oportunidade" : "Profissional"}</th>
                      <th>{professional ? "Organização" : "Oportunidade"}</th>
                      <th>Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {jobs
                      .filter(
                        (_, i) => tab === "Todas" || (tab === "Em análise" ? i === 0 : i !== 0),
                      )
                      .map((j, i) => (
                        <tr key={j.title}>
                          <td>
                            <strong>
                              {professional
                                ? j.title
                                : ["Mariana Santos", "Lucas Oliveira", "Camila Souza"][jobs.indexOf(j)]}
                            </strong>
                          </td>
                          <td>{professional ? j.org : j.title}</td>
                          <td>
                            <span className="status-pill">
                              {jobs.indexOf(j) === 0 ? "Em análise" : "Enviada"}
                            </span>
                          </td>
                          <td>
                            <Button variant="outline" size="sm" onClick={() => setModal(j.title)}>
                              Ver detalhes
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          {view === "Mensagens" && (
            <section className="messages-panel">
              <aside>
                <h2>Conversas</h2>
                {(professional ? ["Instituto Horizonte", "Clínica Bem Viver"] : ["Mariana Santos", "Lucas Oliveira"]).map((n, i) => (
                  <Button
                    key={n}
                    variant="ghost"
                    className="conversation-item"
                    onClick={() => {
                      setConversation(n);
                      setMessages([]);
                      setMessage("");
                    }}
                    aria-pressed={conversation === n}
                  >
                    <Avatar name={n} color={i} />
                    <span>
                      <strong>{n}</strong>
                      <small>Vamos alinhar os detalhes?</small>
                    </span>
                  </Button>
                ))}
              </aside>
              <div className="conversation-body">
                <div className="conversation-heading">
                  <Avatar name={conversation} />
                  <div>
                    <strong>{conversation}</strong>
                    <small>Conversa demonstrativa</small>
                  </div>
                </div>
                <div className="conversation-log">
                  <p>{professional ? "Olá! Podemos alinhar as atividades, o horário e o local desta oportunidade?" : "Olá, Juliana. Podemos revisar as atividades e o horário da oportunidade?"}</p>
                  {messages.map((m, i) => (
                    <p className={i % 2 === 0 ? "sent" : ""} key={i}>
                      {m}
                    </p>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (message.trim()) {
                      setMessages((p) => [
                        ...p,
                        message,
                        "Combinado! Esta resposta é demonstrativa. Nenhuma mensagem é enviada de verdade.",
                      ]);
                      setMessage("");
                    }
                  }}
                >
                  <Input
                    placeholder="Escreva sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button aria-label="Enviar mensagem">
                    <ArrowRight />
                  </Button>
                </form>
              </div>
            </section>
          )}
          {["Meu perfil", "Configurações", "Documentos"].includes(view) && (
            <section className="profile-editor">
              {view === "Documentos" ? (
                <>
                  <ShieldCheck size={40} />
                  <h2>Verificação de documentos</h2>
                  <p>Nenhum documento é coletado nesta demonstração.</p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setNotice("Documento de exemplo selecionado. Nenhum arquivo foi enviado.")
                    }
                  >
                    <Plus /> Selecionar exemplo
                  </Button>
                </>
              ) : (
                <>
                  <div className="profile-heading">
                    <Avatar name={professional ? "Mariana Santos" : "Instituto Horizonte"} />
                    <div>
                      <h2>{professional ? "Mariana Santos" : "Instituto Horizonte"}</h2>
                      <span>Perfil demonstrativo</span>
                    </div>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setNotice(
                        "Alterações demonstrativas concluídas. Os dados não foram armazenados.",
                      );
                    }}
                  >
                    <label className="form-field">
                      <span>Nome</span>
                      <Input
                        defaultValue={professional ? "Mariana Santos" : "Instituto Horizonte"}
                      />
                    </label>
                    <label className="form-field">
                      <span>E-mail</span>
                      <Input placeholder="Seu e-mail" />
                    </label>
                    <label className="form-field">
                      <span>Cidade</span>
                      <Input defaultValue="Belo Horizonte" />
                    </label>
                    <Button>
                      Salvar alterações <Check />
                    </Button>
                  </form>
                </>
              )}
            </section>
          )}
          <div className="dashboard-footnote">
            <ShieldCheck size={13} /> Todos os nomes, indicadores e atividades são dados
            demonstrativos. <span>Freelas · Pessoas que conectam.</span>
          </div>
          <div className="dashboard-developer-credit"><DeveloperCredit /></div>
        </main>
      </div>
      {mobile && <div className="sidebar-scrim" onClick={() => setMobile(false)} />}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal("")}>
          <section
            ref={dialogRef}
            tabIndex={-1}
            className="demo-modal"
            role="dialog"
            aria-modal="true"
            aria-label={modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="panel-heading">
              <h2>{modal}</h2>
              <Button variant="ghost" size="icon" aria-label="Fechar" onClick={() => setModal("")}>
                <X />
              </Button>
            </div>
            <DemoTag />
            {modal === "Publicar oportunidade" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPublished(true);
                  setModal("");
                  setNotice("Oportunidade criada nesta demonstração. Nenhum dado foi armazenado.");
                }}
              >
                <label className="form-field">
                  <span>Título da oportunidade</span>
                  <Input placeholder="Ex.: Auxiliar de limpeza" />
                </label>
                <label className="form-field">
                  <span>Área de atuação</span>
                  <select>
                    {services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <div className="form-grid">
                  <label className="form-field">
                    <span>Data</span>
                    <Input type="date" />
                  </label>
                  <label className="form-field">
                    <span>Local</span>
                    <Input placeholder="Belo Horizonte" />
                  </label>
                </div>
                <label className="form-field">
                  <span>Descrição</span>
                  <textarea placeholder="Conte o que você precisa" rows={3} />
                </label>
                <Button className="w-full">
                  Publicar demonstração <ArrowRight />
                </Button>
              </form>
            ) : modal.startsWith("Perfil:") ? (
              <>
                <div className="modal-profile">
                  <Avatar name={modal.replace("Perfil: ", "")} />
                  <h3>{modal.replace("Perfil: ", "")}</h3>
                  <p>Profissional de serviços · Belo Horizonte</p>
                  <span className="rating">
                    <Star size={14} /> 4,9 · Avaliações demonstrativas
                  </span>
                </div>
                <p>
                  Experiência, dedicação e cuidado em cada serviço. Perfil ilustrativo para conhecer
                  a experiência Freelas.
                </p>
                <Button
                  className="w-full"
                  onClick={() => {
                    setConversation(modal.replace("Perfil: ", ""));
                    setMessages([]);
                    setModal("");
                    changeView("Mensagens");
                  }}
                >
                  Iniciar conversa <MessageSquare />
                </Button>
              </>
            ) : modal.startsWith("Candidaturas:") ? (
              <>
                {["Mariana Santos", "Lucas Oliveira"].map((n, i) => (
                  <div className="person-row" key={n}>
                    <Avatar name={n} color={i} />
                    <strong>{n}</strong>
                    <Button variant="outline" size="sm" onClick={() => setModal(`Perfil: ${n}`)}>
                      Ver perfil
                    </Button>
                  </div>
                ))}
              </>
            ) : (
              <>
                <p className="job-location">
                  <MapPin size={16} /> Belo Horizonte e região metropolitana
                </p>
                <p>
                  Uma oportunidade para trabalhar com dedicação e fazer parte de uma nova conexão.
                  Os detalhes apresentados são demonstrativos.
                </p>
                <div className="form-info">
                  <CalendarDays size={18} /> Outubro de 2026 · Presencial
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    professional
                      ? setApplied((p) => (p.includes(modal) ? p : [...p, modal]))
                      : setView("Mensagens");
                    setModal("");
                    setNotice(
                      professional
                        ? "Candidatura enviada na demonstração. Nenhum dado foi transmitido."
                        : "Conversa demonstrativa disponível.",
                    );
                  }}
                >
                  {professional
                    ? applied.includes(modal)
                      ? "Candidatura já enviada"
                      : "Quero me candidatar"
                    : "Iniciar conversa"}{" "}
                  <ArrowRight />
                </Button>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
function HeartIcon() {
  return <Users />;
}
function JobCard({
  job,
  index,
  professional,
  applied,
  onAction,
}: {
  job: (typeof jobs)[number];
  index: number;
  professional: boolean;
  applied: boolean;
  onAction: () => void;
}) {
  return (
    <article className="job-card">
      <div className="job-top">
        <span className={`job-org-icon org-${index}`}>
          <Building2 />
        </span>
        <span className="status-pill">{professional ? "Nova" : "Aberta"}</span>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Detalhes de ${job.title}`}
          onClick={onAction}
        >
          <MoreHorizontal />
        </Button>
      </div>
      <span className="job-org">{job.org}</span>
      <h3>{job.title}</h3>
      <span className="job-location">
        <MapPin size={14} />
        {job.location}
      </span>
      <div className="job-tags">
        <span>{job.type}</span>
        <span>{job.area}</span>
      </div>
      <div className="job-schedule">
        <span>
          <CalendarDays size={14} />
          {job.date}
        </span>
        <span>
          <Clock3 size={14} />
          {job.time}
        </span>
      </div>
      <div className="job-card-footer">
        {professional ? (
          <span>{applied ? "Candidatura enviada" : "Encontre seu próximo passo"}</span>
        ) : (
          <span>
            <Users size={14} />
            {job.count} candidaturas
          </span>
        )}
        <Button variant="link" onClick={onAction}>
          {professional ? (applied ? "Enviada" : "Ver vaga") : "Ver detalhes"}
          <ArrowRight />
        </Button>
      </div>
    </article>
  );
}
