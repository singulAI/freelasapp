import { createFileRoute } from "@tanstack/react-router";
import { AudiencePage } from "@/components/freelas/marketing";
import { meta } from "@/components/freelas/shared";
export const Route = createFileRoute("/para-contratantes")({
  head: () =>
    meta(
      "Para contratantes",
      "Conecte pessoas e organizações aos cooperados certos com a Freelas.",
    ),
  component: () => <AudiencePage />,
});
