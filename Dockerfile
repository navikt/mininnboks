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

FROM docker.pkg.github.com/navikt/pus-decorator/pus-decorator:bb933fdabee97947acfab903ef25ccc02a11cd9d
ENV EXTRA_DECORATOR_PARAMS='&breadcrumbs=[{"url":"https://tjenester.nav.no/dittnav","title":"Ditt NAV"},{"url":"/","title":"Min innboks"}]'
COPY --from=builder /source/build /app
ADD decorator.yaml /decorator.yaml
