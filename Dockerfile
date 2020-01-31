FROM navikt/pus-fss-frontend as builder

# sett riktig tidssone
ENV TZ Europe/Oslo
RUN ln -fs /usr/share/zoneinfo/Europe/Oslo /etc/localtime

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci
ENV NODE_ENV=production
RUN npm run build

FROM navikt/java:8-appdynamics
COPY --from=builder /source/build /app
ADD decorator.yaml /decorator.yaml
