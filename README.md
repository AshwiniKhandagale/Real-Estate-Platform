# Real-Estate-Platform
# Agent Service

The Agent Service is a microservice in the Real Estate Platform that manages agent data. It provides functionality for registering agents, updating agent information, retrieving agent details, and deleting agents. This service also integrates with the User Service for user data validation.

## Features

- **Agent Registration**: Create a new agent by providing agent details and linking to a user.
- **Get All Agents**: Retrieve all agents.
- **Get Agent by ID**: Retrieve an agent by their unique ID.
- **Update Agent**: Update agent information by their ID.
- **Delete Agent**: Delete an agent by their ID.
- **Agent-User Integration**: The Agent Service integrates with the User Service to authenticate and manage agents' user data.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing
- Axios for making HTTP requests to the User Service

## Setup

### Prerequisites

- Node.js
- MongoDB instance (can use MongoDB Atlas for cloud-based DB)
- User Service should be running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AshwiniKhandagale/Real-Estate-Platform-Agent.git

