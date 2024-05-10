# CodeExec 💻⚙️

<img src="https://github.com/jagadeesh-k-2802/code-exec-full-stack/assets/63912668/718ddf45-3cec-4332-b79a-3cb650c94d95" width="750" />

## Features 📲

- Execute any Program with Available Programming Languages With Input
- Auto Run feature Executes Code As the User Makes Changes to Code
- Uses Queue to process requests with fault tolerance and scalability

## Running The Application 🧑🏻‍💻

- `git clone https://github.com/jagadeesh-k-2802/code-exec-full-stack`
- `cd server && npm i`
- Configure all required environment variables in `server/config/config.env.example`
- Remove `.example` from the filename it should be `config.env`
- Make sure to install neccessary programs for executing/compiling the programming languages
- Install RabbitMQ Message Queue
- `npm run dev:server` to start the node server
- `npm run dev:consumer` to start queue consumer node process
- `cd client` and run `npm i` to install npm packages
- `npm run dev` to start local development react server

## Disclaimer ⚠️

Executing a user given code and input on our server is really dangerous security issue
if not handled properly the user can execute malicious code so make sure the consumer
process is running inside a container where everything is restricted and causes no harm.

## Screenshots 📷

<img src="https://github.com/jagadeesh-k-2802/code-exec-full-stack/assets/63912668/a187c3fb-d501-4c6b-8b4a-77e44f0b3af8" width="400" />
<img src="https://github.com/jagadeesh-k-2802/code-exec-full-stack/assets/63912668/140f9e9e-6605-4289-91d9-05795854b54a" width="400" />
<img src="https://github.com/jagadeesh-k-2802/code-exec-full-stack/assets/63912668/17a7179b-c7ee-4900-b7b9-df461841aa18" width="400" />

## Screen Record 📽️

https://github.com/jagadeesh-k-2802/code-exec-full-stack/assets/63912668/b1f0ffc6-5ce5-48df-86a1-83fcf2140b55
