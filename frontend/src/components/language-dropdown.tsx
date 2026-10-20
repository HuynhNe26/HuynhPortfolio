'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage, type Language } from '@/context/language-context';

interface LanguageOption {
  code: Language;
  label: string;
  sub: string;
  flag: string;
  short: string;
}

const LANGUAGES: LanguageOption[] = [
  {
    code: 'vi',
    label: 'Tiếng Việt',
    sub: 'Vietnamese',
    flag: '🇻🇳',
    short: 'VI',
  },
  {
    code: 'en',
    label: 'English',
    sub: 'International',
    flag: '🇬🇧',
    short: 'EN',
  },
  {
    code: 'zh',
    label: '中文 (简体)',
    sub: 'Chinese (Simplified)',
    flag: '🇨🇳',
    short: 'ZH',
  },
];

export function LanguageDropdown() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  const handleSelect = (code: Language) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`hh-lang-dropdown-wrapper ${isOpen ? 'is-open' : ''}`}
      onKeyDown={handleKeyDown}
    >
      {/* TRIGGER BUTTON */}
      <button
        type="button"
        className="hh-lang-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Language selector: current ${currentOption.label}`}
        title={`Change Language / Đổi ngôn ngữ (Current: ${currentOption.label})`}
      >
        <span className="hh-lang-trigger-flag" aria-hidden="true">
          {currentOption.flag}
        </span>
        <span className="hh-lang-trigger-code">{currentOption.short}</span>
        <svg
          className={`hh-lang-trigger-chevron ${isOpen ? 'is-rotated' : ''}`}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div
          className="hh-lang-dropdown-menu"
          role="listbox"
          aria-label="Select Language"
        >
          <div className="hh-lang-dropdown-header">
            <span className="hh-lang-dropdown-eyebrow">
              {lang === 'vi' ? 'Chọn ngôn ngữ' : lang === 'zh' ? '选择语言' : 'Select Language'}
            </span>
          </div>

          <div className="hh-lang-dropdown-list">
            {LANGUAGES.map((item) => {
              const isSelected = item.code === lang;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`hh-lang-menu-item ${isSelected ? 'is-active' : ''}`}
                  onClick={() => handleSelect(item.code)}
                >
                  <div className="hh-lang-item-left">
                    <span className="hh-lang-item-flag" aria-hidden="true">
                      {item.flag}
                    </span>
                    <div className="hh-lang-item-text">
                      <span className="hh-lang-item-name">{item.label}</span>
                      <span className="hh-lang-item-sub">{item.sub}</span>
                    </div>
                  </div>

                  <div className="hh-lang-item-right">
                    <span className="hh-lang-item-badge">{item.short}</span>
                    {isSelected && (
                      <svg
                        className="hh-lang-item-check"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
