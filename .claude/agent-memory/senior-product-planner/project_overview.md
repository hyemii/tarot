---
name: Tarot Learning App - Project Overview
description: Core business goals, target users, and strategic direction for the tarot study webapp
type: project
---

## Project Context

**Project**: 타로 학습 웹앱 (Tarot Study Webapp)
**Current Phase**: MVP Definition (Week 1-4 planned)
**Date Captured**: 2026-03-28

## Strategic Goals

- Enable beginner tarot users to learn 78 card meanings systematically
- Provide hands-on practice through interactive reading sessions
- Support mastery of 5 fundamental spreads
- Enable offline-first learning for consistent engagement

**Why**: Beginners need structured learning + immediate application to internalize card meanings. The key insight is that passive memorization fails; repeated exposure + real reading practice succeeds.

## Target User

**Primary**: Beginner tarot learners (0-6 months experience)
- Age: 18-50
- Tech comfort: Medium+ (mobile app users)
- Learning pattern: 5-20 minute daily sessions
- Key need: Systematic learning → immediate real-world practice

## Core Constraints

- **Mobile-first**: React webapp, responsive design (320px+)
- **Offline-required**: All data cached locally on first load
- **No auth/payment**: Local storage only, free forever
- **Tech stack**: React (no specified server/backend initially)

## MVP Scope (TIER 1)

**Must Have**:
1. Card Library (78 cards, searchable)
2. One-Card Reading
3. Spread Learning (5 spreads)
4. Offline caching (Service Worker + IndexedDB)

**Should Have** (Week 3-4):
- Multi-card spreads (3-card, Celtic Cross, etc.)
- Progress tracking
- Reading history
- Favorites system

## Success Metrics

- DAU (Daily Active Users) tracking
- Card Learning Completion Rate (target: 50% of users learn 50+ cards)
- Reading Practice Frequency (target: 10+ sessions/month per user)
- Offline Usage Rate (target: 30%+ of sessions offline)

## Key Assumptions to Validate

1. Daily 5-20 min sessions will lead to card mastery (vs. weekly cramming)
2. Direct reading practice accelerates learning more than passive review
3. Offline accessibility materially improves consistency
4. Static card interpretations are sufficient (no AI needed for MVP)

**How to apply**: Prioritize metrics tracking from Day 1. Validate assumptions through early user feedback (5-10 beta testers) before scaling.
