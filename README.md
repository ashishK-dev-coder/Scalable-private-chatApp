This repository has already build for Docker and Nginx <br> <br>

-- Git clone repo <br>
-- Making services <br>
     - kafka [[----make topic in kafka service {{name- MESSAGES}}----]<br> 
     - Postgresql database { change the database url in code .env }<br>
     - Redis { change the redis configuration in code }<br>
-- Download ca.pem key<br>
     - download kafka ca.pem key from provider <br>
     - download postgresql database ca.pem key from provider <br>
-- Terminal command 
     - npx prisma migrate dev --name init [ for setup prisma schema } <br> <br>

-- npm intall [ on both ] <br>
   -- client side and Server side  <br> <br>

-- For RUN  <br>
 -- { npm run dev }    <br>

     

