# Deployment & Production Guide

## Environment Setup

### 1. Environment Variables

Create `.env` file in the backend directory:

```bash
# Flask Configuration
FLASK_ENV=production
FLASK_APP=app.py
DEBUG=False

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/disaster_management

# Server
PORT=5000
SECRET_KEY=generate-a-strong-secret-key-here

# Logging
LOG_LEVEL=INFO
```

### 2. Configuration for Production

**Backend** (`backend/config.py`):
```python
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    DEBUG = os.getenv('DEBUG', 'False') == 'True'
    
    # Database
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/disaster_management')
    
    # Server
    PORT = int(os.getenv('PORT', 5000))
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    
    # CORS
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')
    
    # Logging
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
```

## Deployment Options

### Option 1: Heroku Deployment

#### Prerequisites
- Heroku CLI installed
- GitHub account (for automatic deployments)
- MongoDB Atlas cluster

#### Steps

1. **Create Procfile** in backend directory:
```
web: gunicorn --worker-class eventlet -w 1 -b 0.0.0.0:$PORT --timeout 120 app:app
```

2. **Create runtime.txt**:
```
python-3.9.18
```

3. **Update requirements.txt** - add production dependencies:
```bash
pip install gunicorn python-dotenv
pip freeze > requirements.txt
```

4. **Deploy**:
```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=mongodb+srv://...
heroku config:set SECRET_KEY=your-secret-key

# Deploy
git push heroku main
```

### Option 2: AWS Deployment

#### Using Elastic Beanstalk

1. **Install AWS CLI**:
```bash
pip install awsebcli
```

2. **Initialize Elastic Beanstalk**:
```bash
eb init -p python-3.9 disaster-management
```

3. **Create environment**:
```bash
eb create production
```

4. **Deploy**:
```bash
git add .
git commit -m "Production deployment"
eb deploy
```

#### Using EC2

1. **Launch EC2 Instance**
   - Ubuntu 20.04 LTS
   - Security group: Allow ports 80, 443, 5000, 27017

2. **Connect and Setup**:
```bash
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and dependencies
sudo apt install -y python3 python3-pip python3-venv
sudo apt install -y git nodejs npm

# Clone repository
git clone your-repo-url
cd disastermanagementsystem

# Setup backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Setup frontend
cd ../frontend/ui
npm install
npm run build

# Copy to web server directory
sudo cp -r dist/* /var/www/html/
```

3. **Setup Systemd Service**:

Create `/etc/systemd/system/disaster-management.service`:
```ini
[Unit]
Description=Disaster Management Backend
After=network.target

[Service]
Type=notify
User=ubuntu
WorkingDirectory=/home/ubuntu/disastermanagementsystem/backend
Environment="PATH=/home/ubuntu/disastermanagementsystem/backend/venv/bin"
ExecStart=/home/ubuntu/disastermanagementsystem/backend/venv/bin/python app.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable disaster-management
sudo systemctl start disaster-management
```

### Option 3: Docker Deployment

#### Create Dockerfile for Backend

Create `backend/Dockerfile`:
```dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY . .

# Expose port
EXPOSE 5000

# Run app
CMD ["python", "app.py"]
```

#### Create Dockerfile for Frontend

Create `frontend/ui/Dockerfile`:
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: disaster_management

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      MONGO_URI: mongodb://mongodb:27017/disaster_management
      FLASK_ENV: production
      SECRET_KEY: ${SECRET_KEY}
    depends_on:
      - mongodb
    volumes:
      - ./backend:/app

  frontend:
    build: ./frontend/ui
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo_data:
```

Deploy:
```bash
docker-compose up -d
```

### Option 4: DigitalOcean App Platform

1. **Create App Spec** (`app.yaml`):
```yaml
name: disaster-management
services:
- name: backend
  github:
    repo: your-username/disastermanagementsystem
    branch: main
  build_command: cd backend && pip install -r requirements.txt
  run_command: cd backend && python app.py
  envs:
  - key: MONGO_URI
    scope: RUN_AND_BUILD_TIME
    value: ${DB_CONNECTION_STRING}

- name: frontend
  github:
    repo: your-username/disastermanagementsystem
    branch: main
  build_command: cd frontend/ui && npm install && npm run build
  http_port: 80

databases:
- name: mongodb
  engine: MONGODB
  version: "5.0"
```

2. **Deploy**:
```bash
doctl apps create --spec app.yaml
```

## Production Checklist

### Security
- [ ] Change SECRET_KEY to strong random value
- [ ] Enable HTTPS/WSS
- [ ] Implement CORS properly (not "*")
- [ ] Add rate limiting to API endpoints
- [ ] Implement JWT authentication
- [ ] Use environment variables for sensitive data
- [ ] Enable MongoDB authentication
- [ ] Set up firewall rules
- [ ] Regular security updates

### Performance
- [ ] Enable GZIP compression
- [ ] Set up CDN for static files
- [ ] Optimize MongoDB indexes
- [ ] Implement caching
- [ ] Use load balancing
- [ ] Monitor database query performance
- [ ] Set up connection pooling

### Monitoring & Logging
- [ ] Set up logging service (e.g., ELK, Datadog)
- [ ] Configure error tracking (Sentry)
- [ ] Set up performance monitoring
- [ ] Configure alerts
- [ ] Monitor server resources
- [ ] Track API performance

### Backup & Disaster Recovery
- [ ] Set up automated backups
- [ ] Test backup restoration
- [ ] Document recovery procedures
- [ ] Monitor backup status
- [ ] Keep backup copies in multiple locations

### Infrastructure
- [ ] Use managed database (MongoDB Atlas)
- [ ] Set up CDN (CloudFront, Cloudflare)
- [ ] Configure SSL/TLS certificates
- [ ] Set up auto-scaling
- [ ] Configure health checks
- [ ] Set up reverse proxy (Nginx)

## Nginx Configuration

Create `/etc/nginx/sites-available/disaster-management`:

```nginx
upstream backend {
    server 127.0.0.1:5000;
}

server {
    listen 80;
    server_name yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # Frontend
    location / {
        root /var/www/disaster-management;
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # WebSocket
    location /socket.io {
        proxy_pass http://backend/socket.io;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_buffering off;
    }
}
```

## Health Checks & Monitoring

### Setup Health Check Endpoint

In `backend/app.py`, add:
```python
@app.route('/health', methods=['GET'])
def health_check():
    try:
        # Check MongoDB connection
        db.command('ping')
        return api_response(True, "Backend healthy", {
            "status": "healthy",
            "database": "connected"
        })
    except Exception as e:
        return api_response(False, "Backend unhealthy", {
            "status": "unhealthy",
            "error": str(e)
        }), 503
```

### Configure Load Balancer Health Check
- Endpoint: `GET /health`
- Interval: 30 seconds
- Timeout: 5 seconds
- Healthy threshold: 2 checks
- Unhealthy threshold: 3 checks

## SSL/TLS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Install dependencies
      run: |
        cd backend
        pip install -r requirements.txt
    
    - name: Run tests
      run: |
        cd backend
        python -m pytest
    
    - name: Build frontend
      run: |
        cd frontend/ui
        npm install
        npm run build
    
    - name: Deploy
      run: |
        # Deploy commands here
```

## Monitoring & Alerts

### Datadog Setup

```python
# In backend/app.py
from datadog import initialize, api

options = {
    'api_key': 'YOUR_API_KEY',
    'app_key': 'YOUR_APP_KEY'
}

initialize(**options)

# Log events
api.Event.create(
    title="Disaster Management Backend Started",
    text="Backend service is running",
    alert_type="info"
)
```

### CloudWatch (AWS)

```python
import boto3

cloudwatch = boto3.client('cloudwatch')

cloudwatch.put_metric_data(
    Namespace='DisasterManagement',
    MetricData=[
        {
            'MetricName': 'LocationUpdate',
            'Value': 1,
            'Unit': 'Count'
        }
    ]
)
```

## Troubleshooting Production Issues

### High CPU Usage
```
Check:
1. Database query performance
2. WebSocket connection overhead
3. Memory leaks in Python
4. Frontend rendering performance

Solutions:
- Add database indexes
- Optimize queries
- Implement caching
- Use profiling tools
```

### High Memory Usage
```
Check:
1. MongoDB memory usage
2. Python memory leaks
3. WebSocket connection count
4. Frontend bundle size

Solutions:
- Reduce document size
- Use pagination
- Set up memory limits
- Enable compression
```

### Slow API Response
```
Check:
1. Database query execution time
2. Network latency
3. Server load
4. Frontend request size

Solutions:
- Add indexes to MongoDB
- Implement query caching
- Use CDN for static files
- Optimize request/response size
```

## Disaster Recovery

### Backup Strategy

```bash
# Daily backup to S3
0 2 * * * mongodump --out /backups/$(date +\%Y\%m\%d) && \
  aws s3 sync /backups s3://your-backup-bucket/
```

### Recovery Procedure

```bash
# 1. Stop application
sudo systemctl stop disaster-management

# 2. Restore database
mongorestore /backups/latest/

# 3. Start application
sudo systemctl start disaster-management

# 4. Verify
curl http://localhost:5000/health
```

## Performance Benchmarks

Expected performance metrics:

- **API Response Time**: < 200ms
- **WebSocket Latency**: < 100ms
- **Database Query Time**: < 50ms
- **Frontend Load Time**: < 3 seconds
- **Concurrent Users**: 1000+
- **Requests/Second**: 1000+

---

**Last Updated**: February 4, 2026  
**Production Ready**: ✅ Yes
