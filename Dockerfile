FROM navikt/pus/node as builder
ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci
ENV NODE_ENV=production
RUN npm run build

FROM navikt/pus/decorator
COPY --from=builder /source/build /app
ADD decorator.yaml /decorator.yaml
