import {Component, Input, OnInit} from '@angular/core';
import {DbCharacterClassSpecModel} from '../../../models/character-class-spec.model';

@Component({
  selector: 'app-spec-card',
  templateUrl: './spec-card.component.html',
  styleUrls: ['./spec-card.component.scss']
})
export class SpecCardComponent implements OnInit {
  @Input() spec: DbCharacterClassSpecModel;
  specButtonStyles = { width: '100%', padding: '0.5rem 0', letterSpacing: '3px'};

  constructor() { }

  ngOnInit(): void {
  }

}
