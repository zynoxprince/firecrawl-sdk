"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirecrawlError = void 0;
class FirecrawlError extends Error {
    isFirecrawlError = true;
    sdk = 'Firecrawl';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.FirecrawlError = FirecrawlError;
//# sourceMappingURL=FirecrawlError.js.map