FROM nginx:stable-alpine

COPY local-nginx.conf /etc/nginx/conf.d/default.conf