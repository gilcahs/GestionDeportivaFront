import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../services/sports.service';
import { Deportes } from '../../interfaces/deporte.interface';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  deportes?: Deportes;

  constructor(private sportsService: SportsService) { }

  ngOnInit(): void {
    this.sportsService.getDeportes().subscribe( resp  => {
      console.log(resp);

      this.deportes = resp
    }

    );
    console.log(this.deportes);
  }



}
