# Documentation

This directory contains all documentation for the Blaupunkt EV project.

## 📁 Folder Structure

### `/deployment`
Deployment guides and hosting configuration
- **DEPLOYMENT.md** - General deployment overview
- **DEPLOYMENT_GUIDE.md** - Comprehensive deployment instructions
- **HOSTINGER_DEPLOYMENT.md** - Hostinger-specific deployment guide
- **SSH_DEPLOYMENT_QUICKSTART.md** - Quick start guide for SSH deployment
- **SSH_DEPLOYMENT_SETUP.md** - Detailed SSH setup instructions
- **SSH_IMPLEMENTATION_SUMMARY.md** - SSH implementation summary
- **DEPLOYMENT_CHECKLIST_OFFICE365.md** - Office 365 deployment checklist
- **CAN_WE_USE_SSH.md** - SSH feasibility assessment
- **PRODUCTION_BUILD_READY.md** - Production build verification

### `/email`
Email configuration and API setup
- **MICROSOFT_GRAPH_SETUP.md** - Complete Microsoft Graph API OAuth 2.0 setup guide
- **OFFICE365_IMPLEMENTATION_SUMMARY.md** - Office 365 implementation overview
- **OFFICE365_SMTP_SETUP.md** - Office 365 SMTP configuration (legacy)
- **REQUEST_AZURE_PERMISSIONS.txt** - Template email for Azure AD permission requests

### `/setup`
Initial project setup and configuration
- **SETUP_COMPLETE.md** - Project setup completion status

### `/testing`
Testing guides and collections
- **POSTMAN_QUICK_TEST.md** - Quick testing guide for Postman
- **POSTMAN_TEST_GUIDE.md** - Comprehensive Postman testing guide
- **POSTMAN_CONTACT_API_TEST.json** - Postman collection for contact API testing

## 🚀 Quick Start

1. **Setting up the project**: See [`/setup/SETUP_COMPLETE.md`](./setup/SETUP_COMPLETE.md)
2. **Configuring email**: See [`/email/MICROSOFT_GRAPH_SETUP.md`](./email/MICROSOFT_GRAPH_SETUP.md)
3. **Deploying to production**: See [`/deployment/DEPLOYMENT_GUIDE.md`](./deployment/DEPLOYMENT_GUIDE.md)
4. **Testing the API**: See [`/testing/POSTMAN_TEST_GUIDE.md`](./testing/POSTMAN_TEST_GUIDE.md)

## 📧 Email Implementation

The project uses **Microsoft Graph API with OAuth 2.0** for secure email sending:
- Modern authentication (no app passwords needed)
- Azure AD Security Defaults remain enabled
- Application permissions (client credentials flow)
- Environment variables for credential management

See [`/email/MICROSOFT_GRAPH_SETUP.md`](./email/MICROSOFT_GRAPH_SETUP.md) for complete setup instructions.

## 🔐 Security Notes

- Azure credentials are stored in `.env` files (excluded from Git)
- `.env.example` templates are provided for each environment
- Never commit real credentials to version control
- See deployment guides for production security best practices

## 📝 Documentation Standards

- All guides use Markdown format
- Code snippets include syntax highlighting
- Step-by-step instructions with clear headings
- Prerequisites listed at the beginning
- Troubleshooting sections included where applicable
