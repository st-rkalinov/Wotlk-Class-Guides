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

export class GemsByCategory implements DbGuideGemsModel {
  private _blue: Array<DbGemModel>;
  private _red: Array<DbGemModel>;
  private _yellow: Array<DbGemModel>;
  private _comment: string;

  constructor() {
    this._blue = [];
    this._red = [];
    this._yellow = [];
    this._comment = '';
  }

  get blue(): Array<DbGemModel> {
    return this._blue;
  }

  get red(): Array<DbGemModel> {
    return this._red;
  }

  get yellow(): Array<DbGemModel> {
    return this._yellow;
  }

  set comment(comment: string) {
    this._comment = comment;
  }

  get comment() {
    return this._comment;
  }

  addBlue(gem: DbGemModel) {
    this._blue.push(gem);
  }

  addRed(gem: DbGemModel) {
    this._red.push(gem);
  }

  addYellow(gem: DbGemModel) {
    this._yellow.push(gem);
  }

  add(gemCategory: string, gem: DbGemModel) {
    switch (gemCategory) {
      case 'red':
        this._red.push(gem); break;
      case 'blue':
        this._blue.push(gem); break;
      case 'yellow':
        this._yellow.push(gem); break;
      default: break;
    }
  }

  addGems(gemCategory: string, gems: Array<DbGemModel>) {
     gems.forEach(value1 => {
        this.add(gemCategory, value1);
      });
  }
}

export class GuideGems implements DbGuideGemsModel {
  private _blue: Array<DbGemModel>;
  private _comment: string;
  private _red: Array<DbGemModel>;
  private _yellow: Array<DbGemModel>;

  constructor() {
    this._blue = [];
    this._red = [];
    this._yellow = [];
  }

  get blue(): Array<DbGemModel> {
    return this._blue;
  }

  get comment(): string {
    return this._comment;
  }

  set comment(value: string) {
    this._comment = value;
  }

  get red(): Array<DbGemModel> {
    return this._red;
  }

  get yellow(): Array<DbGemModel> {
    return this._yellow;
  }

}
