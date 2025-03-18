declare module 'cep-types' {
  export interface CepInfo {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  }
  export interface CepState {
    cep: { value: string };
    error: { value: boolean };
  }
}
