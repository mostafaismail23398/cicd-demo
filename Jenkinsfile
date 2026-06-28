pipeline {
    agent any

    tools {
        // تأكد إن اسم المافن هنا مطابق للاسم المتعرف عليه في الـ Global Tool Configuration جوه جينكنز
        maven 'Maven3' 
        dockerTool "latest"
    }

    environment {
        DOCKER_REGISTRY_USER = 'mostafa' // غيره لاسم حسابك على Docker Hub
        IMAGE_NAME           = 'cicd-demo-backend'
        IMAGE_TAG            = "${BUILD_NUMBER}"
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
                    // تشغيل الـ Unit Tests وعمل الـ jar
                    sh 'mvn clean package -DskipTests=false' 
                }
            }
        }

        stage('🐳 3. Docker Build') {
    steps {
        dir('backend') {
            echo 'Building Docker Image...'
            sh 'docker build -t mostafa/cicd-demo-backend:7 .'
        }
    }
}

stage('🚀 4. Docker Push') {
    steps {
        dir('backend') {
            echo 'Pushing Docker Image...'
            withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                sh "echo \$DOCKER_HUB_PASSWORD | docker login -u \$DOCKER_HUB_USERNAME --password-stdin"
                sh 'docker push mostafa/cicd-demo-backend:7'
            }
        }
    }
}

    post {
        success {
            echo 'Pipeline completed successfully! Components are verified and images are pushed. 🎉'
        }
        failure {
            echo 'Pipeline failed. Check the logs above for debugging. ❌'
        }
    }
    } }