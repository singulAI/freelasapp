import { createFileRoute } from "@tanstack/react-router";
import { AudiencePage } from "@/components/freelas/marketing";
import { meta } from "@/components/freelas/shared";
export const Route = createFileRoute("/para-profissionais")({
  head: () =>
    meta(
      "Para cooperados",
      "Mostre seu talento e encontre novas oportunidades de trabalho com a Freelas.",
    ),
  component: () => <AudiencePage professional />,
});
