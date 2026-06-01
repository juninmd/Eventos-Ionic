# Security Policy

## Reporting a Vulnerability

Please report security vulnerabilities to [email protected] or through the GitHub security advisories tab.

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches?

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Updates

We monitor for security issues and update dependencies regularly. We use Dependabot to automate dependency updates.

## Best Practices

- We use environment variables for secrets and never commit them to the repository.
- We validate and sanitize all user inputs.
- We use parameterized queries to prevent SQL injection.
- We implement proper authentication and authorization.
- We follow the principle of least privilege.
