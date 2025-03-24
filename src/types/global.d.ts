declare module 'cep-types' {
  export interface CepInfo {
    CEP: string;
    City: string;
    District: string;
    Message: string;
    Street: string;
    UF: string;

  }
  export interface CepState {
    cep: { value: string };
    error: { value: boolean };
  }
  export interface Address {
    CEP: string;
    UF: string;
    City: string;
    District: string;
    Street: string;
    Message: string;
  }
  export interface ShippingDataInput {
    originCep: string;
    destinationCep: string;
    width: number | null;
    height: number | null;
    length: number | null;
    weight: number | null;
    quantity: number | null;
    value: number | null;
  }
  interface ShippingItem {
    Height: number;
    Length: number;
    Quantity: number;
    Weight: number;
    Width: number;
  }
  export interface ShipmentRequest {
    SellerCep: string;
    RecipientCep: string;
    RecipientCountry: string;
    ShipmentInvoiceValue: number;
    ShippingItemArray: ShippingItem[];
  }
  export interface FreightQuote {
    ServiceCode: string;
    ServiceDescription: string;
    Carrier: string;
    CarrierCode: string;
    ShippingPrice: number;
    DeliveryTime: any;
    Msg: string;
    Error: boolean;
    OriginalDeliveryTime: string;
    OriginalShippingPrice: number;
    ResponseTime: string;
    AllowBuyLabel: boolean;
    DeliveryBranchOfficeCarrierId: number;
    ProtectionValue: number;
    PresentationalPrice: number;
  }
}
