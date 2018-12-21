FROM docker.adeo.no:5000/pus/node as builder
ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci
ENV NODE_ENV=production
RUN npm run build

FROM docker.adeo.no:5000/pus/decorator:171.20190204.1652
COPY --from=builder /source/build /app
ADD decorator.yaml /decorator.yaml


# TODO remove
ENV CONTEXT_PATH /
ENV OIDC_LOGIN_URL /login
