pipeline {
    agent any

    tools {
        maven 'Maven3'
    }

    stages {
        stage('📦 1. Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('🧪 2. Maven Build & Test') {
            steps {
                dir('backend') {
                    echo 'Running Unit Tests and Building Artifact...'
                    sh 'mvn clean package -DskipTests=false'
                }
            }
        }

        stage('🐳 3. Docker Build') {
    steps {
        dir('backend') {
            echo 'Building Docker Image...'
            // ⚠️ تعديل الاسم إلى mostafa2303
            sh 'docker build -t mostafa2303/cicd-demo-backend:7 .'
        }
    }
}

stage('🚀 4. Docker Push') {
    steps {
        dir('backend') {
            echo 'Pushing Docker Image...'
            withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                sh "echo \$DOCKER_HUB_PASSWORD | docker login -u \$DOCKER_HUB_USERNAME --password-stdin"
                // ⚠️ تعديل الاسم إلى mostafa2303
                sh 'docker push mostafa2303/cicd-demo-backend:7'
            }
        }
    }
}

        
    }

   post {
        success {
            echo 'CI Pipeline completed successfully! Image is ready on Docker Hub. 🎉'
            
            // ⚠️ السطر ده بينادي على الـ CD Job أوتوماتيك فوراً بعد نجاح الـ CI
            build job: 'cicd-demo-cd-pipeline', wait: false
        }
        failure {
            echo 'CI Pipeline failed. ❌'
        }
    }
}