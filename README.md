## Instaliavimas

#### Atsisiųsti Docker Desktop
[Docker Desktop](https://www.docker.com/products/docker-desktop/)

#### Instaliuoti Node
[Node](https://nodejs.org/en/download)

#### Klonuoti repozitoriją
```
git clone git@github.com:daugardas/isp.git
```

#### Sukurti šios repozitorijos docker konteinerį
```
npm run docker-build
```
#### Paleisti duomenų bazės konteinerį, kad galėtumėt dirbti su lokaliais duomenimis
```
npm run docker-start-db
```

#### Suinstaliuoti NPM paketus projektui
```
npm install
```

## Paleidimas
#### Serverio paleidimas
```
npm run dev
```
#### Norint peržiūrėti duomenų bazės turinį, pasileiskit Prisma studio
```
npx prisma studio
```
