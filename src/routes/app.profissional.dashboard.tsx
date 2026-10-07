import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/freelas/dashboard";
import { meta } from "@/components/freelas/shared";
export const Route = createFileRoute("/app/profissional/dashboard")({
  head: () =>
    meta(
      "Painel do cooperado",
      "Demonstração de oportunidades e conexões para cooperados da Freelas.",
    ),
  component: () => <Dashboard role="professional" />,
});
