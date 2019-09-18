# Test procedurre

Build image
```
docker build -t serco/dad2-backend:x.x.x .
```

Push image to docker hub
```
docker push serco/node-backend:x.x.x
```

Run container anywhere pulling image from docker hub
```
docker run --name dad2-backend -p 3000:3000 -d serco/dad2-backend:x.x.x
```

Logs
``` 
docker logs -f dad2-backend 
```


# Inside container
```
docker exec -it dad2-backend /bin/bash
```

One-line relauncher
```
docker build -t serco/dad2-backend:0.0.1 . ; d rm -f dad2-backend ; d run --name dad2-backend -p 3000:3000 -d serco/dad2-backend:0.0.1 ; docker logs --follow dad2-backend
```

Auto-rebuilder
```
npm run-script  watch dockerbuild
```

Docker compose 
```
docker-compose down && docker-compose build && docker-compose up
```

## Functions

 - axios
 - winston