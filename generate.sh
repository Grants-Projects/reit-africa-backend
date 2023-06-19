echo "Generating clients"
java -jar openapi-generator-cli.jar generate \
            --git-host='github.com' \
            --git-user-id='Grants-Projects' \
            -i ./spec/api-spec.yaml \
            -g typescript-axios \
            -o ./generated-clients \
            --template-dir='code-templates/typescript-axios' \
            --type-mappings='decimal=Number,BigDecimal=Number,set=Array' \
            --api-package='clients' \
            --model-package='models' \
            -p sortParamsByRequiredFlag='true' \
            -p npmSnapshot='168598969' \
            -p npmName='@Grants-Projects/reit-africa-api-client' \
            -p npmVersion='1.0.4' \
            -p npmRepository='https://github.com/Grants-Projects/artifacts' \
            -p npmSourceRepository='https://github.com/Grants-Projects/reit-africa-backend.git' \
            -p npmAuthor='Marvelous' \
            -p npmDescription='Grants Project Tech' \
            -p supportsES6='true' \
            -p stringEnums='true' \
            -p enumPropertyNaming='original' \
            -p platform='node' \
            -p projectName='reit-africa' \
            -p moduleName='ReitAfrica' \
            -p disallowAdditionalPropertiesIfNotPresent='true' \
            -p withInterfaces='true' \
            --skip-validate-spec
            [ $? != 0 ] && exit 25
            echo '#!/bin/bash
            cd "$(dirname "$0")"
            echo "@burrow-tech:registry=https://npm.pkg.github.com/burrow-tech" > .npmrc
            echo "export default {};" >> api.ts
            npm install
            npm publish
' > generated-clients/publish.sh



exit 0