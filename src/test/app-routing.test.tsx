import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { services } from "@/components/freelas/shared";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each([
    "/", "/para-contratantes", "/para-profissionais", "/login",
    "/cadastro-contratante", "/cadastro-profissional",
    "/app/contratante/dashboard", "/app/profissional/dashboard", "/admin",
  ])("preserves the existing page at %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes(path);
    expect(matches.at(-1)?.pathname).toBe(path);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("keeps exactly the seven approved services", () => {
    expect(services).toEqual([
      "Limpeza e conservação", "Portaria e recepção", "Serviços gerais",
      "Bares e restaurantes", "Garçons", "Cozinheiras", "Segurança",
    ]);
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
