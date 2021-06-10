import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as copyFromBuild from '../app/build/ckeditor';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'angular-tour-of-heroes';
  public li: any;
  public list:any[] = [];
  nameList:any[] = [];
  condition = true;
  buttonValue = "hide";
  public Editor = copyFromBuild;
  ckEditorObject:any;
  constructor(private http : HttpClient,private route: Router) {
    
  }
  ngOnInit(): void {
    this.Editor.isReadOnly=false;
      this.http.get("http://www.mocky.io/v2/5ea172973100002d001eeada").subscribe(response =>{
         this.li = response;
         this.list = this.li.list;
         for(var i=0;i<this.list.length;i++){
           this.nameList.push(this.list[i].salary);
         }
      });
      
      // Editor configuration.
    this.Editor.defaultConfig = {
      highlight: {
        options: [
            {
                model: 'greenMarker',
                class: 'marker-green',
                title: 'Green marker',
                color: 'var(--ck-highlight-marker-green)',
                type: 'marker'
            },
            {
                model: 'redPen',
                class: 'pen-red',
                title: 'Red pen',
                color: 'var(--ck-highlight-pen-red)',
            }
          ]
        },
    toolbar: {
      items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
			'bulletedList',
			'numberedList',
			'|',
			'indent',
			'outdent',
			'|',
			'imageUpload',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo',
      'highlight'
		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};

  };
  changeButton() {
    if(this.condition == true) {
      this.condition = false; 
      this.buttonValue = "show";
    } else {
      this.condition = true; 
      this.buttonValue = "hide";
    }
  };
  loginbutton() {
    this.route.navigate(["/model-popup"]);
  }
  checkSalary(salary:String) {
    
  }

  public onBlur({ editor }: any) {
    console.log('Blurred the editing view.' + editor.getData());
  }

}
