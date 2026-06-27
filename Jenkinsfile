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
                    sh "docker build -t ${DOCKER_REGISTRY_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
                    sh "docker build -t ${DOCKER_REGISTRY_USER}/${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('🚀 4. Docker Push') {
            steps {
                // تأكد إنك ضايف الـ Docker Hub Credentials جوه جينكنز ومسميها بالـ ID ده: docker-hub-credentials
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    echo 'Logging into Docker Hub and Pushing Image...'
                    sh "echo ${PASS} | docker login -u ${USER} --password-stdin"
                    sh "docker push ${DOCKER_REGISTRY_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_REGISTRY_USER}/${IMAGE_NAME}:latest"
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
}