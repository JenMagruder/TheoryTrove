```markdown
# Theory Trove

**Live site:** https://theorytrove.com

Theory Trove is a safe space for Sarah J. Maas fans to share their theories anonymously, no arguing, no negativity, just the Maasverse and the people who love it. With ACOTAR books 6 and 7 coming out in October, it felt like the perfect time to build something for the fandom.

I am a huge Maas fan myself. I read ACOTAR first, finished that series, then moved on to Throne of Glass, and by the time I was done with that, Crescent City was coming out. I built this because I wanted a space where fans could share theories freely without the drama that usually comes with fandom discourse.

This project is also a showcase of what I have been building as a self taught cloud engineer and AWS Community Builder.

---

## Features

- Anonymous theory submissions: 280 characters, no account needed
- Six Maasverse reactions per theory: ✦ 🔥 🖤 🌙 ⚔️ 🎭
- IP rate limiting on reactions to prevent spam
- Tag and filter theories by series: ACOTAR, Throne of Glass, Crescent City, Crossover, Valkyrie Cycle
- Optional book and chapter reference on each theory
- Contact form powered by SNS
- Rules page: safe space guidelines and copyright notice
- Admin delete endpoint for moderation
- Ko-fi support link for site sustainability

---

## Tech Stack

**Frontend:** React, Nginx

**Backend:** Python, Flask

**Database:** Amazon DynamoDB

**Containerization:** Docker, Docker Compose

**Container Registry:** Amazon ECR

**Orchestration:** Amazon ECS Fargate

**Load Balancer:** Application Load Balancer

**DNS and SSL:** Route 53, AWS Certificate Manager

**Notifications:** Amazon SNS

**Secrets:** AWS Secrets Manager

**Observability:** Amazon CloudWatch

**Networking:** Custom VPC with public and private subnets, NAT Gateway, Internet Gateway

**CI/CD:** Coming soon: CodePipeline, CodeBuild, CodeDeploy

---

## Architecture

- React frontend served by Nginx runs in a container on ECS Fargate in private subnets
- Flask backend runs in a second container on the same ECS task in private subnets
- ALB sits in public subnets and routes traffic; frontend on port 8080, API on port 4567 via path based routing
- DynamoDB stores theories and reaction data
- SNS delivers contact form messages to the Theory Trove inbox
- All secrets managed via AWS Secrets Manager
- HTTP redirects to HTTPS via ALB listener rule

**Why ECS Fargate over EKS?**
EKS charges $0.10 per hour for the control plane alone which is roughly $72 per month before running a single container. For a fan site at this stage that cost is not justified. ECS Fargate is fully managed, integrates natively with the rest of the AWS stack, and keeps costs proportional to actual usage. Kubernetes is the right tool at scale; ECS Fargate is the right tool right now.

---

## Cost

Estimated monthly cost at low traffic:

- ECS Fargate (0.25 vCPU, 0.5GB): approximately $3 to $5
- ALB: approximately $8
- NAT Gateway: approximately $32; required for private subnet ECS tasks to pull images from ECR and reach AWS APIs without exposing containers to the public internet
- DynamoDB on demand at low traffic: under $1
- Route 53 hosted zone: $0.50
- CloudWatch logs: under $1
- SNS email: free up to 1,000 per month
- ECR storage: under $1
- Domain (theorytrove.com): $16 paid upfront annually

Total: approximately $45 to $50 per month plus $16 per year for the domain.

---

## Local Development

**Prerequisites:** Docker Desktop, AWS CLI, Node.js

**Clone the repo:**
```
git clone https://github.com/JenMagruder/TheoryTrove.git
cd TheoryTrove
```

**Start the containers:**
```
docker compose up --build
```

**Create local DynamoDB tables:**
```
bash bin/create-tables.sh
```

**Visit:** http://localhost:8080

---

## About the Developer

Built by Jen Magruder, self taught cloud engineer, AWS Community Builder, and SJM fan based in the DC Metro area.

- GitHub: https://github.com/JenMagruder
- Personal site: https://stratajen.net
- LinkedIn: https://linkedin.com/in/jenmagruder

---

*Unofficial fan site. All characters and lore belong to Sarah J. Maas and Bloomsbury Publishing. No affiliation or endorsement implied.*
```