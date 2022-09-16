# Panko

**This is not a complete app, it is a skeleton. Its purpose is to provide you with some approaches related to the structure and implementation of an app using React. Some portions of the original code have been commented and some functionalities have been simulated...**

**Onboarding pages:**

http://localhost:3000/sign-up-step-1<br>
http://localhost:3000/sign-up-step-2

- if you use the email `cont.test@assist.ro` you will receive the error `User already exists`...

http://localhost:3000/sign-up-confirm?username=cont.test.assist.ro&code=527106

- only if you use the username `cont.test.assist.ro` (in query string) you will confirm the account successfully...

http://localhost:3000/sign-in

- email: `cont.test@assist.ro`
- password: `test123*`

http://localhost:3000/forgot-password

- no email is sent... a success message will always be displayed

http://localhost:3000/reset-password?username=cont.test.assist.ro&code=703733

- only if you use the code `703733` (in query string) the password will be successfully reset...

**Project pages:**

http://localhost:3000/projects<br>
http://localhost:3000/create-project<br>
http://localhost:3000/update-project-step-1/1395454c-a8e5-43dd-ac3e-779e2e8b085d<br>
http://localhost:3000/update-project-step-2/1395454c-a8e5-43dd-ac3e-779e2e8b085d

- All these pages use dummy data... the connection with an API is simulated... the data does not persist. Even if the UI is not updated in some moments, the part that interests us is the flow of the app and the structure of the project...

**Other pages:**
http://localhost:3000/projectss

- Wrong URLs will be redirected to Error 404
