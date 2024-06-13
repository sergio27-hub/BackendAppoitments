import sonarqubeScanner from 'sonarqube-scanner';
import Config from '../src/config.js';

sonarqubeScanner({
  serverUrl: 'http://localhost:9000',
  options: {
    'sonar.projectKey': 'appoitment-sonarqube',
    'sonar.token': 'sqp_1c86db3645d74a229a8e02c8d925ba74155c453d',
    'sonar.sources': '.',
    'sonar.tests': 'test',
    'sonar.inclusions': 'src/**',
    'sonar.coverage.exclusions': 'src/**/index.js',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.login': 'admin',
    'sonar.password':`${Config.sonarqube.password}`,
  },
}, () => {});

