# Étape 1 : Build de l'application Angular
FROM node:20-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npx ng build --configuration=production --project=FrontStage

# Étape 2 : Servir l'app avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist/FrontStage/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
