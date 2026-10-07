import { createFileRoute } from "@tanstack/react-router";
import { Login } from "@/components/freelas/onboarding";
import { meta } from "@/components/freelas/shared";
export const Route = createFileRoute("/login")({
  head: () =>
    meta("Entrar", "Acesso demonstrativo às áreas de contratantes, cooperados e administração."),
  component: () => <Login />,
});
