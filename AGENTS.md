# Working on this SDK

The TypeScript client in `ts/` is generated with `@voxgig/sdkgen`.

- Keep credentials in environment variables. Never commit `.env` files or log complete SDK error contexts.
- Edit `.sdk/model/`, templates, or components; regenerate instead of modifying `ts/` directly.
- Run `npm run generate`, `npm run build`, and `npm test` after model changes.
- Run `npm run doctor` to inspect drift in the generator templates.
- The public SDK covers ordinary URL scraping and website mapping. Keep examples bounded.
- Live checks are opt-in, use `FIRECRAWL_API_KEY`, and consume API credits.

The source specification is pinned in `spec/`. `scripts/prepare-spec.mjs` derives the generator input without a network request.
