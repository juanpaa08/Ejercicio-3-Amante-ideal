# AGENTS.md — AI Agent Authorship

This document records which AI agents were involved in generating the code for this project.

## Project: Lover Finder Backend

### Agent: Antigravity (Google DeepMind)

**Role:** Full scaffolding and code generation

**Files generated:**
- `package.json` — Project configuration and dependencies
- `src/index.js` — Application entry point
- `src/config/db.js` — MongoDB connection helper
- `src/models/amante.model.js` — Mongoose schema for the Amante entity
- `src/dtos/amante.dto.js` — DTO validation layer
- `src/repositories/amante.repository.js` — Data access layer
- `src/services/amante.service.js` — Business logic layer
- `src/controllers/amante.controller.js` — HTTP request/response handling
- `src/routes/amante.routes.js` — Express route definitions
- `src/seed.js` — Database seeding script
- `.env.example` — Environment configuration template
- `README.md` — Project documentation
- `AGENTS.md` — This file

**Date:** March 31, 2026

**Architecture decisions made by the agent:**
- Layered architecture (routes → controllers → services → repositories → models)
- DTO validation separate from Mongoose schema validation for clear error messages
- Repository pattern as singleton instances
- Case-insensitive interest matching via MongoDB regex
- Interest normalization (lowercase, trimmed) on creation
