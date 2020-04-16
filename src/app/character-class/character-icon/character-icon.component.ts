import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-character-icon',
  templateUrl: './character-icon.component.html',
  styleUrls: ['./character-icon.component.scss'],
})
export class CharacterIconComponent implements OnInit {
  @Input() characterData: object;

  constructor() { }

  ngOnInit(): void {
  }

}
