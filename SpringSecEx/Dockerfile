# Étape 1 : image de base avec Java
FROM openjdk:21

# Étape 2 : créer un dossier temporaire dans le conteneur
VOLUME /tmp

# Étape 3 : argument pour trouver le fichier .jar
ARG JAR_FILE=target/*.jar

# Étape 4 : copier le .jar dans le conteneur
COPY ${JAR_FILE} app.jar

# Étape 5 : lancer l'application avec profil docker
ENTRYPOINT ["java", "-jar", "/app.jar", "--spring.profiles.active=docker"]
