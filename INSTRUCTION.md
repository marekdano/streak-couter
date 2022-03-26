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