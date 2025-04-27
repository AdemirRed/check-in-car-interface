# Check-in Car Interface

Interface web desenvolvida com Next.js e Tailwind CSS para um sistema de gerenciamento de check-in de veículos.

![Screenshot (opcional) - Adicione um screenshot da interface aqui se desejar]

## Visão Geral

Este projeto implementa o frontend para um sistema de check-in de carros. Ele fornece uma interface de usuário moderna e responsiva, incluindo funcionalidades como autenticação de usuário, um dashboard principal para visualização de dados e gerenciamento, e troca de tema (light/dark).

## Tecnologias Utilizadas

*   **Framework:** [Next.js](https://nextjs.org/) (com App Router)
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Library:** [React](https://reactjs.org/)
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
*   **Componentes UI:** Baseado em [shadcn/ui](https://ui.shadcn.com/) (utilizando Radix UI e class-variance-authority)
*   **Ícones:** [Lucide React](https://lucide.dev/)
*   **Gerenciador de Pacotes:** [yarn](https://yarn.io/)
*   **Linting:** ESLint (com `eslint-config-next`)

## Funcionalidades Atuais

*   **Página de Login:** Formulário de autenticação de usuário (frontend apenas, requer integração com backend).
*   **Dashboard Principal:**
    *   Visualização de dados gerais em cards (ex: receita, assinaturas, vendas).
    *   Lista de atividades recentes (ex: "Recent Sales").
    *   Barra de navegação superior com:
        *   Campo de busca.
        *   Menu de usuário (dropdown).
        *   Botão para alternar tema (Light/Dark).
*   **Troca de Tema:** Suporte a modos Light e Dark.
*   **Estrutura Organizada:** Utiliza o Next.js App Router com Route Groups para separar áreas da aplicação (ex: autenticação, painel principal).

## Estrutura do Projeto

O projeto segue a estrutura recomendada pelo Next.js App Router:




## Como Executar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/AdemirRed/check-in-car-interface.git
    cd check-in-car-interface
    ```

2.  **Instale as dependências:**
    *   Certifique-se de ter o [yarn](https://yarn.io/installation) instalado.
    *   Execute o comando:
        ```bash
        yarn install
        ```

3.  **Configure as Variáveis de Ambiente:**
    *   Copie o arquivo de exemplo:
        ```bash
        cp .env.example .env
        ```
    *   Preencha as variáveis necessárias no arquivo `.env` (se houver alguma definida no futuro para APIs, etc.).

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    yarn dev
    ```

5.  Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000).

## Próximos Passos / Roadmap (Sugestões)

*   [ ] Implementar lógica de autenticação completa (integração com API, gerenciamento de sessão).
*   [ ] Conectar o dashboard e outros componentes a um backend real para dados dinâmicos.
*   [ ] Desenvolver as funcionalidades específicas de check-in de veículos (formulários, listagens, status, etc.).
*   [ ] Adicionar testes unitários e de integração.
*   [ ] Implementar validação de formulários.
*   [ ] Melhorar o tratamento de erros e feedback ao usuário.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir *issues* ou enviar *pull requests*.

## Licença

(Opcional: Adicione a licença do seu projeto aqui, por exemplo, MIT License)
