export class Pledge {

  constructor(
    public id: number,
    public customerid: number,
    public isgold: boolean,
    public nocollateral: boolean,
    public pawnticket: string,
    public pawnticketnew: string,
    public amount: number,
    public netproceed: number,
    public interest: number,
    public frequency: number,
    public amountredeemed: number,
    public amountrenewed: number,
    public penalty: number,
    public amountprepaid: number,
    public amountsold: number,
    public amounttotal: number,
    public description: string,
    public servicecharge: number,
    public remarks: string,
    public remarksredeemed: string,
    public remarksrenewed: string,
    public remarkssold: string,
    public soldto: string,
    public pledgedby: number,
    public redeemededby: number,
    public renewedby: number,
    public soldby: number,
    public dateadded: string,
    public datemature: string,
    public dateexpire: string
  ) { }

}
