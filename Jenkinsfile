pipeline {
  agent any
  options { timestamps() }
  stages {
    stage('Build images') {
      steps {
        sh 'docker-compose up build --no-cache'
      }
    }
    stage('Deploy (Compose up)') {
      steps {
        sh 'docker compose up -d'
      }
    }
  }
  post {
    always {
      sh 'docker compose ps || true'
    }
  }
}
