# Deploy da demonstração Freelas

## Arquitetura

O projeto usa TanStack Start com SSR e Nitro. O build é configurado para o preset
`node-server`, apropriado para executar o servidor Node.js em uma VPS. O servidor
renderiza a aplicação, mas não implementa autenticação, persistência ou serviços
de negócio: formulários, chat e painéis continuam demonstrativos.

O wrapper de configuração Vite do projeto é mantido porque integra os plugins
necessários de React, TanStack Start, Tailwind e Nitro; não é apenas uma ferramenta
de tagging ou desenvolvimento.

## Build local

Requisitos: Node.js compatível com o projeto e Bun.

```sh
bun install --frozen-lockfile
bun run test
bun run build
```

Execute `bun run lint` também ao validar alterações. No estado atual ele aponta
erros de formatação e avisos preexistentes em arquivos fora das mudanças deste
ciclo; eles foram preservados para evitar uma reformat geral do projeto.

O artefato de produção fica em `.output/`. O entrypoint do servidor é
`.output/server/index.mjs` e os arquivos estáticos ficam em `.output/public/`.

## Identidade visual

O logotipo oficial é importado de `src/assets/Logo Freelas.png` e empacotado
localmente no build. O favicon SVG foi personalizado para esta demonstração.

Para executar o build:

```sh
node .output/server/index.mjs
```

O Nitro aceita a porta pela variável `PORT` (ou `NITRO_PORT`); sem configuração,
usa a porta padrão do Nitro. Defina a porta de acordo com a configuração da VPS.

## Hospedagem e reverse proxy

Mantenha o processo Node.js ativo por um gerenciador de processos, como systemd
ou PM2. O proxy reverso deve encaminhar as requisições ao processo, preservar os
cabeçalhos de encaminhamento e permitir WebSocket/upgrade caso sejam necessários
em futuras mudanças. Exemplo de referência Nginx — substitua os marcadores após
definir domínio, porta e diretório de release:

```nginx
server {
    server_name SUBDOMINIO_A_DEFINIR;

    location / {
        proxy_pass http://127.0.0.1:PORTA_A_DEFINIR;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

As rotas são atendidas pelo SSR, então navegação direta e refresh em rotas
internas devem ser encaminhados ao processo Node.js, não a um fallback de SPA.

## HTTPS

Configure o certificado TLS no Nginx ou no proxy escolhido, com renovação
automática e redirecionamento de HTTP para HTTPS. O domínio, emissor, caminhos do
certificado e regras de firewall dependem da infraestrutura e devem ser definidos
antes da publicação. Não há certificado nem domínio embutidos no projeto.

## Atualização e rollback

Para cada atualização, instale as dependências com o lockfile, execute lint,
testes e build, publique o conteúdo de `.output/` em uma nova release e só então
aponte o processo para ela. Mantenha pelo menos a release anterior intacta.
Se a nova versão falhar, volte o apontamento para a release anterior e reinicie
o processo.

Para atualizar posteriormente, sincronize a branch autorizada, repita a
instalação/build/testes e troque a release de forma atômica. Não substitua a
release ativa antes de verificar que o build foi concluído.
