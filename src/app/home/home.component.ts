import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public slides:any;
	angForm: FormGroup;
	public data:boolean = false;
	public contact:any = {name:'', last:'', phone:'', comment:''};
	durationInSeconds = 5;

	constructor(
		private http: HttpClient,
		private snackBar: MatSnackBar,
		private fb: FormBuilder
	) { }

	ngOnInit() {

		this.http.get("https://beta.dinavisor.com/api/get-clients").subscribe(
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

        this.createForm();
	}

	get f() { return this.angForm.controls; }

		createForm() {
		    this.angForm = this.fb.group({
		       name: new FormControl('', Validators.required),
			   email: new FormControl('', Validators.compose([
				   Validators.required,
				   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			   ])),
		       phone: new FormControl('', Validators.compose([
		       	   Validators.minLength(10),
	 	          Validators.required,
	 	          Validators.pattern('^(?=.*[0-9])[0-9]+$')
			   ])),//['', Validators.required ],
		       comment: ['', Validators.required ]
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
		if (this.angForm.invalid) {
            return;
        }

		this.http.post("https://beta.dinavisor.com/api/test-email", this.contact).subscribe(
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
            this.contact = {name:'', last:'', phone:'', comment:''};
        });
	}

}
