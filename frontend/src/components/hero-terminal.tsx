'use client';

import { useState, useRef, useEffect } from 'react';

interface HeroTerminalProps {
  name: string;
}

type TabKey = 'cli' | 'config' | 'sql' | 'telemetry';

interface CommandOutput {
  id: string;
  command: string;
  output: string | React.ReactNode;
  time: string;
}

export function HeroTerminal({ name }: HeroTerminalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('cli');
  const [copied, setCopied] = useState(false);
  const [cliInput, setCliInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'neofetch',
      time: '12:00:00',
      output: (
        <div className="neofetch-output">
          <div className="neofetch-ascii">
            <pre>{`
  __  _ _   _ _   _ _   _ _   _ 
 |  \\| | | | | | | | | | | \\ | |
 | |\\  | |_| | |_| | |_| |  \\| |
 |_| \\_|\\___/ \\__,_|\\__,_|_|\\__|
`}</pre>
          </div>
          <div className="neofetch-details">
            <div><span className="neo-key">OS:</span> <span className="neo-val">Next.js 16.4.1 (Linux Edge Kernel)</span></div>
            <div><span className="neo-key">Host:</span> <span className="neo-val">NH HUYNH Developer Studio</span></div>
            <div><span className="neo-key">Uptime:</span> <span className="neo-val">99.99% • Third-Year IT Undergrad</span></div>
            <div><span className="neo-key">University:</span> <span className="neo-val">Vietnam Aviation Academy (GPA 3.1/4.0)</span></div>
            <div><span className="neo-key">Shell:</span> <span className="neo-val">zsh 5.9 (x86_64-apple-darwin)</span></div>
            <div><span className="neo-key">Database:</span> <span className="neo-val">PostgreSQL Neon (Serverless Pooled)</span></div>
            <div><span className="neo-key">Status:</span> <span className="neo-val text-emerald-400">● Open for Intern / Junior Roles</span></div>
          </div>
        </div>
      ),
    },
    {
      id: 'init-2',
      command: 'help',
      time: '12:00:01',
      output: 'Available commands: [about], [stack], [projects], [contact], [clear], [sudo hire]',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === 'cli') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, activeTab]);

  const handleCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    let outputContent: string | React.ReactNode = '';

    switch (lower) {
      case 'help':
        outputContent = 'Available commands: [about], [stack], [projects], [contact], [clear], [sudo hire], [neofetch]';
        break;
      case 'about':
      case 'bio':
        outputContent = `${name} is a 3rd-year Information Technology student at Vietnam Aviation Academy (GPA 3.1/4.0). Specializing in Next.js 16, TypeScript, Node.js, PostgreSQL Neon, and AI Agentic pipelines.`;
        break;
      case 'stack':
      case 'skills':
        outputContent = 'Core Stack: TypeScript, Next.js 16, React 19, Node.js 22 LTS, PostgreSQL Neon, MongoDB Atlas, Redis, Tailwind CSS, LangChain.js, Gemini API, Docker, Git.';
        break;
      case 'projects':
      case 'work':
        outputContent = (
          <div className="terminal-projects-list">
            <div>1. Ticket Concert Support System (Agentic RAG + MoMo API)</div>
            <div>2. Dental Clinic Operations & Appointment Hub (Full-Stack)</div>
            <div>3. Coffee Shop POS & Multi-Store Inventory Engine</div>
            <div>4. Aviation Academy Student Information Portal</div>
            <div>5. Real-Time Flight Analytics & SkyRoute Optimizer</div>
            <div className="terminal-link-hint">Tip: Scroll down or click &ldquo;Projects&rdquo; in the nav to explore all case studies!</div>
          </div>
        );
        break;
      case 'contact':
      case 'email':
        outputContent = 'Direct Email: nguyenhoanghuynh.vn@gmail.com | Phone: +84 937 569 205 | Location: Ho Chi Minh City & Đồng Nai, VN.';
        break;
      case 'clear':
        setHistory([]);
        setCliInput('');
        return;
      case 'sudo hire':
      case 'hire':
        outputContent = (
          <span className="terminal-success-text">
            🚀 Access Granted! Available for Full-Stack Intern, Fresher & Junior roles starting immediately. Direct message sent to transmission queue.
          </span>
        );
        break;
      default:
        outputContent = `zsh: command not found: ${raw}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: raw,
        output: outputContent,
        time,
      },
    ]);
    setCliInput('');
  };

  const snippets: Record<'config' | 'sql' | 'telemetry', { filename: string; language: string; content: string }> = {
    config: {
      filename: 'system.config.ts',
      language: 'TypeScript 5.8 Strict',
      content: `// Production System Specification
export const engineer: SystemArchitect = {
  name: "${name}",
  institution: "Vietnam Aviation Academy (VAA)",
  faculty: "Information Technology (IT3)",
  academic_standing: { gpa: 3.1, scale: 4.0, toeic: 550 },
  core_stack: ["React 19", "Next.js 16", "PostgreSQL Neon", "Redis"],
  security: "Zero-Trust RBAC • Argon2id • OWASP Top 10",
  status: "OPERATIONAL // OPEN TO OPPORTUNITIES",
};`,
    },
    sql: {
      filename: 'neon-db.sql',
      language: 'PostgreSQL Neon',
      content: `-- Neon Serverless PostgreSQL DDL & Migration
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(120) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  neon_ssl_mode VARCHAR(30) DEFAULT 'require',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
-- Neon Pooler Status: ACTIVE • SSL REQUIRED`,
    },
    telemetry: {
      filename: 'telemetry.sh',
      language: 'Bash / Telemetry',
      content: `$ curl -sI https://nhhuynh.dev/api/health
HTTP/2 200 OK
content-type: application/json; charset=utf-8
x-edge-region: SGN-01 (Ho Chi Minh City, VN)
x-latency: 12ms
database: PostgreSQL Neon (Connection Pooled)
status: "OPERATIONAL // 99.99% UPTIME"`,
    },
  };

  const handleCopy = async () => {
    if (activeTab === 'cli') {
      const textToCopy = history.map((h) => `$ ${h.command}\n${typeof h.output === 'string' ? h.output : ''}`).join('\n\n');
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback
      }
      return;
    }

    const current = snippets[activeTab];
    try {
      await navigator.clipboard.writeText(current.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="code-window" aria-label="Interactive Developer Terminal for Nguyễn Hoàng Huynh">
      <div className="window-bar">
        <div className="window-controls">
          <span className="btn-red" title="Close" />
          <span className="btn-yellow" title="Minimize" />
          <span className="btn-green" title="Expand" />
        </div>

        <div className="window-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'cli'}
            className={`window-tab ${activeTab === 'cli' ? 'active' : ''}`}
            onClick={() => setActiveTab('cli')}
          >
            <span className="tab-icon">⚡</span>
            <span>zsh // interactive</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'config'}
            className={`window-tab ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
          >
            <span>system.config.ts</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'sql'}
            className={`window-tab ${activeTab === 'sql' ? 'active' : ''}`}
            onClick={() => setActiveTab('sql')}
          >
            <span>neon-db.sql</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'telemetry'}
            className={`window-tab ${activeTab === 'telemetry' ? 'active' : ''}`}
            onClick={() => setActiveTab('telemetry')}
          >
            <span>telemetry.sh</span>
          </button>
        </div>

        <button
          type="button"
          className="window-copy-btn"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy terminal content'}
          title="Copy to clipboard"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {/* TERMINAL CONTENT BODY */}
      <div className="window-body">
        {activeTab === 'cli' ? (
          <div className="interactive-cli" onClick={() => inputRef.current?.focus()}>
            <div className="cli-messages">
              {history.map((item) => (
                <div key={item.id} className="cli-entry">
                  <div className="cli-prompt-line">
                    <span className="cli-user">huynh@edge</span>
                    <span className="cli-colon">:</span>
                    <span className="cli-path">~/portfolio</span>
                    <span className="cli-dollar">$</span>
                    <span className="cli-command-text">{item.command}</span>
                  </div>
                  <div className="cli-output-line">{item.output}</div>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Quick Command Chips */}
            <div className="cli-quick-chips">
              <span className="chips-label">Quick Run:</span>
              <button type="button" className="quick-chip" onClick={() => handleCommand('projects')}>
                projects
              </button>
              <button type="button" className="quick-chip" onClick={() => handleCommand('stack')}>
                stack
              </button>
              <button type="button" className="quick-chip" onClick={() => handleCommand('about')}>
                about
              </button>
              <button type="button" className="quick-chip highlight" onClick={() => handleCommand('sudo hire')}>
                sudo hire
              </button>
              <button type="button" className="quick-chip" onClick={() => handleCommand('clear')}>
                clear
              </button>
            </div>

            {/* CLI Active Input Prompt */}
            <form
              className="cli-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(cliInput);
              }}
            >
              <span className="cli-user">huynh@edge</span>
              <span className="cli-colon">:</span>
              <span className="cli-path">~/portfolio</span>
              <span className="cli-dollar">$</span>
              <input
                ref={inputRef}
                type="text"
                className="cli-active-input"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="type a command (e.g. help, stack, projects)..."
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        ) : (
          <div className="code-editor-view">
            <pre className="code-pre">
              <code>{snippets[activeTab].content}</code>
            </pre>
          </div>
        )}
      </div>

      <div className="window-footer">
        <div className="footer-status">
          <span className="status-indicator live" />
          <span>CONNECTED // SGN-01 EDGE NODE • POSTGRESQL NEON ACTIVE</span>
        </div>
        <div className="footer-lang">
          {activeTab === 'cli' ? 'ZSH Interactive Shell' : snippets[activeTab].language}
        </div>
      </div>
    </div>
  );
}
