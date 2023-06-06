#!/bin/bash
            cd "$(dirname "$0")"
            echo "@burrow-tech:registry=https://npm.pkg.github.com/burrow-tech" > .npmrc
            echo "export default {};" >> api.ts
            npm install
            npm publish

