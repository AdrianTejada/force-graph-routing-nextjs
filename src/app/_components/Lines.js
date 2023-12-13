"use client";

export default function Lines({ links }) {
  return links.map((link) => <line key={link.id} />);
}