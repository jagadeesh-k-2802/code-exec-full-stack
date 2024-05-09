# CodeExec 💻⚙️

CodeExec is a Full Stack Web Application Built With React, Node.js to Execute User
Entered Program and Give Output

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

