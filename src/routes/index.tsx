import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/freelas/marketing";
import { meta } from "@/components/freelas/shared";
export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Conexões que transformam",
      "Talentos e oportunidades em Belo Horizonte e região metropolitana.",
    ),
  component: () => <Landing />,
});
