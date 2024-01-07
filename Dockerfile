ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-alpine as build
RUN apk update && apk upgrade

# set work dir as app
WORKDIR /app

# copy the project package json and package json lock if available 
COPY package* ./
RUN  npm install
COPY . ./
RUN npx nuxt build

