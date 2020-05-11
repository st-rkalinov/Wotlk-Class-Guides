import {DbGuideGemsModel} from '../models/gems.model';

export interface GuideModel {
  class: string;
  spec: string;
  gems: DbGuideGemsModel;
}

export class Guide implements GuideModel {
  private _class: string;
  private _gems: DbGuideGemsModel;
  private _spec: string;

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

  static parseForDB(guideData: GuideModel): GuideModel {
    return {
      class: guideData.class,
      spec: guideData.spec,
      gems: guideData.gems,
    };
  }
}
