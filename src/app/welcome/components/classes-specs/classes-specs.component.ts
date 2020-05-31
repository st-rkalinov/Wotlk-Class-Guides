import {Component, Input, OnInit} from '@angular/core';
import {CharacterClassModel} from '../../../models/character-class.model';

@Component({
  selector: 'app-classes-specs',
  templateUrl: './classes-specs.component.html',
  styleUrls: ['./classes-specs.component.scss']
})
export class ClassesSpecsComponent implements OnInit {
  @Input() classData: CharacterClassModel;
  classButtonStyles = { width: '35%', padding: '0.5rem 0', letterSpacing: '3px'};

  constructor() { }

  ngOnInit(): void {
  }
}
