import { MapEntity } from './entity/MapEntity';
import { ScrapeEntity } from './entity/ScrapeEntity';
export type * from './FirecrawlTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { FirecrawlEntityBase } from './FirecrawlEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class FirecrawlSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Map(entopts?: Record<string, any>): MapEntity;
    Scrape(entopts?: Record<string, any>): ScrapeEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): FirecrawlSDK;
    tester(testopts?: any, sdkopts?: any): FirecrawlSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof FirecrawlSDK;
export { stdutil, config, BaseFeature, FirecrawlEntityBase, FirecrawlSDK, SDK, };
