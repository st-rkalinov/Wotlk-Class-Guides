import {DbCharacterClassSpecModel} from './character-class-spec.model';

export interface CharacterClassModel {
  color: string;
  iconLink: string;
  info: object;
  name: string;
  specs: DbCharacterClassSpecModel[];
}
