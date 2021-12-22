import { Patient, CurrentVisitData, AbnormalTestResults, AllLabNo, PreviousResult, AllTestNames, SingleTestResult, Getonlinecode, usersignup, Labtests, PendingBasket, orderdetail, Address, previousorders, LabtestDetail } from './patient.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { Chart } from 'chart.js';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  testArray = [];
  minivalue = [];
  Linechart = [];
  userloging: string = '';
  strage: string = '';
  strgender: string = '';
  strnic: string = '';
  straddress: string = '';
  strmobileno: string = '';
  strpatientno: string = '';
  Orderdetails: orderdetail;
  userid:string
  formData: Patient;
  list: Patient[];
  newlist: CurrentVisitData[];
  labData: CurrentVisitData[];
  pabnormal: AbnormalTestResults[];
  sabnormal: AbnormalTestResults[];
  labnoList: AllLabNo[];
  presult: PreviousResult[];
  aTests: AllTestNames[];
  sResults: SingleTestResult[];
  gCode: Getonlinecode[];
  signup: usersignup[]
  alltest: Labtests[]
  deleterecord: PendingBasket;
  pendingtest: LabtestDetail[] = []
  userprofile: usersignup[]
  showToggle: Boolean = true;
  newaddress: Address;
  baseURL: any;
  hideloader = false ;  
  hideloader1 = false ;  
  button = true;  
  button1 = true;
  userorders : previousorders;
  userorder : previousorders[];
  totalbill: any;
  public component = true;
  public isMobileLayout = false;
  //
  public isLoading = new BehaviorSubject(false);
  //
  // readonly rootUrl = 'http://localhost:7569/'; 
  //'http://182.180.114.149:1260/patientapi/';
  // readonly rootUrl = 'http://103.62.233.169:5685/';
  constructor(private http: HttpClient, public router: Router) { 
    window.onresize = () => this.component = window.innerWidth >= 768;

  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded',
    'No-Auth': 'True' });
    return this.http.post(this.rootUrl() + 'token', data, { headers: reqHeader });
  }

  getUserClaims() {
    return this.http.get(this.rootUrl() + 'api/GetUserClaims', {
      headers: new HttpHeaders(
        { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') })
    });
  }
  userSignUp() {
    var body = {
      ...this.signup,
    };
    return this.http.post(this.rootUrl() + 'api/signup', body);
  }
  updateAddress() {
    var body = {
      ...this.newaddress,
    };
    return this.http.post(this.rootUrl() + 'api/newaddress', body);
  }
  deletesignlerecord(userid: string | null, orderid: string, testcode: string) {
    return this.http.get(this.rootUrl() + 'api/delete/' + userid + '/' + orderid + '/' + testcode);
  }

  updatetocheckout(orderid: string) {
    return this.http.get(this.rootUrl() + 'api/checkout/' + orderid);
  }
  Getuserprofile(username: string | null): Observable<usersignup[]> {
    return this.http.get<usersignup[]>(this.rootUrl() + 'api/getuserProfile/' + username);
  }
  GetAlllabtest(): Observable<Labtests[]> {
    return this.http.get<Labtests[]>(this.rootUrl() + 'api/labtests');
  }

  GetlabtestDetail(code : string): Observable<LabtestDetail[]> {
    return this.http.get<LabtestDetail[]>(this.rootUrl() + 'api/getTestrate/'  + code);
  }

  GetOrderdetails(id: string | null): Observable<LabtestDetail[]> {
    return this.http.get<LabtestDetail[]>(this.rootUrl() + 'api/pendingbasket/' + id);
  }
  getAlluserorders(id: string | null): Observable<previousorders[]> {
    return this.http.get<previousorders[]>(this.rootUrl() + 'api/userorders/' + id);
  }
  
  getAlluserpreviousordersdetails(number: string | null): Observable<orderdetail[]> {
    return this.http.get<orderdetail[]>(this.rootUrl() + 'api/user/orderetails/' + number);
  }

  addtobucket(obj) {
    var body = {
      userid:this.userid,
      ...obj,
    };
    return this.http.post(this.rootUrl() + 'api/Bookorder', body);
  }


  CurrentVisitsList(pno: string) {
    this.http.get(this.rootUrl() + "api/LastVisit/" + pno)
      .toPromise().then(res => this.newlist = res as CurrentVisitData[]);
  }

  LabNoDetail(lno: string) {
    this.http.get(this.rootUrl() + "api/LabNoData/" + lno)
      .toPromise().then(res => this.labData = res as CurrentVisitData[]);
  }
  getcurrentOrderStatus(id: string) {
    this.http.get(this.rootUrl() + 'api/user/currentorder/' + id).toPromise()
    .then(res=>{this.userorder = res as previousorders[]});
  }
  GetOnlineCOde(pno: string): any {
    return this.http.get(this.rootUrl() + "api/getonlinecode/" + pno).toPromise();
    //console.log(this.gCode);
  }


  ProfileTestResult(pno: string) {
    this.http.get(this.rootUrl() + "api/ProfileTestResults/" + pno)
      .toPromise().then(res => this.pabnormal = res as AbnormalTestResults[]);
  }

  SingleTestResult(pno: string) {
    this.http.get(this.rootUrl() + "api/SingleTestResults/" + pno)
      .toPromise().then(res => this.sabnormal = res as AbnormalTestResults[]);
  }

  AllLabNos(pno: string, testcode: string) {
    this.http.get(this.rootUrl() + "api/GetAllLabno/" + pno + "/" + testcode)
      .toPromise().then(res => this.labnoList = res as AllLabNo[]);
  }

  PreviousResults(pno: string, testcode: string) {
    this.http.get(this.rootUrl() + "api/GetPreviousResults/" + pno + "/" + testcode)
      .toPromise().then(res => this.presult = res as PreviousResult[]);
  }

  AllTestName(pno: string) {
    this.http.get(this.rootUrl() + "api/GetAllTestName/" + pno)
      .toPromise().then(res => this.aTests = res as AllTestNames[]);
  }
  
  
  isMobile() {
    this.isMobileLayout;
    this.component = false;
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width < 770;
  }
  SingleTestResults(pno: string, testcode: string) {
    // let Linechart = [];
    // let Player = [];
    // let Run =[];
    this.Linechart.length = 0;
    this.Player.length = 0;
    this.Run.length = 0;
    this.minivalue.length = 0;
    this.maxvalue.length = 0;

    this.http.get(this.rootUrl() + "api/SingleTestResult/" + pno + "/" + testcode).subscribe((result: SingleTestResult[]) => {
      result.forEach(x => {
        this.Player.push(x.fulllabno);
        this.Run.push(x.result);
        this.minivalue.push(x.minivalue);
        this.maxvalue.push(x.maxvalue);
      });
      this
      this.Linechart.push(new Chart('canvas', {

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
            display: true,
            position: 'bottom',
          },

          scales: {
            xAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                max: 35,
                stepSize: 1,
              }
            }],
            yAxes: [{
              display: true,
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
  get id() {
    return localStorage.getItem('userID')
  }
  get number() {
    return localStorage.getItem('lsmobileno')
  }
  
    getuserProfile() {
    this.showToggle = false;
    this.hideloader1 = true;
    this.totalbill_()
  }
  getpreviousorders() {
    this.getAlluserorders(this.id).subscribe((data: any) => {
      this.userorders = data;
    });
  }
  getPendingOrders() {
    this.GetOrderdetails(this.id).subscribe((data: any) => {
      this.pendingtest = data;
      this.hideloader = true ;
      this.button = false;
    });
  }
  allVisitsList(pno: string) {
    this.http.get(this.rootUrl() + pno)
      .toPromise().then(res => this.list = res as Patient[]);
  }
  totalbill_(){
    let sum = 0 ;
    this.getpreviousorders();
    
    this.totalbill = this.pendingtest.reduce((a,b)=>Number(a)+ Number(b.rate),sum)
    console.log(this.totalbill)
  }
  rootUrl(): any {
    this.baseURL = this.router['location']._platformLocation.location.origin;
    return "http://182.180.114.149:1265/";
    //return "http://localhost:7569/";
    // if (this.baseURL.substring(0, 10) == "http://182")
    // else
     // return "http://95.217.230.179:1260/minhajlab/";
  }
}
