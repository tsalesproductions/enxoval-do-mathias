## Lista do Mathias
Projeto criado com NEXTJS para uma lista de presentes para o meu filho.
A ideia é ser um pequeno e-commerce onde os parentes e amigos podem escolher o que deseja enviar para gente e depois escolher se deseja comprar pagando diretamente para a gente ou ele mesmo efetuar a compra através dos links de marketplaces de terceiros.

##### Disponível em produção nos seguintes domínios:
-> https://listadomathias.thiagosales.dev/ <br>
-> https://enxovaldomathias.thiagosales.dev/ <br>
-> https://enxoval-do-mathias.vercel.app/ <br>

## Detalhes do projeto
O projeto foi criado sem conexões com banco de dados, somente com produtos e detalhes em arquivo json.
Porém já está adaptado para uma migração futura, caso alguém esteja disposto a usar e migrar esse projeto.

Ao o cliente finalizar o pedido, os detalhes dele é enviado na descrição do pix/Mercado Pago e os dados são disparados para um e-mail com os detalhes do comprador e os itens que foram comprados.

## Configuração
As principais configurações estão em `src/app/database.json`, tais como: informações do site, pix, produtos e vitrines.

## Entendendo a estrutura do JSON
`info`: Tudo relacionado ao site, titulo, descrição, nome, imagem de fundo e imagem da capa.<br>
`pix`: Informações referente ao pix.<br>
`address`: Endereço de entrega, caso alguém deseje enviar algo que não está na lista ou comprar individual e enviar depois.<br>
`shelfs`: Vitrines criadas e ordenadas, onde você pode configurar o titulo, descrição e produtos através do nome do produto.<br>
`products`: Produtos a serem presenteados, onde você precisa inserir: nome, imagem, preço(float/int), link de compra(marketplace externo), prioridade(ignorado), descrição.<br>

## Rotas e páginas
`src/app/page.tsx`: Página inicial<br>
`src/app/cart`: Página de carrinhol<br>
`src/app/checkout`: Página de checkout<br>
`src/app/faq/enviar`: Página de como enviar um presente para o nosso endereço<br>
`src/app/faq/pix`: Página de instrução de como enviar algo via pix<br>

## Componentes criados
`miniCart.tsx`: Carrinho flutuante<br>
`pixGenerator.tsx`: Gerador de QRCODE PIX<br>
`useWidthSize.tsx`: Verifica a resolução do cliente<br>
`detailsProduct.tsx`: Detalhes do produto flutuante<br>
`productCard.tsx`: Card do produto<br>
`shelfs.tsx`: Componente de vitrines<br>
`storage.tsx`: Configurações do storage, onde é salvo as informações dos produtos adicionados ao carrinho<br>


## O que falta?
Como foi o meu primeiro projeto completo com nextjs, então tive algumas dificuldades, tais como: alterar o título das páginas nas rotas e adicionar favicon, então esses problemas serão resolvidos futuramente, e/ou caso alguém queira ajustar, basta abrir uma solicitação de PR

## COMO CONTRIBUIR?
Quer contribuir com o projeto? Cria uma branch e solicite uma PR na branch `main`. Não faça commit direto na branch principal, por favor.

## COMO RODAR O PROJETO?

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
