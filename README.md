# Portfólio — Filipe Gualberto

Portfólio de desenvolvimento web, feito com HTML, CSS e JavaScript puro. Design editorial em papel, tinta e terracota, com projetos reais como destaque e contato direto pelo WhatsApp.

**Site:** [lk7pee.github.io/PortfolioL](https://lk7pee.github.io/PortfolioL/)

## Organização

1. **Início:** nome, profissão, apresentação curta e acesso aos projetos e contato.
2. **Projetos:** quatro cartões com capturas reais, em duas colunas no desktop e uma no celular.
3. **Serviços:** sites institucionais, sites para cartórios, portfólios profissionais e sistemas/melhorias.
4. **Sobre:** apresentação objetiva e tecnologias.
5. **Como trabalho:** conversa e planejamento; design e desenvolvimento; revisão e publicação.
6. **Contato:** WhatsApp, redes sociais, briefing expansível e três perguntas frequentes.

## Funcionalidades

- Tema claro/escuro que acompanha o sistema até uma escolha manual. A chave `fg-theme` guarda apenas essa preferência; não há armazenamento de dados pessoais.
- Menu mobile com `aria-expanded`, teclado, Escape, fechamento ao selecionar um link e sem bloquear a rolagem.
- Âncoras nativas com deslocamento para o cabeçalho, link de pular conteúdo e foco visível.
- Briefing com nome, tipo de projeto e descrição, erros próximos aos campos e preservação do preenchimento.
- O briefing prepara uma mensagem e navega para o WhatsApp na mesma aba, evitando pop-ups e abas duplicadas. A mensagem só é enviada quando o visitante confirmar no WhatsApp.
- FAQ com `details`/`summary`, operável por teclado e sem depender de JavaScript.
- Projetos, menu e contato direto continuam disponíveis sem JavaScript; o briefing e a alternância manual de tema ficam ocultos nesse caso.
- Capturas WebP locais, dimensões reservadas, carregamento diferido e apresentação alternativa se uma imagem falhar.
- Respeito a `prefers-reduced-motion`, metadados Open Graph, canonical, favicon e imagem de compartilhamento.
- Sem frameworks, fontes remotas, iframes, backend, analytics ou dependências em produção.

## Arquivos

```text
index.html                   Conteúdo, metadados e projetos estáticos
css/style.css                Temas, componentes e responsividade
js/script.js                 Array projects e interações
assets/favicon.svg           Ícone do site
assets/social-card.svg       Fonte editável da imagem de compartilhamento
assets/social-card.png       Imagem Open Graph (1200 × 630)
assets/projects/*.webp       Capturas reais (1200 × 800)
assets/projects/README.md    Origem e atualização das capturas
tools/sync-projects.cjs       Sincronização opcional do HTML dos projetos
docs/VALIDACAO.md             Testes realizados e limitações
```

## Executar localmente

Abra `index.html` em um navegador moderno ou use a extensão Live Server do editor. Nenhuma instalação ou compilação é necessária para visitar ou publicar o site.

Se tiver Python instalado, execute na raiz:

```sh
python -m http.server 8080
```

Acesse [localhost:8080](http://localhost:8080). Para conferir o caminho do GitHub Pages, sirva a pasta acima de `PortfolioL` e abra `/PortfolioL/`.

## Adicionar ou editar projetos

A fonte dos projetos é o array `projects` no início de `js/script.js`. O quarto item é **Cartório RCPN de Abreu e Lima**, com a URL exata `https://registrocivilabreuelima.com/`.

1. Adicione ou edite um objeto seguindo os campos abaixo.
2. Inclua a captura real em `assets/projects/`.
3. Com Node.js instalado, sincronize o HTML estático antes de publicar:

```sh
node tools/sync-projects.cjs
node tools/sync-projects.cjs --check
node --check js/script.js
```

```js
{
  title: "Nome do projeto",
  category: "Categoria resumida",
  description: "Uma descrição curta e verificável.",
  url: "https://endereco-do-projeto.com/",
  image: "assets/projects/nome-do-projeto.webp",
  imageAlt: "Descrição da página realmente capturada.",
  color: "#e3e8e5"
}
```

O utilitário usa a mesma função de renderização do navegador, mantendo os cartões sem JavaScript atualizados sem duplicar manualmente os dados. Ele usa somente módulos nativos do Node.js e **não é necessário no servidor**. Não edite manualmente a área entre `projects:start` e `projects:end`.

Sem captura disponível, defina `image: ""` e `imageAlt: ""`: o cartão apresenta o nome e o link do projeto sem simular uma captura.

## Atualizar imagens e contatos

- Para substituir uma prévia, mantenha o nome do arquivo WebP ou atualize `image` no array e sincronize o HTML. Prefira 1200 × 800 px (proporção 3:2), abaixo de 100 KB quando viável.
- As capturas são locais: nenhum site externo é carregado dentro do portfólio. Os sites dos cartórios não são alterados.
- O WhatsApp fica em `portfolioData.whatsapp`, no JavaScript, e no link direto de fallback em `index.html`. Atualize ambos se o número mudar e sincronize os cartões.
- Os links sociais estão em `index.html`; os endereços originais foram preservados.
- Para mudar o compartilhamento, edite `assets/social-card.svg` e exporte novamente `assets/social-card.png` em 1200 × 630 px.

## Publicar no GitHub Pages

1. Envie os arquivos para a branch `main` de [Lk7pee/PortfolioL](https://github.com/Lk7pee/PortfolioL).
2. Em **Settings → Pages**, use **Deploy from a branch**, branch **main**, pasta **/ (root)**.
3. Aguarde a execução do GitHub Pages. O endereço permanece `https://lk7pee.github.io/PortfolioL/`.

Os caminhos de CSS, JavaScript e imagens são relativos, compatíveis com o subdiretório `/PortfolioL/`. O canonical e as URLs de compartilhamento são absolutos. Se o endereço mudar, atualize os metadados.

## Contato

- WhatsApp: [81 98801-5164](https://wa.me/5581988015164)
- LinkedIn: [Filipe Gualberto](https://www.linkedin.com/in/filipe-gualberto-992b9a346/)
- GitHub: [@Lk7pee](https://github.com/Lk7pee)
- Instagram: [@entaolipe](https://www.instagram.com/entaolipe/)

Os testes e seus limites estão em [docs/VALIDACAO.md](docs/VALIDACAO.md).
