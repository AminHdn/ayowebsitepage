
export interface Feedback{
    firstname:string,
    lastname:string,
    telnum:string,
    email:string,
    agree:string,
    contact:string
    message:string
}

export const ContactType=['None','Tel','Email'];

export interface SIGNUP{
    id:number;
    name:string;
    password:string;
    email:string;
    phonenumber:number
}
