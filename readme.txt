!! Lama erfa3o 3al production : bell allowedOrigins file fi || !origins ha bem7iya li2ana la postman lal testing
Bel Index deyman : ba3mol connect 3al db, berja3 cors, berja3 routes

1) Initial commands:
-- node -v
-- npm -v
-- 
-- npm init -y (install package.json)
-- npm i express mongoose jsonwebtoken dotenv cors cookie-parser bcrypt
-- npm i nodemon (this is for development)
!! bas e5la2 database mongodb online bel country eza 7atet usa, bi koun afdal kamen bas erfa3 l frontend 3a vercel, render,... eno 7ot
nafes l country la tenfiz l queries wel mutation ykoun asra3
w bas 3arfa bel .env file ma ensa wen 7ot l name lal database w kif 7ot l pass

Details:
-- bel mongo db l data btet5azan bel documents aw collections 3akes l mysql bi koun fiya tables w relationships
-- jsonwebtoken la a3mol genrate la token w 5azno bel cookie bel server
-- cors be7me l server ya3ne b7adid masalan domain m3aynin ta ya3mlo access 3al server
-- dotenv hiye darouriye la ta3mol load lal .env file b7ot fiya private data w ma 7ada bye2dar yousala lezim tkoun private
-- cookie-parser hayde kermel bas eb3at l token mnel cookie mnel frontend lal backend ta ye2dar yefhama l server

bel package json b7ot start w dev , ... bas ta o5tosir l command w ma ensa eno bi balshi bi npm run start masalan

2) ta ne5la2 l server bel index.js huwe mne5la2o 3an tari2 l express
w men7adedlo l PORT
!!   // Hon ma fina na3mel start lal server abel ma na3mol connect 3al database
bel allowedOrigins file b7adid l domain li bye2dar bas l server yesta3mel menno requests

!! bel send fina nraji3 message aw json w sendFile bade esta3mol l path fiye rajji3 saf7a

3) ktir mohem a3rif kif ousal la static file app.use("/", express.static(path.join(__dirname, "public")));

4) verifyJwt ya3ne fekreta ta et2akad eza l user mawjoud 3ende bel db aw la2 men 5ilel l secret key yalle hiye bet koun l signature taba3o w bet shouf kamen l expiry eza valid or not

eza ana 3melet login byerja3 accesToken maslaan la 15 min w refreshToken la 7d so ana bas ata3et l 15 min byerja3 bi nafiz req api l refreshToken w bye2tine access token jdid
eza tlo3et abel l 15min w fetet ba3ed 8 d ya3ne l refreshToken 5alas sala7ito so hon bkoun majbour ene erja3 a3mol login

5) l 2:25:00 mhemme erja3 raje3a