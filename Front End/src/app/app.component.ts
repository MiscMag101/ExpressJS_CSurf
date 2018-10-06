import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import { Observable } from "rxjs/Observable";

// Create the data structure
export interface GreetingInterface {
  message: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    title = 'Express CSurf Prototype';
    
    private  Greetings:  Array<object> = [];
    
    
    // Create a new empty observable
    //GreetingsObservable : Observable<GreetingsInterface[]>;
    
    
    constructor(
      private httpClient:HttpClient
    ) {}

    
    ngOnInit() {    
    
    /*
      this.httpClient.get("https://app.example.com:3000/api")
        .subscribe((data:  Array<object>) => {
          this.Greetings  =  data;
          console.log(data);
      });
      */
      //this.httpClient.get("https://app.example.com:3000/api")
      //  .subscribe(res => this.Greetings = res );
    
      //this.GreetingsObservable = this.httpClient.get<GreetingsInterface[]>("https://app.example.com:3000/api")
      //  .map(response => response.message)
    }
        
    GetRequest(){
      console.log("sending GET resquest done ");
      this.httpClient.get("/api")
        .subscribe();
    }
    
    PostRequest(){
      console.log("sending POST resquest done");
      this.httpClient.post("/api", "Hello")
        .subscribe();
    }
    
}
