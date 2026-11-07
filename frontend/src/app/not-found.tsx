'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export default function NotFound() {
  const { lang } = useLanguage();

  return (
    <main id="main-content" className="error-page">
      <p className="eyebrow">
        {lang === 'vi'
          ? '404 / KHÔNG TÌM THẤY TRANG'
          : lang === 'zh'
          ? '404 / 未找到该页面'
          : '404 / PAGE NOT FOUND'}
      </p>
      <h1>
        {lang === 'vi'
          ? 'Trang này không tồn tại hoặc đã được gỡ bỏ.'
          : lang === 'zh'
          ? '该页面不存在或已下线。'
          : 'Nothing to see here.'}
      </h1>
      <p>
        {lang === 'vi'
          ? 'Liên kết bạn truy cập có thể đã thay đổi hoặc nội dung không còn công khai.'
          : lang === 'zh'
          ? '您访问的链接可能已更改，或者该内容已不再公开展示。'
          : 'This page may have moved or hasn’t been published yet.'}
      </p>
      <Link className="button button-dark" href="/">
        <span className="hh-lang-text">
          {lang === 'vi' ? 'Về trang chủ' : lang === 'zh' ? '返回首页' : 'Back to home'}
        </span>
        <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
