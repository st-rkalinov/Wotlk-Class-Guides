import {Component, Input, OnInit} from '@angular/core';
import {DbCharacterClassSpecModel} from '../../../models/character-class-spec.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-spec-card',
  templateUrl: './spec-card.component.html',
  styleUrls: ['./spec-card.component.scss']
})
export class SpecCardComponent implements OnInit {
  @Input() className: string;
  @Input() spec: DbCharacterClassSpecModel;
  @Input() specButtonStyles = { width: '100%', padding: '0.5rem 0', letterSpacing: '3px'};

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goToGuidesRoute(className: string, specName: string) {
    this.route.navigate(['/guides'], { queryParams: {class: className, spec: specName.toLowerCase()}});
  }
}
