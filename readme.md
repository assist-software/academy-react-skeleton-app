# Panko

Setup:

- in the project root folder add the file `.env.development.local`, content:
  `REACT_APP_BASE_URL='https://6310a933826b98071a474b4b.mockapi.io'`

Onboarding pages:

http://localhost:3000/sign-up-step-1
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
