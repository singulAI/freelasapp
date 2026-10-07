<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Prototype architecture
- Keep all demo state in React memory only; the prototype must not authenticate, persist data, or call services.
- Keep the nine initial pages as explicit TanStack leaf routes, with shared marketing, onboarding and dashboard modules; this preserves consistent presentation without expanding the validated scope.
- Dashboard secondary views use local state within the dashboard route; expanded standalone modules wait for owner validation.
- Define audience colors and all visual roles as semantic CSS tokens; contextual themes keep shared controls consistent.
