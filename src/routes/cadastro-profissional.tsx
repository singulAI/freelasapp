import { createFileRoute } from "@tanstack/react-router";
import { Registration } from "@/components/freelas/onboarding";
import { meta } from "@/components/freelas/shared";
export const Route = createFileRoute("/cadastro-profissional")({
  head: () =>
    meta(
      "Cadastro de cooperados",
      "Crie um perfil demonstrativo e conheça novas oportunidades na Freelas.",
    ),
  component: () => <Registration professional />,
});
