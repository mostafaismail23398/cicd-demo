🚀 CI/CD Pipeline Documentation
Status: Running & Production-Ready 🟢 (Last Verified: June 2026)

This document outlines the automated Continuous Integration (CI) and Continuous Deployment (CD) architecture designed for the Orders Service Backend. The pipeline is split into two independent, chained Jenkinsfiles to ensure a clean separation of concerns between code verification and environment deployment.

🏗️ Architecture Overview
Plaintext


 [ Developer ] 
       │
   git push
       ▼
 ┌───────────┐       ┌──────────────────────┐       ┌─────────────────┐
 │  GitHub   │ ───►  │  Jenkins CI Pipeline │ ───►  │   Docker Hub    │
 └───────────┘       └──────────────────────┘       └─────────────────┘
                                                             │
                                                      Trigger Success
                                                             ▼
                                                    ┌─────────────────┐
                                                    │   Jenkins CD    │
                                                    └─────────────────┘
                                                             │
                                                        docker run
                                                             ▼
                                                    ┌─────────────────┐
                                                    │ Local Container │
                                                    │   (Port 8085)   │
                                                    └─────────────────┘
The pipeline flows automatically through two coupled layers:

CI Pipeline (Jenkinsfile): Triggered on commits to main. It handles source code validation, artifact generation, Docker image wrapping, and registry publishing.

CD Pipeline (Jenkinsfile.cd): Triggered automatically upon successful completion of the CI pipeline. It handles environment cleanup and active container deployment.

📦 1. Continuous Integration (CI) Specifications
File: Jenkinsfile

Trigger: Code pushes to the Git Repository (*/main).

Environment Dependencies: Jenkins Maven Plugin configured with global tool registry identifier Maven3.

Pipeline Execution Stages:
Checkout Code: Synchronizes the Jenkins host workspace with the latest version control state using default SCM bindings (checkout scm).

Maven Build & Test: Navigates inside the backend context directory and executes target testing phases:

Bash


mvn clean package -DskipTests=false
Docker Build: Builds the production ready execution layer container tagged explicitly under the designated user scope context:

Bash


docker build -t mostafa2303/cicd-demo-backend:7 .
Docker Push: Securely injects global variables using credential masking protocols (docker-hub-credentials), authenticates via headless stdin streams, and ships the artifact downstream:

Bash


echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin
docker push mostafa2303/cicd-demo-backend:7
🎯 2. Continuous Deployment (CD) Specifications
File: Jenkinsfile.cd

Trigger: Native execution pipeline chaining (build job: 'cicd-demo-cd-pipeline', wait: false) invoked inside the post-success actions of the CI runtime context.

Deployment Runtime Actions:
To ensure zero-downtime port bindings and seamless rollout transitions, the script implements strict infrastructure cleanup routines on the host machine:

Conflict Erasure: Cleans the host runtime by stopping and wiping existing infrastructure profiles sharing the production port binding without breaking down active build runtimes:

Bash


docker rm -f orders-service-prod || true
Container Instantiation: Spawns a detached backend container directly inside the project default overlay network engine topology (cicd-demo_default), publishing traffic externally:

Bash


docker run -d \
  --name orders-service-prod \
  -p 8085:8080 \
  --network cicd-demo_default \
  --restart always \
  mostafa2303/cicd-demo-backend:7
⚙️ Host Infrastructure Hardening (Post-Setup Notes)
To resolve systemic environment friction across system shells and isolated container spaces, the system boundary rules have been adjusted natively on the host:

1. Engine Mount & Bridge Permissions
The Jenkins execution host relies on the Docker socket to spin container nodes. To give the jenkins execution identity permission to interact with the runtime daemon directly without encountering Permission Denied warnings, explicit read-write permissions have been bound globally:

Bash


sudo chmod 666 /var/run/docker.sock
2. Isolated Container CLI Provisioning
Instead of relying on unstable dynamic global runtime managers to supply system components inside isolated spaces, the container infrastructure shell has been hardened directly to provide internal execution paths:

Bash


sudo docker exec -it -u root jenkins-final apt-get update
sudo docker exec -it -u root jenkins-final apt-get install -y docker.io
📊 Verification and Status Queries
To inspect the deployment architecture health manually from the host terminal, evaluate the state of the system interfaces:

Bash


# Verify active deployment target profiles
sudo docker ps --filter "name=orders-service-prod"

# Track backend processing outputs and server state
sudo docker logs -f orders-service-prod
Documentation maintained by: Mostafa (DevOps & Systems Engineer) 🤝