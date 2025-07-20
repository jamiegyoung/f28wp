# Type Titans
> A Slightly rushed MMO where you take on a titan with your tapping skills!

![concept-art](https://i.imgur.com/A7MT8Yf.png)
_Note: concept art_
## Development setup
If you do not have node and npm, download it using the instructions on [node's website](https://nodejs.org/en/).

After installing, you will need to install yarn using the following command
```sh
npm install -g yarn
```

After this has installed, go into the app directory and install the dependencies
```sh
cd app
yarn
```

Then go into the server directory and install it's dependencies also
_or from f28wp_
```sh
cd server
yarn
```

After installing all the dependencies, you can now build the app by going into the app directory and running the build command
```sh
cd app
yarn build
```
After this is complete, you may enter the server directory and run
```sh
cd server
yarn start
```

or

```sh
cd server
yarn start-dev
```
_Note when using the dev version, some urls/ports are hardcoded in the app and therefore will have to be changed manually (this will hopefully be changed sometime in the future), the default port to look for is 30284[?](https://www.random.org/integers/?num=1&min=5001&max=49151&col=5&base=10&format=html&rnd=)_

## Docker deployment

For production deployment using Docker, you can use the provided Docker setup which includes a multi-stage build process.

### Prerequisites
- Docker and Docker Compose installed on your system

### Quick start with Docker Compose
1. Copy the environment variables file:
```sh
cp .env.example .env
```

2. Edit the `.env` file and set a secure session secret:
```sh
SESSION_SECRET=your-very-secure-session-secret-here
```

3. Build and run the application:
```sh
docker-compose -f docker-compose.prod.yml up -d
```

The application will be available at `http://localhost:8080`

### Manual Docker build
If you prefer to build manually:

```sh
# Build the Docker image
docker build -t type-titans .

# Run the container
docker run -d \
  --name type-titans-app \
  -p 8080:8080 \
  -e SESSION_SECRET=your-secure-session-secret \
  -e NODE_ENV=production \
  -v type-titans-data:/app/src \
  type-titans
```

### Environment variables
- `SESSION_SECRET`: Required. Set to a secure random string for session management
- `NODE_ENV`: Set to `production` for production deployment
- `PORT`: Server port (default: 8080 in Docker)
