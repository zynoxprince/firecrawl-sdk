import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "map",
    "accessor": "Map",
    "op": "create",
    "method": "POST",
    "path": "/map",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "success": true,
      "links": [
        {
          "url": "x",
          "title": "x",
          "description": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "scrape",
    "accessor": "Scrape",
    "op": "create",
    "method": "POST",
    "path": "/scrape",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "success": true,
      "data": {
        "markdown": "x",
        "pages": [
          {
            "pageNumber": 1,
            "markdown": "x"
          }
        ],
        "blocks": [
          {
            "pageNumber": 1,
            "width": 1,
            "height": 1,
            "status": "x",
            "items": [
              {
                "id": "x",
                "type": "x",
                "label": "x",
                "bbox": [],
                "content": "x",
                "markdownSpan": [],
                "readingOrder": 1,
                "source": "x",
                "confidence": {}
              }
            ]
          }
        ],
        "summary": "x",
        "html": "x",
        "rawHtml": "x",
        "rawBase64": "x",
        "screenshot": "x",
        "audio": "x",
        "video": "x",
        "answer": "x",
        "highlights": "x",
        "links": [
          "x"
        ],
        "actions": {
          "screenshots": [
            "x"
          ],
          "scrapes": [
            {
              "url": "x",
              "html": "x"
            }
          ],
          "javascriptReturns": [
            {
              "type": "x"
            }
          ],
          "pdfs": [
            "x"
          ]
        },
        "metadata": {
          "title": "x",
          "description": "x",
          "language": "x",
          "sourceURL": "x",
          "url": "x",
          "keywords": "x",
          "ogLocaleAlternate": [
            "x"
          ],
          "<any other metadata> ": "x",
          "statusCode": 1,
          "numPages": 1,
          "totalPages": 1,
          "contentType": "x",
          "error": "x",
          "concurrencyLimited": true,
          "concurrencyQueueDurationMs": 1
        },
        "warning": "x",
        "changeTracking": {
          "previousScrapeAt": "2026-01-01T00:00:00Z",
          "changeStatus": "new",
          "visibility": "visible",
          "diff": "x",
          "json": {}
        },
        "branding": {
          "colorScheme": "light",
          "logo": "x",
          "colors": {
            "primary": "x",
            "secondary": "x",
            "accent": "x",
            "background": "x",
            "textPrimary": "x",
            "textSecondary": "x",
            "link": "x",
            "success": "x",
            "warning": "x",
            "error": "x"
          },
          "fonts": [
            {
              "family": "x"
            }
          ],
          "typography": {
            "fontFamilies": {
              "primary": "x",
              "heading": "x",
              "code": "x"
            },
            "fontSizes": {
              "h1": "x",
              "h2": "x",
              "h3": "x",
              "body": "x"
            },
            "fontWeights": {
              "light": 1,
              "regular": 1,
              "medium": 1,
              "bold": 1
            },
            "lineHeights": {
              "heading": "x",
              "body": "x"
            }
          },
          "spacing": {
            "baseUnit": 1,
            "borderRadius": "x",
            "padding": {},
            "margins": {}
          },
          "components": {
            "buttonPrimary": {
              "background": "x",
              "textColor": "x",
              "borderRadius": "x"
            },
            "buttonSecondary": {
              "background": "x",
              "textColor": "x",
              "borderColor": "x",
              "borderRadius": "x"
            },
            "input": {}
          },
          "icons": {},
          "images": {
            "logo": "x",
            "favicon": "x",
            "ogImage": "x"
          },
          "animations": {},
          "layout": {},
          "personality": {}
        },
        "product": {
          "title": "x",
          "brand": "x",
          "category": "x",
          "url": "x",
          "description": "x",
          "variants": [
            {
              "id": "x",
              "sku": "x",
              "title": "x",
              "values": {},
              "price": {
                "amount": 1,
                "currency": "x",
                "formatted": "x"
              },
              "sale": {
                "originalPrice": {}
              },
              "availability": {
                "inStock": true,
                "text": "x"
              },
              "images": [
                {}
              ]
            }
          ]
        },
        "menu": {
          "isMenu": true,
          "confidence": 1,
          "merchant": {
            "name": "x",
            "type": "x"
          },
          "currency": "x",
          "sections": [
            {
              "id": "x",
              "name": "x",
              "description": "x",
              "items": [
                {}
              ]
            }
          ],
          "sourceUrl": "x"
        },
        "tools": [
          {
            "id": "x",
            "provider": "x",
            "capability": "x",
            "name": "x",
            "description": "x",
            "creditsCost": 1,
            "perRecord": true,
            "options": [
              {
                "name": "x",
                "type": "x"
              }
            ],
            "response": {
              "about": "x",
              "key": "x",
              "fields": [
                {}
              ]
            },
            "matchedBy": [
              "semantic"
            ],
            "matchedUrls": [
              "x"
            ]
          }
        ]
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
