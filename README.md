# Type Titans
> A Slightly rushed MMO where you take on a titan with your tapping skills!

Live link to the Game: https://f28wp.jamieyoung.tech/

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
