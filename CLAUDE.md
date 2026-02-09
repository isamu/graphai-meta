# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Meta-programming experiments with GraphAI. Uses LLM agents to generate and validate GraphAI graph definitions.

## Commands

```bash
yarn build      # Compile TypeScript (tsc && tsc-alias)
yarn lint       # Run ESLint
yarn eslint     # Run ESLint with --fix
yarn format     # Format with Prettier
yarn test       # Run tests (node:test with ts-node)
```

## Architecture

- `src/index.ts` - Main entry point (runs GraphAI graph)
- `src/graph.ts` - Graph data definitions
- `src/prompts.ts` - LLM prompt templates
- `src/python_code.ts` - Python code analysis
- `tests/` - Test files
- Note: `src/graphen.ts` and `src/hoge.ts` are experimental scratch files (excluded from build/lint)
