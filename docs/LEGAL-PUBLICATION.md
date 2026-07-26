# Legal publication runbook

Every published edit receives a new immutable `YYYY-MM-DD.N` version. Start at `.1`; increment only for another release on the same UTC date. Never edit a published version.

## Initial production launch

1. Deploy the landing page and verify:
   - `/legal/terms/2026-06-01.1`
   - `/legal/privacy/2026-06-01.1`
   - `/legal/archive`
   - `/legal/manifest`
2. Deploy the empty backend database and apply migrations.
3. In the DigitalOcean App Platform console, run `npm run legal:publish`.
4. Run it a second time; both documents must report `Validated`.
5. Verify two database rows and these private objects:
   - `legal/terms/2026-06-01.1.html`
   - `legal/privacy/2026-06-01.1.html`
6. Verify `/api/v1/legal/metadata` returns both current documents.
7. Only then enable signup and invitation acceptance.

## Publishing an update

1. Copy the previous English source into `legal/versions/<version>/` and edit it.
2. Register the component in `legal/registry.ts`.
3. Generate its hash:
   `npm run legal:sha -- legal/versions/<version>/<type>.en.tsx`
4. Append the manifest entry in ascending effective-time order. Use:
   - the new version and matching UTC `publishedAt` date;
   - a future `effectiveAt`;
   - `minor` or `material`;
   - an English change summary;
   - the exact source, immutable Wazen URL, and generated hash.
5. Run `npm run legal:validate`, `npm run lint`, and `npm run build`.
6. Deploy to Vercel and verify the immutable URL and production manifest.
7. In the DigitalOcean App Platform console, run `npm run legal:publish` twice.
8. Verify the new database row and private archive object.

Material Terms require acceptance and block mutations. Material Privacy requires non-blocking acknowledgement. Minor changes do not prompt existing users. Signup and invitation acceptance always use exact current IDs.

## Local publisher test

Keep production URLs in the manifest. Start the landing page where Docker can reach it, then run:

```powershell
docker compose exec `
  -e LEGAL_MANIFEST_URL=http://host.docker.internal:3002/legal/manifest `
  -e LEGAL_RENDER_BASE_URL=http://host.docker.internal:3002 `
  api npm run legal:publish
```

The publisher writes to the configured private MinIO bucket. `LEGAL_RENDER_BASE_URL` is rejected in production.
