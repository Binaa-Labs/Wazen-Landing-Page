# Legal publication runbook

Use a new calendar version (`YYYY-MM-DD.N`) for every published edit. `N` is the immutable release sequence for that date: start at `.1` and use `.2`, `.3`, and so on only when another version is published on the same day. Never modify a published version's source, metadata, URL, or hash.

1. Copy the previous English document into `legal/versions/<version>/`, edit it, and register its component in `legal/registry.ts`.
2. Add the new flat manifest entry with `type`, `version`, `changeLevel`, `publishedAt`, a future `effectiveAt`, `changeSummary`, `source`, immutable `url`, and source `sha256`.
3. Run `npm run legal:validate`, lint, and build the landing page.
4. Deploy the landing page. Verify `/terms` or `/privacy`, `/legal/<type>/<version>`, `/legal/archive`, and `/legal/manifest` in production.
5. In the backend production environment, run `npm run legal:publish`. It fetches the deployed manifest and rendered HTML, creates or verifies `legal/<type>/<version>.html` in private object storage, and inserts or validates the database version.
6. Verify the database row and archive hashes. The future `effectiveAt` then activates the version automatically.

Behavior is derived from `changeLevel`: material Terms require acceptance and block product mutations; material Privacy requires acknowledgement without blocking; minor changes do not prompt existing users. New signups and invitees always submit the exact current Terms and Privacy IDs.

## Local publisher test

Keep production `https://wazen.fit/legal/...` URLs in the manifest. Start the landing page on a host/port reachable from Docker, then provide `LEGAL_RENDER_BASE_URL` so the publisher fetches rendered HTML locally without changing the public URL saved in the database:

```powershell
docker compose exec `
  -e LEGAL_MANIFEST_URL=http://host.docker.internal:3002/legal/manifest `
  -e LEGAL_RENDER_BASE_URL=http://host.docker.internal:3002 `
  api npm run legal:publish
```

The local publisher writes archives to the configured private MinIO bucket. Never set `LEGAL_RENDER_BASE_URL` in production.
