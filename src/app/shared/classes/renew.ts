export class iRenew {

    constructor(
      public PTNumber: number,
      public DateGranted: string,
      public DateMaturity: string,
      public DateExpiry: string,
      public Name: string,
      public Address: string,
      public Contact: string,
      public Email: string,
      public Birthdate: string,
      public IdPresented: string,
      public PawnDescription: string,
      public Principal: number,
      public Interest: number,
      public ServiceCharge: number,
      public NetProceed: number,
      public Penalty: number,
      public PartialPayment: number,
      public TotalToPay: number
    ) { }
  
  }