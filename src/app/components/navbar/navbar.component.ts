import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styles: [`.router-link-active { background-color: white; }`]
    
})
export class NavbarComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { 
        
    }
}
