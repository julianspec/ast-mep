ng build --prod --output-hashing none
scp ./nginx.conf administrador@172.28.194.196:/home/uw2/front-uw/seed/nginx.conf
scp ./docker-compose-alt.yaml administrador@172.28.194.196:/home/uw2/front-uw/seed/docker-compose.yaml
scp -r ./dist/_APPNAME_/* administrador@172.28.194.196:/home/uw2/front-uw/seed/dist
ssh administrador@172.28.194.196 'cd /home/uw2/front-uw/seed && docker-compose stop'
ssh administrador@172.28.194.196 'cd /home/uw2/front-uw/seed && docker-compose up -d'