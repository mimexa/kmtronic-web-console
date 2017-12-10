import { AuthenticationService } from './../../services/auth.service';
import { RelaysService } from './../../services/relays.service';
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  public settings: any = {
    relays: []
  };

  public userId: string = '';
  public fileName: string = null;
  public token: string = '';

  constructor(private relayService: RelaysService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.relayService.getSettings().then(settings => {
      this.settings = settings;
      this.settings.relays.forEach(relay => {
        relay.descriptionInput = relay.description;
      });
      this.userId = this.authenticationService.userId;
      this.token = this.authenticationService.token;
    });
  }

  ngAfterViewInit() {
    var moonlanding = document.getElementById("moonlanding");
    var moon = document.getElementById("moon");
    moonlanding.appendChild(moon);
    moon.style.display = 'block';

  }

  edit(relay) {
    relay.isEditable = true;
    relay.descriptionInput = relay.description;
  }

  validateDescription(relay) {
    relay.isEditable = false;
    this.relayService.postDescription(relay).then(update => {
      relay.description = relay.descriptionInput
    }).catch(error => {
      relay.descriptionInput = relay.description;
    });
  }

  putIsOn(relay) {
    this.relayService.postIsOn(relay).then(update => {
    }).catch(error => {
      relay.isOn = !relay.isOn;
    });
  }

  cancel(relay) {
    relay.isEditable = false;
    relay.descriptionInput = relay.description;
  }

  fileEvent(fileInput: any) {
    let file = fileInput.target.files[0];
    this.fileName = file.name;
  }

}
