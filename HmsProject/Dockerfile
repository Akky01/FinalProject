FROM Openjdk:17
VOLUME /tmp
ADD target/HmsSbProject-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]