# API source

`firecrawl-v2.upstream.json` is a snapshot downloaded on 2026-10-01 from:

https://docs.firecrawl.dev/api-reference/v2-openapi.json

`scripts/prepare-spec.mjs` derives the generator input at `.sdk/def/openapi.json`.
It selects the scrape and map endpoints, expands the scrape request's top-level
`allOf`, and selects the response schema for ordinary URL scraping.

The source snapshot is retained unchanged for reproducibility. Refer to
Firecrawl's documentation for API behavior and service terms.
