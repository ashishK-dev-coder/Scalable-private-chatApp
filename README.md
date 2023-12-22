This repository has already build for Docker and Nginx

-- Git clone repo
-- Making services
     - kafka [[----make topic in kafka service {{name- MESSAGES}}----]
     - Postgresql database { change the database url in code .env }
     - Redis { change the redis configuration in code }
-- Download ca.pem key
     - download kafka ca.pem key from provider
     - download postgresql database ca.pem key from provider
-- Terminal command 
     - npx prisma migrate dev --name init [ for setup prisma schema }

-- npm intall [ on both ]
   -- client side and Server side 

-- For RUN 
 -- { npm run dev }   

     

