# Informacinė sistema "Forumas"

## Instaliavimas

### Atsisiųsti Docker Desktop

[Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Instaliuoti Node

[Node](https://nodejs.org/en/download)

### Klonuoti repozitoriją

```bash
git clone git@github.com:daugardas/isp.git
```

### Sukurti šios repozitorijos docker konteinerį

```bash
npm run docker-build
```

### Paleisti duomenų bazės konteinerį, kad galėtumėt dirbti su lokaliais duomenimis

```bash
npm run docker-start-db
```

### Suinstaliuoti NPM paketus projektui

```bash
npm install
npm install --save-dev
```

## Paleidimas

### Nepamirškit įsijungti Docker paleidžiant serverį

### Serverio paleidimas

```bash
npm run dev
```

### Norint peržiūrėti duomenų bazės turinį, pasileiskit Prisma studio

```bash
npx prisma studio
```

### Jei atsirado pokyčių duomenų bazės schemos faile, tai reikės jums atsinaujinti savo duomenų bazės lenteles

```bash
npx prisma generate dev
```

## Registracija su el. paštu

Patvirtinimo kodo siuntimas yra vykdomas iš asmenio Google el. pašto, todėl reikia sugeneruoti jūsų paskyros slaptažodį, kuris bus naudojamas prisijungti prie jūsų el. pašto. Tai galite padaryti [čia](https://myaccount.google.com/apppasswords).

Sugeneruotą slaptažodį reikia įrašyti į .env.local (.env.local failas nėra įkėliamas į repozitoriją) failą, kurį reikia susikurti patiems. .env.local failo turinys:

```env
NODEMAILER_PASSWORD="xxxx xxxx xxxx xxxx"
NODEMAILER_EMAIL="sender@email"
```

Padarius šiuos pakeitimus, reikia iš naujo paleisti serverį.
