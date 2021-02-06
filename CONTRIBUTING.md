# Contribution

Here are the contribution guidelines. Please, read it before contributing.

## Documentation

-   Pull requests for docs site update, if needed
-   Code-level documentation expectations
    -   100% documentation coverage for pull requests
    -   Update readme if needed

## Environment setup

StoryTeller.js is using [Prettier](https://prettier.io/) to format the code. You must use our format style in your push requests.

## Compiling

You must compile your TS file with these actions before sending a pull request.

### Dependencies

- [TypeScript compiler](https://code.visualstudio.com/docs/typescript/typescript-compiling)

 ```
npm i typescript -g 
tsc
```

- [merger](https://www.npmjs.com/package/merger-js)
```
npm i merger-js -g
merger build -a
```
- [typedoc](https://typedoc.org/)
```
npm i typedoc -g
typedoc src/Scene.ts src/StoryTeller.ts src/SceneConfiguration.ts --out ./documentation --tsconfig tsconfig.json --name StoryTeller.js --theme minimal
```
