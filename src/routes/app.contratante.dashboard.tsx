import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/freelas/dashboard";
import { meta } from "@/components/freelas/shared";
export const Route = createFileRoute("/app/contratante/dashboard")({
  head: () =>
    meta(
      "Painel do contratante",
      "Demonstração de oportunidades, cooperados e candidaturas da Freelas.",
    ),
  component: () => <Dashboard role="contractor" />,
});
