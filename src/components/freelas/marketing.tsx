import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Check,
  CircleCheck,
  Coffee,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Utensils,
  Brush,
  DoorOpen,
  HeartHandshake,
  BriefcaseBusiness,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import teamImage from "@/assets/freelas-team.jpg";
import { Avatar, CheckItem, PublicLayout, services, Steps, TrustBand } from "./shared";
function InterfacePreview({ professional = false }: { professional?: boolean }) {
  return (
    <div className={`preview-window ${professional ? "theme-professional" : ""}`}>
      <div className="preview-titlebar">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>freelas / {professional ? "profissional" : "contratante"}</span>
        <span className="preview-demo">DEMO</span>
      </div>
      <div className="preview-content">
        <div className="preview-sidebar">
          <span className="mini-brand">f.</span>
          <Building2 />
          <BriefcaseBusiness />
          <Users />
          <HeartHandshake />
        </div>
        <div className="preview-main">
          <div className="preview-greeting">
            <div>
              <span>{professional ? "SEU PRÓXIMO PASSO" : "BOAS CONEXÕES COMEÇAM AQUI"}</span>
              <h3>{professional ? "Seu talento tem lugar." : "Olá, Ana. Vamos conectar?"}</h3>
            </div>
            <span className="preview-profile">{professional ? "MS" : "AC"}</span>
          </div>
          <div className="mini-stats">
            <div>
              <span>{professional ? "Oportunidades" : "Vagas abertas"}</span>
              <strong>
                {professional ? "12" : "08"} <small>↗</small>
              </strong>
            </div>
            <div>
              <span>{professional ? "Candidaturas" : "Candidaturas"}</span>
              <strong>
                {professional ? "03" : "24"} <small>↗</small>
              </strong>
            </div>
            <div>
              <span>{professional ? "Conexões" : "Profissionais"}</span>
              <strong>
                {professional ? "05" : "16"} <small>↗</small>
              </strong>
            </div>
          </div>
          <div className="preview-list-title">
            <strong>
              {professional ? "Oportunidades para você" : "Profissionais em destaque"}
            </strong>
            <span>
              Ver todos <ArrowRight size={12} />
            </span>
          </div>
          {(professional
            ? ["Recepcionista", "Auxiliar de limpeza"]
            : ["Mariana Santos", "Lucas Oliveira"]
          ).map((name, i) => (
            <div className="preview-person" key={name}>
              {professional ? (
                <span className="preview-job-icon">
                  {i ? <Brush size={18} /> : <DoorOpen size={18} />}
                </span>
              ) : (
                <Avatar name={name} color={i} />
              )}
              <div>
                <strong>{name}</strong>
                <span>
                  {professional
                    ? "Belo Horizonte · Presencial"
                    : i
                      ? "Portaria e recepção"
                      : "Limpeza e conservação"}
                </span>
              </div>
              {professional ? (
                <span className="status-pill">Nova</span>
              ) : (
                <span className="rating">
                  <Star size={11} /> {i ? "4,8" : "4,9"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export function Landing() {
  return (
    <PublicLayout>
      <main>
        <section className="landing-hero container">
          <div className="hero-eyebrow">
            <span className="live-dot" /> CONEXÕES LOCAIS. POSSIBILIDADES REAIS.
          </div>
          <h1>
            Talentos que conectam.
            <br />
            <span className="text-primary">Oportunidades</span> que{" "}
            <span className="text-success">transformam.</span>
          </h1>
          <p className="hero-description">
            Encontre quem faz acontecer. Ou a oportunidade que faltava.
            <br className="desktop-break" /> A Freelas conecta pessoas e organizações com propósito.
          </p>
          <div className="hero-actions">
            <Button size="lg" asChild>
              <Link to="/para-contratantes">
                <Building2 /> Quero contratar <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" className="professional-cta" asChild>
              <Link to="/para-profissionais">
                <Users /> Quero trabalhar <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="hero-location">
            <MapPin size={14} /> Belo Horizonte e região metropolitana
          </div>
          <div className="hero-previews">
            <InterfacePreview />
            <InterfacePreview professional />
            <div className="connection-stamp">
              <HeartHandshake />
              <span>
                Gente que faz.
                <br />
                <strong>Juntos, muito mais.</strong>
              </span>
            </div>
          </div>
        </section>
        <TrustBand />
        <section className="section section-soft">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">SIMPLES, DO COMEÇO AO ENCONTRO</span>
                <h2>Uma boa conexão começa aqui.</h2>
              </div>
              <p>
                Você escolhe seu caminho.
                <br />A gente aproxima as pessoas.
              </p>
            </div>
            <Steps />
          </div>
        </section>
        <section className="section container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">TALENTOS PARA O SEU DIA A DIA</span>
              <h2>
                O serviço certo.
                <br />A pessoa certa.
              </h2>
            </div>
            <p>
              Para necessidades pontuais ou novas parcerias,
              <br />
              conte com diferentes áreas de atuação.
            </p>
          </div>
          <div className="services-grid">
            {services.map((name, i) => {
              const Icon =
                [Brush, DoorOpen, BriefcaseBusiness, Coffee, Utensils, Utensils, ShieldCheck][i] ??
                BriefcaseBusiness;
              return (
                <Link to="/para-contratantes" className="service-card" key={name}>
                  <span className="service-icon">
                    <Icon />
                  </span>
                  <h3>{name}</h3>
                  <ArrowRight />
                </Link>
              );
            })}
          </div>
        </section>
        <section className="institutional-band">
          <img
            src={teamImage}
            width={1200}
            height={1008}
            alt="Profissionais de recepção, alimentação e conservação"
            loading="lazy"
          />
          <div className="institutional-shade" />
          <div className="container institutional-copy">
            <span className="eyebrow">MAIS QUE SERVIÇOS. COOPERAÇÃO.</span>
            <h2>
              Freelas.
              <br />
              Pessoas no centro.
              <br />
              Impacto de verdade.
            </h2>
            <p>
              Conectamos o talento de quem trabalha às necessidades de quem contrata. Uma rede de
              cooperação a serviço de pessoas, organizações e do Terceiro Setor.
            </p>
            <Button asChild size="lg">
              <Link to="/para-profissionais">
                Faça parte dessa conexão <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
        <section className="section container audiences">
          <span className="eyebrow">PARA QUEM PRECISA FAZER ACONTECER</span>
          <h2>Diferentes histórias. O mesmo propósito.</h2>
          <div className="audience-list">
            {[
              "ONGs e organizações sociais",
              "Associações comunitárias",
              "Instituições públicas",
              "Empresas privadas",
              "Escolas e instituições de ensino",
              "Hospitais e instituições de saúde",
              "Pessoas físicas",
            ].map((s) => (
              <span key={s}>
                <CircleCheck />
                {s}
              </span>
            ))}
          </div>
        </section>
        <section className="final-cta">
          <div className="container">
            <span className="eyebrow">VAMOS COMEÇAR?</span>
            <h2>Sua próxima conexão está aqui.</h2>
            <p>Um novo talento para sua equipe. Uma nova oportunidade para você.</p>
            <div className="hero-actions">
              <Button size="lg" asChild>
                <Link to="/cadastro-contratante">
                  Quero contratar <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" className="professional-cta" asChild>
                <Link to="/cadastro-profissional">
                  Quero trabalhar <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
export function AudiencePage({ professional = false }: { professional?: boolean }) {
  return (
    <PublicLayout theme={professional ? "professional" : "contractor"}>
      <main>
        <section className="audience-hero">
          <img src={teamImage} width={1200} height={1008} alt="Equipe de profissionais Freelas" />
          <div className="audience-hero-overlay" />
          <div className="container">
            <div className="audience-hero-copy">
              <span className="hero-eyebrow">
                {professional ? <Users size={16} /> : <Building2 size={16} />}{" "}
                {professional ? "PARA QUEM FAZ ACONTECER" : "PARA QUEM CONTRATA"}
              </span>
              <h1>
                {professional ? (
                  <>
                    Seu talento.
                    <br />
                    Novos caminhos.
                    <br />
                    <span>Mais oportunidades.</span>
                  </>
                ) : (
                  <>
                    Pessoas certas.
                    <br />
                    Boas parcerias.
                    <br />
                    <span>Seu negócio cresce.</span>
                  </>
                )}
              </h1>
              <p>
                {professional
                  ? "Encontre oportunidades perto de você, mostre sua experiência e faça parte de uma rede que valoriza o seu trabalho."
                  : "Conecte sua empresa ou organização a profissionais em Belo Horizonte e região metropolitana."}
              </p>
              <Button size="lg" asChild>
                <Link to={professional ? "/cadastro-profissional" : "/cadastro-contratante"}>
                  {professional ? "Quero trabalhar" : "Quero contratar"} <ArrowRight />
                </Link>
              </Button>
              <span className="hero-caption">
                <ShieldCheck size={15} /> Pessoas e cooperação em primeiro lugar
              </span>
            </div>
          </div>
        </section>
        <TrustBand />
        <section className="section container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SEU DIA A DIA, MAIS SIMPLES</span>
              <h2>
                {professional
                  ? "Mais espaço para o seu talento."
                  : "Menos busca. Mais boas conexões."}
              </h2>
            </div>
          </div>
          <div className="benefit-grid">
            {(professional
              ? [
                  [
                    Users,
                    "Um perfil que conta sua história",
                    "Mostre suas habilidades, experiência e áreas de interesse.",
                  ],
                  [
                    MapPin,
                    "Oportunidades perto de você",
                    "Encontre trabalhos em Belo Horizonte e região metropolitana.",
                  ],
                  [
                    Star,
                    "Seu trabalho valorizado",
                    "Construa relações e uma reputação com cada nova conexão.",
                  ],
                ]
              : [
                  [
                    Building2,
                    "Para pessoas e organizações",
                    "Um caminho para contratar, seja como empresa ou pessoa física.",
                  ],
                  [
                    Users,
                    "Profissionais de diferentes áreas",
                    "Conheça talentos para as necessidades do seu dia a dia.",
                  ],
                  [
                    HeartHandshake,
                    "Mais organização e proximidade",
                    "Acompanhe oportunidades, candidaturas e conversas em um só lugar.",
                  ],
                ]
            ).map(([Icon, t, d]) => {
              const I = Icon as typeof Users;
              return (
                <div className="benefit-item" key={String(t)}>
                  <I />
                  <h3>{String(t)}</h3>
                  <p>{String(d)}</p>
                </div>
              );
            })}
          </div>
        </section>
        <section className="section section-soft">
          <div className="container">
            <span className="eyebrow">UM CAMINHO SEM COMPLICAÇÃO</span>
            <h2>{professional ? "Como começar a trabalhar" : "Como encontrar um profissional"}</h2>
            <Steps professional={professional} />
          </div>
        </section>
        <section className="section container platform-section">
          <div>
            <span className="eyebrow">TUDO MAIS PERTO DE VOCÊ</span>
            <h2>
              {professional ? "Sua próxima oportunidade." : "Sua equipe, bem conectada."}
              <br />
              Seu novo ponto de encontro.
            </h2>
            <p>Conheça a experiência Freelas por dentro.</p>
            <CheckItem>
              {professional
                ? "Oportunidades de diferentes áreas"
                : "Perfis e experiências dos profissionais"}
            </CheckItem>
            <CheckItem>Candidaturas organizadas</CheckItem>
            <CheckItem>Conversas em um só lugar</CheckItem>
            <Button variant="outline" asChild>
              <Link
                to={professional ? "/app/profissional/dashboard" : "/app/contratante/dashboard"}
              >
                Explorar demonstração <ArrowRight />
              </Link>
            </Button>
          </div>
          <InterfacePreview professional={professional} />
        </section>
        <section className="final-cta">
          <div className="container">
            <h2>
              {professional ? "Faça parte. Faça acontecer." : "Vamos encontrar a pessoa certa?"}
            </h2>
            <p>Sua nova conexão começa com um cadastro.</p>
            <Button size="lg" asChild>
              <Link to={professional ? "/cadastro-profissional" : "/cadastro-contratante"}>
                Criar minha conta <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
