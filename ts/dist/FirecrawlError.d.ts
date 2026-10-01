import { Context } from './Context';
declare class FirecrawlError extends Error {
    isFirecrawlError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { FirecrawlError };
