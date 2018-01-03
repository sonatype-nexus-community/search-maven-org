// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  search: {
    endpoint : 'http://localhost:8080/central/solrsearch/select'
  },
  stats: {
    endpoint : 'http://localhost:8080/central/quickstats'
  },
  smoBaseUrl: 'http://localhost:8181/remotecontent?filepath=',
  repositoryBaseUrl: 'http://repo1.maven.org/maven2'
};
