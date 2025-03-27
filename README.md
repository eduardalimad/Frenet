# Frenet
Este projeto foi desenvolvido utilizando Vue 3 com Vite. Trata-se de uma aplicação simples para simulação de frete, consistindo em um formulário de busca e exibição dos resultados de cotações.

### 🛠️ Tecnologias Utilizadas
**Frontend:** Vue.js / Vite / Pinia / SCSS / PrimeVue

**Backend:** Node.js 

**Outras:** Axios, Lodash, etc.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## 🚀 Como rodar o frontend
### Variáveis de Ambiente no Front
Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env <br>
`VITE_BASE_URL` - base url da proxy </br>
`VITE_TOKEN` - token da api Frenet

Siga os passos abaixo para rodar o frontend do projeto:

 ```bash
git clone https://github.com/eduardalimad/Frenet.git
cd ./frenet
npm install
npm run dev 
```
Acesse o localhost 

### 🔰 Como executar o backend
Para iniciar o proxy, você precisará acessar outro repositório. Caso seja necessário, aqui está o link:
[ProxyFrenet](https://github.com/eduardalimad/proxy-api-frenet/)

## 🧪 Testes
Como rodar os testes unitários:
```sh
npm run test:unit
```
