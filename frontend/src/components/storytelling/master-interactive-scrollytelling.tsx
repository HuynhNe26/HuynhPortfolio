'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project, ProjectChapter } from '@/lib/types';
import { useLanguage } from '@/context/language-context';

interface MasterInteractiveScrollytellingProps {
  project: Project;
  chapters: ProjectChapter[];
}

interface ChapterVisualMeta {
  imageUrl: string;
  imageCaption: string;
  imageAlt: string;
  hotspot: {
    x: number; // percentage from left
    y: number; // percentage from top
    label: string;
    action: string;
    description: string;
  };
  cursor: {
    x: number;
    y: number;
    actionText: string;
  };
  suggestedTab: string;
  actionCue: string;
}

// Project specific configurations
const PROJECT_VISUAL_MAP: Record<string, ChapterVisualMeta[]> = {
  'ticket-concert-agentic-rag': [
    {
      imageUrl: '/projects/ticket-concert-hero.png',
      imageCaption: 'Cổng Khám phá Sự kiện & Lịch diễn Live Concert',
      imageAlt: 'Ticket Concert Discovery Interface',
      hotspot: {
        x: 50,
        y: 35,
        label: 'Live Concert Discovery & Timetable',
        action: 'Lọc sự kiện & xem thông tin concert thời gian thực',
        description: 'Bố cục phân tầng trực quan, hiển thị lịch diễn, giá vé niêm yết và trạng thái còn vé cập nhật tự động.',
      },
      cursor: {
        x: 52,
        y: 38,
        actionText: 'Click xem chi tiết Concert 2026',
      },
      suggestedTab: 'seats',
      actionCue: 'Khám phá danh sách concert và chọn suất diễn mong muốn',
    },
    {
      imageUrl: '/projects/ticket-concert-full.png',
      imageCaption: 'Trợ lý AI Agentic RAG tích hợp LangChain.js & Gemini API',
      imageAlt: 'LangChain Gemini Agentic RAG Assistant',
      hotspot: {
        x: 78,
        y: 62,
        label: 'Agentic RAG Intelligent Chat Drawer',
        action: 'Tư vấn chỗ ngồi, giải đáp quy định sự kiện không hallucination',
        description: 'AI truy xuất dữ liệu từ Vector Database và sơ đồ chỗ ngồi thực tế để tư vấn chính xác trong 340ms.',
      },
      cursor: {
        x: 76,
        y: 60,
        actionText: "Hỏi: 'Khu vực VIP còn vé không?'",
      },
      suggestedTab: 'rag',
      actionCue: 'Mở trợ lý AI để hỏi đáp tức thời về thông tin sự kiện & ghế ngồi',
    },
    {
      imageUrl: '/projects/ticket-concert-booking.png',
      imageCaption: 'Bản đồ Giữ ghế Thời gian thực & WebSocket Anti-Collision',
      imageAlt: 'WebSocket Anti-Collision Seat Map',
      hotspot: {
        x: 36,
        y: 44,
        label: 'Atomic Seat Locking Engine (Redis TTL 600s)',
        action: 'Khóa ghế tức thời, ngăn chặn 2 người đặt trùng ghế cùng lúc',
        description: 'Khi người dùng click chọn ghế, WebSocket phát broadcast ngay tới toàn bộ khách truy cập khác.',
      },
      cursor: {
        x: 38,
        y: 46,
        actionText: 'Click giữ ghế VIP-D04',
      },
      suggestedTab: 'seats',
      actionCue: 'Khóa ghế tức thời với bộ đếm ngược 10:00 và đồng bộ WebSocket',
    },
    {
      imageUrl: '/projects/ticket-concert-booking.png',
      imageCaption: 'Ma trận Hạng vé & Tự động Tính toán Giỏ hàng',
      imageAlt: 'Ticket Pricing Matrix & Dynamic Cart',
      hotspot: {
        x: 65,
        y: 52,
        label: 'Dynamic Seating Matrix & Cart Preview',
        action: 'Tính toán phụ phí, áp mã ưu đãi và cập nhật tổng tiền',
        description: 'Hiển thị các khu vực VIP, Regular, Standing với màu sắc phân biệt rõ ràng và bộ lọc hạng vé.',
      },
      cursor: {
        x: 63,
        y: 50,
        actionText: 'Chọn 2 vé hạng VIP Hàng D',
      },
      suggestedTab: 'seats',
      actionCue: 'Thêm ghế vào giỏ và xem tổng tiền theo thời gian thực',
    },
    {
      imageUrl: '/projects/ticket-concert-booking.png',
      imageCaption: 'Cổng Thanh toán MoMo API với HMAC SHA-256 Signature',
      imageAlt: 'MoMo API QR Code Checkout Modal',
      hotspot: {
        x: 50,
        y: 54,
        label: 'MoMo Payment Gateway & IPN Webhook',
        action: 'Quét mã MoMo QR và đối soát giao dịch bảo mật ACID',
        description: 'Xác thực chữ ký số HMAC SHA-256 từ MoMo, cập nhật trạng thái đơn hàng trên PostgreSQL trong 250ms.',
      },
      cursor: {
        x: 52,
        y: 56,
        actionText: 'Tạo mã QR thanh toán 1,850,000đ',
      },
      suggestedTab: 'payment',
      actionCue: 'Tạo mã QR MoMo và xác nhận giao dịch qua IPN Webhook',
    },
    {
      imageUrl: '/projects/ticket-concert-full.png',
      imageCaption: 'Kiến trúc API Full-Stack & WebSocket Bi-directional Event Layer',
      imageAlt: 'Full-Stack Architecture & Event Routing',
      hotspot: {
        x: 44,
        y: 32,
        label: 'Full-Stack API & Real-Time Socket Architecture',
        action: 'Xây dựng WebSocket socket.io server & database pooling Neon',
        description: 'Đảm bảo độ trễ tin nhắn dưới 50ms cho các sự kiện phòng vé lưu lượng cao.',
      },
      cursor: {
        x: 46,
        y: 34,
        actionText: 'Kiểm thử WebSocket Event SEAT_LOCKED',
      },
      suggestedTab: 'seats',
      actionCue: 'Vận hành luồng xử lý đồng thời và đảm bảo độ trễ dưới 50ms',
    },
    {
      imageUrl: '/projects/ticket-concert-home.png',
      imageCaption: 'Vé Điện tử QR Gửi Tức thì qua Resend API & Production Deploy',
      imageAlt: 'Production E-Ticket Dispatch via Resend API',
      hotspot: {
        x: 50,
        y: 38,
        label: 'Live Production at ticketconcert.online',
        action: 'Gửi vé điện tử QR về email trong 420ms sau khi thanh toán',
        description: 'Tự động xuất vé PDF kèm mã QR bảo mật, cho phép quét kiểm soát vào cổng tại sự kiện.',
      },
      cursor: {
        x: 50,
        y: 40,
        actionText: 'Mở vé điện tử đã phát hành',
      },
      suggestedTab: 'payment',
      actionCue: 'Nhận vé điện tử QR qua email và kiểm tra tình trạng đơn hàng',
    },
  ],
  'fashion-nail-morley': [
    {
      imageUrl: '/projects/fashion-nail-hero.jpg',
      imageCaption: 'Mặt tiền Số Cao cấp Gam màu Champagne Rose',
      imageAlt: 'Fashion Nail Morley Storefront Visual Direction',
      hotspot: {
        x: 50,
        y: 34,
        label: 'Luxury Salon Digital Front Door',
        action: 'Trải nghiệm nhận diện thương hiệu ấm cúng và sang trọng',
        description: 'Thiết kế chuẩn thẩm mỹ salon Úc tại Morley, Tây Úc với phong cách typography sắc sảo.',
      },
      cursor: {
        x: 50,
        y: 37,
        actionText: 'Khám phá không gian salon & dịch vụ',
      },
      suggestedTab: 'services',
      actionCue: 'Khám phá phong cách sang trọng và định vị thương hiệu salon',
    },
    {
      imageUrl: '/projects/fashion-nail-hero.jpg',
      imageCaption: 'Visual Lookbook Bộ sưu tập Mẫu móng Nghệ thuật',
      imageAlt: 'Curated Studio Nail Art Lookbook',
      hotspot: {
        x: 46,
        y: 48,
        label: 'Curated Studio Lookbook Showcase',
        action: 'Showcase bộ sưu tập móng theo mùa với ảnh chuẩn retina',
        description: 'Ảnh chụp thực tế tại salon, giúp khách hàng chọn kiểu dáng trước khi đặt lịch hẹn.',
      },
      cursor: {
        x: 48,
        y: 50,
        actionText: 'Xem mẫu Acrylic & Nail Art mới nhất',
      },
      suggestedTab: 'services',
      actionCue: 'Chiêm ngưỡng bộ sưu tập mẫu nail studio độc quyền',
    },
    {
      imageUrl: '/projects/fashion-nail-services.jpg',
      imageCaption: 'Thẻ Giá Dịch vụ Chuẩn AUD Tối ưu Thiết bị Di động',
      imageAlt: 'Mobile-First Treatment Pricing Cards',
      hotspot: {
        x: 32,
        y: 42,
        label: 'Mobile-First Treatment & AUD Pricing Cards',
        action: 'Bảng giá minh bạch từng dịch vụ: Acrylic, Shellac, Spa Pedicure',
        description: 'Khách hàng truy cập từ Instagram hoặc Google Maps có thể xem giá rõ ràng chỉ sau 1 chạm.',
      },
      cursor: {
        x: 35,
        y: 44,
        actionText: 'Chọn dịch vụ Acrylic Full Set ($65)',
      },
      suggestedTab: 'services',
      actionCue: 'Chọn dịch vụ trong menu giá minh bạch bằng AUD',
    },
    {
      imageUrl: '/projects/fashion-nail-services.jpg',
      imageCaption: 'Khung Đặt Lịch Hẹn Nhanh 1 Chạm (One-Tap Booking)',
      imageAlt: 'One-Tap Appointment Request Form',
      hotspot: {
        x: 68,
        y: 46,
        label: 'One-Tap Appointment Request Modal',
        action: 'Chọn thợ nail yêu thích, ngày giờ và số điện thoại liên lạc',
        description: 'Tối ưu biểu mẫu không cần đăng ký tài khoản rườm rà, tăng tỉ lệ chuyển đổi đặt lịch lên 40%.',
      },
      cursor: {
        x: 66,
        y: 48,
        actionText: 'Chọn giờ 14:30 & thợ Sarah',
      },
      suggestedTab: 'booking',
      actionCue: 'Điền thông tin và gửi yêu cầu đặt lịch hẹn nhanh',
    },
    {
      imageUrl: '/projects/fashion-nail-services.jpg',
      imageCaption: 'Thông báo Lịch hẹn Tức thì qua Resend API',
      imageAlt: 'Automated Resend API Notification Handler',
      hotspot: {
        x: 50,
        y: 60,
        label: 'Node.js & Resend API Notification Stream',
        action: 'Gửi email xác nhận tức thời cho khách và chủ tiệm',
        description: 'Yêu cầu được lưu vào PostgreSQL Neon và kích hoạt email HTML gửi đến hộp thư salon trong 350ms.',
      },
      cursor: {
        x: 52,
        y: 62,
        actionText: 'Kích hoạt gửi email thông báo',
      },
      suggestedTab: 'booking',
      actionCue: 'Xem luồng gửi email tự động xác nhận lịch hẹn',
    },
    {
      imageUrl: '/projects/fashion-nail-hero.jpg',
      imageCaption: 'Tích hợp Google Maps & Local SEO Tây Úc',
      imageAlt: 'Google Maps Directions & Local SEO',
      hotspot: {
        x: 38,
        y: 66,
        label: 'Google Maps Embed & 1-Tap Call Action',
        action: 'Chỉ đường 1 chạm và gọi điện thoại trực tiếp từ điện thoại',
        description: 'Tối ưu hóa tìm kiếm địa phương tại khu vực Morley, Tây Úc giúp salon đón thêm khách vãng lai.',
      },
      cursor: {
        x: 38,
        y: 68,
        actionText: 'Chỉ đường tới tiệm trên Google Maps',
      },
      suggestedTab: 'location',
      actionCue: 'Kiểm tra chỉ đường thực tế và tính năng gọi điện thoại 1 chạm',
    },
    {
      imageUrl: '/projects/fashion-nail-hero.jpg',
      imageCaption: 'Vận hành Thực tế tại fashionnailmorley.com.au',
      imageAlt: 'Live Commercial Deployment at fashionnailmorley.com.au',
      hotspot: {
        x: 50,
        y: 28,
        label: 'Live Site at fashionnailmorley.com.au',
        action: 'Trang web phục vụ khách hàng Úc với tốc độ tải dưới 1 giây',
        description: 'Ứng dụng React & Vite siêu nhẹ, mang lại doanh thu và sự hài lòng cao cho chủ tiệm.',
      },
      cursor: {
        x: 50,
        y: 31,
        actionText: 'Trải nghiệm trang web đang vận hành',
      },
      suggestedTab: 'services',
      actionCue: 'Truy cập website thực tế đang vận hành',
    },
  ],
  'examplatform-ai': [
    {
      imageUrl: '/projects/exam-platform-hero.png',
      imageCaption: 'Phòng thi Trực tuyến Không Xao nhãng (Distraction-Free)',
      imageAlt: 'Distraction-Free Assessment Exam Room',
      hotspot: {
        x: 50,
        y: 34,
        label: 'Distraction-Free Exam Assessment Room',
        action: 'Không gian làm bài chuẩn mực với đồng hồ đếm ngược và bảng câu hỏi',
        description: 'Loại bỏ các thành phần gây nhiễu, giúp sinh viên tập trung tối đa trong suốt thời gian làm bài.',
      },
      cursor: {
        x: 52,
        y: 36,
        actionText: 'Bắt đầu làm bài thi trắc nghiệm',
      },
      suggestedTab: 'exam',
      actionCue: 'Bắt đầu phiên thi với giao diện làm bài tập trung',
    },
    {
      imageUrl: '/projects/exam-platform-hero.png',
      imageCaption: 'Cơ chế Thích ứng Độ khó Câu hỏi (Adaptive Difficulty)',
      imageAlt: 'Adaptive Question Difficulty Progression',
      hotspot: {
        x: 28,
        y: 54,
        label: 'Adaptive Difficulty Progression Engine',
        action: 'Tự động điều chỉnh độ khó câu hỏi tiếp theo theo năng lực',
        description: 'Thuật toán đánh giá độ chính xác của câu trả lời trước để đưa ra câu hỏi phân hóa phù hợp.',
      },
      cursor: {
        x: 30,
        y: 56,
        actionText: 'Chọn đáp án câu hỏi độ khó cao',
      },
      suggestedTab: 'exam',
      actionCue: 'Trải nghiệm câu hỏi tự động điều chỉnh độ khó theo năng lực',
    },
    {
      imageUrl: '/projects/exam-platform-overview.png',
      imageCaption: 'Giám sát Tab Blur & Chống Gian lận (Anti-Cheat Telemetry)',
      imageAlt: 'Anti-Cheat Tab Monitoring & Integrity Telemetry',
      hotspot: {
        x: 75,
        y: 30,
        label: 'Anti-Cheat Tab Blur & Integrity Lock',
        action: 'Phát hiện thí sinh rời khỏi tab thi hoặc chuyển sang cửa sổ khác',
        description: 'Phiên thi sử dụng mã hóa JWT và ghi nhận số lần mất focus để đảm bảo tính công bằng học thuật.',
      },
      cursor: {
        x: 73,
        y: 32,
        actionText: 'Mô phỏng sự kiện mất focus tab',
      },
      suggestedTab: 'anticheat',
      actionCue: 'Thử kiểm tra cơ chế cảnh báo khi thí sinh chuyển tab',
    },
    {
      imageUrl: '/projects/exam-platform-hero.png',
      imageCaption: 'Đồng hồ Đếm ngược & Tự động Lưu vào Redis Cache (Autosave)',
      imageAlt: 'Live Countdown Timer & Redis Autosave Engine',
      hotspot: {
        x: 80,
        y: 25,
        label: 'Sub-Second Autosave to Redis Cache (6ms)',
        action: 'Lưu đáp án ngay khi click với độ trễ chỉ 6ms',
        description: 'Dữ liệu lưu tạm trên Redis in-memory cache, ngăn ngừa tuyệt đối nguy cơ mất bài thi do rớt mạng.',
      },
      cursor: {
        x: 78,
        y: 28,
        actionText: 'Lưu đáp án câu 03 vào Redis',
      },
      suggestedTab: 'exam',
      actionCue: 'Click chọn đáp án và thấy hệ thống tự động lưu vào Redis',
    },
    {
      imageUrl: '/projects/exam-platform-overview.png',
      imageCaption: 'Báo cáo Phân tích AI Rubric theo từng Khái niệm Kiến thức',
      imageAlt: 'AI Evaluation Rubric & Conceptual Mastery',
      hotspot: {
        x: 45,
        y: 55,
        label: 'AI Evaluation Rubrics & Conceptual Breakdown',
        action: 'Chấm điểm chi tiết và gợi ý lộ trình cải thiện cho từng sinh viên',
        description: 'Báo cáo phân tích chuẩn xác điểm mạnh, điểm yếu theo từng chủ đề kiến thức kỹ thuật phần mềm.',
      },
      cursor: {
        x: 47,
        y: 57,
        actionText: 'Xem phân tích gợi ý ôn tập từ AI',
      },
      suggestedTab: 'rubric',
      actionCue: 'Xem phân tích điểm mạnh yếu và đánh giá từ AI',
    },
    {
      imageUrl: '/projects/exam-platform-hero.png',
      imageCaption: 'Kiến trúc State Management & Redis Caching',
      imageAlt: 'Decoupled React-Node-Redis Architecture',
      hotspot: {
        x: 32,
        y: 38,
        label: 'Decoupled Architecture & Connection Pooling',
        action: 'Xây dựng REST API, quản lý phiên thi và đồng bộ PostgreSQL',
        description: 'Tách biệt giữa phiên làm bài tốc độ cao và lưu trữ điểm lâu dài, chịu tải tốt khi thi tập trung.',
      },
      cursor: {
        x: 34,
        y: 40,
        actionText: 'Kiểm tra độ trễ Redis cache sync',
      },
      suggestedTab: 'exam',
      actionCue: 'Xem kiến trúc đồng bộ dữ liệu tốc độ cao',
    },
    {
      imageUrl: '/projects/exam-platform-overview.png',
      imageCaption: 'Vận hành tại exam-platform.online & Mở rộng Tự luận',
      imageAlt: 'Production at exam-platform.online',
      hotspot: {
        x: 50,
        y: 42,
        label: 'Live Platform at exam-platform.online',
        action: 'Phục vụ hàng trăm lượt thi thử trực tuyến ổn định',
        description: 'Nền tảng liên tục được mở rộng với tính năng chấm điểm tự luận tự động bằng AI.',
      },
      cursor: {
        x: 50,
        y: 44,
        actionText: 'Xem tổng quan kết quả thi',
      },
      suggestedTab: 'rubric',
      actionCue: 'Khám phá tiềm năng mở rộng của nền tảng EdTech',
    },
  ],
  'vk-digital-hub': [
    {
      imageUrl: '/projects/vk-digital-hero.png',
      imageCaption: 'Mặt tiền Số Agency Tiếp thị Tăng trưởng Gam màu Emerald Green',
      imageAlt: 'VK Digital Hub Front Door & Client Showcase',
      hotspot: {
        x: 50,
        y: 34,
        label: 'Digital Growth Agency Front Door',
        action: 'Showcase năng lực tiếp thị số và chỉ số ROI khách hàng',
        description: 'Bố cục chuẩn agency quốc tế, tập trung vào giá trị chuyển đổi và uy tín thương hiệu.',
      },
      cursor: {
        x: 52,
        y: 36,
        actionText: 'Xem các giải pháp tiếp thị số',
      },
      suggestedTab: 'roi',
      actionCue: 'Khám phá năng lực giải pháp tăng trưởng của agency',
    },
    {
      imageUrl: '/projects/vk-digital-hero.png',
      imageCaption: 'Bằng chứng Số liệu & Chỉ số ROI Khách hàng',
      imageAlt: 'Client ROI Proof & Social Metrics',
      hotspot: {
        x: 40,
        y: 54,
        label: 'Client ROI & Performance Metrics Proof',
        action: 'Minh họa tỉ lệ chuyển đổi và tăng trưởng doanh thu thực tế',
        description: 'Báo cáo trực quan các chỉ số ROAS, tỉ lệ lead và chi phí trên mỗi khách hàng tiềm năng.',
      },
      cursor: {
        x: 42,
        y: 56,
        actionText: 'Xem báo cáo tăng trưởng khách hàng',
      },
      suggestedTab: 'roi',
      actionCue: 'Tính toán ước tính ROI dựa trên ngân sách tiếp thị',
    },
    {
      imageUrl: '/projects/vk-digital-services.png',
      imageCaption: 'Webhook Make.com Zero-Latency Lead Ingestion',
      imageAlt: 'Make.com Webhook Lead Automation Engine',
      hotspot: {
        x: 60,
        y: 40,
        label: 'Make.com Zero-Latency Webhook Ingestion',
        action: 'Đẩy dữ liệu khách tiềm năng tức thì vào CRM và Slack',
        description: 'Khách hàng gửi form trên website -> Webhook kích hoạt kịch bản Make -> Bắn notification về Slack trong 180ms.',
      },
      cursor: {
        x: 58,
        y: 42,
        actionText: 'Bắn webhook lead sang Make.com',
      },
      suggestedTab: 'webhook',
      actionCue: 'Trải nghiệm luồng đẩy lead tức thì qua Webhook Make.com',
    },
    {
      imageUrl: '/projects/vk-digital-services.png',
      imageCaption: 'Ma trận So sánh Gói dịch vụ Tăng trưởng (Service Matrix)',
      imageAlt: 'Interactive Growth Service Matrix',
      hotspot: {
        x: 30,
        y: 50,
        label: 'Interactive Growth Service Tier Matrix',
        action: 'Phân tầng rõ ràng giữa SEO, Google Ads và Xây dựng thương hiệu',
        description: 'Bảng giá và quyền lợi minh bạch, giúp khách hàng doanh nghiệp dễ dàng ra quyết định.',
      },
      cursor: {
        x: 32,
        y: 52,
        actionText: 'Chọn gói giải pháp Growth Partner',
      },
      suggestedTab: 'services',
      actionCue: 'So sánh chi tiết quyền lợi giữa các gói dịch vụ',
    },
    {
      imageUrl: '/projects/vk-digital-services.png',
      imageCaption: 'Tự động Gửi Email Chào mừng & Đồng bộ Slack Team',
      imageAlt: 'Automated Prospect Follow-Up & Slack Sync',
      hotspot: {
        x: 75,
        y: 60,
        label: 'Instant Lead Notification to Slack & Email',
        action: 'Đồng bộ đa nền tảng không có độ trễ',
        description: 'Đội ngũ tư vấn nhận được thông báo ngay lập tức trên điện thoại để liên hệ lại khách trong vòng 5 phút.',
      },
      cursor: {
        x: 73,
        y: 62,
        actionText: 'Gửi thông báo lead mới vào kênh Slack',
      },
      suggestedTab: 'webhook',
      actionCue: 'Xem thông báo lead mới được đồng bộ vào Slack team',
    },
    {
      imageUrl: '/projects/vk-digital-hero.png',
      imageCaption: 'Lập trình Giao diện React & Tích hợp Webhook',
      imageAlt: 'Front-End Engineering & Webhook Setup',
      hotspot: {
        x: 50,
        y: 64,
        label: 'Responsive UI Architecture & Form Validation',
        action: 'Xây dựng form xác thực dữ liệu và kết nối webhook endpoint',
        description: 'Xử lý phản hồi trạng thái gửi thành công, giao diện nhẹ nhàng tải nhanh trên mạng di động.',
      },
      cursor: {
        x: 50,
        y: 66,
        actionText: 'Kiểm thử validation form tư vấn',
      },
      suggestedTab: 'roi',
      actionCue: 'Kiểm tra trải nghiệm điền thông tin và xác thực dữ liệu',
    },
    {
      imageUrl: '/projects/vk-digital-hero.png',
      imageCaption: 'Triển khai Thực tế tại vkdigitalhub.netlify.app',
      imageAlt: 'Live Deployment at vkdigitalhub.netlify.app',
      hotspot: {
        x: 50,
        y: 26,
        label: 'Live Platform at vkdigitalhub.netlify.app',
        action: 'Vận hành ổn định 100% không tốn chi phí máy chủ backend',
        description: 'Mô hình Serverless kết hợp No-code Automation mang lại hiệu quả vượt trội cho khách hàng.',
      },
      cursor: {
        x: 50,
        y: 29,
        actionText: 'Mở website agency thực tế',
      },
      suggestedTab: 'webhook',
      actionCue: 'Khám phá website thực tế đang hoạt động',
    },
  ],
  'nh-huynh-portfolio': [
    {
      imageUrl: '/projects/portfolio-hero.png',
      imageCaption: 'Giao diện Trang chủ & Hero Section Chân dung 3D Light Theme',
      imageAlt: 'Nguyễn Hoàng Huynh Portfolio Hero View',
      hotspot: {
        x: 26,
        y: 34,
        label: 'Tiêu đề Tên Phát quang & Light Theme Header',
        action: 'Hiệu ứng ánh sáng chuyển màu động trên tên Nguyễn Hoàng Huynh',
        description: 'Bố cục Light Theme tinh tế (#F8FAFC, #FFFFFF), viền thanh thoát và điểm nhấn typography sắc sảo.',
      },
      cursor: {
        x: 28,
        y: 37,
        actionText: 'Chiêm ngưỡng hiệu ứng phát sáng tiêu đề',
      },
      suggestedTab: 'tilt',
      actionCue: 'Khám phá ngôn ngữ thiết kế Light Theme và chân dung 3D',
    },
    {
      imageUrl: '/projects/portfolio-projects.png',
      imageCaption: 'Bộ sưu tập Dự án Nổi bật với Hiệu ứng 3D Tilt & Hào quang Động',
      imageAlt: 'Featured Projects 3D Tilt Cards',
      hotspot: {
        x: 32,
        y: 54,
        label: 'Thẻ Dự án 3D Tilt & Backlight Glow theo Chuột',
        action: 'Tính toán góc xoay 3D và di chuyển vầng hào quang theo tọa độ con trỏ',
        description: 'Góc nghiêng được kiểm soát vừa phải, tự nhiên, hiển thị vai trò và thời gian làm dự án theo tháng/năm.',
      },
      cursor: {
        x: 34,
        y: 56,
        actionText: 'Rê chuột kiểm tra góc nghiêng 3D của Card',
      },
      suggestedTab: 'tilt',
      actionCue: 'Rê chuột tương tác với hiệu ứng 3D tilt và hào quang',
    },
    {
      imageUrl: '/projects/portfolio-scrollytelling.png',
      imageCaption: 'Động cơ Scrollytelling Đồng bộ Chia đôi Màn hình',
      imageAlt: 'Interactive Scrollytelling Stage',
      hotspot: {
        x: 70,
        y: 38,
        label: 'Sân khấu Trực quan Ghim Cố định (Sticky Stage)',
        action: 'Giữ cố định thiết bị bên phải khi người xem cuộn qua các chương câu chuyện',
        description: 'Tối ưu hóa IntersectionObserver để chuyển đổi trạng thái mượt mà không giật khung hình.',
      },
      cursor: {
        x: 68,
        y: 40,
        actionText: 'Ghim cố định thiết bị hiển thị khi cuộn',
      },
      suggestedTab: 'tilt',
      actionCue: 'Trải nghiệm bố cục chia đôi màn hình chuẩn mực',
    },
    {
      imageUrl: '/projects/portfolio-scrollytelling.png',
      imageCaption: 'Điểm nhấn Radar Hotspot & Con trỏ Thao tác Mô phỏng',
      imageAlt: 'Radar Hotspot Pin & Cursor',
      hotspot: {
        x: 50,
        y: 48,
        label: 'Điểm Radar Hotspot Xung nhịp & Thẻ Hành động',
        action: 'Định vị chính xác thành phần UI đang được đề cập trong nội dung',
        description: 'Hiển thị giải thích chi tiết khi hover và con trỏ chuột mô phỏng thao tác người dùng.',
      },
      cursor: {
        x: 52,
        y: 50,
        actionText: 'Chỉ rõ vị trí nút bấm & hành động',
      },
      suggestedTab: 'lang',
      actionCue: 'Quan sát điểm radar phát sóng định vị thành phần UI',
    },
    {
      imageUrl: '/projects/portfolio-scrollytelling.png',
      imageCaption: 'Bộ Giả lập Hành động Trực tiếp (Live Action Simulator)',
      imageAlt: 'Live Action Simulators Preview',
      hotspot: {
        x: 50,
        y: 78,
        label: 'Khung Thử nghiệm Tương tác Trực tiếp (Interactive Sandbox)',
        action: 'Cho phép người xem trực tiếp bấm thử các tính năng thực tế của website',
        description: 'Thử chọn ghế WebSocket, hỏi AI RAG, quét MoMo QR, tính ROI và nộp bài thi autosave.',
      },
      cursor: {
        x: 50,
        y: 80,
        actionText: 'Bấm thử các tab tương tác mô phỏng',
      },
      suggestedTab: 'tilt',
      actionCue: 'Trực tiếp bấm và thao tác trên bộ giả lập tính năng',
    },
    {
      imageUrl: '/projects/portfolio-admin.png',
      imageCaption: 'Cổng Đăng nhập Quản trị Nội dung CMS Bảo mật Session HttpOnly',
      imageAlt: 'CMS Administration Portal',
      hotspot: {
        x: 50,
        y: 50,
        label: 'Cổng Xác thực Admin & CRUD API Layer',
        action: 'Bảo mật tài khoản với scrypt password hash và HttpOnly session cookie',
        description: 'Cho phép quản trị viên thêm/sửa/xóa dự án, điều chỉnh nội dung các chương và xem tin nhắn.',
      },
      cursor: {
        x: 50,
        y: 54,
        actionText: 'Đăng nhập vào bảng điều khiển quản trị CMS',
      },
      suggestedTab: 'cms',
      actionCue: 'Khám phá kiến trúc bảo mật và cổng quản trị CMS',
    },
    {
      imageUrl: '/projects/portfolio-about.png',
      imageCaption: 'Hồ sơ Năng lực Kỹ thuật & Bảng Kỹ năng Phân tầng',
      imageAlt: 'About Technical Profile',
      hotspot: {
        x: 45,
        y: 40,
        label: 'Hồ sơ Xác thực & Ma trận Kỹ năng Chuyên sâu',
        action: 'Minh bạch năng lực, thông tin học vấn GPA 3.1 và chứng chỉ TOEIC 550',
        description: 'Trình độ sẵn sàng cho các vị trí Full-Stack Developer Intern, Fresher & Junior.',
      },
      cursor: {
        x: 45,
        y: 42,
        actionText: 'Xem chứng chỉ và kỹ năng chuyên môn',
      },
      suggestedTab: 'lang',
      actionCue: 'Xem tổng quan năng lực kỹ thuật và thông tin liên hệ',
    },
  ],
};

export function MasterInteractiveScrollytelling({
  project,
  chapters,
}: MasterInteractiveScrollytellingProps) {
  const { t, lang } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<string>('seats');
  const [isHoveringHotspot, setIsHoveringHotspot] = useState(false);
  const isClickNavigatingRef = useRef(false);

  // SIMULATOR STATES:
  // 1. Ticket Concert States
  const [selectedSeat, setSelectedSeat] = useState<string>('VIP-D04');
  const [seatCountdown, setSeatCountdown] = useState<number>(598); // 09:58
  const [isAiAnswering, setIsAiAnswering] = useState<boolean>(false);
  const [aiChatOutput, setAiChatOutput] = useState<string>(
    'Khu vực VIP hiện còn 14 ghế (hàng D & E). Bạn có thể giữ ghế tối đa 10 phút. Hỗ trợ hoàn tiền 80% trước 7 ngày.'
  );
  const [momoPaid, setMomoPaid] = useState<boolean>(false);

  // 2. Fashion Nail States
  const [selectedServices, setSelectedServices] = useState<string[]>(['acrylic', 'pedicure']);
  const [selectedTechnician, setSelectedTechnician] = useState<string>('Sarah');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // 3. ExamPlatform AI States
  const [examSeconds, setExamSeconds] = useState<number>(2698); // 44:58
  const [selectedAnswer, setSelectedAnswer] = useState<string>('B');
  const [autosaveNotice, setAutosaveNotice] = useState<string>('✓ Đã lưu tự động vào Redis Cache (độ trễ 6ms)');
  const [antiCheatAlert, setAntiCheatAlert] = useState<boolean>(false);

  // 4. VK Digital States
  const [marketingBudget, setMarketingBudget] = useState<number>(2500);
  const [webhookTriggered, setWebhookTriggered] = useState<boolean>(false);

  // 5. NH Huynh Portfolio States
  const [portfolioSimLang, setPortfolioSimLang] = useState<'vi' | 'en'>('vi');
  const [portfolioTiltX, setPortfolioTiltX] = useState<number>(6);
  const [portfolioTiltY, setPortfolioTiltY] = useState<number>(-8);
  const [portfolioAuraColor, setPortfolioAuraColor] = useState<string>('#2563EB');
  const [cmsVerified, setCmsVerified] = useState<boolean>(false);

  // Build or fallback visual list for chapters
  const visualMetaList = useMemo(() => {
    const projectList = PROJECT_VISUAL_MAP[project.slug];
    if (projectList && projectList.length > 0) {
      return projectList;
    }

    // Dynamic fallback for any other project
    const defaultImg = project.gallery?.[0]?.url || project.coverUrl || '/projects/portfolio-preview.jpg';
    return chapters.map((ch, idx) => ({
      imageUrl: ch.screenshots?.[0]?.url || project.gallery?.[idx % (project.gallery?.length || 1)]?.url || defaultImg,
      imageCaption: ch.screenshots?.[0]?.caption || `${project.title} — ${ch.title}`,
      imageAlt: ch.screenshots?.[0]?.alt || ch.title,
      hotspot: {
        x: 50,
        y: 40 + (idx % 3) * 10,
        label: `Thành phần cốt lõi: ${ch.title}`,
        action: `Thực hiện thao tác tương ứng tại ${ch.title}`,
        description: ch.content.slice(0, 110) + '...',
      },
      cursor: {
        x: 52,
        y: 42 + (idx % 3) * 10,
        actionText: `Đang tương tác với ${ch.title.split('&')[0].trim()}`,
      },
      suggestedTab: 'seats',
      actionCue: `Khám phá chi tiết tại ${ch.title}`,
    }));
  }, [project, chapters]);

  const currentVisual = visualMetaList[activeIdx] || visualMetaList[0];

  // Set default tab based on project & chapter
  useEffect(() => {
    if (currentVisual?.suggestedTab) {
      setActiveTab(currentVisual.suggestedTab);
    }
  }, [activeIdx, currentVisual]);

  // Seat countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSeatCountdown((prev) => (prev > 1 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Exam countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setExamSeconds((prev) => (prev > 1 ? prev - 1 : 2700));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // IntersectionObserver for left chapter scroll detection
  useEffect(() => {
    const chapterEls = document.querySelectorAll<HTMLElement>('.scrolly-chapter-card');
    if (!chapterEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickNavigatingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-chapter-index'));
            if (!isNaN(idx)) {
              setActiveIdx(idx);
            }
          }
        });
      },
      { rootMargin: '-25% 0px -40% 0px', threshold: 0.2 }
    );

    chapterEls.forEach((el) => observer.observe(el));
    return () => chapterEls.forEach((el) => observer.unobserve(el));
  }, [chapters]);

  // Scroll to chapter on click
  const handleJumpToChapter = (idx: number, id: string) => {
    isClickNavigatingRef.current = true;
    setActiveIdx(idx);
    const target = document.getElementById(id);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setTimeout(() => {
      isClickNavigatingRef.current = false;
    }, 800);
  };

  // Trigger simulated AI prompt
  const handleAskAiPrompt = (prompt: string) => {
    setIsAiAnswering(true);
    setAiChatOutput('Đang truy xuất Vector Database & sơ đồ sự kiện...');
    setTimeout(() => {
      if (prompt.includes('VIP') || prompt.includes('ghế')) {
        setAiChatOutput(
          'Khu vực VIP hiện còn 14 ghế (hàng D & E). Bạn có thể giữ ghế tối đa 10 phút. Hỗ trợ hoàn tiền 80% trước 7 ngày.'
        );
      } else if (prompt.includes('hoàn') || prompt.includes('hủy')) {
        setAiChatOutput(
          'Chính sách vé điện tử: Hoàn 100% nếu hủy trước 14 ngày, hoàn 80% nếu hủy trước 7 ngày qua cổng MoMo tự động.'
        );
      } else {
        setAiChatOutput(
          'Sự kiện diễn ra tại Trung tâm Hội nghị Quốc gia. Cổng check-in QR mở trước giờ diễn 90 phút. Có khu vực giữ đồ riêng.'
        );
      }
      setIsAiAnswering(false);
    }, 600);
  };

  return (
    <section className="scrollytelling-engine-root" aria-label="Interactive Storytelling Engine">
      {/* FLOATING HUD & PROGRESS RADAR */}
      <div className="scrolly-hud-container container">
        <div className="scrolly-hud-pill">
          <div className="scrolly-radar-dot">
            <span className="radar-ping" />
            <span className="radar-core" />
          </div>
          <div className="scrolly-hud-text">
            <span className="hud-phase-label">
              {lang === 'vi' ? 'GIAI ĐOẠN' : 'PHASE'} {chapters[activeIdx]?.number || '01'} /{' '}
              {String(chapters.length).padStart(2, '0')}:
            </span>
            <strong className="hud-phase-title">
              {chapters[activeIdx]?.title.split('&')[0].trim()}
            </strong>
          </div>
          <div className="scrolly-hud-steps">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => handleJumpToChapter(idx, ch.id)}
                className={`hud-step-dot ${activeIdx === idx ? 'active' : ''}`}
                title={`Chương ${ch.number}: ${ch.title}`}
                aria-label={`Chương ${ch.number}`}
              >
                <span>{ch.number}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MASTER 2-COLUMN SCROLLYTELLING CONTAINER */}
      <div className="container scrollytelling-main-grid">
        {/* LEFT COLUMN: NARRATIVE STREAM (Story Chapters) */}
        <div className="scrollytelling-narrative-stream">
          <div className="narrative-stream-track">
            {chapters.map((ch, idx) => {
              const meta = visualMetaList[idx] || visualMetaList[0];
              const isActive = activeIdx === idx;

              return (
                <article
                  key={ch.id}
                  id={ch.id}
                  data-chapter-index={idx}
                  className={`scrolly-chapter-card ${isActive ? 'is-active-step' : ''}`}
                >
                  {/* Step Connector Line */}
                  <div className="chapter-step-indicator">
                    <span className="step-circle">{ch.number}</span>
                    {idx < chapters.length - 1 && <span className="step-line" />}
                  </div>

                  {/* Card Content Body */}
                  <div className="chapter-card-body">
                    <div className="chapter-header-badge-row">
                      <span className="chapter-phase-badge">
                        {lang === 'vi' ? 'GIAI ĐOẠN' : 'PHASE'} {ch.number} / {String(chapters.length).padStart(2, '0')}
                      </span>
                      <span className="chapter-action-cue-tag">
                        🎯 {meta.actionCue}
                      </span>
                    </div>

                    <h3 className="chapter-heading">{ch.title}</h3>
                    <p className="chapter-text-lead">{ch.content}</p>

                    {/* Technical Architecture Notes */}
                    {ch.technicalNotes && ch.technicalNotes.length > 0 && (
                      <div className="chapter-tech-box">
                        <div className="tech-box-title">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                          <span>{lang === 'vi' ? 'KIẾN TRÚC & GIẢI PHÁP KỸ THUẬT' : 'ENGINEERING ARCHITECTURE & CONSTRAINTS'}</span>
                        </div>
                        <ul className="tech-notes-list">
                          {ch.technicalNotes.map((note, nIdx) => (
                            <li key={nIdx}>
                              <span className="bullet-chevron">›</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Interactive Action Focus Button */}
                    <div className="chapter-action-footer">
                      <button
                        type="button"
                        className="btn-focus-stage"
                        onClick={() => handleJumpToChapter(idx, ch.id)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span>{lang === 'vi' ? 'Xem tương tác trên giao diện thực tế' : 'Inspect live interaction on stage'}</span>
                        <span className="cue-arrow">→</span>
                      </button>

                      <span className="chapter-target-component">
                        <strong>{lang === 'vi' ? 'Đang giải thích:' : 'Explaining:'}</strong> {meta.hotspot.label}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY VISUAL STAGE & ACTION SIMULATOR */}
        <div className="scrollytelling-stage-column">
          <div className="sticky-stage-anchor">
            {/* 3D DEVICE FRAME CONTAINER */}
            <div className="stage-device-frame">
              {/* BROWSER TOP CHROME / HEADER */}
              <div className="stage-topbar">
                <div className="window-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>

                <div className="browser-url-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="url-text">{project.liveUrl || 'https://production-system.live'}</span>
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-open-live-external"
                    title={lang === 'vi' ? 'Mở website thực tế trong tab mới' : 'Open live website in new tab'}
                  >
                    <span>{lang === 'vi' ? 'Mở web thực tế' : 'Visit Live'}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>

              {/* STAGE SCREEN VIEWPORT (With Screenshot, Radar Hotspot & Animated Cursor) */}
              <div className="stage-viewport">
                <div className="stage-image-wrapper">
                  <Image
                    key={currentVisual.imageUrl}
                    src={currentVisual.imageUrl}
                    alt={currentVisual.imageAlt}
                    width={1200}
                    height={720}
                    className="stage-screenshot-img animate-fade-in"
                    priority
                    unoptimized
                  />
                  <div className="stage-screen-sheen" />
                </div>

                {/* OVERLAID RADAR HOTSPOT PIN */}
                <div
                  className={`scrolly-hotspot-pin ${isHoveringHotspot ? 'is-expanded' : ''}`}
                  style={{
                    left: `${currentVisual.hotspot.x}%`,
                    top: `${currentVisual.hotspot.y}%`,
                  }}
                  onMouseEnter={() => setIsHoveringHotspot(true)}
                  onMouseLeave={() => setIsHoveringHotspot(false)}
                >
                  {/* Pulsing Radar Wave Rings */}
                  <div className="hotspot-radar-ripple ring-1" />
                  <div className="hotspot-radar-ripple ring-2" />
                  <div className="hotspot-core-dot" />

                  {/* Hotspot Hover / Info Card */}
                  <div className="hotspot-callout-card">
                    <div className="callout-badge-row">
                      <span className="callout-pill-tag">
                        🎯 {lang === 'vi' ? 'VỊ TRÍ ĐANG GIẢI THÍCH' : 'ACTIVE EXPLAINED COMPONENT'}
                      </span>
                      <span className="callout-phase-num">CH.{chapters[activeIdx]?.number}</span>
                    </div>
                    <strong className="callout-component-name">{currentVisual.hotspot.label}</strong>
                    <p className="callout-action-desc">
                      <strong>{lang === 'vi' ? 'Hành động:' : 'Action:'}</strong> {currentVisual.hotspot.action}
                    </p>
                    <p className="callout-detail-text">{currentVisual.hotspot.description}</p>
                  </div>
                </div>

                {/* SIMULATED MOUSE CURSOR POINTER */}
                <div
                  className="scrolly-simulated-cursor"
                  style={{
                    left: `${currentVisual.cursor.x}%`,
                    top: `${currentVisual.cursor.y}%`,
                  }}
                >
                  <div className="cursor-pointer-icon">
                    {/* Realistic SVG Cursor */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                        fill="#0F172A"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="cursor-click-wave" />
                  </div>

                  <div className="cursor-action-tag">
                    <span className="cursor-pulse-light" />
                    <span>{currentVisual.cursor.actionText}</span>
                  </div>
                </div>

                {/* STAGE BOTTOM STATUS OVERLAY */}
                <div className="stage-caption-bar">
                  <div className="caption-text-group">
                    <span className="caption-eyebrow">
                      {lang === 'vi' ? 'ĐỒNG BỘ TRỰC QUAN THEO NỘI DUNG:' : 'SYNCHRONIZED VISUAL NARRATIVE:'}
                    </span>
                    <strong className="caption-main">{currentVisual.imageCaption}</strong>
                  </div>
                  <div className="caption-sync-badge">
                    <span className="sync-pulse-dot" />
                    <span>{lang === 'vi' ? 'ĐANG ĐỒNG BỘ' : 'SYNCED'}</span>
                  </div>
                </div>
              </div>

              {/* INTEGRATED LIVE ACTION SIMULATOR */}
              <div className="stage-action-simulator">
                {/* Simulator Header Tabs */}
                <div className="simulator-header-tabs">
                  <div className="sim-title-group">
                    <span className="sim-indicator-dot" />
                    <span className="sim-header-label">
                      {lang === 'vi' ? 'THỬ NGHIỆM TƯƠNG TÁC THỰC TẾ' : 'LIVE ACTION SIMULATOR'}
                    </span>
                  </div>

                  {/* Project: Ticket Concert Tabs */}
                  {project.slug === 'ticket-concert-agentic-rag' && (
                    <div className="sim-tab-list">
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'seats' ? 'active' : ''}`}
                        onClick={() => setActiveTab('seats')}
                      >
                        01. Chọn ghế WebSocket
                      </button>
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'rag' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rag')}
                      >
                        02. Hỏi AI RAG
                      </button>
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
                        onClick={() => setActiveTab('payment')}
                      >
                        03. Thanh toán MoMo
                      </button>
                    </div>
                  )}

                  {/* Project: Fashion Nail Morley Tabs */}
                  {project.slug === 'fashion-nail-morley' && (
                    <div className="sim-tab-list">
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
                        onClick={() => setActiveTab('services')}
                      >
                        01. Chọn gói dịch vụ
                      </button>
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'booking' ? 'active' : ''}`}
                        onClick={() => setActiveTab('booking')}
                      >
                        02. Đặt lịch hẹn
                      </button>
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'location' ? 'active' : ''}`}
                        onClick={() => setActiveTab('location')}
                      >
                        03. Vị trí & Chỉ đường
                      </button>
                    </div>
                  )}

                  {/* Project: ExamPlatform AI Tabs */}
                  {project.slug === 'examplatform-ai' && (
                    <div className="sim-tab-list">
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'exam' ? 'active' : ''}`}
                        onClick={() => setActiveTab('exam')}
                      >
                        01. Phòng thi & Autosave
                      </button>
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'anticheat' ? 'active' : ''}`}
                        onClick={() => setActiveTab('anticheat')}
                      >
                        02. Chống gian lận
                      </button>
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'rubric' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rubric')}
                      >
                        03. AI Chấm điểm
                      </button>
                    </div>
                  )}

                  {/* Project: VK Digital Hub Tabs */}
                  {project.slug === 'vk-digital-hub' && (
                    <div className="sim-tab-list">
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'roi' ? 'active' : ''}`}
                        onClick={() => setActiveTab('roi')}
                      >
                        01. Tính ROI Marketing
                      </button>
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'webhook' ? 'active' : ''}`}
                        onClick={() => setActiveTab('webhook')}
                      >
                        02. Webhook Make.com
                      </button>
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
                        onClick={() => setActiveTab('services')}
                      >
                        03. Bảng giá dịch vụ
                      </button>
                    </div>
                  )}

                  {/* Project: NH Huynh Portfolio Tabs */}
                  {project.slug === 'nh-huynh-portfolio' && (
                    <div className="sim-tab-list">
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'tilt' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tilt')}
                      >
                        01. Thẻ 3D Tilt &amp; Hào quang
                      </button>
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'lang' ? 'active' : ''}`}
                        onClick={() => setActiveTab('lang')}
                      >
                        02. Toggle Ngôn ngữ 1 Chạm
                      </button>
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'cms' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cms')}
                      >
                        03. Bảo mật Session CMS
                      </button>
                    </div>
                  )}

                  {/* Fallback generic tabs */}
                  {!['ticket-concert-agentic-rag', 'fashion-nail-morley', 'examplatform-ai', 'vk-digital-hub', 'nh-huynh-portfolio'].includes(
                    project.slug
                  ) && (
                    <div className="sim-tab-list">
                      <button
                        type="button"
                        className={`sim-tab-btn ${activeTab === 'seats' ? 'active' : ''}`}
                        onClick={() => setActiveTab('seats')}
                      >
                        Kiểm thử Tính năng
                      </button>
                    </div>
                  )}
                </div>

                {/* SIMULATOR BODY CONTENT */}
                <div className="simulator-canvas">
                  {/* --- PROJECT 1: TICKET CONCERT --- */}
                  {project.slug === 'ticket-concert-agentic-rag' && (
                    <>
                      {activeTab === 'seats' && (
                        <div className="sim-interactive-grid">
                          <div className="sim-row-header">
                            <div>
                              <strong className="sim-subheading">Sơ đồ ghế thời gian thực (Interactive Venue Map)</strong>
                              <p className="sim-subdesc">Click vào ghế bất kỳ để trải nghiệm luồng WebSocket giữ chỗ:</p>
                            </div>
                            <div className="sim-timer-pill">
                              <span>⏱ Khóa ghế trong:</span>
                              <strong>{formatTime(seatCountdown)}</strong>
                            </div>
                          </div>

                          <div className="sim-seats-matrix">
                            {[
                              { id: 'VIP-A01', tier: 'VIP', price: '1,850k', status: 'available' },
                              { id: 'VIP-A02', tier: 'VIP', price: '1,850k', status: 'taken' },
                              { id: 'VIP-D04', tier: 'VIP', price: '1,850k', status: 'holding' },
                              { id: 'REG-B01', tier: 'Regular', price: '850k', status: 'available' },
                              { id: 'REG-B02', tier: 'Regular', price: '850k', status: 'available' },
                              { id: 'STD-C05', tier: 'Standing', price: '500k', status: 'available' },
                            ].map((seat) => {
                              const isSelected = selectedSeat === seat.id;
                              return (
                                <button
                                  key={seat.id}
                                  type="button"
                                  disabled={seat.status === 'taken'}
                                  onClick={() => setSelectedSeat(seat.id)}
                                  className={`seat-btn ${seat.status} ${isSelected ? 'selected' : ''}`}
                                >
                                  <span className="seat-id">{seat.id}</span>
                                  <span className="seat-price">{seat.price}</span>
                                  <span className="seat-badge">
                                    {seat.status === 'taken'
                                      ? 'Đã bán'
                                      : isSelected
                                      ? 'Đang giữ'
                                      : seat.status === 'holding'
                                      ? 'Tạm khóa'
                                      : 'Còn trống'}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="sim-telemetry-feed">
                            <span className="feed-tag">WEBSOCKET LOG</span>
                            <code>
                              {`Socket.emit("SEAT_SELECT", { seatId: "${selectedSeat}", userId: "usr-889", ttl: 600 })`}
                            </code>
                            <span className="feed-status">✓ Redis TTL 600s kích hoạt. Broadcast khóa ghế tới 1,200 người.</span>
                          </div>
                        </div>
                      )}

                      {activeTab === 'rag' && (
                        <div className="sim-interactive-grid">
                          <strong className="sim-subheading">Trợ lý AI Agentic RAG (LangChain.js + Gemini 2.5 Flash)</strong>
                          <p className="sim-subdesc">Chọn câu hỏi mẫu để kiểm tra khả năng tư vấn không hallucination:</p>

                          <div className="ai-prompt-chips">
                            <button
                              type="button"
                              onClick={() => handleAskAiPrompt('Khu vực VIP còn vé không?')}
                              className="prompt-chip"
                            >
                              💬 Khu vực VIP còn vé không?
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAskAiPrompt('Chính sách hủy vé thế nào?')}
                              className="prompt-chip"
                            >
                              💬 Chính sách hủy vé ra sao?
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAskAiPrompt('Sự kiện diễn ra ở đâu?')}
                              className="prompt-chip"
                            >
                              💬 Địa điểm & thời gian vào cửa?
                            </button>
                          </div>

                          <div className="ai-response-box">
                            <div className="ai-response-header">
                              <span className="ai-model-tag">Gemini 2.5 Flash Agent</span>
                              <span className="ai-latency">Độ trễ: 340ms • 100% Grounded</span>
                            </div>
                            <p className="ai-response-body">
                              {isAiAnswering ? (
                                <span className="typing-dots">Đang truy xuất Vector DB...</span>
                              ) : (
                                aiChatOutput
                              )}
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'payment' && (
                        <div className="sim-interactive-grid">
                          <div className="sim-row-header">
                            <div>
                              <strong className="sim-subheading">Thanh toán MoMo QR &amp; Đối soát IPN Webhook</strong>
                              <p className="sim-subdesc">Mô phỏng quét mã QR thanh toán tức thời:</p>
                            </div>
                            <span className="momo-badge">MoMo Official API</span>
                          </div>

                          <div className="momo-checkout-card">
                            <div className="momo-qr-visual">
                              <div className="simulated-qr-box">
                                <span className="qr-corner tl" />
                                <span className="qr-corner tr" />
                                <span className="qr-corner bl" />
                                <span className="qr-corner br" />
                                <div className="qr-center-logo">MoMo</div>
                              </div>
                              <span className="qr-instruction">Quét mã QR bằng ứng dụng MoMo</span>
                            </div>

                            <div className="momo-details">
                              <div className="detail-line">
                                <span>Đơn hàng:</span>
                                <strong>ORD-2026-99214</strong>
                              </div>
                              <div className="detail-line">
                                <span>Ghế chọn:</span>
                                <strong>{selectedSeat} (Hạng VIP)</strong>
                              </div>
                              <div className="detail-line">
                                <span>Số tiền:</span>
                                <strong className="price-val">1,850,000 VND</strong>
                              </div>

                              <button
                                type="button"
                                onClick={() => setMomoPaid(!momoPaid)}
                                className={`btn-simulate-pay ${momoPaid ? 'success' : ''}`}
                              >
                                {momoPaid ? '✓ Thanh toán thành công (Click để thử lại)' : '⚡ Mô phỏng quét mã thanh toán'}
                              </button>

                              {momoPaid && (
                                <div className="pay-success-toast">
                                  <span>✓ Webhook HMAC hợp lệ: Vé điện tử QR đã gửi về email trong 420ms!</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* --- PROJECT 2: FASHION NAIL MORLEY --- */}
                  {project.slug === 'fashion-nail-morley' && (
                    <>
                      {activeTab === 'services' && (
                        <div className="sim-interactive-grid">
                          <div className="sim-row-header">
                            <div>
                              <strong className="sim-subheading">Bảng giá Dịch vụ &amp; Chọn Gói (AUD Pricing)</strong>
                              <p className="sim-subdesc">Click chọn dịch vụ để tính tổng chi phí tự động:</p>
                            </div>
                            <div className="price-total-badge">
                              <span>Ước tính:</span>
                              <strong>
                                $
                                {selectedServices.reduce((sum, s) => {
                                  if (s === 'acrylic') return sum + 65;
                                  if (s === 'pedicure') return sum + 50;
                                  if (s === 'art') return sum + 25;
                                  if (s === 'shellac') return sum + 40;
                                  return sum;
                                }, 0)}{' '}
                                AUD
                              </strong>
                            </div>
                          </div>

                          <div className="services-selector-grid">
                            {[
                              { id: 'acrylic', name: 'Acrylic Full Set', price: 65, duration: '60 mins' },
                              { id: 'pedicure', name: 'Deluxe Spa Pedicure', price: 50, duration: '45 mins' },
                              { id: 'art', name: 'Custom Nail Art Design', price: 25, duration: '30 mins' },
                              { id: 'shellac', name: 'Gel Shellac Manicure', price: 40, duration: '40 mins' },
                            ].map((svc) => {
                              const isChecked = selectedServices.includes(svc.id);
                              return (
                                <button
                                  key={svc.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedServices((prev) =>
                                      prev.includes(svc.id) ? prev.filter((x) => x !== svc.id) : [...prev, svc.id]
                                    );
                                  }}
                                  className={`service-check-card ${isChecked ? 'active' : ''}`}
                                >
                                  <span className="check-box">{isChecked ? '✓' : ''}</span>
                                  <div className="service-info">
                                    <strong>{svc.name}</strong>
                                    <span>{svc.duration}</span>
                                  </div>
                                  <span className="service-cost">${svc.price} AUD</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {activeTab === 'booking' && (
                        <div className="sim-interactive-grid">
                          <strong className="sim-subheading">Đặt Lịch Hẹn Nhanh 1 Chạm (One-Tap Inquiry)</strong>
                          <p className="sim-subdesc">Thử nghiệm luồng gửi lịch hẹn tới salon qua Resend API:</p>

                          <div className="booking-mockup-form">
                            <div className="form-row-duo">
                              <div className="form-group">
                                <label>Thợ nail mong muốn</label>
                                <select
                                  value={selectedTechnician}
                                  onChange={(e) => setSelectedTechnician(e.target.value)}
                                  className="sim-select"
                                >
                                  <option value="Sarah">Sarah (Chuyên gia Nail Art)</option>
                                  <option value="Tina">Tina (Chuyên gia Acrylic)</option>
                                  <option value="Any">Bất kỳ thợ trống lịch</option>
                                </select>
                              </div>

                              <div className="form-group">
                                <label>Thời gian hẹn</label>
                                <div className="time-preset-pills">
                                  <span className="time-pill active">14:30 Hôm nay</span>
                                  <span className="time-pill">16:00 Ngày mai</span>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setBookingSuccess(true);
                                setTimeout(() => setBookingSuccess(false), 4000);
                              }}
                              className="btn-submit-booking"
                            >
                              ⚡ Mô phỏng gửi yêu cầu đặt lịch hẹn
                            </button>

                            {bookingSuccess && (
                              <div className="booking-success-banner">
                                <strong>✓ Đã gửi thông báo thành công!</strong>
                                <p>Email xác nhận đã gửi tức thời về hộp thư salon qua Resend API trong 350ms.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {activeTab === 'location' && (
                        <div className="sim-interactive-grid">
                          <strong className="sim-subheading">Vị trí &amp; Chỉ đường Google Maps (Morley, Tây Úc)</strong>
                          <div className="location-card-preview">
                            <div className="location-info">
                              <span className="loc-badge">Morley Galleria Precinct</span>
                              <p className="loc-address">Unit 4, 128 Russell St, Morley WA 6062, Australia</p>
                              <div className="loc-hours">
                                <span>Thứ 2 – Thứ 7: 9:00 AM – 5:30 PM</span>
                                <span>Chủ Nhật: 10:00 AM – 4:00 PM</span>
                              </div>
                            </div>
                            <div className="loc-actions">
                              <span className="mock-btn-action">🗺️ Chỉ đường Maps</span>
                              <span className="mock-btn-action">📞 Gọi điện 1 chạm</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* --- PROJECT 3: EXAMPLATFORM AI --- */}
                  {project.slug === 'examplatform-ai' && (
                    <>
                      {activeTab === 'exam' && (
                        <div className="sim-interactive-grid">
                          <div className="sim-row-header">
                            <div>
                              <strong className="sim-subheading">Phòng thi &amp; Tự động Lưu Redis Cache</strong>
                              <p className="sim-subdesc">Chọn đáp án để thấy tốc độ lưu tức thời (Sub-second Autosave):</p>
                            </div>
                            <div className="sim-timer-pill exam">
                              <span>⏱ Thời gian còn:</span>
                              <strong>{formatTime(examSeconds)}</strong>
                            </div>
                          </div>

                          <div className="exam-question-card">
                            <span className="question-num">CÂU HỎI 03 / 40 • HỆ THỐNG PHÂN TÁN</span>
                            <p className="question-title">
                              Trong Node.js Event Loop, hàng đợi nào được ưu tiên xử lý ngay sau khi kết thúc một pha hiện tại?
                            </p>

                            <div className="exam-options-list">
                              {[
                                { id: 'A', text: 'Timers Queue (setTimeout / setInterval)' },
                                { id: 'B', text: 'Microtask Queue (process.nextTick & Promise callbacks)' },
                                { id: 'C', text: 'Check Queue (setImmediate)' },
                                { id: 'D', text: 'I/O Polling Queue' },
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedAnswer(opt.id);
                                    setAutosaveNotice(`✓ Đã lưu tự động đáp án (${opt.id}) vào Redis Cache (độ trễ 6ms)`);
                                  }}
                                  className={`exam-option-btn ${selectedAnswer === opt.id ? 'selected' : ''}`}
                                >
                                  <span className="opt-id">{opt.id}</span>
                                  <span className="opt-text">{opt.text}</span>
                                </button>
                              ))}
                            </div>

                            <div className="autosave-status-bar">
                              <span className="redis-indicator">● REDIS CACHE ACTIVE</span>
                              <span className="autosave-message">{autosaveNotice}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'anticheat' && (
                        <div className="sim-interactive-grid">
                          <strong className="sim-subheading">Cơ chế Chống Gian lận (Anti-Cheat Tab Monitoring)</strong>
                          <p className="sim-subdesc">
                            Hệ thống giám sát sự kiện mất focus trình duyệt để giữ tính công bằng học thuật:
                          </p>

                          <div className="anticheat-tester-box">
                            <button
                              type="button"
                              onClick={() => {
                                setAntiCheatAlert(true);
                                setTimeout(() => setAntiCheatAlert(false), 5000);
                              }}
                              className="btn-trigger-anticheat"
                            >
                              ⚠️ Mô phỏng thí sinh chuyển tab hoặc mở ứng dụng khác
                            </button>

                            {antiCheatAlert && (
                              <div className="anticheat-alert-modal">
                                <span className="alert-icon">🚨</span>
                                <div className="alert-content">
                                  <strong>CẢNH BÁO VI PHẠM PHIÊN THI (LẦN 1/3)</strong>
                                  <p>
                                    Hệ thống ghi nhận sự kiện Tab Blur (Window Unfocused). Toàn bộ thao tác đã được gửi về server giám sát kèm mã thời gian.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {activeTab === 'rubric' && (
                        <div className="sim-interactive-grid">
                          <strong className="sim-subheading">Báo cáo Phân tích AI Rubric &amp; Lộ trình Ôn tập</strong>
                          <div className="rubric-bars-group">
                            <div className="rubric-row">
                              <span className="rubric-name">Kiến trúc Hệ thống (System Architecture)</span>
                              <div className="rubric-progress-track">
                                <div className="rubric-progress-fill" style={{ width: '95%' }} />
                              </div>
                              <span className="rubric-score">9.5/10</span>
                            </div>
                            <div className="rubric-row">
                              <span className="rubric-name">Tối ưu CSDL &amp; Redis Caching</span>
                              <div className="rubric-progress-track">
                                <div className="rubric-progress-fill" style={{ width: '90%' }} />
                              </div>
                              <span className="rubric-score">9.0/10</span>
                            </div>
                            <div className="rubric-row">
                              <span className="rubric-name">Bảo mật API &amp; Xác thực Phiên</span>
                              <div className="rubric-progress-track">
                                <div className="rubric-progress-fill" style={{ width: '88%' }} />
                              </div>
                              <span className="rubric-score">8.8/10</span>
                            </div>
                          </div>
                          <div className="ai-feedback-quote">
                            <strong>Đánh giá từ AI:</strong> Thí sinh nắm vững nguyên lý hoạt động của Microtask Queue và luồng đồng bộ Redis. Đề xuất làm thêm 2 bài tập về Connection Pooling để hoàn thiện 100%.
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* --- PROJECT 4: VK DIGITAL HUB --- */}
                  {project.slug === 'vk-digital-hub' && (
                    <>
                      {activeTab === 'roi' && (
                        <div className="sim-interactive-grid">
                          <div className="sim-row-header">
                            <div>
                              <strong className="sim-subheading">Máy tính Dự phóng ROI Tăng trưởng Khách hàng</strong>
                              <p className="sim-subdesc">Kéo thanh trượt ngân sách để tính toán dự báo doanh thu:</p>
                            </div>
                            <span className="budget-display">${marketingBudget.toLocaleString()} AUD / tháng</span>
                          </div>

                          <div className="slider-wrapper">
                            <input
                              type="range"
                              min="1000"
                              max="10000"
                              step="500"
                              value={marketingBudget}
                              onChange={(e) => setMarketingBudget(Number(e.target.value))}
                              className="roi-range-input"
                            />
                            <div className="slider-labels">
                              <span>$1,000 AUD</span>
                              <span>$5,000 AUD</span>
                              <span>$10,000 AUD</span>
                            </div>
                          </div>

                          <div className="roi-metrics-grid">
                            <div className="metric-box">
                              <span className="m-label">Lượt xem tiếp cận</span>
                              <strong className="m-val">{(marketingBudget * 38).toLocaleString()}</strong>
                            </div>
                            <div className="metric-box">
                              <span className="m-label">Khách hàng tiềm năng (Leads)</span>
                              <strong className="m-val highlight">
                                {Math.round(marketingBudget * 0.062)} leads
                              </strong>
                            </div>
                            <div className="metric-box">
                              <span className="m-label">Doanh thu dự kiến</span>
                              <strong className="m-val revenue">
                                ${(marketingBudget * 4.2).toLocaleString()} AUD
                              </strong>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'webhook' && (
                        <div className="sim-interactive-grid">
                          <strong className="sim-subheading">Kịch bản Webhook Make.com Lead Automation</strong>
                          <p className="sim-subdesc">Click để kiểm thử tốc độ đẩy lead từ website sang CRM &amp; Slack:</p>

                          <div className="webhook-trigger-box">
                            <button
                              type="button"
                              onClick={() => {
                                setWebhookTriggered(true);
                                setTimeout(() => setWebhookTriggered(false), 5000);
                              }}
                              className="btn-trigger-webhook"
                            >
                              ⚡ Gửi thông tin tư vấn thử nghiệm qua Webhook
                            </button>

                            {webhookTriggered && (
                              <div className="webhook-payload-viewer animate-fade-in">
                                <div className="payload-header">
                                  <span>POST https://hook.eu1.make.com/sc-vk-agency-lead</span>
                                  <span className="latency-pill">200 OK • 180ms</span>
                                </div>
                                <pre className="payload-code">
                                  {JSON.stringify(
                                    {
                                      event: 'LEAD_INQUIRY_CREATED',
                                      lead: {
                                        fullName: 'Alex Tran',
                                        company: 'Perth Retail Group',
                                        budgetAud: marketingBudget,
                                        serviceTier: 'Growth Accelerator',
                                      },
                                      dispatchedTo: ['HubSpot CRM', 'Slack #new-leads', 'Google Sheets'],
                                      status: 'SYNCHRONIZED',
                                    },
                                    null,
                                    2
                                  )}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {activeTab === 'services' && (
                        <div className="sim-interactive-grid">
                          <strong className="sim-subheading">Bảng Phân tầng Dịch vụ Tăng trưởng</strong>
                          <div className="tiers-comparison-row">
                            <div className="tier-card">
                              <span className="t-name">Starter</span>
                              <span className="t-price">$1,200 AUD / tháng</span>
                              <span className="t-desc">SEO Cơ bản &amp; Tối ưu Google Business</span>
                            </div>
                            <div className="tier-card featured">
                              <span className="t-name">Growth Partner</span>
                              <span className="t-price">$2,800 AUD / tháng</span>
                              <span className="t-desc">Google Ads + SEO + Tự động hóa CRM Make</span>
                            </div>
                            <div className="tier-card">
                              <span className="t-name">Enterprise</span>
                              <span className="t-price">$5,500 AUD / tháng</span>
                              <span className="t-desc">Toàn diện Omni-channel &amp; Phễu bán hàng cao cấp</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* --- PROJECT 5: NH HUYNH PORTFOLIO --- */}
                  {project.slug === 'nh-huynh-portfolio' && (
                    <>
                      {activeTab === 'tilt' && (
                        <div className="sim-interactive-grid">
                          <div className="sim-row-header">
                            <div>
                              <strong className="sim-subheading">Thử nghiệm 3D Tilt Card &amp; Hào quang Ambient Backlight</strong>
                              <p className="sim-subdesc">Điều chỉnh thanh trượt hoặc chọn màu ánh sáng hào quang:</p>
                            </div>
                            <div className="aura-color-pills">
                              {[
                                { color: '#2563EB', name: 'Blue' },
                                { color: '#7C3AED', name: 'Purple' },
                                { color: '#059669', name: 'Emerald' },
                                { color: '#D9777F', name: 'Rose' },
                              ].map((c) => (
                                <button
                                  key={c.color}
                                  type="button"
                                  onClick={() => setPortfolioAuraColor(c.color)}
                                  className={`aura-btn ${portfolioAuraColor === c.color ? 'active' : ''}`}
                                  style={{ backgroundColor: c.color }}
                                  title={c.name}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Live 3D Tilt Card Sandbox */}
                          <div className="portfolio-tilt-sandbox">
                            <div
                              className="portfolio-mini-tilt-card"
                              style={{
                                transform: `perspective(600px) rotateX(${portfolioTiltX}deg) rotateY(${portfolioTiltY}deg)`,
                                boxShadow: `0 16px 36px -8px ${portfolioAuraColor}40, 0 0 0 1px #E2E8F0`,
                              }}
                            >
                              <div
                                className="portfolio-mini-card-aura"
                                style={{
                                  background: `radial-gradient(circle at 60% 40%, ${portfolioAuraColor}55, transparent 70%)`,
                                }}
                              />
                              <div className="mini-card-header">
                                <span className="mini-card-badge">Full-Stack Project</span>
                                <span className="mini-card-year">10/2026</span>
                              </div>
                              <strong className="mini-card-title">Nguyễn Hoàng Huynh Portfolio</strong>
                              <p className="mini-card-desc">Giao diện Light Theme tinh tế với hiệu ứng 3D tilt và vầng hào quang theo chuột.</p>
                              <div className="mini-card-tags">
                                <span>Next.js 16</span>
                                <span>TypeScript</span>
                                <span>PostgreSQL</span>
                              </div>
                            </div>
                          </div>

                          <div className="tilt-sliders-row">
                            <div className="slider-group">
                              <label>Góc xoay dọc (Rotate X): {portfolioTiltX}°</label>
                              <input
                                type="range"
                                min="-15"
                                max="15"
                                value={portfolioTiltX}
                                onChange={(e) => setPortfolioTiltX(Number(e.target.value))}
                                className="roi-range-input"
                              />
                            </div>
                            <div className="slider-group">
                              <label>Góc xoay ngang (Rotate Y): {portfolioTiltY}°</label>
                              <input
                                type="range"
                                min="-15"
                                max="15"
                                value={portfolioTiltY}
                                onChange={(e) => setPortfolioTiltY(Number(e.target.value))}
                                className="roi-range-input"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'lang' && (
                        <div className="sim-interactive-grid">
                          <div className="sim-row-header">
                            <div>
                              <strong className="sim-subheading">Thử nghiệm Chuyển đổi Ngôn ngữ 1 Chạm (Bilingual EN/VI)</strong>
                              <p className="sim-subdesc">Bấm công tắc để thấy văn bản được chuyển đổi tức thời không cần tải lại trang:</p>
                            </div>

                            <button
                              type="button"
                              onClick={() => setPortfolioSimLang(portfolioSimLang === 'vi' ? 'en' : 'vi')}
                              className="lang-toggle-sim-btn"
                            >
                              <span className={`sim-lang-option ${portfolioSimLang === 'vi' ? 'active' : ''}`}>VI</span>
                              <span className={`sim-lang-option ${portfolioSimLang === 'en' ? 'active' : ''}`}>EN</span>
                            </button>
                          </div>

                          <div className="lang-preview-card">
                            <div className="lang-preview-header">
                              <span className="lang-current-flag">
                                {portfolioSimLang === 'vi' ? '🇻🇳 Tiếng Việt (Mặc định)' : '🇬🇧 English (Global)'}
                              </span>
                              <span className="lang-storage-badge">LocalStorage Sync: OK</span>
                            </div>
                            <h4 className="lang-preview-title">
                              {portfolioSimLang === 'vi'
                                ? 'Nguyễn Hoàng Huynh — Lập trình viên Web Full-Stack'
                                : 'Nguyen Hoang Huynh — Full-Stack Web Developer'}
                            </h4>
                            <p className="lang-preview-body">
                              {portfolioSimLang === 'vi'
                                ? 'Chuyên phát triển các ứng dụng web tối ưu quy mô, trải nghiệm mượt mà và câu chuyện kỹ thuật trực quan.'
                                : 'Specializing in scalable web architectures, responsive craft, and authentic engineering storytelling.'}
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'cms' && (
                        <div className="sim-interactive-grid">
                          <strong className="sim-subheading">Kiểm tra Xác thực Phiên CMS &amp; Database Pooling</strong>
                          <p className="sim-subdesc">Mô phỏng xác thực cookie HttpOnly bảo mật và kết nối PostgreSQL Neon:</p>

                          <div className="cms-audit-card">
                            <button
                              type="button"
                              onClick={() => {
                                setCmsVerified(true);
                                setTimeout(() => setCmsVerified(false), 5000);
                              }}
                              className="btn-verify-cms"
                            >
                              ⚡ Mô phỏng kiểm tra phiên Admin (nh_admin_session)
                            </button>

                            {cmsVerified ? (
                              <div className="cms-verified-status animate-fade-in">
                                <div className="audit-metric-row">
                                  <span>HttpOnly Cookie:</span>
                                  <strong className="text-emerald">✓ Verified (Token HMAC-SHA256)</strong>
                                </div>
                                <div className="audit-metric-row">
                                  <span>Database Connection:</span>
                                  <strong className="text-blue">PostgreSQL Neon (14 active pools, 12ms)</strong>
                                </div>
                                <div className="audit-metric-row">
                                  <span>CRUD Operations:</span>
                                  <strong>Projects, Storytelling Chapters, Inbox Messages (Ready)</strong>
                                </div>
                              </div>
                            ) : (
                              <span className="cms-await-text">Nhấp vào nút trên để thực hiện kiểm tra bảo mật API.</span>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Fallback generic simulator */}
                  {!['ticket-concert-agentic-rag', 'fashion-nail-morley', 'examplatform-ai', 'vk-digital-hub', 'nh-huynh-portfolio'].includes(
                    project.slug
                  ) && (
                    <div className="sim-interactive-grid">
                      <strong className="sim-subheading">Khám phá Tính năng &amp; Trải nghiệm Trực tiếp</strong>
                      <p className="sim-subdesc">
                        Hệ thống đã triển khai sẵn sàng tại liên kết bên dưới. Bạn có thể mở trực tiếp để kiểm thử toàn diện:
                      </p>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-open-live-large"
                        >
                          Truy cập trang web đang hoạt động ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
