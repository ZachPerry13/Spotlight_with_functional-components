FROM maven:3.8.4-openjdk-17-slim AS build
RUN mkdir -p workspace
WORKDIR workspace
COPY pom.xml /workspace
COPY src /workspace/src
COPY frontend /workspace/frontend
RUN mvn -f pom.xml clean install -DskipTests=true

FROM openjdk:17-alpine
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]