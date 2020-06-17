import {DbGuideGemsModel} from '../models/gems.model';
import {UserAdditionalDataModel} from '../models/user-additionalData.model';
import {MacroModel} from '../models/macro.model';

export interface DbGuideModel {
  class: string;
  spec: string;
  gems: DbGuideGemsModel;
  author_id: string;
  macros: MacroModel[];
}

export interface GuideModel {
  id: any;
  class: string;
  spec: string;
  gems: DbGuideGemsModel;
  author: UserAdditionalDataModel;
  macros: MacroModel[];
}

export class Guide implements DbGuideModel {
  private _class: string;
  private _gems: DbGuideGemsModel;
  private _spec: string;
  private _author_id: string;
  private _macros: MacroModel[];


  get macros(): MacroModel[] {
    return this._macros;
  }

  set macros(value: MacroModel[]) {
    this._macros = value;
  }

  get author_id(): string {
    return this._author_id;
  }

  set author_id(value: string) {
    this._author_id = value;
  }

  get class(): string {
    return this._class;
  }

  set class(value: string) {
    this._class = value;
  }

  get gems(): DbGuideGemsModel {
    return this._gems;
  }

  set gems(value: DbGuideGemsModel) {
    this._gems = value;
  }

  get spec(): string {
    return this._spec;
  }

  set spec(value: string) {
    this._spec = value;
  }

  static parseForDB(guideData: DbGuideModel): DbGuideModel {
    return {
      class: guideData.class,
      spec: guideData.spec,
      gems: guideData.gems,
      author_id: guideData.author_id,
      macros: guideData.macros
    };
  }
}
