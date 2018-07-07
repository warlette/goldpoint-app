export class Pledge {

  constructor(
    public id: number,
    public customerid: number,
    public isgold: boolean,
    public pawnticket: string,
    public principal: number,
    public netproceed: number,
    public interest: number,
    public frequency: number,
    public description: string,
    public servicecharge: string,
    public remarks: string,
    public pledgedby: number,
    public dateadded: string,
    public datemature: string,
    public dateexpire: string
  ) { }

}
