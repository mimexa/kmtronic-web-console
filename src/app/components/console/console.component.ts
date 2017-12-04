import { RelaysService } from './../../services/relays.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  public relays = [];

  constructor(private relayService: RelaysService) { }

  ngOnInit() {
    this.relayService.getAll().then(relays => {
      this.relays = relays;
    });
  }

  edit(relay) {
    relay.isEditable = true;
    relay.descriptionInput = relay.description;
  }

  validate(relay) {
    relay.isEditable = false;
    this.put(relay);
    relay.description = relay.descriptionInput;
  }

  put(relay) {
    this.relayService.put(relay).then(update => { console.log(update) });
  }

  cancel(relay) {
    relay.isEditable = false;
    relay.descriptionInput = relay.description;
  }

}
