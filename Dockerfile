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

FROM docker.pkg.github.com/navikt/pus-decorator/pus-decorator:ab17590ec3c5062b2f3698185a031df4e0bfcc42
ENV EXTRA_DECORATOR_PARAMS="&breadcrumbs=%5B%7B%22url%22%3A%22https%3A%2F%2Ftjenester.nav.no%2Fdittnav%22%2C%22title%22%3A%22Ditt%20NAV%22%7D%2C%7B%22url%22%3A%22%2F%22%2C%22title%22%3A%22Min%20innboks%22%7D%5D"
COPY --from=builder /source/build /app
ADD decorator.yaml /decorator.yaml
