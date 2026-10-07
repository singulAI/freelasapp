import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/freelas/dashboard";
import { meta } from "@/components/freelas/shared";
export const Route = createFileRoute("/admin")({
  head: () =>
    meta(
      "Administração",
      "Visão geral demonstrativa das conexões, cooperados e oportunidades Freelas.",
    ),
  component: () => <Dashboard role="admin" />,
});
