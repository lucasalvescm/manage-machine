# Gerenciador de máquinas

Aplicação com o CRUD de máquinas, status e uma tarefa rodando em background gerando eventos aleatórios, alterando o status das máquinas
Necessário instalar o docker e docker-compose em sua máquina: https://docs.docker.com/install/

Após fazer um git clone do projeto para sua máquina, na raiz do projeto, digite:

```sh
docker-compose build
```
Após isso, para subir os containers do projeto, digite:

```sh
docker-compose up
```

Acesse no navegador: 
http://localhost

Para consumir a api:
http://localhost/api
ENDPOINTS:
- /machines
- /status
- /events
- /configcron

Acesse o arquivo server/src/routes.js e veja com mais detalhes as rotas.

Lucas Alves
linkedin: https://www.linkedin.com/in/lucas-alves-s/