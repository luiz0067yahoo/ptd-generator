# Gerador Inteligente de Plano de Trabalho Docente (PTD) - Padrão Senac

Aplicação web **100% Front-End**, responsiva e intuitiva para criação, preenchimento assistido por Inteligência Artificial e exportação oficial em Word (`.docx`) de Planos de Trabalho Docente (PTD) nos moldes institucionais de Cursos Técnicos do **Senac**.

Pronta para publicação imediata e gratuita no **GitHub Pages**.

---

## 🚀 Principais Funcionalidades

- **Layout Institucional Padrão Senac:** Interface desenvolvida com as cores institucionais (Azul `#004587` e Laranja `#F37021`), tipografia moderna e mobile-first com Tailwind CSS.
- **Assistente Wizard em 12 Etapas:**
  1. **Identificação Básica:** Curso, Instrutor(a), Formato (Presencial, EaD, Híbrido).
  2. **Unidade Curricular (UC):** Nome da UC e Carga Horária (ex: 100H).
  3. **(1) Situação de Aprendizagem:** Desafio autêntico do mundo do trabalho com passos articulados.
  4. **(2) Indicadores e Carga Horária:** Indicadores detalhados e carga horária dedicada.
  5. **(3) Elementos da Competência:** Conhecimentos (Saber), Habilidades (Saber Fazer) e Atitudes/Valores (Saber Ser/Conviver).
  6. **(4) Metodologias Ativas (Geral):** Estratégia geral pedagógica da UC.
  7. **Momentos Didáticos:** (5) Ação Inicial, (6) Reflexão e (7) Ação Final.
  8. **Procedimentos Avaliativos:** Avaliação formativa e diagnóstica para cada momento.
  9. **(9) Instrumentos de Avaliação:** Portfólios, observações diretas, projetos e rubricas.
  10. **(10) Marcas Formativas:** Seleção rápida e redação das marcas institucionais Senac.
  11. **(11) Materiais e Recursos Tecnológicos:** Laboratórios, equipamentos, softwares e ambientes.
  12. **Referências Bibliográficas (ABNT) e Conclusão:** Citações em normas ABNT NBR 6023, revisão geral dos dados e exportação oficial.
- **Suporte Híbrido a Inteligência Artificial:**
  - **Online com Google Gemini (Opcional):** Permite inserir sua chave da API do Google Gemini (`gemini-1.5-flash` / `gemini-2.5-flash`) de forma segura (salva apenas na sessão da aba).
  - **Offline Inteligente (Automático):** Caso a chave não seja informada ou haja instabilidade de conexão, o sistema aciona automaticamente o banco de dados pedagógico institucional do Senac com modelos completos de Cursos Técnicos (Inteligência Artificial, Desenvolvimento de Sistemas, Administração e sintetizador dinâmico universal).
- **Persistência de Sessão Automática (`sessionStorage`):** Todos os dados digitados são gravados instantaneamente a cada tecla ou alteração de campo, evitando qualquer perda acidental de progresso ao atualizar a página.
- **Exportação Fiel em `.docx`:** Geração em tempo real no próprio navegador via biblioteca `docx.js`, criando um documento Word em orientação paisagem (A4) com cabeçalho institucional (logo Senac), formatação de tabelas, bordas finas, alinhamento e tipografia Arial.
- **Modelos Prontos:** Menu de seleção rápida para carregar instâncias completas de cursos oficiais (Técnico em IA, Desenvolvimento de Sistemas e Administração).

---

## 💻 Como Executar Localmente

Como a aplicação é 100% estática (HTML, CSS e JavaScript puros), não é necessário instalar Node.js, Python ou servidor backend:

1. Clone ou baixe este repositório.
2. Dê um duplo clique no arquivo [`index.html`]([file:///c:/Users/usuario/Documents/GitHub/ptd%20generator](https://luiz0067yahoo.github.io/ptd-generator/dist/index.html) para abri-lo em qualquer navegador (Chrome, Edge, Firefox, Safari).

---

## 🌐 Publicação no GitHub Pages (Passo a Passo)

1. Faça o commit e envie os arquivos para o seu repositório no GitHub:
   ```bash
   git add .
   git commit -m "feat: Gerador Inteligente de PTD Senac"
   git push origin main
   ```
2. No GitHub, acesse a aba **Settings** do seu repositório.
3. No menu lateral esquerdo, clique em **Pages**.
4. Na seção **Build and deployment**:
   - **Source:** Deploy from a branch.
   - **Branch:** selecione `main` e a pasta `/ (root)`.
   - Clique em **Save**.
5. Aguarde alguns instantes e sua aplicação estará no ar no endereço:
   `https://<seu-usuario>.github.io/<nome-do-repositorio>/`

---

## 🛡️ Privacidade e Segurança

- As chaves de API informadas ficam armazenadas **exclusivamente na memória da sessão (`sessionStorage`) do seu navegador**.
- Nenhuma chave ou dado digitado é enviado para servidores intermediários; a comunicação ocorre diretamente do navegador para a API oficial do Google Gemini.
- A exportação `.docx` é gerada integralmente no cliente via `Blob` e `Packer` do JavaScript.
