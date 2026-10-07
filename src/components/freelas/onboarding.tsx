import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CircleCheck,
  Eye,
  EyeOff,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
  Upload,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckItem,
  DemoTag,
  PublicLayout,
  services,
  dashboardPaths,
  type Audience,
} from "./shared";
function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <Input placeholder={placeholder} type={type} />
    </label>
  );
}
export function Login() {
  const [role, setRole] = useState<Audience>("contractor");
  const [show, setShow] = useState(false);
  const [reset, setReset] = useState(false);
  return (
    <PublicLayout theme={role}>
      <main className="auth-background">
        <div className="login-shell">
          <div className="auth-story">
            <span className="eyebrow">BEM-VINDO À FREELAS</span>
            <h1>
              Boas conexões.
              <br />
              Novos começos.
            </h1>
            <p>Entre para encontrar talentos, oportunidades e novas possibilidades.</p>
            <div className="auth-story-points">
              <CheckItem>Pessoas e oportunidades mais próximas</CheckItem>
              <CheckItem>Cooperação que faz a diferença</CheckItem>
              <CheckItem>Belo Horizonte e região metropolitana</CheckItem>
            </div>
            <span className="auth-story-icon">
              <HandshakeIcon />
            </span>
          </div>
          <section className="auth-card">
            <DemoTag />
            <h2>{reset ? "Recuperar acesso" : "Que bom ter você aqui."}</h2>
            <p>{reset ? "Informe o e-mail da sua conta." : "Escolha seu perfil para continuar."}</p>
            <div className="role-select" role="group" aria-label="Tipo de acesso">
              {(["contractor", "professional", "admin"] as const).map((r, i) => (
                <Button
                  key={r}
                  variant="ghost"
                  className={role === r ? "selected" : ""}
                  onClick={() => setRole(r)}
                >
                  {[<Building2 key="b" />, <Users key="u" />, <LockKeyhole key="l" />][i]}
                  {["Contratante", "Profissional", "Admin"][i]}
                </Button>
              ))}
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <Field label="E-mail" placeholder="voce@exemplo.com" type="email" />
              {!reset && (
                <label className="form-field">
                  <span>Senha</span>
                  <div className="password-field">
                    <Input placeholder="Sua senha" type={show ? "text" : "password"} />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                      onClick={() => setShow(!show)}
                    >
                      {show ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </label>
              )}
              {!reset && (
                <div className="form-remember">
                  <label>
                    <input type="checkbox" /> Lembrar de mim
                  </label>
                  <Button variant="link" onClick={() => setReset(true)}>
                    Esqueci minha senha
                  </Button>
                </div>
              )}
              {reset ? (
                <>
                  <Button className="w-full h-11" onClick={() => setReset(false)} type="button">
                    Voltar ao login <ArrowLeft />
                  </Button>
                  <p className="mock-note">Demonstração: nenhum e-mail será enviado.</p>
                </>
              ) : (
                <Button className="w-full h-11" asChild>
                  <Link to={dashboardPaths[role]}>
                    Entrar <ArrowRight />
                  </Link>
                </Button>
              )}
            </form>
            <div className="auth-divider">ou comece uma nova conexão</div>
            <p className="signup-link">
              Ainda não tem uma conta?{" "}
              <Link
                to={role === "professional" ? "/cadastro-profissional" : "/cadastro-contratante"}
              >
                Cadastre-se
              </Link>
            </p>
            <p className="mock-note">
              <ShieldCheck size={14} /> Acesso demonstrativo. Nenhuma autenticação real.
            </p>
          </section>
        </div>
      </main>
    </PublicLayout>
  );
}
function HandshakeIcon() {
  return <Users size={72} strokeWidth={1} />;
}
export function Registration({ professional = false }: { professional?: boolean }) {
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState("Empresa");
  const [accepted, setAccepted] = useState(false);
  const [document, setDocument] = useState(false);
  const [work, setWork] = useState("Freelancer");
  const titles = professional
    ? ["Dados pessoais", "Experiência", "Verificação", "Conclusão"]
    : ["Tipo de conta", "Dados", "Verificação", "Conclusão"];
  return (
    <PublicLayout theme={professional ? "professional" : "contractor"}>
      <main className="auth-background">
        <div className="registration-shell">
          <aside className="registration-story">
            <span className="story-symbol">{professional ? <UserRound /> : <Building2 />}</span>
            <span className="eyebrow">
              {professional ? "PARA PROFISSIONAIS" : "PARA CONTRATANTES"}
            </span>
            <h1>
              {professional ? (
                <>
                  Seu talento merece
                  <br />
                  <span>novas oportunidades.</span>
                </>
              ) : (
                <>
                  Uma boa parceria
                  <br />
                  <span>começa com você.</span>
                </>
              )}
            </h1>
            <p>
              {professional
                ? "Conte sua história e encontre novos caminhos para trabalhar."
                : "Encontre os profissionais certos para fazer acontecer."}
            </p>
            <CheckItem>
              {professional ? "Mostre sua experiência" : "Contrate como empresa ou pessoa física"}
            </CheckItem>
            <CheckItem>
              {professional
                ? "Encontre oportunidades locais"
                : "Encontre diferentes especialidades"}
            </CheckItem>
            <CheckItem>
              {professional ? "Conecte-se e construa sua reputação" : "Organize suas oportunidades"}
            </CheckItem>
            <div className="registration-note">
              <ShieldCheck />
              <p>Seus dados nesta demonstração não são enviados ou armazenados.</p>
            </div>
            <Link to="/login" className="back-link">
              <ArrowLeft size={15} /> Já tenho uma conta
            </Link>
          </aside>
          <section className="registration-card">
            <div className="registration-title">
              <div>
                <h2>
                  {professional ? "Crie sua conta profissional" : "Crie sua conta como contratante"}
                </h2>
                <p>Vamos começar uma nova conexão.</p>
              </div>
              <DemoTag />
            </div>
            <ol className="form-stepper">
              {titles.map((t, i) => (
                <li key={t} className={step === i ? "current" : step > i ? "complete" : ""}>
                  <span>{step > i ? <Check size={15} /> : i + 1}</span>
                  <small>{t}</small>
                </li>
              ))}
            </ol>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="step-content">
                {step === 0 && !professional && (
                  <>
                    <h3>Como você quer contratar?</h3>
                    <p>Escolha o tipo de conta que combina com você.</p>
                    <div className="account-options">
                      {["Pessoa física", "Empresa"].map((a, i) => (
                        <Button
                          variant="outline"
                          className={`account-option ${account === a ? "selected" : ""}`}
                          key={a}
                          onClick={() => setAccount(a)}
                          type="button"
                        >
                          {i ? <Building2 /> : <UserRound />}
                          <strong>{a}</strong>
                          <span>
                            {i ? "Para empresas e organizações" : "Para suas necessidades pessoais"}
                          </span>
                          {account === a && <CircleCheck className="account-check" />}
                        </Button>
                      ))}
                    </div>
                    <div className="form-info">
                      <ShieldCheck size={18} /> Uma rede de cooperação para pessoas e organizações.
                    </div>
                  </>
                )}
                {((step === 0 && professional) || (step === 1 && !professional)) && (
                  <>
                    <h3>{professional ? "Vamos conhecer você" : "Conte um pouco sobre você"}</h3>
                    <div className="form-grid">
                      <Field
                        label={
                          professional || account === "Pessoa física"
                            ? "Nome completo"
                            : "Nome da empresa ou organização"
                        }
                        placeholder={
                          professional ? "Seu nome completo" : "Como podemos chamar você?"
                        }
                      />
                      <Field
                        label={!professional && account === "Empresa" ? "CNPJ" : "CPF"}
                        placeholder={
                          !professional && account === "Empresa"
                            ? "00.000.000/0000-00"
                            : "000.000.000-00"
                        }
                      />
                      <Field label="E-mail" type="email" placeholder="voce@exemplo.com" />
                      <Field label="Telefone (WhatsApp)" placeholder="(31) 99999-9999" />
                      <Field label="Cidade" placeholder="Belo Horizonte" />
                      <label className="form-field">
                        <span>Estado</span>
                        <select defaultValue="MG">
                          <option>MG</option>
                          <option>Outro</option>
                        </select>
                      </label>
                      {professional ? (
                        <Field label="Data de nascimento" type="date" />
                      ) : (
                        <Field label="Nome do responsável" placeholder="Seu nome" />
                      )}
                      <Field label="Senha" type="password" placeholder="Crie uma senha" />
                    </div>
                  </>
                )}
                {step === 1 && professional && (
                  <>
                    <h3>O que você faz de melhor?</h3>
                    <label className="form-field">
                      <span>Área de atuação principal</span>
                      <select>
                        {services.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <label className="form-field">
                      <span>Experiência</span>
                      <select>
                        <option>Selecione sua experiência</option>
                        <option>Menos de 1 ano</option>
                        <option>De 1 a 3 anos</option>
                        <option>Mais de 3 anos</option>
                      </select>
                    </label>
                    <label className="form-field">
                      <span>Tipo de trabalho que procura</span>
                      <div className="work-options">
                        {["Freelancer", "Temporário", "Meio período"].map((w) => (
                          <Button
                            type="button"
                            variant="outline"
                            key={w}
                            className={work === w ? "selected" : ""}
                            onClick={() => setWork(w)}
                          >
                            {w}
                          </Button>
                        ))}
                      </div>
                    </label>
                    <label className="form-field">
                      <span>
                        Sobre você <small>(opcional)</small>
                      </span>
                      <textarea
                        placeholder="Conte um pouco sobre suas habilidades e experiências."
                        rows={4}
                      />
                    </label>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h3>Uma conexão com mais confiança</h3>
                    <p>Na plataforma, a verificação ajuda a conhecer melhor cada perfil.</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="upload-demo"
                      onClick={() => setDocument(!document)}
                    >
                      {document ? <FileCheck2 /> : <Upload />}
                      <strong>
                        {document
                          ? "Documento de exemplo selecionado"
                          : "Selecionar documento de exemplo"}
                      </strong>
                      <span>
                        {document
                          ? "documento-demo.pdf · Demonstração"
                          : "RG ou CNH · Nenhum arquivo será enviado"}
                      </span>
                    </Button>
                    <label className="agreement">
                      <input
                        type="checkbox"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                      />{" "}
                      Confirmo que li os termos demonstrativos e a política de privacidade.
                    </label>
                    <p className="mock-note">
                      Esta etapa é ilustrativa. Nenhum documento é coletado.
                    </p>
                  </>
                )}
                {step === 3 && (
                  <div className="registration-success">
                    <span>
                      <CircleCheck />
                    </span>
                    <h2>Tudo pronto para começar!</h2>
                    <p>
                      {professional
                        ? "Seu próximo passo pode abrir novas oportunidades."
                        : "Sua próxima boa parceria começa aqui."}
                    </p>
                    <DemoTag />
                    <p className="mock-note">Seu cadastro é demonstrativo e não foi armazenado.</p>
                  </div>
                )}
              </div>
              <div className="form-navigation">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                >
                  <ArrowLeft /> Voltar
                </Button>
                {step === 3 ? (
                  <Button asChild>
                    <Link
                      to={
                        professional ? "/app/profissional/dashboard" : "/app/contratante/dashboard"
                      }
                    >
                      Ir para meu painel <ArrowRight />
                    </Link>
                  </Button>
                ) : (
                  <Button type="button" onClick={() => setStep((s) => s + 1)}>
                    Continuar <ArrowRight />
                  </Button>
                )}
              </div>
            </form>
          </section>
        </div>
      </main>
    </PublicLayout>
  );
}
