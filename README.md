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


### Sukurti duomenų bazės scriptą, galite pavadinti kaip norite (prieš tai ištrinti prisma\migrations folderį)

```bash
npx prisma migrate dev 
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
Jūsų el. paštas privalo turėti 2-Step-Authentication, pridėti ją galite [autentikacijos gidas](https://support.google.com/accounts/answer/185833?hl=en).

Sugeneruotą slaptažodį reikia įrašyti į .env.local (.env.local failas nėra įkėliamas į repozitoriją) failą, kurį reikia susikurti patiems. .env.local failo turinys:

```env
NODEMAILER_PASSWORD="xxxx xxxx xxxx xxxx"
NODEMAILER_EMAIL="sender@email"
```

.env.local reikia papildyti CHAT GPT API raktu ir Org ID, kurie leidžia kreiptis į patį CHATGPTAPI endpointą:
```env
API_KEY="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"
ORG_ID="org-AcH2LpYYF9Vfkrpcapdy91Uq"
```

pvz:
NODEMAILER_PASSWORD="aaaa aaaa aaaa aaaa" - gautas slaptažodis iš [čia](https://myaccount.google.com/apppasswords).
NODEMAILER_EMAIL="sender@email" - jūsų el. paštas.


Padarius šiuos pakeitimus, reikia iš naujo paleisti serverį.

### Paruošti Modulio pradinius duomenis darbui (Daugardui!!!!!!!!!!!!!!!!!!!!)
```
Fakultetas: IF, Vardenis, Pavardenis, Provardenis, Propavardenis, AprašymasA, istorijaIF
Fakultetas: Matematika, Vardenis, Pavardenis, Provardenis, Propavardenis, AprašymasA, istorijaMatematika
Fakultetas: Fizikos, Vardenis, Pavardenis, Provardenis, Propavardenis, AprašymasA, istorijaFizikos
Kryptis: Informatika,AprašymasA, fakultetasid(IF)
Kryptis: Tikslioji matematika,AprašymasA, fakultetasid(Matematika)
Kryptis: Inžinerinė fizika,AprašymasA, fakultetasid(Fizikos)
```

