import { FirecrawlEntityBase } from '../FirecrawlEntityBase';
import type { FirecrawlSDK } from '../FirecrawlSDK';
import type { Control } from '../types';
import type { MapType, MapCreateData } from '../FirecrawlTypes';
declare class MapEntity extends FirecrawlEntityBase<MapType> {
    constructor(client: FirecrawlSDK, entopts: any);
    make(this: MapEntity): MapEntity;
    create(this: any, reqdata?: MapCreateData, ctrl?: Control): Promise<MapEntity>;
}
export { MapEntity };
