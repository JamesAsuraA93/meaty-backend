USING YARN FOR BACKEND

- yarn
- docker-compose up -d
- npx prisma generate
- yarn migrate

then
- yarn allow:exec
- yarn start:dev:all

stopping
- yarn stop:dev:all


FOR ADDING INIT DATA ON DATABASE
- docker cp ./db_backup.sql {docker_id}:/var/lib/postgresql/data/db_backup.sql
- docker exec -it {docker_id} psql -U myuser -d meaty-db -f /var/lib/postgresql/data/db_backup.sql
* (replace {docker_id} with actual docker_id by typing "docker ps" on terminal)
