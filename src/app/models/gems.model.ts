import {DbGemModel} from './gem.model';

export interface DbGuideGemsModel {
  red: Array<DbGemModel>;
  blue: Array<DbGemModel>;
  yellow: Array<DbGemModel>;
  comment?: string;
}

export interface DbGemsModel {
  category: string;
  gems: Array<DbGemModel>;
}
