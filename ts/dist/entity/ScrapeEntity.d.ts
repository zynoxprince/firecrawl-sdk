import { FirecrawlEntityBase } from '../FirecrawlEntityBase';
import type { FirecrawlSDK } from '../FirecrawlSDK';
import type { Control } from '../types';
import type { Scrape, ScrapeCreateData } from '../FirecrawlTypes';
declare class ScrapeEntity extends FirecrawlEntityBase<Scrape> {
    constructor(client: FirecrawlSDK, entopts: any);
    make(this: ScrapeEntity): ScrapeEntity;
    create(this: any, reqdata?: ScrapeCreateData, ctrl?: Control): Promise<ScrapeEntity>;
}
export { ScrapeEntity };
