# Lara Games

Landing page moderna para uma loja de games, consoles, acessórios e manutenção especializada. O projeto foi desenvolvido em TypeScript com Vite, React, Tailwind CSS e Framer Motion para oferecer uma experiência visual impactante, com foco em conversão e em um visual premium com paleta em preto, azul, amarelo e rosa.

## Funcionalidades

- Hero section com visual impactante e animações
- Seção de produtos por categoria
- Área de manutenção e assistência técnica
- Destaques de estatísticas e localização
- Botões de contato com WhatsApp e Instagram
- Layout responsivo e moderno

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Como executar localmente

Certifique-se de ter o Node.js e o npm instalados.

### Windows (PowerShell)

No PowerShell, use `npm.cmd` em vez de `npm`. Isso evita o bloqueio do script `npm.ps1` pela política de execução do Windows, sem precisar alterar as configurações de segurança:

```powershell
git clone https://github.com/Caua22908/pixel-power-games.git
cd pixel-power-games
npm.cmd install
npm.cmd run dev
```

### macOS, Linux ou outros terminais

```bash
git clone https://github.com/Caua22908/pixel-power-games.git
cd pixel-power-games
npm install
npm run dev
```

A aplicação ficará disponível no endereço padrão do Vite, normalmente em:

```bash
http://localhost:5173
```

## Build de produção

No Windows PowerShell:

```powershell
npm.cmd run build
```

No macOS, Linux ou outros terminais:

```bash
npm run build
```

## Prévia pública

O GitHub Actions publica automaticamente o site no GitHub Pages após cada push para `main`:

<https://caua22908.github.io/pixel-power-games/>

Para ativar a publicação, em **Settings > Pages**, selecione **GitHub Actions** como fonte de deploy. O repositório precisa estar público em contas GitHub Free; tornar o repositório público também torna o código-fonte visível.

## Observação

Este projeto foi configurado para servir como uma página comercial para a Lara Games, com foco em loja física na Feira dos Importados do SIA, Banca D56, em Brasília/DF.
