import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public slides:any;
	public data:boolean = false;
	public contact:any = {name:'', last:'', phone:'', comment:''};
	durationInSeconds = 5;

	constructor(
		private http: HttpClient,
		private snackBar: MatSnackBar
	) { }

	ngOnInit() {

		this.http.get("http://127.0.0.1:8000/api/get-clients").subscribe(
        (val) => {
        	console.log(val)
        	this.slides = val;
        	this.data = true;
            //console.log("PATCH call successful value returned in body", val);
        },
        response => {
            console.log("PATCH call in error", response);
        },
        () => {
            console.log("The PATCH observable is now completed.");
        });
	}

	openSnackBar(message: string, action: string) {
	    this.snackBar.open(message, action, {
	      duration: 4000,
	    });
	  }

	slideConfig = {
		"slidesToShow": 4, 
		"slidesToScroll": 2,
		"autoplay": true,
		"autoplaySpeed": 5000,
		"responsive": [
		{
			"breakpoint": 1024,
			"settings": {
				"slidesToShow": 3,
				"slidesToScroll": 3,
				"infinite": true,
				"dots": true
			}
		},
		{
			"breakpoint": 600,
			"settings": {
				"slidesToShow": 2,
				"slidesToScroll": 2
			}
		},
		{
			"breakpoint": 480,
			"settings": {
				"slidesToShow": 1,
				"slidesToScroll": 1,
				"autoplaySpeed": 2000,
			}
		}]
	};

	

	slickInit(e) {
		console.log('slick initialized');
	}

	breakpoint(e) {
		console.log('breakpoint');
	}

	afterChange(e) {
		console.log('afterChange');
	}

	beforeChange(e) {
		console.log('beforeChange');
	}

	sendEmail(){
		console.log(this.contact)
		this.http.post("http://127.0.0.1:8000/api/test-email", this.contact).subscribe(
        (val) => {
        	console.log(val)
        	this.openSnackBar('Email enviadó con éxito', 'OK');     	
        },
        response => {
            console.log("PATCH call in error", response);
            this.openSnackBar('Error al enviar su petición', 'OK');
        },
        () => {
            console.log("The PATCH observable is now completed.");
            this.openSnackBar('Email enviadó con éxito', 'OK');
        });
	}

}
