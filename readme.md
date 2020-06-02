# JR-EB-DEPLOY

This repo is used for JR academy tutoring purpose.

## Steps

0. fork this repo (if you want)
1. git clone this repo
2. add .env file to the root directory
	```
	DB_HOST=127.0.0.1
	DB_DATABASE=jr-eb-deploy
	DB_PORT=27017
	JWT_KEY=your-random-key
	```
3. `npm install`
4. `npm audit fix`
5. `npm run dev` 
	* make sure you see something like `Server is listening on PORT: 3000`
6. there are two bugs in student, one in course. **DEBUG** them!
	* check the logic, use debug tool if needed.
7. `npm start`
	* there should be errors shown in the terminal, **Read** carefully and **SOLVE** them.
8. Connect with remote DB
9. Commit your changes
10.  pack your project with `git archive -v -o jr-cms.zip --format=zip HEAD`
11. you should get a **jr-cms.zip** file in your root directory.
