echo "Generating clients"
java -jar openapi-generator-cli.jar generate \
            -i ./spec/api-spec.yaml \
            -g typescript-fetch \
            -o ./generated-clients