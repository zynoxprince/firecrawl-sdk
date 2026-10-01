
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Firecrawl',
        slug: "firecrawl",
    version: "0.1.0",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://api.firecrawl.dev/v2",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        map: {
        },
  
        scrape: {
        },
  
    }
  }


  entity = {
    "map": {
      "fields": [
        {
          "name": "auditMetadata",
          "title": "Audit Metadata",
          "type": "`$OBJECT`",
          "op": {
            "create": {}
          },
          "short": "User attribution included with SIEM logging events when SIEM Logging is enabled for the organization."
        },
        {
          "name": "ignoreCache",
          "title": "Ignore Cache",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "Bypass the sitemap cache to retrieve fresh URLs."
        },
        {
          "name": "ignoreQueryParameters",
          "title": "Ignore Query Parameters",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "Do not return URLs with query parameters"
        },
        {
          "name": "includeSubdomains",
          "title": "Include Subdomains",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "Include subdomains of the website"
        },
        {
          "name": "limit",
          "title": "Limit",
          "type": "`$INTEGER`",
          "op": {
            "create": {}
          },
          "short": "Maximum number of links to return"
        },
        {
          "name": "links",
          "title": "Links",
          "type": "`$ARRAY`",
          "op": {
            "create": {
              "active": false
            }
          }
        },
        {
          "name": "location",
          "title": "Location",
          "type": "`$OBJECT`",
          "op": {
            "create": {}
          },
          "short": "Location settings for the request."
        },
        {
          "name": "search",
          "title": "Search",
          "type": "`$STRING`",
          "op": {
            "create": {}
          },
          "short": "Specify a search query to order the results by relevance."
        },
        {
          "name": "sitemap",
          "title": "Sitemap",
          "type": "`$STRING`",
          "op": {
            "create": {}
          },
          "short": "Sitemap mode when mapping."
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {
              "active": false
            }
          }
        },
        {
          "name": "threatProtection",
          "title": "Threat Protection",
          "type": "`$OBJECT`",
          "op": {
            "create": {}
          },
          "short": "Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override."
        },
        {
          "name": "timeout",
          "title": "Timeout",
          "type": "`$INTEGER`",
          "op": {
            "create": {}
          },
          "short": "Timeout in milliseconds."
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {}
          },
          "short": "The base URL to start crawling from",
          "format": "uri"
        }
      ],
      "name": "map",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/map",
              "segments": [
                {
                  "lit": "map"
                }
              ],
              "parts": [
                "map"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "scrape": {
      "fields": [
        {
          "name": "actions",
          "title": "Actions",
          "type": "`$ANY`",
          "op": {
            "create": {}
          },
          "short": "Results of the actions specified in the `actions` parameter."
        },
        {
          "name": "answer",
          "title": "Answer",
          "type": "`$STRING`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Natural-language answer to the question supplied via the `question` format."
        },
        {
          "name": "audio",
          "title": "Audio",
          "type": "`$STRING`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Signed URL to the extracted MP3 audio file if `audio` is in `formats`."
        },
        {
          "name": "auditMetadata",
          "title": "Audit Metadata",
          "type": "`$OBJECT`",
          "op": {
            "create": {}
          },
          "short": "User attribution included with SIEM logging events when SIEM Logging is enabled for the organization."
        },
        {
          "name": "blockAds",
          "title": "Block Ads",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "Enables ad-blocking and cookie popup blocking."
        },
        {
          "name": "blocks",
          "title": "Blocks",
          "type": "`$ARRAY`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Per-page typed layout blocks for PDFs."
        },
        {
          "name": "branding",
          "title": "Branding",
          "type": "`$OBJECT`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Branding information extracted from the page if `branding` is in `formats`."
        },
        {
          "name": "changeTracking",
          "title": "Change Tracking",
          "type": "`$OBJECT`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Change tracking information if `changeTracking` is in `formats`."
        },
        {
          "name": "domainTools",
          "title": "Domain Tools",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "When true on an ordinary URL scrape, `data.tools` lists tool contracts matched to the scraped page's domain (same `DiscoveredTool` shape as search)."
        },
        {
          "name": "excludeTags",
          "title": "Exclude Tags",
          "type": "`$ARRAY`",
          "op": {
            "create": {}
          },
          "short": "Tags to exclude from the output."
        },
        {
          "name": "formats",
          "title": "Formats",
          "type": "`$ARRAY`",
          "op": {
            "create": {}
          },
          "short": "Output formats to include in the response."
        },
        {
          "name": "headers",
          "title": "Headers",
          "type": "`$OBJECT`",
          "op": {
            "create": {}
          },
          "short": "Headers to send with the request."
        },
        {
          "name": "highlights",
          "title": "Highlights",
          "type": "`$STRING`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Relevant source text selected by the `highlights` format."
        },
        {
          "name": "html",
          "title": "Html",
          "type": "`$STRING`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Cleaned HTML of the page if `html` is in `formats`."
        },
        {
          "name": "includeTags",
          "title": "Include Tags",
          "type": "`$ARRAY`",
          "op": {
            "create": {}
          },
          "short": "Tags to include in the output."
        },
        {
          "name": "links",
          "title": "Links",
          "type": "`$ARRAY`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "List of links on the page if `links` is in `formats`"
        },
        {
          "name": "location",
          "title": "Location",
          "type": "`$OBJECT`",
          "op": {
            "create": {}
          },
          "short": "Location settings for the request."
        },
        {
          "name": "lockdown",
          "title": "Lockdown",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "If true, serves the request from Firecrawl's cache only and never makes an outbound request to the target URL."
        },
        {
          "name": "markdown",
          "title": "Markdown",
          "type": "`$STRING`",
          "op": {
            "create": {
              "active": false
            }
          }
        },
        {
          "name": "maxAge",
          "title": "Max Age",
          "type": "`$INTEGER`",
          "op": {
            "create": {}
          },
          "short": "Returns a cached version of the page if it is younger than this age in milliseconds."
        },
        {
          "name": "menu",
          "title": "Menu",
          "type": "`$OBJECT`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Menu information extracted from the page if `menu` is in `formats`."
        },
        {
          "name": "metadata",
          "title": "Metadata",
          "type": "`$OBJECT`",
          "op": {
            "create": {
              "active": false
            }
          }
        },
        {
          "name": "minAge",
          "title": "Min Age",
          "type": "`$INTEGER`",
          "op": {
            "create": {}
          },
          "short": "When set, the request only checks the cache and never triggers a fresh scrape."
        },
        {
          "name": "mobile",
          "title": "Mobile",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "Set to true if you want to emulate scraping from a mobile device."
        },
        {
          "name": "onlyCleanContent",
          "title": "Only Clean Content",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "Beta."
        },
        {
          "name": "onlyMainContent",
          "title": "Only Main Content",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "Only return the main content of the page excluding headers, navs, footers, etc."
        },
        {
          "name": "pages",
          "title": "Pages",
          "type": "`$ARRAY`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Physical per-page markdown for PDFs."
        },
        {
          "name": "parsers",
          "title": "Parsers",
          "type": "`$ARRAY`",
          "op": {
            "create": {}
          },
          "short": "Controls how files are processed during scraping."
        },
        {
          "name": "product",
          "title": "Product",
          "type": "`$OBJECT`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Product information extracted from the page if `product` is in `formats`."
        },
        {
          "name": "profile",
          "title": "Profile",
          "type": "`$OBJECT`",
          "op": {
            "create": {}
          },
          "short": "Enable persistent browser storage across scrape and interact sessions."
        },
        {
          "name": "proxy",
          "title": "Proxy",
          "type": "`$STRING`",
          "op": {
            "create": {}
          },
          "short": "Specifies the type of proxy to use."
        },
        {
          "name": "rawBase64",
          "title": "Raw Base64",
          "type": "`$STRING`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "The Base64-encoded original HTTP response body if `rawBase64` is in `formats`."
        },
        {
          "name": "rawHtml",
          "title": "Raw Html",
          "type": "`$STRING`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "The exact, unmodified HTML as received from the page if `rawHtml` is in `formats`."
        },
        {
          "name": "redactPII",
          "title": "Redact Pii",
          "type": "`$ANY`",
          "op": {
            "create": {}
          },
          "short": "Redact personally identifiable information from returned markdown."
        },
        {
          "name": "removeBase64Images",
          "title": "Remove Base64 Images",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "Removes all base 64 images from the markdown output, which may be overwhelmingly long."
        },
        {
          "name": "screenshot",
          "title": "Screenshot",
          "type": "`$STRING`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Screenshot of the page if `screenshot` is in `formats`."
        },
        {
          "name": "skipTlsVerification",
          "title": "Skip Tls Verification",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "Skip TLS certificate verification when making requests."
        },
        {
          "name": "storeInCache",
          "title": "Store In Cache",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "If true, the page will be stored in the Firecrawl index and cache."
        },
        {
          "name": "summary",
          "title": "Summary",
          "type": "`$STRING`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Summary of the page if `summary` is in `formats`"
        },
        {
          "name": "threatProtection",
          "title": "Threat Protection",
          "type": "`$OBJECT`",
          "op": {
            "create": {}
          },
          "short": "Per-request [Threat Protection](https://docs.firecrawl.dev/features/threat-protection) override."
        },
        {
          "name": "timeout",
          "title": "Timeout",
          "type": "`$INTEGER`",
          "op": {
            "create": {}
          },
          "short": "Timeout in milliseconds for the request."
        },
        {
          "name": "tools",
          "title": "Tools",
          "type": "`$ARRAY`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Tool contracts matched to the scraped page's domain."
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {}
          },
          "short": "The URL to scrape",
          "format": "uri"
        },
        {
          "name": "video",
          "title": "Video",
          "type": "`$STRING`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Signed URL to the extracted video file if `video` is in `formats`."
        },
        {
          "name": "waitFor",
          "title": "Wait For",
          "type": "`$INTEGER`",
          "op": {
            "create": {}
          },
          "short": "Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load."
        },
        {
          "name": "warning",
          "title": "Warning",
          "type": "`$STRING`",
          "op": {
            "create": {
              "active": false
            }
          },
          "short": "Can be displayed when using LLM Extraction."
        },
        {
          "name": "zeroDataRetention",
          "title": "Zero Data Retention",
          "type": "`$BOOLEAN`",
          "op": {
            "create": {}
          },
          "short": "If true, this will enable zero data retention for this scrape."
        }
      ],
      "name": "scrape",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/scrape",
              "segments": [
                {
                  "lit": "scrape"
                }
              ],
              "parts": [
                "scrape"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

