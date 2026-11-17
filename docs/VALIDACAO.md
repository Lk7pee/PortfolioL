# Validação da refatoração

Data: 17/11/2026. Site estático servido localmente no caminho `/PortfolioL/`, equivalente ao subdiretório usado no GitHub Pages.

## Navegador e método

Chrome 157.0.8103.79, controlado por Playwright no Windows. As verificações automatizadas foram complementadas por inspeção visual de capturas completas em desktop e celular, nos temas claro e escuro. As ferramentas de teste não são dependências do site publicado.

## Resultados funcionais

| Verificação | Resultado |
| --- | --- |
| Ordem: início, projetos, serviços, sobre, processo, contato | Aprovada |
| Quatro projetos, com RCPN de Abreu e Lima como quarto item | Aprovada |
| URLs exatas, nova aba e `noopener noreferrer` nos links externos | Aprovadas |
| Quatro serviços, três etapas e três perguntas frequentes | Aprovados |
| 320, 360, 375, 390, 414, 768, 1024, 1280 e 1440 px | Sem overflow horizontal, inclusive com briefing aberto |
| Grade de projetos | Uma coluna abaixo de 768 px; duas a partir de 768 px |
| Links, botões, campos e controles visíveis | Altura mínima de 44 px nas nove larguras |
| Menu mobile | Teclado, Escape, retorno de foco, fechamento por âncora e troca de breakpoint aprovados |
| Âncoras e link de pular conteúdo | Destinos existentes, foco correto e cabeçalho sem encobrir a seção |
| Tema | Preferência do sistema, mudança durante a visita e escolha manual após recarregar aprovadas |
| Armazenamento bloqueado | Site funcional; escolha manual de tema mantida durante a visita |
| Formulário vazio ou incompleto | Erros associados aos campos, foco no primeiro inválido e valores preservados |
| Formulário válido | Número e mensagem completos, incluindo acentos, `&` e quebras de linha; uma única navegação na mesma aba |
| FAQ | Expandir/recolher por Enter e Espaço |
| Movimento reduzido | Rolagem automática, sem transições/animações |
| Orientação horizontal | 844 × 390 px, menu e layout utilizáveis |
| Refluxo equivalente a zoom de 200% | Viewport CSS de 640 × 450 px, equivalente a 1280 × 900 em 200%, sem overflow |
| Sem JavaScript | Quatro projetos, menu, FAQ e contato direto disponíveis |
| Capturas de projetos | Quatro WebP locais, 1200 × 800, sem imagens quebradas |
| Falha simulada das imagens | Apresentação textual e links dos projetos preservados |
| Console e JavaScript | Nenhum erro na navegação normal |
| Sintaxe, sincronização e Git | `node --check`, `sync-projects.cjs --check` e `git diff --check` aprovados |

O teste do formulário interceptou a navegação para `wa.me` e comparou a URL e a mensagem esperadas. Nenhuma mensagem foi enviada. O teste de falha de imagens bloqueou deliberadamente essas requisições, separadamente do teste de console sem erros.

## Acessibilidade automatizada

axe-core 4.14.1: **zero violações** nas regras WCAG 2 A/AA, 2.1 A/AA e 2.2 AA executadas em 390 e 1440 px, nos dois temas, incluindo formulário com erros e FAQ expandida. Um nome acessível da marca foi ajustado após a primeira execução do Lighthouse.

## Lighthouse mobile local

Lighthouse 13.6.0, perfil mobile com limitação simulada, executado contra o servidor local. Resultado da execução final:

| Categoria / métrica | Resultado |
| --- | --- |
| Desempenho | 100/100 |
| Acessibilidade | 100/100 |
| Boas práticas | 100/100 |
| SEO | 100/100 |
| First Contentful Paint | 1,1 s |
| Largest Contentful Paint | 1,4 s |
| Total Blocking Time | 20 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 1,1 s |

Foram realizadas duas medições: a inicial marcou 95 em desempenho e 100 nas demais categorias; a final, após a correção do nome acessível da marca, marcou 100 nas quatro. Essa variação não deve ser atribuída à alteração de texto: a carga do ambiente também afeta a medição. Não foi calculada uma mediana nem executado um teste de campo em produção.

## Limitações

- As dimensões móveis são emulações em navegador desktop, sem testes em aparelhos físicos, Safari/iOS ou Firefox.
- O teste de zoom cobre o refluxo equivalente em pixels CSS; não foi um acionamento manual do zoom nativo do navegador.
- As verificações automáticas e de teclado não substituem uma auditoria completa com leitores de tela.
- A abertura efetiva do aplicativo WhatsApp, o envio de mensagens e o cache de prévias sociais não foram testados.
- Resultados de desempenho locais variam com o computador, a conexão e a hospedagem. Não são dados de usuários reais.

Os resultados estruturados dos testes estão em `validation-results.json`; as métricas da execução final, em `lighthouse-summary.json`.
