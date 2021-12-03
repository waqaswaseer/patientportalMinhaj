export class Patient {
    labno: string;
    sampledate: string;
    companyname: string;
    totalbill: number;
    receivedamount: number;
    discount: number;
    duereceived: number;
    balance: number;
    pdfbill: string;
}

export class CurrentVisitData {
    labno: string;
    sampledate: string;
    testname: string;
    rptstatus: string;
    pdfurl: string;
}

export class Getonlinecode {
    mobileno: string;
    onlinecode: string;
    firstname: string;
}

export class AbnormalTestResults {
    labno: string;
    testname: string;
    parametername: string;
    result: string;
    comments: string;
    resultstatus: string;
}

export class AllLabNo {
    computerno: string;
    visitno: string;

}

export class AllTestNames {
    testcode: string;
    testname: string;

}


export class PreviousResult {
    testcode: string;
    parametercode: string;
    sortorder: string;
    testname: string;
    parametername: string;
    result1: string;
    rem1: string;
    result2: string;
    rem2: string;
    result3: string;
    rem3: string;
    result4: string;
    rem4: string;
    result5: string;
    rem5: string;
}

export class SingleTestResult {
    computerno: string;
    fulllabno: string;
    result: string;
    minivalue: string;
    maxvalue: string;


}
export class usersignup {
    username: string;
    age: string;
    gender: string;
    mobileno: string;
    email: string;
    password: string;
    address: string;
}
export class patientlogin {
    firstname: string;
    patientno: string;
    mobileno: string;
    age: string;
    gendername: string;
    nic: string;
    address1: string;
}
export class Labtests {
    testcode: string;
    testname: string;
    price: string;
    specimen: string;
}
export class PendingBasket {
    username:string;
    orderid: string;
    testcode: string;
    testname: string;
    price: string;
}
export class orderdetail {
    username: string;
    testname: string;
    testcode: string;
    price: string;
}
export class marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
export class Address {
    username: string;
    address: string;
    city: string;
}