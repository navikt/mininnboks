FROM node:10 as builder

# sett riktig tidssone
ENV TZ Europe/Oslo
RUN ln -fs /usr/share/zoneinfo/Europe/Oslo /etc/localtime

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci
ENV NODE_ENV=production
RUN npm run build

FROM docker.pkg.github.com/navikt/pus-decorator/pus-decorator
COPY --from=builder /source/build /app
ADD decorator.yaml /decorator.yaml
