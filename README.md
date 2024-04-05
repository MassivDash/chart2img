# chart2img

Azure Function for converting get params into bar chart images via node-canvas and chart.js.
This template / app uses Azure Functions v4 with Typescript.

Development tools for git control

- eslint
- prettier 
- commitlint 
- husky 


## Prerequisites

### Azure Functions core tools 

all platform [instructions](https://learn.microsoft.com/pl-pl/azure/azure-functions/create-first-function-cli-typescript?tabs=macos%2Cazure-cli%2Cbrowser&pivots=nodejs-model-v4)

macOS install

```bash
brew tap azure/functions
brew install azure-functions-core-tools@4
# if upgrading on a machine that has 2.x or 3.x installed:
brew link --overwrite azure-functions-core-tools@4
```


### Start Development

```bash
npm run start
```

### Tests

Will run tests with vitest 

```bash
npm run test
```

Will produce the coverage report

```bash
npm run coverage
```

### Build for prod

**ci/cd**
Github actions workflow for testing and pushing.
While creating the azure function set ci/cd settings and link to a branch in your gh repo.

**azure cli**
You can use combo of func cli and az cli to bundle and deploy project directly to azure.


```bash
npm run build
```

### Usage

After deployment you can control the output via get parameters

```bash
https://yourfunction.com/api/barChart?labels=Red,Orange,Yellow,Green,Blue,Purple,Grey&data=65,59,80,81,56,55,40&backgroundColors=rgba(255,%2099,%20132,%200.2),rgba(255,%20159,%2064,%200.2),rgba(255,%20205,%2086,%200.2),rgba(75,%20192,%20192,%200.2),rgba(54,%20162,%20235,%200.2),rgba(153,%20102,%20255,%200.2),rgba(201,%20203,%20207,%200.2)&borderColors=rgb(255,%2099,%20132),rgb(255,%20159,%2064),rgb(255,%20205,%2086),rgb(75,%20192,%20192),rgb(54,%20162,%20235),rgb(153,%20102,%20255),rgb(201,%20203,%20207)
```

### Notes

**azure**
- azure connection to gh is required,download the publisher xml from azure portal function screen, add it as publisher secret token in gh actions
- azure blob storage is required for azure functions to work properly, your azure functions config should include AzureWebJobsStorage variable with a connection token, you can get that from your blob connections screen;  key1. You need to rotate the key with the blob for the functions to work. 

**functions**
- ⚠️ no paths for tsConfig
- 
- [vs code extensions and config](https://learn.microsoft.com/pl-pl/azure/azure-functions/create-first-function-vs-code-typescript?pivots=nodejs-model-v4)