FROM node:10 as builder

# sett riktig tidssone
ENV TZ Europe/Oslo
RUN ln -fs /usr/share/zoneinfo/Europe/Oslo /etc/localtime

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci
RUN npm test
ENV NODE_ENV=production
RUN npm run build

FROM docker.pkg.github.com/navikt/pus-decorator/pus-decorator:59f8eec3af5959eb2932b4155f9dc6c0e63b78e0
COPY --from=builder /source/build /app
ADD decorator.yaml /decorator.yaml
