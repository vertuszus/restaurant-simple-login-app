import { Component, OnInit } from '@angular/core';
import {AuthorInfo} from "../../enums/author-info.enum";

@Component({
  selector: 'app-jumbotron-info',
  templateUrl: './jumbotron-info.component.html',
  styleUrls: ['./jumbotron-info.component.scss']
})
export class JumbotronInfoComponent implements OnInit {

  authorSite: string = AuthorInfo.Site;

  constructor() { }

  ngOnInit(): void {
  }

}
