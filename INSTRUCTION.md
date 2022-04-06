### Init project

- run init with `y` flag to automatically answer `yes` to all questions

```
yarn init -y
```

- install the TS beta version

```
yarn add -D typescript@beta
```

- run to init typescript config

```
yarn tsc --init
```

- add JEST by running

```
yarn add -D jest ts-jest @types/jest
```

- and run 

```
yarn ts-jest config:init
```

### Working on project feature

- add jsdom for mocking localStorage in the tests

```
yarn add -D jsdom @types/jsdom
```

### Prepare code for npm

Sign up to [npm](https://www.npmjs.com/) if you do not have an account there yet.

Open the `package.json` and add `repository` and `license`. `name` should be defined in the scope in case the npm package name already exists. In our case, it'll be: `marekdano/streak-counter`.

```
{
 -  "name": "streak-counter",
 -  "version": "1.0.0",
 +  "name": "@marekdano/streak-counter",
 +  "version": "0.0.1",
    "main": "index.js",
 -  "repository": "git@github.com:marekdano/streak-counter.git",
 +  "repository": {
 +    "type": "git",
 +    "url": "https://github.com/marekdano/streak-counter"
 +  },
    "license": "MIT",
    "scripts": {
      "test": "jest"
```

Create a new file at the root called `.npmignore` and place files/directories to tell npm what files/directories to exclude when publishing our package to the registry. Add this to your .npmignore:

```
**tests**
jest.config.cjs
.github
.vscode
```

Add a new dependency called `microbundle`. This will bundle our code to produce optimized code for others to consume it. For more check [here](https://github.com/developit/microbundle).

- add the dependency with `yarn add -D microbundle`. 
  
- and modify your `package.json`:

```
{
 "name": "@marekdano/streak-counter",
 "version": "0.0.1",
-  "main": "index.js",
 "repository": {
   "type": "git",
   "url": "https://github.com/marekdano/streak-counter"
 },
 "author": "Marek Dano <mk.dano@gmail.com>",
 "license": "MIT",
+  "type": "module",
+  "types": "./dist/index.d.ts",
+  "source": "src/index.ts",
+  "exports": {
+    "require": "./dist/index.cjs",
+    "default": "./dist/index.modern.js"
+  },
+  "main": "./dist/index.cjs",
+  "module": "./dist/index.module.js",
+  "unpkg": "./dist/index.umd.js",
 "scripts": {
-    "test": "jest"
+    "build": "microbundle",
+    "dev": "microbundle watch",
+    "test": "NODE_OPTIONS=--experimental-vm-modules jest"
 }
```

##### Explanation: 

Here we've added different module formats. Check [here](https://irian.to/blogs/what-are-cjs-amd-umd-and-esm-in-javascript/) for more info about the modules.

We've also added `types`, where we inform TypeScript of our types and include them in our npm package. More details on that [here](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html).

We also need to rename the Jest config to be `jest.config.cjs` and remove the JSDoc block. Now it should look like this:

```
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
}
```

Run `yarn build` to make sure it all works.

### Publish to npm

First we need an auth token from npm. Follow these steps:

1. Go to [npm](https://www.npmjs.com/)
2. Click on your profile pic > Access Tokens
3. Generate a new token called “streak-counter” and select “Automation”
4. Copy the token

We now need to add this to our repo as a secret. Follow these steps:

1. Go to Github repo page > Settings > Secrets > Actions
2. New repository secret > name it “NPM_TOKEN”
3. Paste token

Create a new file at the root at `.github/workflows/npm-publish.yaml` and paste the following:

```
on: push

jobs:
 publish:
   runs-on: ubuntu-latest
   steps:
     - uses: actions/checkout@v1
     - uses: actions/setup-node@v1
       with:
           node-version: '16'
     - run: yarn install
     - run: yarn test
     - run: yarn build
     - uses: JS-DevTools/npm-publish@v1
       with:
         token: ${{ secrets.NPM_TOKEN }}
         access: "public"
```

**Note:** This creates a new `GitHub Action` that installs dependencies, runs tests, builds project, and then publishes it to npm (as long as it's a new version) on every push.

Now commit this and push it up. If all goes as planned, it should publish the package to npm.


#### This package is live [on npm](https://www.npmjs.com/package/@marekdano/streak-counter).
