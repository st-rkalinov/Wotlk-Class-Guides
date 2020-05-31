import {CharacterClassModel} from './character-class.model';

export interface MenuSelectedClassModel {
  index: number;
  classData?: CharacterClassModel;
}
