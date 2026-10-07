import { createFileRoute } from "@tanstack/react-router";
import { Registration } from "@/components/freelas/onboarding";
import { meta } from "@/components/freelas/shared";
export const Route = createFileRoute("/cadastro-contratante")({
  head: () =>
    meta(
      "Cadastro de contratantes",
      "Conheça o cadastro demonstrativo da Freelas para pessoas e organizações.",
    ),
  component: () => <Registration />,
});
