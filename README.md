# Portfólio de Felipe Estrela

Portfólio pessoal de **Felipe Estrela**, desenvolvedor backend de Toledo, Paraná, Brasil. Um site de página única em **Next.js**, com visual brutalista em preto, off-white e verde limão, tipografia gigante, ângulos retos em tudo e animações com **GSAP** e **Motion**.

Pensado para rodar em [felipeestrela.com.br](https://felipeestrela.com.br).

> English summary: a single page personal portfolio built with Next.js 16, React 19, TypeScript, GSAP and Motion. Brutalist black, white and lime design with zero rounded corners, three languages (Portuguese, English and Spanish), a live project status check through an API route and a contact form that sends by email or WhatsApp.

## Sumário

- [Conceito de design](#conceito-de-design)
- [Recursos](#recursos)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar](#como-rodar)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts](#scripts)
- [Como funciona por dentro](#como-funciona-por-dentro)
- [Personalização](#personalização)
- [Publicação](#publicação)
- [Acessibilidade e desempenho](#acessibilidade-e-desempenho)
- [Licença e contato](#licença-e-contato)

## Conceito de design

**Pôster brutalista.** O site foge dos padrões comuns de portfólio e aposta em contraste e escala:

- Paleta de três cores: preto `#0B0B0B`, off-white `#F4F4EE` e verde limão `#C8FF00`.
- **Nenhum canto arredondado.** Tudo é quadrado, com bordas grossas de 3 px e sombras duras deslocadas.
- Tipografia enorme: **Anton** nos títulos, **Space Mono** nos rótulos e **Archivo** no texto corrido.
- Faixas inclinadas que se cruzam, números gigantes, texto vazado ao fundo e um selo quadrado girando.
- Componentes próprios no lugar dos elementos nativos do navegador: botões, seletor de idioma, seletor de envio, campos de formulário, barra de rolagem e cursor.

## Recursos

- **Tela de carregamento** com contador de 000 a 100 e cortinas quadradas que sobem.
- **Hero animado**: letras do nome que sobem uma a uma, parallax com o mouse e com a rolagem.
- **Seção Sobre** com a frase principal que acende palavra por palavra e números que contam até o valor final.
- **Arsenal** com 67 tecnologias em quadrados, separadas por categoria, com logos SVG locais.
- **Projetos** com rolagem horizontal fixada na tela (em telas largas) e arte geométrica própria em cada cartão.
- **Status dos projetos em tempo real**: cada cartão mostra se o site está no ar, com o tempo de resposta.
- **Trajetória** com linhas que se desenham na rolagem, formação e idiomas.
- **Contato** com e-mail, WhatsApp, LinkedIn, GitHub e um formulário com seletor de envio por **e-mail** ou **WhatsApp**.
- **Três idiomas**: português, inglês e espanhol, com a escolha salva no navegador.
- Cursor quadrado personalizado (só em dispositivos com mouse), barra de progresso da página e relógio de Toledo no rodapé.
- Respeita `prefers-reduced-motion`: quem pede menos movimento recebe o site sem animações.

## Tecnologias

| Área | O que é usado |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) e React 19 |
| Linguagem | TypeScript |
| Animação | GSAP com ScrollTrigger (cenas e rolagem) e Motion (estado e componentes) |
| Estilo | CSS puro com variáveis de design, sem biblioteca de componentes |
| Fontes | Anton, Space Mono e Archivo, carregadas com `next/font` |
| Ícones | Caminhos SVG locais do projeto simple-icons |
| Qualidade | ESLint e verificação de tipos do TypeScript |
| Contêiner | Dockerfile com saída `standalone` |

## Estrutura do projeto

```text
.
├── public/                  arquivos estáticos
├── src/
│   ├── app/
│   │   ├── api/status/      rota que verifica se os projetos estão no ar
│   │   ├── globals.css      tokens de design e estilo de todos os componentes
│   │   ├── icon.svg         favicon (símbolo </>)
│   │   ├── layout.tsx       fontes, metadados e layout raiz
│   │   └── page.tsx         página única
│   ├── components/
│   │   ├── Portfolio.tsx    junta tudo e controla idioma e carregamento
│   │   ├── Chrome.tsx       tela de carregamento, cursor e barra de progresso
│   │   ├── Header.tsx       cabeçalho, seletor de idioma e menu em tela cheia
│   │   ├── Hero.tsx         abertura com nome gigante e faixas
│   │   ├── About.tsx        seção Sobre e números
│   │   ├── Stack.tsx        Arsenal de tecnologias
│   │   ├── Projects.tsx     projetos com rolagem horizontal e status
│   │   ├── Journey.tsx      trajetória, formação e idiomas
│   │   ├── Contact.tsx      contato e formulário
│   │   ├── Footer.tsx       rodapé com relógio
│   │   └── ui.tsx           botão quadrado, ícones, letras e faixas
│   └── lib/
│       ├── content.ts       todo o conteúdo em pt, en e es
│       ├── icons.ts         caminhos SVG das tecnologias
│       └── gsap.ts          registro único dos plugins do GSAP
├── Dockerfile               imagem de produção
├── .env.example             modelo das variáveis de ambiente
└── next.config.ts           configuração do Next.js
```

## Como rodar

Requisitos: **Node.js 20 ou superior** e **npm**.

```bash
git clone https://github.com/felipeestreladev/portfolio.git
cd portfolio
npm install
cp .env.example .env.local
npm run dev
```

Depois abra `http://localhost:3000`.

## Variáveis de ambiente

| Variável | Obrigatória | Para que serve |
| --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Não, mas recomendada | E-mail exibido na seção de contato e usado no formulário. Sem ela, a seção mostra um aviso no lugar do e-mail. |

O e-mail **não** fica dentro do código. Como a variável começa com `NEXT_PUBLIC_`, ela é incluída no resultado do build, então defina o valor **antes** de gerar o build ou a imagem.

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (`standalone`) |
| `npm run start` | Servidor de produção, depois do build |
| `npm run lint` | Verifica o código com o ESLint |

## Como funciona por dentro

**Conteúdo em um só lugar.** Todo o texto do site vive em `src/lib/content.ts`, em três dicionários (`pt`, `en` e `es`) com o mesmo formato. O TypeScript garante que um idioma não fique sem uma chave que os outros têm.

**Idioma salvo no navegador.** A escolha é guardada no `localStorage` e lida com `useSyncExternalStore`, sem quebrar se o armazenamento estiver bloqueado (janela privada, por exemplo).

**Status dos projetos.** A rota `GET /api/status` consulta, do lado do servidor, cada endereço da lista de projetos com limite de 7 segundos. Qualquer resposta abaixo de 500 conta como "no ar". O navegador repete a consulta a cada minuto. A lista de endereços é fixa e vem do próprio conteúdo, então o visitante não consegue pedir a verificação de um endereço qualquer.

**Formulário de contato.** O site não tem servidor de envio. O seletor escolhe o destino:
- **E-mail**: monta um `mailto:` com assunto e corpo e abre o programa de e-mail do visitante. Pede nome, e-mail e mensagem.
- **WhatsApp**: abre `wa.me` com a mensagem pronta numa nova aba. O e-mail do visitante não é necessário, então o campo some.

**Animações.** O GSAP cuida do que depende de rolagem ou de linha do tempo (abertura, parallax, contagem de números, rolagem horizontal dos projetos). O Motion cuida do que depende do estado dos componentes (menu, seletores, campos, entrada dos quadrados). Só `transform` e `opacity` são animados, para não forçar recálculo de layout. As animações de rolagem usam `gsap.matchMedia()`, que também desliga tudo para quem prefere menos movimento.

## Personalização

- **Textos, projetos, experiência e tecnologias**: edite `src/lib/content.ts`.
- **Cores, bordas e medidas**: as variáveis ficam no começo de `src/app/globals.css`.
- **Novo ícone de tecnologia**: adicione o caminho SVG em `src/lib/icons.ts` com o mesmo nome usado no conteúdo. Sem ícone, o quadrado mostra as duas primeiras letras.
- **Novo projeto**: acrescente o item nos três idiomas. A rota de status passa a verificá-lo sozinha.

## Publicação

O projeto gera uma saída `standalone` e inclui um `Dockerfile`:

```bash
docker build --build-arg NEXT_PUBLIC_CONTACT_EMAIL=seu@email.com -t portfolio .
docker run -p 3000:3000 portfolio
```

Como a rota `/api/status` roda no servidor, o site precisa de um ambiente com Node.js (contêiner, VPS ou plataforma com suporte ao Next.js). Hospedagem apenas de arquivos estáticos não executa essa rota.

## Acessibilidade e desempenho

- Link "pular para o conteúdo" e `lang` da página atualizado conforme o idioma.
- Elementos interativos com papéis ARIA, navegação por teclado e foco visível desenhado.
- Campos de formulário com rótulo, mensagem de erro anunciada e estado de foco próprio.
- Menu em tela cheia que fecha com a tecla `Esc`.
- Animações desligadas para quem usa `prefers-reduced-motion`.
- Ícones em SVG inline, sem requisições extras, e fontes carregadas pelo `next/font`.

## Licença e contato

O código está público para consulta. Todos os direitos reservados: se quiser reutilizar alguma parte, fale comigo antes.

- LinkedIn: [linkedin.com/in/felipe-gte](https://www.linkedin.com/in/felipe-gte)
- GitHub: [github.com/felipeestreladev](https://github.com/felipeestreladev)
- Site: [felipeestrela.com.br](https://felipeestrela.com.br)
