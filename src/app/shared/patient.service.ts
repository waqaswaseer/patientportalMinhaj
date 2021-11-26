import { Patient, CurrentVisitData, AbnormalTestResults, AllLabNo, PreviousResult, AllTestNames, SingleTestResult, Getonlinecode, usersignup, Labtests, PendingBasket, orderdetail } from './patient.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable , of, Subject , from,BehaviorSubject } from 'rxjs';
import { Chart }  from 'chart.js';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  // private messageSource = new BehaviorSubject('default message');
  // currentMessa...0ge = this.messageSource.asObservable();

  //data: Data[];  
  Player = [];  
  Run = [];  
  maxvalue = [];  
  minivalue = [];  
  Linechart = [];
  userloging : string ='';
  strage : string ='';
  strgender : string ='';
  strnic : string ='';
  straddress: string ='';
  strmobileno : string ='';
  strpatientno : string ='';
  Orderdetails:orderdetail;

  formData : Patient;
  list : Patient[];
  newlist : CurrentVisitData[];
  labData : CurrentVisitData[];
  pabnormal : AbnormalTestResults[];
  sabnormal : AbnormalTestResults[];
  labnoList : AllLabNo[];
  presult : PreviousResult[];
  aTests : AllTestNames[];
  sResults : SingleTestResult[];
  gCode : Getonlinecode[];
  signup : usersignup[]
  alltest : Labtests[]
  pendingtest: PendingBasket[]

  readonly rootUrl = 'http://localhost:7569/'; //'http://192.168.10.16:1032/patientapi/';
  // readonly rootUrl = 'http://103.62.233.169:5685/';
  constructor(private http: HttpClient) { }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }
  
    getUserClaims(){
    return  this.http.get(this.rootUrl+'/api/GetUserClaims',{headers : new HttpHeaders(
      {'Authorization' : 'Bearer ' + localStorage.getItem('userToken')})});
   }
   userSignUp() {
    var body = {
      ...this.signup,
    };
    return this.http.post(this.rootUrl + 'api/signup', body);
  }
  GetAlllabtest():Observable<Labtests[]> {
    return this.http.get<Labtests[]>(this.rootUrl + 'api/labtests');
  }
  GetOrderdetails(username:string|null):Observable<PendingBasket[]> {
    return this.http.get<PendingBasket[]>(this.rootUrl + 'api/pendingbasket/'+username);
  }

  addtobucket() {
    var body = {
      ...this.Orderdetails,
    };
    return this.http.post(this.rootUrl + 'api/Bookorder', body);
  }
  getPendingOrders() {
    this.GetOrderdetails(this.username).subscribe((data: any) => {
      this.pendingtest = data;
    });
  }
   allVisitsList(pno : string){
    this.http.get(this.rootUrl + pno)
    .toPromise().then(res => this.list = res as Patient[]);
  }

  CurrentVisitsList(pno: string){
    this.http.get(this.rootUrl + "api/LastVisit/" + pno)
    .toPromise().then(res => this.newlist = res as CurrentVisitData[]);
  }

  LabNoDetail(lno: string){
    this.http.get(this.rootUrl + "api/LabNoData/" + lno)
    .toPromise().then(res => this.labData = res as CurrentVisitData[]);
  }

  GetOnlineCOde(pno: string) : any {
    return this.http.get(this.rootUrl + "api/getonlinecode/" + pno).toPromise();
    //console.log(this.gCode);
  }


  ProfileTestResult(pno: string){
    this.http.get(this.rootUrl + "api/ProfileTestResults/" + pno)
    .toPromise().then(res => this.pabnormal = res as AbnormalTestResults[]);
  }
  
  SingleTestResult(pno: string){
    this.http.get(this.rootUrl + "api/SingleTestResults/" + pno)
    .toPromise().then(res => this.sabnormal = res as AbnormalTestResults[]);
  }

  AllLabNos(pno: string,testcode:string){
    this.http.get(this.rootUrl + "api/GetAllLabno/" + pno + "/" + testcode)
    .toPromise().then(res => this.labnoList = res as AllLabNo[]);
  }

  PreviousResults(pno: string,testcode:string){
    this.http.get(this.rootUrl + "api/GetPreviousResults/" + pno + "/" + testcode)
    .toPromise().then(res => this.presult = res as PreviousResult[]);
  }

  AllTestName(pno: string){
    this.http.get(this.rootUrl + "api/GetAllTestName/" + pno)
    .toPromise().then(res => this.aTests = res as AllTestNames[]);
  }

  SingleTestResults(pno: string,testcode:string){
    // let Linechart = [];
    // let Player = [];
    // let Run =[];
    this.Linechart.length = 0;
    this.Player.length = 0;
    this.Run.length = 0;
    this.minivalue.length = 0;
    this.maxvalue.length = 0;

    this.http.get(this.rootUrl + "api/SingleTestResult/" + pno + "/" + testcode).subscribe((result: SingleTestResult[]) => {  
      result.forEach(x => {  
        this.Player.push(x.fulllabno);  
        this.Run.push(x.result);  
        this.minivalue.push(x.minivalue);
        this.maxvalue.push(x.maxvalue);
      });  
      this
      this.Linechart.push( new Chart('canvas', {  
          
        data: {  
          labels: this.Player,  
          datasets: [  
            {  
              type: 'bar',
              data: this.Run,  
              borderColor: 'blue', 
              label: 'Result', 
              fill: false,
              pointRadius: 10,
              pointHitRadius: 15
              //backgroundColor: "#0000FF",  
            },
            {  
              type: 'line',
              data: this.minivalue,  
              borderColor: 'green',  
              label: 'Minimum',
              fill: false,
//              backgroundColor: "#0000FF",  
            },
            {  
              type: 'line',
              data: this.maxvalue,  
              borderColor: 'red',  
              label: 'Maximum',
              fill: false,
//              backgroundColor: "#0000FF",  
            }  
          ]  
        },  
        options: {  
          legend: {  
            display: true ,
            position: 'bottom',
          },
            
          scales: {  
            xAxes: [{  
              display: true,
              ticks: {
                beginAtZero:true,
                    max:35,
                    stepSize: 1,
              }  
            }],  
            yAxes: [{  
              display: true ,
              ticks: {
                beginAtZero: true
              }
              
            }],  
          }  
        } 
         
      }));  
    });  

    // this.http.get(this.rootUrl + "api/SingleTestResults/" + pno + "/" + testcode)
    // .toPromise().then(res => this.sResults = res as SingleTestResult[]);
  }

  // changeMessage(message: string) {
  //   this.messageSource.next(message)
  // }
  get username() {
    return localStorage.getItem('lspname')
  }
}
