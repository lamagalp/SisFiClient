
DOCKER:

1) Crear archivo Dockerfile
2) Crear archivo .dockerignore
3) Crear la imagen:   docker build -t sisficlient .
4) Ejecutar el contenedor:   docker run -d -it -p 80:80 --network redsisfi --name sisficlient1 sisficlient
