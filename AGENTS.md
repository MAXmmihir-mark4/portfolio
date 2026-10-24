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

## Architecture
- Keep TanStack Start and its file-based router; the platform does not support replacing it with Next.js.
- Keep the portfolio content server-rendered and lazy-load the R3F universe behind ClientOnly; this preserves metadata and isolates WebGL.
- Use shared portfolio sections for the scrolling home and separate content routes; this supports both cinematic browsing and shareable pages.
- Use a mailto contact handoff without claiming delivery; no email service is configured.
