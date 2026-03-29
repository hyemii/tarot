#!/usr/bin/env python3
"""
Claude Code 에이전트 협업 로그를 Notion 데이터베이스에 기록.
Claude Code 훅에서 stdin으로 JSON 페이로드를 받아 처리.
"""

import os
import sys
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone

NOTION_TOKEN = os.environ.get("NOTION_TOKEN", "")
NOTION_PAGE_ID = os.environ.get("NOTION_PAGE_ID", "")
DB_ID_FILE = os.path.join(os.path.dirname(__file__), ".notion_db_id")

AGENT_EMOJI = {
    "qa-tester": "🧪",
    "senior-architect-refactorer": "🏗️",
    "senior-product-planner": "📋",
    "plan": "📐",
    "Explore": "🔍",
    "claude-code-guide": "📖",
    "general-purpose": "🤖",
}

if not NOTION_TOKEN or not NOTION_PAGE_ID:
    sys.exit(0)

# Claude Code 훅은 stdin으로 JSON 페이로드를 전달
try:
    payload = json.load(sys.stdin)
except Exception:
    sys.exit(0)

tool_name = payload.get("tool_name", "")
if tool_name != "Agent":
    sys.exit(0)

tool_input = payload.get("tool_input", {})
tool_response = payload.get("tool_response", "") or ""

agent_type = tool_input.get("subagent_type", "general-purpose")
description = tool_input.get("description", "")
prompt = tool_input.get("prompt", "")


def notion_request(method, path, body=None):
    url = f"https://api.notion.com/v1{path}"
    data = json.dumps(body).encode("utf-8") if body else None
    req = urllib.request.Request(
        url, data=data,
        headers={
            "Authorization": f"Bearer {NOTION_TOKEN}",
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",
        },
        method=method,
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"[notion_logger] {e.code}: {e.read().decode()}", file=sys.stderr)
        return None


def get_or_create_database():
    if os.path.exists(DB_ID_FILE):
        with open(DB_ID_FILE) as f:
            return f.read().strip()

    result = notion_request("POST", "/databases", {
        "parent": {"type": "page_id", "page_id": NOTION_PAGE_ID},
        "icon": {"type": "emoji", "emoji": "🤝"},
        "title": [{"type": "text", "text": {"content": "Agent 협업 로그"}}],
        "properties": {
            "이름": {"title": {}},
            "에이전트": {
                "select": {
                    "options": [
                        {"name": "qa-tester", "color": "red"},
                        {"name": "senior-architect-refactorer", "color": "blue"},
                        {"name": "senior-product-planner", "color": "purple"},
                        {"name": "plan", "color": "yellow"},
                        {"name": "Explore", "color": "green"},
                        {"name": "claude-code-guide", "color": "orange"},
                        {"name": "general-purpose", "color": "gray"},
                    ]
                }
            },
            "시각": {"date": {}},
            "태스크": {"rich_text": {}},
            "결과 요약": {"rich_text": {}},
        },
    })

    if result:
        db_id = result["id"]
        with open(DB_ID_FILE, "w") as f:
            f.write(db_id)
        return db_id
    return None


def add_entry(db_id, agent_type, description, task, output):
    emoji = AGENT_EMOJI.get(agent_type, "🤖")
    now_iso = datetime.now(timezone.utc).isoformat()

    notion_request("POST", "/pages", {
        "parent": {"database_id": db_id},
        "icon": {"type": "emoji", "emoji": emoji},
        "properties": {
            "이름": {
                "title": [{"type": "text", "text": {"content": description or "(설명 없음)"}}]
            },
            "에이전트": {
                "select": {"name": agent_type}
            },
            "시각": {
                "date": {"start": now_iso}
            },
            "태스크": {
                "rich_text": [{"type": "text", "text": {"content": task[:2000]}}]
            },
            "결과 요약": {
                "rich_text": [{"type": "text", "text": {"content": output[:2000]}}]
            },
        },
    })


db_id = get_or_create_database()
if db_id:
    add_entry(db_id, agent_type, description, prompt, tool_response)
