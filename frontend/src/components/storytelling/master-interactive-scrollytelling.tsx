'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import type { Project, ProjectChapter } from '@/lib/types';
import { STORYTELLING_MODES_CATALOG } from '@/lib/types';
import { useLanguage } from '@/context/language-context';

interface MasterInteractiveScrollytellingProps {
  project: Project;
  chapters: ProjectChapter[];
}

interface ChapterVisualMeta {
  imageUrl: string;
  imageCaptionVi: string;
  imageCaptionEn: string;
  imageAlt: string;
  hotspot: {
    x: number; // percentage from left
    y: number; // percentage from top
    labelVi: string;
    labelEn: string;
    actionVi: string;
    actionEn: string;
    descriptionVi: string;
    descriptionEn: string;
  };
  cursor: {
    x: number;
    y: number;
    actionTextVi: string;
    actionTextEn: string;
  };
  takeawayVi: string;
  takeawayEn: string;
}

// 5 Bespoke Visual Maps mapped to authentic screenshots
const PROJECT_VISUAL_MAP: Record<string, ChapterVisualMeta[]> = {
  'ticket-concert-agentic-rag': [
    {
      imageUrl: '/projects/ticket-concert-hero.png',
      imageCaptionVi: 'Cổng Khám phá Sự kiện & Lịch diễn Live Concert',
      imageCaptionEn: 'Live Concert Discovery & Event Schedule Portal',
      imageAlt: 'Ticket Concert Discovery Interface',
      hotspot: {
        x: 50,
        y: 35,
        labelVi: 'Live Concert Discovery & Timetable',
        labelEn: 'Live Concert Discovery & Timetable',
        actionVi: 'Lọc sự kiện & xem thông tin concert thời gian thực',
        actionEn: 'Filter live events & inspect real-time concert details',
        descriptionVi: 'Bố cục phân tầng trực quan, hiển thị lịch diễn, giá vé niêm yết và trạng thái còn vé cập nhật tự động.',
        descriptionEn: 'High-throughput event listing with live status badges, interactive schedules, and venue information.',
      },
      cursor: {
        x: 52,
        y: 38,
        actionTextVi: 'Khám phá Concert 2026',
        actionTextEn: 'Explore Concert 2026',
      },
      takeawayVi: 'Tối ưu hóa hiển thị trên màn hình Retina, giảm 65% thời gian tìm kiếm sự kiện của người hâm mộ.',
      takeawayEn: 'Retina-optimized interface cutting attendee event search latency by over 65%.',
    },
    {
      imageUrl: '/projects/ticket-concert-full.png',
      imageCaptionVi: 'Trợ lý AI Agentic RAG tích hợp LangChain.js & Gemini API',
      imageCaptionEn: 'Agentic RAG Assistant with LangChain.js & Gemini',
      imageAlt: 'LangChain Gemini Agentic RAG Assistant',
      hotspot: {
        x: 78,
        y: 62,
        labelVi: 'Agentic RAG Intelligent Chat Drawer',
        labelEn: 'Agentic RAG Intelligent Chat Drawer',
        actionVi: 'Tư vấn chỗ ngồi, giải đáp quy định sự kiện không hallucination',
        actionEn: 'Ground-truth seat recommendations & venue policy Q&A',
        descriptionVi: 'AI truy xuất dữ liệu từ Vector Database và sơ đồ chỗ ngồi thực tế để tư vấn chính xác trong 340ms.',
        descriptionEn: 'Retrieves verified ground truth from vector store & venue seat records in 340ms without hallucinations.',
      },
      cursor: {
        x: 76,
        y: 60,
        actionTextVi: "Hỏi: 'Khu vực VIP còn vé không?'",
        actionTextEn: "Ask: 'Any VIP tickets available?'",
      },
      takeawayVi: 'Giải quyết 82% thắc mắc khách hàng tự động trong các đợt mở bán vé cao điểm.',
      takeawayEn: 'Automates 82% of customer inquiries during high-demand ticketing drops.',
    },
    {
      imageUrl: '/projects/ticket-concert-booking.png',
      imageCaptionVi: 'Bản đồ Giữ ghế Thời gian thực & WebSocket Anti-Collision',
      imageCaptionEn: 'Real-Time Seating Map & WebSocket Anti-Collision',
      imageAlt: 'WebSocket Anti-Collision Seat Map',
      hotspot: {
        x: 36,
        y: 44,
        labelVi: 'Atomic Seat Locking Engine (Redis TTL 600s)',
        labelEn: 'Atomic Seat Locking Engine (Redis TTL 600s)',
        actionVi: 'Khóa ghế tức thời, ngăn chặn 2 người đặt trùng ghế cùng lúc',
        actionEn: 'Atomic lock preventing simultaneous booking collisions',
        descriptionVi: 'Khi người dùng click chọn ghế, WebSocket phát broadcast ngay tới toàn bộ khách truy cập khác.',
        descriptionEn: 'Bi-directional WebSocket broadcast notifies all active clients within 50ms upon seat selection.',
      },
      cursor: {
        x: 38,
        y: 46,
        actionTextVi: 'Khóa giữ ghế VIP-D04',
        actionTextEn: 'Lock seat VIP-D04',
      },
      takeawayVi: 'Triệt tiêu hoàn toàn lỗi Race Condition khi hàng nghìn người cùng tranh mua 1 vị trí.',
      takeawayEn: 'Completely eliminates race conditions when thousands contest the exact same seat.',
    },
    {
      imageUrl: '/projects/ticket-concert-booking.png',
      imageCaptionVi: 'Ma trận Hạng vé & Tự động Tính toán Giỏ hàng',
      imageCaptionEn: 'Ticket Pricing Matrix & Dynamic Cart Preview',
      imageAlt: 'Ticket Pricing Matrix & Dynamic Cart',
      hotspot: {
        x: 65,
        y: 52,
        labelVi: 'Dynamic Seating Matrix & Cart Preview',
        labelEn: 'Dynamic Seating Matrix & Cart Preview',
        actionVi: 'Tính toán phụ phí, áp mã ưu đãi và cập nhật tổng tiền',
        actionEn: 'Calculate fees, apply voucher codes and update total',
        descriptionVi: 'Hiển thị các khu vực VIP, Regular, Standing với màu sắc phân biệt rõ ràng và bộ lọc hạng vé.',
        descriptionEn: 'Color-coded VIP, Regular, Standing zones with live seat counts and instant fee calculations.',
      },
      cursor: {
        x: 63,
        y: 50,
        actionTextVi: 'Chọn 2 vé hạng VIP Hàng D',
        actionTextEn: 'Select 2 VIP Row D tickets',
      },
      takeawayVi: 'Trải nghiệm chọn vé trực quan giúp tăng 38% giá trị đơn hàng trung bình qua đề xuất hạng vé.',
      takeawayEn: 'Visual tier comparison lifts average order value by 38% via smart tier suggestions.',
    },
    {
      imageUrl: '/projects/ticket-concert-booking.png',
      imageCaptionVi: 'Cổng Thanh toán MoMo API với HMAC SHA-256 Signature',
      imageCaptionEn: 'MoMo Payment Gateway & HMAC SHA-256 Signature',
      imageAlt: 'MoMo API QR Code Checkout Modal',
      hotspot: {
        x: 50,
        y: 54,
        labelVi: 'MoMo Payment Gateway & IPN Webhook',
        labelEn: 'MoMo Payment Gateway & IPN Webhook',
        actionVi: 'Quét mã MoMo QR và đối soát giao dịch bảo mật ACID',
        actionEn: 'Scan MoMo QR and reconcile transactions under ACID',
        descriptionVi: 'Xác thực chữ ký số HMAC SHA-256 từ MoMo, cập nhật trạng thái đơn hàng trên PostgreSQL trong 250ms.',
        descriptionEn: 'Cryptographic signature verification ensures tamper-proof financial settlements in sub-250ms.',
      },
      cursor: {
        x: 52,
        y: 56,
        actionTextVi: 'Tạo mã QR thanh toán 1,850,000đ',
        actionTextEn: 'Generate MoMo QR 1,850,000đ',
      },
      takeawayVi: 'Tỷ lệ thanh toán thành công đạt 99.4% nhờ cơ chế tự động đối soát IPN Webhook đa lớp.',
      takeawayEn: 'Achieves 99.4% payment success rate via multi-layer IPN webhook reconciliation.',
    },
    {
      imageUrl: '/projects/ticket-concert-full.png',
      imageCaptionVi: 'Kiến trúc API Full-Stack & WebSocket Bi-directional Event Layer',
      imageCaptionEn: 'Full-Stack Architecture & WebSocket Event Layer',
      imageAlt: 'Full-Stack Architecture & Event Routing',
      hotspot: {
        x: 44,
        y: 32,
        labelVi: 'Full-Stack API & Real-Time Socket Architecture',
        labelEn: 'Full-Stack API & Real-Time Socket Architecture',
        actionVi: 'Xây dựng WebSocket socket.io server & database pooling Neon',
        actionEn: 'Engineered WebSocket cluster and Neon connection pooling',
        descriptionVi: 'Đảm bảo độ trễ tin nhắn dưới 50ms cho các sự kiện phòng vé lưu lượng cao.',
        descriptionEn: 'Guarantees sub-50ms message latency during high-concurrency ticket rush windows.',
      },
      cursor: {
        x: 46,
        y: 34,
        actionTextVi: 'Kiểm thử WebSocket Event SEAT_LOCKED',
        actionTextEn: 'Test WebSocket Event SEAT_LOCKED',
      },
      takeawayVi: 'Kiến trúc phân tách rõ ràng giữa Socket Server và Transaction DB giúp hệ thống chịu tải mượt mà.',
      takeawayEn: 'Decoupled socket streaming and transactional storage ensures zero database bottlenecks.',
    },
    {
      imageUrl: '/projects/ticket-concert-home.png',
      imageCaptionVi: 'Vé Điện tử QR Gửi Tức thì qua Resend API & Production Deploy',
      imageCaptionEn: 'Instant QR E-Ticket Dispatch via Resend & Live Production',
      imageAlt: 'Production E-Ticket Dispatch via Resend API',
      hotspot: {
        x: 50,
        y: 38,
        labelVi: 'Live Production at ticketconcert.online',
        labelEn: 'Live Production at ticketconcert.online',
        actionVi: 'Gửi vé điện tử QR về email trong 420ms sau khi thanh toán',
        actionEn: 'Dispatch cryptographically signed QR ticket via email in 420ms',
        descriptionVi: 'Tự động xuất vé PDF kèm mã QR bảo mật, cho phép quét kiểm soát vào cổng tại sự kiện.',
        descriptionEn: 'Generates secure dynamic QR code e-tickets, ready for rapid on-site scanning scanners.',
      },
      cursor: {
        x: 50,
        y: 40,
        actionTextVi: 'Mở vé điện tử đã phát hành',
        actionTextEn: 'View issued e-ticket',
      },
      takeawayVi: 'Vận hành thực tế trên tên miền ticketconcert.online với hơn 99.9% độ khả dụng dịch vụ.',
      takeawayEn: 'Live in production on ticketconcert.online with over 99.9% uptime SLA.',
    },
  ],
  'fashion-nail-morley': [
    {
      imageUrl: '/projects/fashion-nail-hero.jpg',
      imageCaptionVi: 'Mặt tiền Số Cao cấp Gam màu Champagne Rose',
      imageCaptionEn: 'Luxury Salon Digital Storefront & Brand Identity',
      imageAlt: 'Fashion Nail Morley Storefront Visual Direction',
      hotspot: {
        x: 50,
        y: 34,
        labelVi: 'Luxury Salon Digital Front Door',
        labelEn: 'Luxury Salon Digital Front Door',
        actionVi: 'Trải nghiệm nhận diện thương hiệu ấm cúng và sang trọng',
        actionEn: 'Warm, refined Western Australian salon aesthetic',
        descriptionVi: 'Thiết kế chuẩn thẩm mỹ salon Úc tại Morley, Tây Úc với phong cách typography sắc sảo.',
        descriptionEn: 'Bespoke typography, champagne blush tones, and editorial layout crafted for Australian clients.',
      },
      cursor: {
        x: 50,
        y: 37,
        actionTextVi: 'Khám phá không gian salon',
        actionTextEn: 'Explore salon atmosphere',
      },
      takeawayVi: 'Định hình phong cách thương hiệu cao cấp, tăng thời gian ở lại trang trung bình lên 2 phút 40 giây.',
      takeawayEn: 'Elevates brand positioning, lifting average dwell time to 2m 40s.',
    },
    {
      imageUrl: '/projects/fashion-nail-hero.jpg',
      imageCaptionVi: 'Visual Lookbook Bộ sưu tập Mẫu móng Nghệ thuật',
      imageCaptionEn: 'Curated Studio Nail Art Lookbook Showcase',
      imageAlt: 'Curated Studio Nail Art Lookbook',
      hotspot: {
        x: 46,
        y: 48,
        labelVi: 'Curated Studio Lookbook Showcase',
        labelEn: 'Curated Studio Lookbook Showcase',
        actionVi: 'Showcase bộ sưu tập móng theo mùa với ảnh chuẩn retina',
        actionEn: 'Showcase seasonal nail collections with retina imagery',
        descriptionVi: 'Ảnh chụp thực tế tại salon, giúp khách hàng chọn kiểu dáng trước khi đặt lịch hẹn.',
        descriptionEn: 'High-res gallery of real salon sets, helping clients preview styles before booking.',
      },
      cursor: {
        x: 48,
        y: 50,
        actionTextVi: 'Xem mẫu Acrylic & Nail Art mới',
        actionTextEn: 'View latest Acrylic & Nail Art sets',
      },
      takeawayVi: 'Tăng 52% số lượng khách hàng yêu cầu làm mẫu thiết kế riêng sau khi duyệt lookbook.',
      takeawayEn: 'Drives 52% more custom art design requests after clients browse the lookbook.',
    },
    {
      imageUrl: '/projects/fashion-nail-services.jpg',
      imageCaptionVi: 'Thẻ Giá Dịch vụ Chuẩn AUD Tối ưu Thiết bị Di động',
      imageCaptionEn: 'Mobile-First Treatment & AUD Pricing Cards',
      imageAlt: 'Mobile-First Treatment Pricing Cards',
      hotspot: {
        x: 32,
        y: 42,
        labelVi: 'Mobile-First Treatment & AUD Pricing Cards',
        labelEn: 'Mobile-First Treatment & AUD Pricing Cards',
        actionVi: 'Bảng giá minh bạch từng dịch vụ: Acrylic, Shellac, Spa Pedicure',
        actionEn: 'Transparent AUD pricing: Acrylic, Shellac, Spa Pedicure',
        descriptionVi: 'Khách hàng truy cập từ Instagram hoặc Google Maps có thể xem giá rõ ràng chỉ sau 1 chạm.',
        descriptionEn: 'Instant 1-tap pricing clarity for clients arriving via Instagram or Google Maps.',
      },
      cursor: {
        x: 35,
        y: 44,
        actionTextVi: 'Chọn dịch vụ Acrylic Full Set ($65)',
        actionTextEn: 'Select Acrylic Full Set ($65)',
      },
      takeawayVi: 'Minh bạch giá dịch vụ giúp giảm 70% các câu hỏi hỏi giá qua tin nhắn điện thoại.',
      takeawayEn: 'Upfront AUD pricing eliminates 70% of repetitive pricing inquiry calls.',
    },
    {
      imageUrl: '/projects/fashion-nail-services.jpg',
      imageCaptionVi: 'Khung Đặt Lịch Hẹn Nhanh 1 Chạm (One-Tap Booking)',
      imageCaptionEn: 'One-Tap Appointment Request Form',
      imageAlt: 'One-Tap Appointment Request Form',
      hotspot: {
        x: 68,
        y: 46,
        labelVi: 'One-Tap Appointment Request Modal',
        labelEn: 'One-Tap Appointment Request Modal',
        actionVi: 'Chọn thợ nail yêu thích, ngày giờ và số điện thoại liên lạc',
        actionEn: 'Select preferred nail artist, date/time and phone contact',
        descriptionVi: 'Tối ưu biểu mẫu không cần đăng ký tài khoản rườm rà, tăng tỉ lệ chuyển đổi đặt lịch lên 40%.',
        descriptionEn: 'Frictionless modal requiring no account registration, lifting conversion by 40%.',
      },
      cursor: {
        x: 66,
        y: 48,
        actionTextVi: 'Chọn giờ 14:30 & thợ Sarah',
        actionTextEn: 'Select 14:30 & Artist Sarah',
      },
      takeawayVi: 'Quy trình đặt hẹn 3 bước siêu tốc hoàn thành chỉ trong vòng chưa đầy 30 giây.',
      takeawayEn: 'Streamlined 3-step appointment flow completed in under 30 seconds.',
    },
    {
      imageUrl: '/projects/fashion-nail-services.jpg',
      imageCaptionVi: 'Thông báo Lịch hẹn Tức thì qua Resend API',
      imageCaptionEn: 'Automated Resend API Notification Stream',
      imageAlt: 'Automated Resend API Notification Handler',
      hotspot: {
        x: 50,
        y: 60,
        labelVi: 'Node.js & Resend API Notification Stream',
        labelEn: 'Node.js & Resend API Notification Stream',
        actionVi: 'Gửi email xác nhận tức thời cho khách và chủ tiệm',
        actionEn: 'Dispatch instant confirmation emails to customer & salon',
        descriptionVi: 'Yêu cầu được lưu vào PostgreSQL Neon và kích hoạt email HTML gửi đến hộp thư salon trong 350ms.',
        descriptionEn: 'Persists records into Neon PostgreSQL while triggering responsive HTML emails within 350ms.',
      },
      cursor: {
        x: 52,
        y: 62,
        actionTextVi: 'Gửi email thông báo tự động',
        actionTextEn: 'Trigger automated email alert',
      },
      takeawayVi: 'Đảm bảo chủ salon không bỏ sót bất kỳ lịch hẹn nào ngay cả trong giờ làm bận rộn.',
      takeawayEn: 'Ensures salon managers never miss walk-in or online requests during peak hours.',
    },
    {
      imageUrl: '/projects/fashion-nail-hero.jpg',
      imageCaptionVi: 'Tích hợp Google Maps & Local SEO Tây Úc',
      imageCaptionEn: 'Google Maps Directions & Local SEO Morley',
      imageAlt: 'Google Maps Directions & Local SEO',
      hotspot: {
        x: 38,
        y: 66,
        labelVi: 'Google Maps Embed & 1-Tap Call Action',
        labelEn: 'Google Maps Embed & 1-Tap Call Action',
        actionVi: 'Chỉ đường 1 chạm và gọi điện thoại trực tiếp từ điện thoại',
        actionEn: '1-tap GPS directions and direct telephone call trigger',
        descriptionVi: 'Tối ưu hóa tìm kiếm địa phương tại khu vực Morley, Tây Úc giúp salon đón thêm khách vãng lai.',
        descriptionEn: 'Geo-targeted schema markup for Morley WA suburbs driving high local foot-traffic.',
      },
      cursor: {
        x: 38,
        y: 68,
        actionTextVi: 'Chỉ đường tới salon trên Maps',
        actionTextEn: 'Get directions on Maps',
      },
      takeawayVi: 'Tối ưu hóa Local SEO mang lại hơn 180 lượt tìm kiếm chỉ đường mới mỗi tháng.',
      takeawayEn: 'Local SEO schema generates over 180 new GPS navigation requests every month.',
    },
    {
      imageUrl: '/projects/fashion-nail-hero.jpg',
      imageCaptionVi: 'Vận hành Thực tế tại fashionnailmorley.com.au',
      imageCaptionEn: 'Live Commercial Deployment at fashionnailmorley.com.au',
      imageAlt: 'Live Commercial Deployment at fashionnailmorley.com.au',
      hotspot: {
        x: 50,
        y: 28,
        labelVi: 'Live Site at fashionnailmorley.com.au',
        labelEn: 'Live Site at fashionnailmorley.com.au',
        actionVi: 'Trang web phục vụ khách hàng Úc với tốc độ tải dưới 1 giây',
        actionEn: 'Serving WA clients with sub-1s load times via Vite SPA',
        descriptionVi: 'Ứng dụng React & Vite siêu nhẹ, mang lại doanh thu và sự hài lòng cao cho chủ tiệm.',
        descriptionEn: 'Lightweight Vite React bundle with 98+ Google Lighthouse performance score.',
      },
      cursor: {
        x: 50,
        y: 31,
        actionTextVi: 'Trải nghiệm trang web thực tế',
        actionTextEn: 'Visit live production website',
      },
      takeawayVi: 'Điểm hiệu năng Google PageSpeed 98/100, tạo ấn tượng chuyên nghiệp tuyệt đối với khách hàng.',
      takeawayEn: 'Perfect 98/100 Google PageSpeed score, delivering premium credibility to Australian clients.',
    },
  ],
  'examplatform-ai': [
    {
      imageUrl: '/projects/exam-platform-hero.png',
      imageCaptionVi: 'Phòng thi Trực tuyến Không Xao nhãng (Distraction-Free)',
      imageCaptionEn: 'Distraction-Free Assessment Exam Room',
      imageAlt: 'Distraction-Free Assessment Exam Room',
      hotspot: {
        x: 50,
        y: 34,
        labelVi: 'Distraction-Free Exam Assessment Room',
        labelEn: 'Distraction-Free Exam Assessment Room',
        actionVi: 'Không gian làm bài chuẩn mực với đồng hồ đếm ngược và bảng câu hỏi',
        actionEn: 'Focused testing canvas with live countdown & question matrix',
        descriptionVi: 'Loại bỏ các thành phần gây nhiễu, giúp sinh viên tập trung tối đa trong suốt thời gian làm bài.',
        descriptionEn: 'Stripped of non-essential elements to maintain complete student focus throughout assessment.',
      },
      cursor: {
        x: 52,
        y: 36,
        actionTextVi: 'Bắt đầu làm bài thi',
        actionTextEn: 'Start assessment session',
      },
      takeawayVi: 'Giao diện tối giản loại bỏ 100% các yếu tố xao nhãng, nâng cao độ tập trung của thí sinh.',
      takeawayEn: 'Minimalist layout eliminates 100% of distractions, maximizing candidate focus.',
    },
    {
      imageUrl: '/projects/exam-platform-hero.png',
      imageCaptionVi: 'Cơ chế Thích ứng Độ khó Câu hỏi (Adaptive Difficulty)',
      imageCaptionEn: 'Adaptive Question Difficulty Progression Engine',
      imageAlt: 'Adaptive Question Difficulty Progression',
      hotspot: {
        x: 28,
        y: 54,
        labelVi: 'Adaptive Difficulty Progression Engine',
        labelEn: 'Adaptive Difficulty Progression Engine',
        actionVi: 'Tự động điều chỉnh độ khó câu hỏi tiếp theo theo năng lực',
        actionEn: 'Dynamically scales question complexity based on performance',
        descriptionVi: 'Thuật toán đánh giá độ chính xác của câu trả lời trước để đưa ra câu hỏi phân hóa phù hợp.',
        descriptionEn: 'Algorithmic assessment evaluates prior responses to calibrate future item difficulty levels.',
      },
      cursor: {
        x: 30,
        y: 56,
        actionTextVi: 'Chọn đáp án câu hỏi phân hóa',
        actionTextEn: 'Select advanced answer',
      },
      takeawayVi: 'Phân loại chính xác 5 cấp bậc năng lực sinh viên ngay trong cùng một đề thi chung.',
      takeawayEn: 'Accurately segments 5 tiers of candidate competency within a single standardized test.',
    },
    {
      imageUrl: '/projects/exam-platform-overview.png',
      imageCaptionVi: 'Giám sát Tab Blur & Chống Gian lận (Anti-Cheat Telemetry)',
      imageCaptionEn: 'Anti-Cheat Tab Monitoring & Integrity Telemetry',
      imageAlt: 'Anti-Cheat Tab Monitoring & Integrity Telemetry',
      hotspot: {
        x: 75,
        y: 30,
        labelVi: 'Anti-Cheat Tab Blur & Integrity Lock',
        labelEn: 'Anti-Cheat Tab Blur & Integrity Lock',
        actionVi: 'Phát hiện thí sinh rời khỏi tab thi hoặc chuyển sang cửa sổ khác',
        actionEn: 'Detects blur events, window defocus, and clipboard actions',
        descriptionVi: 'Phiên thi sử dụng mã hóa JWT và ghi nhận số lần mất focus để đảm bảo tính công bằng học thuật.',
        descriptionEn: 'Enforces JWT session telemetry and logs defocus events to maintain academic integrity.',
      },
      cursor: {
        x: 73,
        y: 32,
        actionTextVi: 'Ghi nhận sự kiện đổi tab',
        actionTextEn: 'Log tab switch event',
      },
      takeawayVi: 'Giảm 94% các hành vi gian lận tra cứu tài liệu trái phép trong các kỳ thi học thuật trực tuyến.',
      takeawayEn: 'Reduces unauthorized external lookups by 94% across virtual academic exams.',
    },
    {
      imageUrl: '/projects/exam-platform-hero.png',
      imageCaptionVi: 'Đồng hồ Đếm ngược & Tự động Lưu vào Redis Cache (Autosave)',
      imageCaptionEn: 'Live Countdown Timer & Redis Autosave Engine',
      imageAlt: 'Live Countdown Timer & Redis Autosave Engine',
      hotspot: {
        x: 80,
        y: 25,
        labelVi: 'Sub-Second Autosave to Redis Cache (6ms)',
        labelEn: 'Sub-Second Autosave to Redis Cache (6ms)',
        actionVi: 'Lưu đáp án ngay khi click với độ trễ chỉ 6ms',
        actionEn: 'Persists student selections to memory in 6ms latency',
        descriptionVi: 'Dữ liệu lưu tạm trên Redis in-memory cache, ngăn ngừa tuyệt đối nguy cơ mất bài thi do rớt mạng.',
        descriptionEn: 'In-memory Redis buffers eliminate any risk of answer loss during intermittent network drops.',
      },
      cursor: {
        x: 78,
        y: 28,
        actionTextVi: 'Lưu đáp án câu 03 vào Redis',
        actionTextEn: 'Autosave answer to Redis',
      },
      takeawayVi: 'Bảo vệ bài làm 100% an toàn ngay cả khi trình duyệt bất ngờ bị đóng hoặc mất kết nối mạng.',
      takeawayEn: 'Guarantees 100% exam progress retention even during sudden tab closes or WiFi drops.',
    },
    {
      imageUrl: '/projects/exam-platform-overview.png',
      imageCaptionVi: 'Báo cáo Phân tích AI Rubric theo từng Khái niệm Kiến thức',
      imageCaptionEn: 'AI Evaluation Rubrics & Conceptual Breakdown',
      imageAlt: 'AI Evaluation Rubric & Conceptual Mastery',
      hotspot: {
        x: 45,
        y: 55,
        labelVi: 'AI Evaluation Rubrics & Conceptual Breakdown',
        labelEn: 'AI Evaluation Rubrics & Conceptual Breakdown',
        actionVi: 'Chấm điểm chi tiết và gợi ý lộ trình cải thiện cho từng sinh viên',
        actionEn: 'Actionable diagnostic breakdown across technical mastery areas',
        descriptionVi: 'Báo cáo phân tích chuẩn xác điểm mạnh, điểm yếu theo từng chủ đề kiến thức kỹ thuật phần mềm.',
        descriptionEn: 'Pinpoints conceptual deficiencies and recommends personalized revision pathways.',
      },
      cursor: {
        x: 47,
        y: 57,
        actionTextVi: 'Xem phân tích gợi ý ôn tập',
        actionTextEn: 'View AI diagnostic summary',
      },
      takeawayVi: 'Giúp sinh viên nhận diện ngay các lỗ hổng kiến thức để ôn tập có trọng tâm thay vì học dàn trải.',
      takeawayEn: 'Enables candidates to isolate conceptual gaps immediately for targeted revisions.',
    },
    {
      imageUrl: '/projects/exam-platform-hero.png',
      imageCaptionVi: 'Kiến trúc State Management & Redis Caching',
      imageCaptionEn: 'Decoupled React-Node-Redis Architecture',
      imageAlt: 'Decoupled React-Node-Redis Architecture',
      hotspot: {
        x: 32,
        y: 38,
        labelVi: 'Decoupled Architecture & Connection Pooling',
        labelEn: 'Decoupled Architecture & Connection Pooling',
        actionVi: 'Xây dựng REST API, quản lý phiên thi và đồng bộ PostgreSQL',
        actionEn: 'Engineered REST endpoints, session isolation & Neon sync',
        descriptionVi: 'Tách biệt giữa phiên làm bài tốc độ cao và lưu trữ điểm lâu dài, chịu tải tốt khi thi tập trung.',
        descriptionEn: 'High-speed in-memory session tier completely separated from persistent reporting tier.',
      },
      cursor: {
        x: 34,
        y: 40,
        actionTextVi: 'Đồng bộ kết quả về PostgreSQL',
        actionTextEn: 'Sync exam grades to PostgreSQL',
      },
      takeawayVi: 'Chịu tải ổn định trên 500 sinh viên nộp bài cùng một thời điểm mà không gây nghẽn database.',
      takeawayEn: 'Effortlessly handles 500+ concurrent submissions at submission deadlines without lag.',
    },
    {
      imageUrl: '/projects/exam-platform-overview.png',
      imageCaptionVi: 'Vận hành tại exam-platform.online & Mở rộng Tự luận',
      imageCaptionEn: 'Live Platform at exam-platform.online & AI Essay Expansion',
      imageAlt: 'Production at exam-platform.online',
      hotspot: {
        x: 50,
        y: 42,
        labelVi: 'Live Platform at exam-platform.online',
        labelEn: 'Live Platform at exam-platform.online',
        actionVi: 'Phục vụ hàng trăm lượt thi thử trực tuyến ổn định',
        actionEn: 'Serving real mock exams with automated grading pipelines',
        descriptionVi: 'Nền tảng liên tục được mở rộng với tính năng chấm điểm tự luận tự động bằng AI.',
        descriptionEn: 'Scalable educational platform expanding into automated AI essay evaluation.',
      },
      cursor: {
        x: 50,
        y: 44,
        actionTextVi: 'Xem tổng quan kết quả thi',
        actionTextEn: 'Inspect exam summary metrics',
      },
      takeawayVi: 'Minh chứng cho tiềm năng của việc ứng dụng AI vào tự động hóa chấm điểm và khảo thí.',
      takeawayEn: 'Demonstrates the power of agentic AI in automating academic grading pipelines.',
    },
  ],
  'vk-digital-hub': [
    {
      imageUrl: '/projects/vk-digital-hero.png',
      imageCaptionVi: 'Mặt tiền Số Agency Tiếp thị Tăng trưởng Gam màu Emerald Green',
      imageCaptionEn: 'Digital Growth Agency Front Door & Client Showcase',
      imageAlt: 'VK Digital Hub Front Door & Client Showcase',
      hotspot: {
        x: 50,
        y: 34,
        labelVi: 'Digital Growth Agency Front Door',
        labelEn: 'Digital Growth Agency Front Door',
        actionVi: 'Showcase năng lực tiếp thị số và chỉ số ROI khách hàng',
        actionEn: 'Showcase digital marketing solutions & real client ROI',
        descriptionVi: 'Bố cục chuẩn agency quốc tế, tập trung vào giá trị chuyển đổi và uy tín thương hiệu.',
        descriptionEn: 'International agency layout optimized for brand prestige and corporate conversions.',
      },
      cursor: {
        x: 52,
        y: 36,
        actionTextVi: 'Xem các giải pháp tăng trưởng',
        actionTextEn: 'Explore growth solutions',
      },
      takeawayVi: 'Thiết kế định vị agency chuyên nghiệp, tăng tỷ lệ liên hệ của khách hàng doanh nghiệp lên 45%.',
      takeawayEn: 'Premium agency positioning increases B2B client consultation requests by 45%.',
    },
    {
      imageUrl: '/projects/vk-digital-hero.png',
      imageCaptionVi: 'Bằng chứng Số liệu & Chỉ số ROI Khách hàng',
      imageCaptionEn: 'Client ROI Proof & Performance Metrics',
      imageAlt: 'Client ROI Proof & Social Metrics',
      hotspot: {
        x: 40,
        y: 54,
        labelVi: 'Client ROI & Performance Metrics Proof',
        labelEn: 'Client ROI & Performance Metrics Proof',
        actionVi: 'Minh họa tỉ lệ chuyển đổi và tăng trưởng doanh thu thực tế',
        actionEn: 'Visualizes real client conversion lift and revenue growth',
        descriptionVi: 'Báo cáo trực quan các chỉ số ROAS, tỉ lệ lead và chi phí trên mỗi khách hàng tiềm năng.',
        descriptionEn: 'Transparent reporting of ROAS, lead acquisition cost, and revenue trajectory.',
      },
      cursor: {
        x: 42,
        y: 56,
        actionTextVi: 'Xem báo cáo tăng trưởng ROI',
        actionTextEn: 'Review client ROI metrics',
      },
      takeawayVi: 'Minh chứng số liệu thực tế giúp xây dựng niềm tin vững chắc ngay từ lần truy cập đầu tiên.',
      takeawayEn: 'Hard metric proof instills immediate credibility upon first impression.',
    },
    {
      imageUrl: '/projects/vk-digital-services.png',
      imageCaptionVi: 'Webhook Make.com Zero-Latency Lead Ingestion',
      imageCaptionEn: 'Make.com Zero-Latency Webhook Automation Engine',
      imageAlt: 'Make.com Webhook Lead Automation Engine',
      hotspot: {
        x: 60,
        y: 40,
        labelVi: 'Make.com Zero-Latency Webhook Ingestion',
        labelEn: 'Make.com Zero-Latency Webhook Ingestion',
        actionVi: 'Đẩy dữ liệu khách tiềm năng tức thì vào CRM và Slack',
        actionEn: 'Streams prospect inquiries straight to CRM & Slack in 180ms',
        descriptionVi: 'Khách hàng gửi form trên website -> Webhook kích hoạt kịch bản Make -> Bắn notification về Slack trong 180ms.',
        descriptionEn: 'Website submission triggers serverless Make.com webhook pushing instant lead alert to Slack in 180ms.',
      },
      cursor: {
        x: 58,
        y: 42,
        actionTextVi: 'Bắn webhook sang Make.com',
        actionTextEn: 'Fire webhook payload to Make.com',
      },
      takeawayVi: 'Rút ngắn thời gian phản hồi khách tiềm năng từ vài tiếng xuống dưới 5 phút.',
      takeawayEn: 'Slashes inbound lead response times from hours to under 5 minutes.',
    },
    {
      imageUrl: '/projects/vk-digital-services.png',
      imageCaptionVi: 'Ma trận So sánh Gói dịch vụ Tăng trưởng (Service Matrix)',
      imageCaptionEn: 'Interactive Growth Service Tier Matrix',
      imageAlt: 'Interactive Growth Service Matrix',
      hotspot: {
        x: 30,
        y: 50,
        labelVi: 'Interactive Growth Service Tier Matrix',
        labelEn: 'Interactive Growth Service Tier Matrix',
        actionVi: 'Phân tầng rõ ràng giữa SEO, Google Ads và Xây dựng thương hiệu',
        actionEn: 'Clear breakdown across SEO, Paid Performance, and Branding',
        descriptionVi: 'Bảng giá và quyền lợi minh bạch, giúp khách hàng doanh nghiệp dễ dàng ra quyết định.',
        descriptionEn: 'Transparent deliverables helping corporate decision makers choose the right tier.',
      },
      cursor: {
        x: 32,
        y: 52,
        actionTextVi: 'Chọn gói Growth Partner',
        actionTextEn: 'Select Growth Partner package',
      },
      takeawayVi: 'Bảng giá phân tầng rõ ràng giúp tăng 2.5 lần tỷ lệ chọn gói giải pháp toàn diện.',
      takeawayEn: 'Clear tiering delivers a 2.5x lift in comprehensive package selections.',
    },
    {
      imageUrl: '/projects/vk-digital-services.png',
      imageCaptionVi: 'Tự động Gửi Email Chào mừng & Đồng bộ Slack Team',
      imageCaptionEn: 'Automated Prospect Follow-Up & Slack Sync',
      imageAlt: 'Automated Prospect Follow-Up & Slack Sync',
      hotspot: {
        x: 75,
        y: 60,
        labelVi: 'Instant Lead Notification to Slack & Email',
        labelEn: 'Instant Lead Notification to Slack & Email',
        actionVi: 'Đồng bộ đa nền tảng không có độ trễ',
        actionEn: 'Multi-platform synchronization with zero delays',
        descriptionVi: 'Đội ngũ tư vấn nhận được thông báo ngay lập tức trên điện thoại để liên hệ lại khách trong vòng 5 phút.',
        descriptionEn: 'Consulting team receives push alerts instantly on mobile to call back prospects within minutes.',
      },
      cursor: {
        x: 73,
        y: 62,
        actionTextVi: 'Đồng bộ lead vào kênh Slack',
        actionTextEn: 'Sync lead into Slack channel',
      },
      takeawayVi: 'Tăng 3.2 lần tỷ lệ chốt đơn nhờ tốc độ liên hệ phản hồi khách hàng siêu tốc.',
      takeawayEn: 'Drives a 3.2x increase in closed contracts by following up with leads within minutes.',
    },
    {
      imageUrl: '/projects/vk-digital-hero.png',
      imageCaptionVi: 'Lập trình Giao diện React & Tích hợp Webhook',
      imageCaptionEn: 'Front-End Engineering & Webhook Setup',
      imageAlt: 'Front-End Engineering & Webhook Setup',
      hotspot: {
        x: 50,
        y: 64,
        labelVi: 'Responsive UI Architecture & Form Validation',
        labelEn: 'Responsive UI Architecture & Form Validation',
        actionVi: 'Xây dựng form xác thực dữ liệu và kết nối webhook endpoint',
        actionEn: 'Form validation, error boundary & webhook connection',
        descriptionVi: 'Xử lý phản hồi trạng thái gửi thành công, giao diện nhẹ nhàng tải nhanh trên mạng di động.',
        descriptionEn: 'Lightweight React bundle with zero bloat ensuring instant loads on mobile 4G/5G.',
      },
      cursor: {
        x: 50,
        y: 66,
        actionTextVi: 'Kiểm tra form validation',
        actionTextEn: 'Verify form validation state',
      },
      takeawayVi: 'Form validation mượt mà giúp giảm 99% các trường hợp gửi nhầm số điện thoại hoặc email sai.',
      takeawayEn: 'Client-side validation eliminates 99% of invalid telephone or email submissions.',
    },
    {
      imageUrl: '/projects/vk-digital-hero.png',
      imageCaptionVi: 'Triển khai Thực tế tại vkdigitalhub.netlify.app',
      imageCaptionEn: 'Live Deployment at vkdigitalhub.netlify.app',
      imageAlt: 'Live Deployment at vkdigitalhub.netlify.app',
      hotspot: {
        x: 50,
        y: 26,
        labelVi: 'Live Platform at vkdigitalhub.netlify.app',
        labelEn: 'Live Platform at vkdigitalhub.netlify.app',
        actionVi: 'Vận hành ổn định 100% không tốn chi phí máy chủ backend',
        actionEn: '100% uptime with zero server maintenance overhead',
        descriptionVi: 'Mô hình Serverless kết hợp No-code Automation mang lại hiệu quả vượt trội cho khách hàng.',
        descriptionEn: 'Modern Jamstack architecture paired with webhook automation for zero hosting bills.',
      },
      cursor: {
        x: 50,
        y: 29,
        actionTextVi: 'Mở website agency thực tế',
        actionTextEn: 'Visit live agency website',
      },
      takeawayVi: 'Mô hình Jamstack Serverless vận hành ổn định 100% mà không tốn chi phí duy trì máy chủ.',
      takeawayEn: 'Serverless Jamstack architecture running at 100% reliability with zero hosting overhead.',
    },
  ],
  'nh-huynh-portfolio': [
    {
      imageUrl: '/projects/portfolio-hero.png',
      imageCaptionVi: 'Giao diện Trang chủ & Hero Section Chân dung 3D Light Theme',
      imageCaptionEn: 'Refined Light Theme & 3D Portrait Hero View',
      imageAlt: 'Nguyễn Hoàng Huynh Portfolio Hero View',
      hotspot: {
        x: 26,
        y: 34,
        labelVi: 'Tiêu đề Tên Phát quang & Light Theme Header',
        labelEn: 'Luminous Typography & Refined Light Theme',
        actionVi: 'Hiệu ứng ánh sáng chuyển màu động trên tên Nguyễn Hoàng Huynh',
        actionEn: 'Dynamic chromatic light sweep across name typography',
        descriptionVi: 'Bố cục Light Theme tinh tế (#F8FAFC, #FFFFFF), viền thanh thoát và điểm nhấn typography sắc sảo.',
        descriptionEn: 'Curated Light Theme palette (#F8FAFC, #FFFFFF) with clean typography and subtle lighting.',
      },
      cursor: {
        x: 28,
        y: 37,
        actionTextVi: 'Chiêm ngưỡng hiệu ứng phát sáng',
        actionTextEn: 'Observe headline glow effect',
      },
      takeawayVi: 'Tạo ấn tượng thị giác chuyên nghiệp và chỉn chu ngay trong 3 giây đầu tiên tiếp cận portfolio.',
      takeawayEn: 'Creates a striking, polished first impression within the first 3 seconds of visit.',
    },
    {
      imageUrl: '/projects/portfolio-projects.png',
      imageCaptionVi: 'Bộ sưu tập Dự án Nổi bật với Hiệu ứng 3D Tilt & Hào quang Động',
      imageCaptionEn: 'Featured Projects 3D Tilt Cards with Dynamic Backlight',
      imageAlt: 'Featured Projects 3D Tilt Cards',
      hotspot: {
        x: 32,
        y: 54,
        labelVi: 'Thẻ Dự án 3D Tilt & Backlight Glow theo Chuột',
        labelEn: '3D Tilt Project Cards & Mouse Reactive Backlight',
        actionVi: 'Tính toán góc xoay 3D và di chuyển vầng hào quang theo tọa độ con trỏ',
        actionEn: 'Calculates 3D rotation angles & moves ambient backlight glow',
        descriptionVi: 'Góc nghiêng được kiểm soát vừa phải, tự nhiên, hiển thị vai trò và thời gian làm dự án theo tháng/năm.',
        descriptionEn: 'Natural perspective tilt reacting fluidly to cursor coordinates with normalized timelines.',
      },
      cursor: {
        x: 34,
        y: 56,
        actionTextVi: 'Rê chuột kiểm tra góc nghiêng 3D',
        actionTextEn: 'Hover to test 3D tilt perspective',
      },
      takeawayVi: 'Biến các danh sách dự án khô khan thành những khối tương tác sống động, trực quan.',
      takeawayEn: 'Transforms static project lists into alive, tactile 3D interactive artifacts.',
    },
    {
      imageUrl: '/projects/portfolio-scrollytelling.png',
      imageCaptionVi: 'Động cơ Scrollytelling Đồng bộ Chia đôi Màn hình',
      imageCaptionEn: 'Synchronized Split-Screen Sticky Scrollytelling Stage',
      imageAlt: 'Interactive Scrollytelling Stage',
      hotspot: {
        x: 70,
        y: 38,
        labelVi: 'Sân khấu Trực quan Ghim Cố định (Sticky Stage)',
        labelEn: 'Sticky Split-Screen Visual Stage',
        actionVi: 'Giữ cố định thiết bị bên phải khi người xem cuộn qua các chương câu chuyện',
        actionEn: 'Pins device frame on right while user scrolls narrative chapters',
        descriptionVi: 'Tối ưu hóa IntersectionObserver để chuyển đổi trạng thái mượt mà không giật khung hình.',
        descriptionEn: 'High-performance IntersectionObserver orchestrating seamless stage state transitions.',
      },
      cursor: {
        x: 68,
        y: 40,
        actionTextVi: 'Cuộn trang trải nghiệm đồng bộ',
        actionTextEn: 'Scroll to experience synchronized stage',
      },
      takeawayVi: 'Kể câu chuyện kỹ thuật từng bước mạch lạc như một bài thuyết trình case study tiêu chuẩn quốc tế.',
      takeawayEn: 'Tells technical engineering stories with narrative clarity matching international design standards.',
    },
    {
      imageUrl: '/projects/portfolio-scrollytelling.png',
      imageCaptionVi: 'Điểm nhấn Radar Hotspot & Con trỏ Thao tác Mô phỏng',
      imageCaptionEn: 'Radar Hotspot System & Simulated Cursor Pointer',
      imageAlt: 'Radar Hotspot Pin & Cursor',
      hotspot: {
        x: 50,
        y: 48,
        labelVi: 'Điểm Radar Hotspot Xung nhịp & Thẻ Hành động',
        labelEn: 'Pulsing Radar Hotspot & Contextual Callout',
        actionVi: 'Định vị chính xác thành phần UI đang được đề cập trong nội dung',
        actionEn: 'Pinpoints exact UI feature explained in current chapter',
        descriptionVi: 'Hiển thị giải thích chi tiết khi hover và con trỏ chuột mô phỏng thao tác người dùng.',
        descriptionEn: 'Expandable card explains the architectural rationale and user interaction cue.',
      },
      cursor: {
        x: 52,
        y: 50,
        actionTextVi: 'Chỉ rõ vị trí nút bấm & hành động',
        actionTextEn: 'Locate UI component and action',
      },
      takeawayVi: 'Người đọc không bao giờ bị lạc khi xem ảnh chụp màn hình nhờ hệ thống định vị radar chính xác.',
      takeawayEn: 'Visitors never get lost in complex screenshots thanks to precise radar targeting.',
    },
    {
      imageUrl: '/projects/portfolio-scrollytelling.png',
      imageCaptionVi: 'Mỗi Dự án Sở hữu Animation & Storytelling Riêng biệt',
      imageCaptionEn: 'Bespoke Animations & Tailored Storytelling per Project',
      imageAlt: 'Unique Project Storytelling Themes',
      hotspot: {
        x: 50,
        y: 78,
        labelVi: 'Ngôn ngữ Thiết kế Riêng cho Từng Dự án',
        labelEn: 'Domain-Tailored Storytelling Atmosphere',
        actionVi: 'Mỗi dự án mang một phong cách visual và animation độc bản',
        actionEn: 'Each project boasts unique domain-specific motion aesthetics',
        descriptionVi: 'Ticket Concert mang sóng âm Cyber; Fashion Nail mang hiệu ứng Ken Burns & Bokeh vàng; ExamPlatform mang radar AI proctoring.',
        descriptionEn: 'Concert features audio waves; Fashion Nail features Ken Burns & gold bokeh; ExamPlatform features AI proctoring HUD.',
      },
      cursor: {
        x: 50,
        y: 80,
        actionTextVi: 'Chiêm ngưỡng chuyển động động cơ',
        actionTextEn: 'Observe thematic motion design',
      },
      takeawayVi: 'Tôn vinh tính cá bản của từng dự án, chứng minh năng lực thiết kế UI/UX phong phú và đa dạng.',
      takeawayEn: 'Celebrates each project’s unique identity, showcasing versatile UI/UX craftsmanship.',
    },
    {
      imageUrl: '/projects/portfolio-admin.png',
      imageCaptionVi: 'Cổng Đăng nhập Quản trị Nội dung CMS Bảo mật Session HttpOnly',
      imageCaptionEn: 'CMS Administration Portal with HttpOnly Session Security',
      imageAlt: 'CMS Administration Portal',
      hotspot: {
        x: 50,
        y: 50,
        labelVi: 'Cổng Xác thực Admin & CRUD API Layer',
        labelEn: 'Secure Admin Auth & CRUD API Layer',
        actionVi: 'Bảo mật tài khoản với scrypt password hash và HttpOnly session cookie',
        actionEn: 'Hardened auth with scrypt hashing and HttpOnly session cookies',
        descriptionVi: 'Cho phép quản trị viên thêm/sửa/xóa dự án, điều chỉnh nội dung các chương và xem tin nhắn.',
        descriptionEn: 'Allows authenticated admin to manage case studies, projects, and incoming contact messages.',
      },
      cursor: {
        x: 50,
        y: 54,
        actionTextVi: 'Đăng nhập vào bảng quản trị',
        actionTextEn: 'Authenticate into CMS dashboard',
      },
      takeawayVi: 'Hệ thống CMS toàn diện giúp quản trị viên chủ động cập nhật dữ liệu portfolio theo thời gian thực.',
      takeawayEn: 'Full-stack CMS enables seamless, real-time portfolio content updates without redeployment.',
    },
    {
      imageUrl: '/projects/portfolio-about.png',
      imageCaptionVi: 'Hồ sơ Năng lực Kỹ thuật & Bảng Kỹ năng Phân tầng',
      imageCaptionEn: 'Verified Technical Profile & Tiered Skills Matrix',
      imageAlt: 'About Technical Profile',
      hotspot: {
        x: 45,
        y: 40,
        labelVi: 'Hồ sơ Xác thực & Ma trận Kỹ năng Chuyên sâu',
        labelEn: 'Verified Competency & Technical Matrix',
        actionVi: 'Minh bạch năng lực, thông tin học vấn GPA 3.1 và chứng chỉ TOEIC 550',
        actionEn: 'Transparent profile with GPA 3.1 and TOEIC 550 credentials',
        descriptionVi: 'Trình độ sẵn sàng cho các vị trí Full-Stack Developer Intern, Fresher & Junior.',
        descriptionEn: 'Industry-ready portfolio tailored for Full-Stack Intern, Fresher, and Junior roles.',
      },
      cursor: {
        x: 45,
        y: 42,
        actionTextVi: 'Xem chứng chỉ TOEIC & kỹ năng',
        actionTextEn: 'Inspect TOEIC certificate & skills',
      },
      takeawayVi: 'Minh bạch và chuẩn mực học vấn, tạo sự tin cậy cao nhất đối với các nhà tuyển dụng công nghệ.',
      takeawayEn: 'Rigorous transparency and verified credentials build deep trust with engineering recruiters.',
    },
  ],
  'skyroute-aviation-ops': [
    {
      imageUrl: '/projects/skyroute-hero.png',
      imageCaptionVi: 'Bản đồ Radar Giám sát Chuyến bay Toàn cầu & HUD Telemetry',
      imageCaptionEn: 'Global Flight Radar Operations & HUD Telemetry',
      imageAlt: 'SkyRoute Flight Dispatch Radar Dashboard',
      hotspot: {
        x: 50,
        y: 35,
        labelVi: '3D Exploded Flight Radar & Telemetry HUD',
        labelEn: '3D Exploded Flight Radar & Telemetry HUD',
        actionVi: 'Kích hoạt radar không lưu & stream dữ liệu ADS-B thời gian thực',
        actionEn: 'Activate airspace radar & real-time ADS-B telemetry stream',
        descriptionVi: 'Màn hình hiển thị tọa độ chuyến bay, độ cao FL360, tốc độ mặt đất 485kts và trạng thái cân bằng tải.',
        descriptionEn: 'High-density cockpit radar displaying live coordinates, FL360 altitude, 485kts ground speed, and load balance.',
      },
      cursor: {
        x: 52,
        y: 37,
        actionTextVi: 'Kích hoạt radar không lưu ADS-B',
        actionTextEn: 'Activate ADS-B radar stream',
      },
      takeawayVi: 'Theo dõi đồng thời hàng trăm chuyến bay với tần số cập nhật dữ liệu 1090MHz ADS-B dưới 80ms.',
      takeawayEn: 'Concurrent tracking of global flights via 1090MHz ADS-B with sub-80ms message delivery.',
    },
    {
      imageUrl: '/projects/skyroute-hero.png',
      imageCaptionVi: 'Kiến trúc 3D Exploded Đa tầng: 4 Lớp Hệ thống Phân tán',
      imageCaptionEn: '3D Exploded-View Architecture: 4 Distributed Layers',
      imageAlt: 'SkyRoute 3D Exploded Architecture Diagram',
      hotspot: {
        x: 74,
        y: 32,
        labelVi: '3D Exploded System Architecture Layer',
        labelEn: '3D Exploded System Architecture Layer',
        actionVi: 'Bóc tách tầng Trình diễn → Cổng Telemetry → Động cơ C.G → Database',
        actionEn: 'Explode Presentation → Telemetry Gateway → C.G Engine → Database layers',
        descriptionVi: 'Bóc tách trực quan 4 tầng hệ thống giúp giải thích rõ ràng luồng dữ liệu thời gian thực và an toàn bay.',
        descriptionEn: 'Visual exploded-view separating frontend presentation, WebSocket gateway, aerodynamic calculation, and Geo spatial storage.',
      },
      cursor: {
        x: 72,
        y: 34,
        actionTextVi: 'Bóc tách 4 tầng kiến trúc 3D',
        actionTextEn: 'Explode 4-layer 3D architecture',
      },
      takeawayVi: 'Bóc tách 4 lớp hệ thống giúp cô lập hoàn toàn tiến trình tính toán khí động học khỏi luồng radar streaming.',
      takeawayEn: 'Isolating aerodynamic physics engine from WebSocket radar pub/sub prevents telemetry bottlenecks.',
    },
    {
      imageUrl: '/projects/skyroute-cargo.png',
      imageCaptionVi: 'Đồ thị Phong bì Trọng tâm C.G Boeing 777F Thời gian thực',
      imageCaptionEn: 'Real-Time Boeing 777F Center of Gravity (C.G) Envelope',
      imageAlt: 'SkyRoute Center of Gravity Envelope Polygon',
      hotspot: {
        x: 78,
        y: 48,
        labelVi: 'Center of Gravity (% MAC) Safety Envelope',
        labelEn: 'Center of Gravity (% MAC) Safety Envelope',
        actionVi: 'Tính toán vị trí % MAC và đối soát biên an toàn cất cánh / hạ cánh',
        actionEn: 'Compute % MAC position and verify takeoff / landing safety envelope',
        descriptionVi: 'Đồ thị đa giác phong bì trọng tâm C.G tự động cảnh báo đỏ khi tải trọng lệch khỏi giới hạn an toàn hàng không.',
        descriptionEn: 'Interactive polygon envelope with dynamic warning thresholds preventing tail strike or nose-heavy stalls.',
      },
      cursor: {
        x: 76,
        y: 46,
        actionTextVi: 'Kiểm tra biên an toàn C.G (28.4% MAC)',
        actionTextEn: 'Inspect C.G envelope (28.4% MAC)',
      },
      takeawayVi: 'Ngăn chặn hoàn toàn hiện tượng máy bay mất thăng bằng khi cất cánh bằng thuật toán giải đa giác phong bì trọng tâm.',
      takeawayEn: 'Eliminates flight trim imbalances using aerodynamic center-of-gravity polygon algorithms.',
    },
    {
      imageUrl: '/projects/skyroute-cargo.png',
      imageCaptionVi: 'Sơ đồ Mặt cắt Hầm hàng Boeing 777F & Bố trí Vị trí Thùng Hàng ULD',
      imageCaptionEn: 'Boeing 777F Cross-Section Cargo Bay & ULD Positioning',
      imageAlt: 'Boeing 777F Cargo Bay ULD Grid',
      hotspot: {
        x: 42,
        y: 36,
        labelVi: 'Interactive 28-Bay ULD Container Grid',
        labelEn: 'Interactive 28-Bay ULD Container Grid',
        actionVi: 'Kéo thả pallet ULD, phân loại hàng nguy hiểm DG và hàng lạnh',
        actionEn: 'Drag-and-drop ULD pallets, isolate Dangerous Goods (DG) and perishables',
        descriptionVi: 'Bố cục mặt cắt 28 vị trí boong chính và hầm dưới tàu bay Boeing 777F, tự động cộng dồn tải trọng từng khoang.',
        descriptionEn: '28-position main deck and lower cargo hold layout with instant running weight tally per compartment.',
      },
      cursor: {
        x: 40,
        y: 38,
        actionTextVi: 'Xếp pallet ULD vào vị trí khoang 11L',
        actionTextEn: 'Stow ULD pallet into bay 11L',
      },
      takeawayVi: 'Tối ưu hóa phân bổ tải trọng giữa boong chính và hầm dưới, giảm 30 phút thời gian bốc xếp trước giờ khởi hành.',
      takeawayEn: 'Optimized main/lower deck distribution slashes pre-departure load planning time by 30 minutes.',
    },
    {
      imageUrl: '/projects/skyroute-hero.png',
      imageCaptionVi: 'Đồng bộ Tọa độ Radar Bay qua WebSocket & Redis Geo',
      imageCaptionEn: 'Real-Time Radar Sync via WebSocket & Redis Geo',
      imageAlt: 'WebSocket Redis Geo Flight Radar Ingestion',
      hotspot: {
        x: 30,
        y: 60,
        labelVi: 'Redis Geo Spatial Ingestion Engine',
        labelEn: 'Redis Geo Spatial Ingestion Engine',
        actionVi: 'Truy vấn bán kính chuyến bay GEORADIUS và broadcast pub/sub',
        actionEn: 'Execute GEORADIUS flight queries and broadcast via pub/sub',
        descriptionVi: 'Lưu trữ kinh độ, vĩ độ và độ cao máy bay trong bộ nhớ RAM, phân phối tín hiệu đến bàn điều phái trong 80ms.',
        descriptionEn: 'In-memory geospatial indexing distributing real-time aircraft vectors to dispatch stations under 80ms.',
      },
      cursor: {
        x: 32,
        y: 58,
        actionTextVi: 'Truy vấn GEORADIUS 500km không lưu',
        actionTextEn: 'Query GEORADIUS 500km airspace',
      },
      takeawayVi: 'Xử lý truy vấn không gian cực nhanh dưới 5ms với cấu trúc dữ liệu GeoHash tối ưu của Redis.',
      takeawayEn: 'Sub-5ms geospatial range queries powered by optimized Redis GeoHash memory structures.',
    },
    {
      imageUrl: '/projects/skyroute-cargo.png',
      imageCaptionVi: 'Bộ Xuất Điện văn Tải trọng Loadsheet Chuẩn IATA & PDF',
      imageCaptionEn: 'IATA Standard Electronic Loadsheet & PDF Exporter',
      imageAlt: 'IATA AHMR Compliant Electronic Loadsheet',
      hotspot: {
        x: 50,
        y: 72,
        labelVi: 'IATA AHMR Compliant Loadsheet Generator',
        labelEn: 'IATA AHMR Compliant Loadsheet Generator',
        actionVi: 'Ký số mật mã học và phát hành điện văn ACARS truyền lên buồng lái',
        actionEn: 'Cryptographically sign and dispatch ACARS telex to cockpit',
        descriptionVi: 'Xuất văn bản phân bổ tải trọng đạt chuẩn IATA AHMR kèm mã hash kiểm toán chống chỉnh sửa trái phép.',
        descriptionEn: 'Generates standardized IATA AHMR weight-and-balance manifest with tamper-evident cryptographic hash.',
      },
      cursor: {
        x: 52,
        y: 70,
        actionTextVi: 'Ký số điện văn ACARS truyền buồng lái',
        actionTextEn: 'Sign ACARS dispatch telex for cockpit',
      },
      takeawayVi: 'Chuẩn hóa định dạng điện văn hàng không quốc tế với chữ ký số toàn vẹn dữ liệu cho phi hành đoàn.',
      takeawayEn: 'Standardized international aviation telemetry format with zero-tampering cryptographic signatures.',
    },
    {
      imageUrl: '/projects/skyroute-hero.png',
      imageCaptionVi: 'Đóng gói Triển khai Docker & Giám sát Sức khỏe Dịch vụ 99.9%',
      imageCaptionEn: 'Docker Containerization & 99.9% High Availability Audit',
      imageAlt: 'Docker High Availability Cluster Telemetry',
      hotspot: {
        x: 86,
        y: 20,
        labelVi: 'High Availability Multi-Node Docker Engine',
        labelEn: 'High Availability Multi-Node Docker Engine',
        actionVi: 'Tự động kiểm tra sức khỏe container và đối soát Neon Postgres',
        actionEn: 'Automated container health check and Neon Postgres pooling',
        descriptionVi: 'Hạ tầng phân tán bảo đảm hệ thống trực tuyến liên tục 24/7 phục vụ các chuyến bay liên lục địa.',
        descriptionEn: 'Multi-container orchestration maintaining 99.9% uptime for round-the-clock transcontinental flight ops.',
      },
      cursor: {
        x: 84,
        y: 22,
        actionTextVi: 'Kiểm tra trạng thái cluster 99.9%',
        actionTextEn: 'Inspect 99.9% cluster health',
      },
      takeawayVi: 'Kiến trúc container hóa sẵn sàng cho môi trường điều hành bay khắt khe, zero downtime khi nâng cấp.',
      takeawayEn: 'Production-ready containerized architecture ensuring zero-downtime rolling upgrades.',
    },
  ],
  'medicare-ai-triage': [
    {
      imageUrl: '/projects/medicare-hero.png',
      imageCaptionVi: 'Hàng đợi Tiếp nhận Bệnh nhân & Xem trước Bệnh án EMR',
      imageCaptionEn: 'Patient Intake Queue & Real-Time EMR Preview',
      imageAlt: 'MediCare AI Patient Intake Queue',
      hotspot: {
        x: 30,
        y: 40,
        labelVi: 'Intake Queue & Manchester Triage Priority',
        labelEn: 'Intake Queue & Manchester Triage Priority',
        actionVi: 'Tiếp nhận bệnh nhân và xếp lớp ưu tiên theo mã màu chuẩn y khoa',
        actionEn: 'Intake patient and sort queue by medical priority color code',
        descriptionVi: 'Phân loại tự động 3 cấp độ: Emergency (Đỏ), Urgent (Cam), Routine (Xanh lá) dựa trên triệu chứng lâm sàng.',
        descriptionEn: 'Three-tier triage queue sorting patients by emergency urgency score rather than arrival timestamp.',
      },
      cursor: {
        x: 32,
        y: 42,
        actionTextVi: 'Chọn bệnh nhân cấp cứu P-042',
        actionTextEn: 'Select emergency patient P-042',
      },
      takeawayVi: 'Phân loại thứ tự khám ưu tiên dựa trên mức độ đe dọa sinh tồn thay vì quy tắc xếp hàng thông thường.',
      takeawayEn: 'Triages clinical priority by physiological threat score, reducing critical emergency wait time.',
    },
    {
      imageUrl: '/projects/medicare-consult.png',
      imageCaptionVi: 'Trục Thời gian Lâm sàng: Quy trình 4 Giai đoạn Khám bệnh',
      imageCaptionEn: 'Clinical Timeline: 4-Phase Longitudinal Consultation Journey',
      imageAlt: 'Clinical Timeline Consultation Journey',
      hotspot: {
        x: 18,
        y: 45,
        labelVi: 'Clinical Milestone Timeline Track',
        labelEn: 'Clinical Milestone Timeline Track',
        actionVi: 'Lướt dọc trục thời gian từ Tiếp đón → AI Triage → Khám bệnh → Kê đơn',
        actionEn: 'Scrub timeline from Intake → AI Triage → Consultation → Prescription',
        descriptionVi: 'Giao diện dòng thời gian trực quan giúp bác sĩ nắm bắt trọn vẹn diễn biến sức khỏe và tiền sử khám qua nhiều năm.',
        descriptionEn: 'Timeline-based storytelling interface providing longitudinal health trajectory at a glance.',
      },
      cursor: {
        x: 20,
        y: 47,
        actionTextVi: 'Xem mốc khám lâm sàng 02:15',
        actionTextEn: 'Inspect clinical milestone 02:15',
      },
      takeawayVi: 'Mô hình Timeline-Based Storytelling giúp bác sĩ nắm bắt tiền sử bệnh chỉ trong 10 giây lướt trục thời gian.',
      takeawayEn: 'Timeline-based storytelling enables clinicians to grasp longitudinal patient history within 10 seconds.',
    },
    {
      imageUrl: '/projects/medicare-hero.png',
      imageCaptionVi: 'Động cơ Phân loại Triệu chứng Cấp cứu Gemini Medical AI',
      imageCaptionEn: 'Gemini Medical AI Automatic Symptom Triage Engine',
      imageAlt: 'Gemini AI Clinical Symptom Analysis',
      hotspot: {
        x: 75,
        y: 35,
        labelVi: 'Gemini Medical AI Differential Triage',
        labelEn: 'Gemini Medical AI Differential Triage',
        actionVi: 'Phân tích ngôn ngữ tự nhiên và đề xuất chẩn đoán phân biệt có cơ sở',
        actionEn: 'Analyze natural language complaint and propose grounded differentials',
        descriptionVi: 'AI trích xuất các chỉ số sinh tồn bất thường và cảnh báo nguy cơ nhồi máu cơ tim hoặc sốc phản vệ trong 450ms.',
        descriptionEn: 'Extracts vital sign anomalies and surfaces differential diagnoses for myocardial infarction or anaphylaxis in 450ms.',
      },
      cursor: {
        x: 73,
        y: 33,
        actionTextVi: 'Phân tích lý do khám: Đau ngực cấp',
        actionTextEn: 'Analyze complaint: Acute chest pain',
      },
      takeawayVi: 'Đề xuất các khả năng chẩn đoán phân biệt và chỉ số nguy cơ nhồi máu cơ tim tức thì không hallucination.',
      takeawayEn: 'Surfaces differential diagnostic options and critical risk indices without clinical hallucinations.',
    },
    {
      imageUrl: '/projects/medicare-consult.png',
      imageCaptionVi: 'Phòng Khám Video Trực tuyến Mã hóa WebRTC Peer-to-Peer',
      imageCaptionEn: 'Peer-to-Peer Encrypted WebRTC Telehealth Consultation Room',
      imageAlt: 'WebRTC Telehealth Consultation Video Interface',
      hotspot: {
        x: 50,
        y: 35,
        labelVi: 'Encrypted WebRTC Telehealth Video Channel',
        labelEn: 'Encrypted WebRTC Telehealth Video Channel',
        actionVi: 'Kết nối âm thanh/hình ảnh E2EE và ghi nhận lâm sàng song song',
        actionEn: 'Establish E2EE video/audio and record clinical notes simultaneously',
        descriptionVi: 'Phòng khám trực tuyến bảo mật cao, kết nối trực tiếp không qua máy chủ trung gian để bảo vệ bí mật y tế.',
        descriptionEn: 'HIPAA-compliant peer-to-peer WebRTC stream with zero cloud video persistence for total patient privacy.',
      },
      cursor: {
        x: 52,
        y: 33,
        actionTextVi: 'Bắt đầu cuộc gọi video bác sĩ WebRTC',
        actionTextEn: 'Start doctor WebRTC video consult',
      },
      takeawayVi: 'Kết nối video HD trực tiếp bác sĩ - bệnh nhân với độ trễ dưới 200ms và không lưu trữ media trên cloud.',
      takeawayEn: 'Direct peer-to-peer HD telehealth video stream with sub-200ms latency and zero server-side media retention.',
    },
    {
      imageUrl: '/projects/medicare-consult.png',
      imageCaptionVi: 'Biểu đồ Diễn tiến Chỉ số Sinh tồn (Huyết áp & SpO2)',
      imageCaptionEn: 'Longitudinal Vital Signs Chart (Blood Pressure & SpO2)',
      imageAlt: 'Dynamic Vital Signs ECG Chart',
      hotspot: {
        x: 52,
        y: 65,
        labelVi: 'Dynamic Vital Signs Vector Chart (BP & HR)',
        labelEn: 'Dynamic Vital Signs Vector Chart (BP & HR)',
        actionVi: 'Quan sát diễn biến huyết áp, SpO2 và nhịp tim qua từng buổi khám',
        actionEn: 'Track blood pressure, SpO2, and heart rate trajectories over visits',
        descriptionVi: 'Biểu đồ vector tương tác giúp bác sĩ phát hiện các xu hướng tăng huyết áp tiềm ẩn hoặc hạ oxy máu.',
        descriptionEn: 'Interactive vector trendlines highlighting occult hypertension or desaturation episodes.',
      },
      cursor: {
        x: 50,
        y: 63,
        actionTextVi: 'So sánh chỉ số huyết áp 3 lần khám',
        actionTextEn: 'Compare BP trends across 3 visits',
      },
      takeawayVi: 'Biểu đồ vector SVG trực quan giúp phát hiện sớm các cơn tăng huyết áp kịch phát bất thường.',
      takeawayEn: 'Intuitive SVG vector trajectories allow early detection of acute hypertensive spikes.',
    },
    {
      imageUrl: '/projects/medicare-consult.png',
      imageCaptionVi: 'Bộ Kê đơn Thuốc Điện tử & Cảnh báo Tương tác Thuốc Nguy hại',
      imageCaptionEn: 'Digital e-Prescription Builder & Drug-Drug Interaction Warning',
      imageAlt: 'Digital e-Prescription Builder with Interaction Checks',
      hotspot: {
        x: 80,
        y: 60,
        labelVi: 'e-Prescription & Drug-Drug Interaction Matrix',
        labelEn: 'e-Prescription & Drug-Drug Interaction Matrix',
        actionVi: 'Tự động tính liều lượng theo cân nặng và quét xung đột dược lý chéo',
        actionEn: 'Auto-calculate weight-based dosage and scan cross-drug interactions',
        descriptionVi: 'Cảnh báo màu đỏ nổi bật khi bác sĩ kê đơn 2 loại thuốc tương tác nguy hiểm, gợi ý thuốc thay thế an toàn.',
        descriptionEn: 'Instant visual alert flagging severe drug interactions with safe therapeutic alternative suggestions.',
      },
      cursor: {
        x: 78,
        y: 58,
        actionTextVi: 'Kê đơn Amoxicillin 500mg (An toàn)',
        actionTextEn: 'Prescribe Amoxicillin 500mg (Safe)',
      },
      takeawayVi: 'Thuật toán đối soát cơ sở dữ liệu dược lý tự động ngăn chặn 100% rủi ro kê đơn trùng lặp và tương tác xấu.',
      takeawayEn: 'Automated pharmacovigilance matrix eliminates adverse drug-drug interactions before dispensary.',
    },
    {
      imageUrl: '/projects/medicare-hero.png',
      imageCaptionVi: 'Phân quyền RBAC Y tế & Bảo mật Hồ sơ Bệnh án EMR',
      imageCaptionEn: 'Role-Based Access Control (RBAC) & EMR Privacy Compliance',
      imageAlt: 'HIPAA Compliant RBAC Security Vault',
      hotspot: {
        x: 88,
        y: 18,
        labelVi: 'HIPAA Compliant RBAC Security Vault',
        labelEn: 'HIPAA Compliant RBAC Security Vault',
        actionVi: 'Xác thực phân quyền Bác sĩ, Y tá và Bệnh nhân với JWT token an toàn',
        actionEn: 'Authenticate Doctor, Nurse, and Patient roles with secure JWT tokens',
        descriptionVi: 'Cơ chế mã hóa các trường nhạy cảm trong MongoDB Atlas bảo đảm tuân thủ quyền riêng tư dữ liệu y tế.',
        descriptionEn: 'Field-level encryption across MongoDB Atlas clusters guaranteeing medical confidentiality.',
      },
      cursor: {
        x: 86,
        y: 20,
        actionTextVi: 'Xác thực bác sĩ chuyên khoa khoa Nội',
        actionTextEn: 'Verify Internal Medicine specialist',
      },
      takeawayVi: 'Phân tách nghiêm ngặt quyền truy cập giữa Bác sĩ, Y tá và Bệnh nhân, bảo vệ quyền riêng tư hồ sơ y tế.',
      takeawayEn: 'Strict role-based isolation between clinical staff and patients protects personal health information.',
    },
  ],
};

const PROJECT_CHAPTER_DOMAINS: Record<string, { vi: string; en: string }[]> = {
  'ticket-concert-agentic-rag': [
    { vi: 'STADIUM DISCOVERY // 48kHz', en: 'STADIUM DISCOVERY // 48kHz' },
    { vi: 'AGENTIC RAG // LANGCHAIN & GEMINI', en: 'AGENTIC RAG // LANGCHAIN & GEMINI' },
    { vi: 'WEBSOCKET ANTI-COLLISION // 50ms', en: 'WEBSOCKET ANTI-COLLISION // 50ms' },
    { vi: 'SEAT MATRIX // REAL-TIME CALC', en: 'SEAT MATRIX // REAL-TIME CALC' },
    { vi: 'MOMO API // HMAC-SHA256 SECURE', en: 'MOMO API // HMAC-SHA256 SECURE' },
    { vi: 'FULL-STACK REST // NEON POSTGRES', en: 'FULL-STACK REST // NEON POSTGRES' },
    { vi: 'E-TICKET QR DISPATCH // 99.9% UPTIME', en: 'E-TICKET QR DISPATCH // 99.9% UPTIME' },
  ],
  'fashion-nail-morley': [
    { vi: 'CHAMPAGNE ROSE // BRAND IDENTITY', en: 'CHAMPAGNE ROSE // BRAND IDENTITY' },
    { vi: 'STUDIO LOOKBOOK // RETINA HD', en: 'STUDIO LOOKBOOK // RETINA HD' },
    { vi: 'AUD PRICING MENU // MOBILE-FIRST', en: 'AUD PRICING MENU // MOBILE-FIRST' },
    { vi: 'ONE-TAP BOOKING // SUB-30s FLOW', en: 'ONE-TAP BOOKING // SUB-30s FLOW' },
    { vi: 'RESEND API // 350ms EMAIL ALERT', en: 'RESEND API // 350ms EMAIL ALERT' },
    { vi: 'GOOGLE MAPS // PERTH LOCAL SEO', en: 'GOOGLE MAPS // PERTH LOCAL SEO' },
    { vi: 'VITE SPA // LIGHTHOUSE 98/100', en: 'VITE SPA // LIGHTHOUSE 98/100' },
  ],
  'examplatform-ai': [
    { vi: 'DISTRACTION-FREE // ZERO-NOISE ROOM', en: 'DISTRACTION-FREE // ZERO-NOISE ROOM' },
    { vi: 'ADAPTIVE DIFFICULTY // 5 TIERS', en: 'ADAPTIVE DIFFICULTY // 5 TIERS' },
    { vi: 'ANTI-CHEAT // TAB DEFOCUS TELEMETRY', en: 'ANTI-CHEAT // TAB DEFOCUS TELEMETRY' },
    { vi: 'REDIS CACHE // 6ms TIMEOUT PROTECTION', en: 'REDIS CACHE // 6ms TIMEOUT PROTECTION' },
    { vi: 'ACADEMIC INTEGRITY // JWT TOKEN ENCRYPT', en: 'ACADEMIC INTEGRITY // JWT TOKEN ENCRYPT' },
    { vi: 'FULL-STACK ARCH // TAILWIND UI', en: 'FULL-STACK ARCH // TAILWIND UI' },
    { vi: 'OUTCOME AUDIT // 99.8% RELIABILITY', en: 'OUTCOME AUDIT // 99.8% RELIABILITY' },
  ],
  'vk-digital-hub': [
    { vi: 'B2B FINTECH // HIGH CONVERSION', en: 'B2B FINTECH // HIGH CONVERSION' },
    { vi: 'MAKE.COM WEBHOOK // 180ms INGESTION', en: 'MAKE.COM WEBHOOK // 180ms INGESTION' },
    { vi: 'SERVICE MATRIX // +340% ROI LIFT', en: 'SERVICE MATRIX // +340% ROI LIFT' },
    { vi: 'INSTANT SYNC // SLACK & CRM TEAM', en: 'INSTANT SYNC // SLACK & CRM TEAM' },
    { vi: 'CLIENT VALIDATION // 99% ACCURACY', en: 'CLIENT VALIDATION // 99% ACCURACY' },
    { vi: 'JAMSTACK SERVERLESS // ZERO BILL', en: 'JAMSTACK SERVERLESS // ZERO BILL' },
    { vi: 'PRODUCTION READY // NETLIFY CDN', en: 'PRODUCTION READY // NETLIFY CDN' },
  ],
  'nh-huynh-portfolio': [
    { vi: '3D SPATIAL // RETINA LIGHT THEME', en: '3D SPATIAL // RETINA LIGHT THEME' },
    { vi: 'PROJECT CARDS // 3D TILT MATRIX', en: 'PROJECT CARDS // 3D TILT MATRIX' },
    { vi: 'INTERACTIVE RADAR // RETICLE TARGET', en: 'INTERACTIVE RADAR // RETICLE TARGET' },
    { vi: 'BESPOKE STORYTELLING // DOMAIN MOTION', en: 'BESPOKE STORYTELLING // DOMAIN MOTION' },
    { vi: 'ADMIN CMS // HTTPONLY COOKIE AUTH', en: 'ADMIN CMS // HTTPONLY COOKIE AUTH' },
    { vi: 'VERIFIED CREDENTIALS // TOEIC 550 & GPA 3.1', en: 'VERIFIED CREDENTIALS // TOEIC 550 & GPA 3.1' },
    { vi: 'ENGINEERING EXCELLENCE // NEXT.JS 15 & TS', en: 'ENGINEERING EXCELLENCE // NEXT.JS 15 & TS' },
  ],
  'skyroute-aviation-ops': [
    { vi: 'AERODROME RADAR // 1090MHz ADS-B', en: 'AERODROME RADAR // 1090MHz ADS-B' },
    { vi: '3D EXPLODED ARCH // 4 DISTRIBUTED LAYERS', en: '3D EXPLODED ARCH // 4 DISTRIBUTED LAYERS' },
    { vi: 'MASS & BALANCE // CENTER OF GRAVITY (CG)', en: 'MASS & BALANCE // CENTER OF GRAVITY (CG)' },
    { vi: 'CARGO BAY SCHEMATIC // 28 ULD POSITIONS', en: 'CARGO BAY SCHEMATIC // 28 ULD POSITIONS' },
    { vi: 'REDIS GEO ENGINE // 80ms RADAR SYNC', en: 'REDIS GEO ENGINE // 80ms RADAR SYNC' },
    { vi: 'IATA LOADSHEET // CRYPTOGRAPHIC CHECKSUM', en: 'IATA LOADSHEET // CRYPTOGRAPHIC CHECKSUM' },
    { vi: 'DOCKER HA CLUSTER // 99.9% UPTIME AUDIT', en: 'DOCKER HA CLUSTER // 99.9% UPTIME AUDIT' },
  ],
  'medicare-ai-triage': [
    { vi: 'CLINICAL INTAKE // MANCHESTER TRIAGE', en: 'CLINICAL INTAKE // MANCHESTER TRIAGE' },
    { vi: 'LONGITUDINAL TIMELINE // 4-PHASE CARE', en: 'LONGITUDINAL TIMELINE // 4-PHASE CARE' },
    { vi: 'GEMINI MEDICAL AI // DIFFERENTIAL DIAGNOSIS', en: 'GEMINI MEDICAL AI // DIFFERENTIAL DIAGNOSIS' },
    { vi: 'TELEHEALTH WEBRTC // E2EE CONSULTATION', en: 'TELEHEALTH WEBRTC // E2EE CONSULTATION' },
    { vi: 'VITAL SIGNS VECTOR // BP & HR TRAJECTORY', en: 'VITAL SIGNS VECTOR // BP & HR TRAJECTORY' },
    { vi: 'E-PRESCRIPTION // DRUG INTERACTION MATRIX', en: 'E-PRESCRIPTION // DRUG INTERACTION MATRIX' },
    { vi: 'RBAC VAULT // HIPAA PRIVACY COMPLIANCE', en: 'RBAC VAULT // HIPAA PRIVACY COMPLIANCE' },
  ],
};

// 1. TICKET CONCERT OVERLAY (Cyber Neon, Audio Equalizer Waves, Laser Scanner, HUD Telemetry)
function CyberConcertOverlay() {
  const eqHeights = [35, 80, 50, 95, 65, 88, 42, 92, 70, 48, 85, 60, 90, 52, 78, 45, 82, 68];
  return (
    <div className="tc-cyber-overlay" aria-hidden="true">
      {/* Dynamic 18-Bar Audio Equalizer Visualizer */}
      <div className="tc-eq-bars">
        <div className="tc-eq-inner">
          {eqHeights.map((h, i) => (
            <span
              key={i}
              className="tc-eq-bar"
              style={{
                height: `${h}%`,
                animationDelay: `${(i % 6) * 0.14}s`,
              }}
            />
          ))}
        </div>
        <div className="tc-eq-frequencies">
          <span>32Hz</span>
          <span>1kHz</span>
          <span>16kHz</span>
        </div>
      </div>

      {/* Sweeping Dual-Beam Laser Scanner */}
      <div className="tc-laser-sweep" />

      {/* Cyber Corner HUD Brackets */}
      <div className="tc-hud-bracket top-left">[ + ARENA AUDIO ]</div>
      <div className="tc-hud-bracket top-right">[ 48kHz / 24-BIT ]</div>
      <div className="tc-hud-bracket bottom-left">[ LATENCY: 34ms ]</div>
      <div className="tc-hud-bracket bottom-right">[ 60FPS STABLE ]</div>

      {/* Top Stream Telemetry Badge */}
      <div className="tc-stream-badge">
        <span className="tc-stream-dot" />
        <span>LIVE CONCERT BROADCAST // WEBSOCKET ACTIVE</span>
      </div>
    </div>
  );
}

// 2. FASHION NAIL OVERLAY (Ken Burns Pan, Floating Gold Bokeh Shimmer, Glass Glint, Atelier Seal)
function LuxurySalonOverlay() {
  const bokehParticles = [
    { x: 12, y: 82, size: 8, delay: 0 },
    { x: 28, y: 72, size: 14, delay: 1.1 },
    { x: 45, y: 88, size: 6, delay: 0.6 },
    { x: 62, y: 76, size: 12, delay: 1.8 },
    { x: 78, y: 84, size: 9, delay: 2.3 },
    { x: 88, y: 68, size: 11, delay: 1.4 },
    { x: 20, y: 62, size: 7, delay: 2.7 },
    { x: 55, y: 65, size: 10, delay: 0.9 },
    { x: 72, y: 58, size: 8, delay: 2.0 },
    { x: 38, y: 54, size: 13, delay: 1.6 },
  ];

  return (
    <div className="fn-luxury-overlay" aria-hidden="true">
      {/* Floating Champagne Gold Bokeh Particles */}
      <div className="fn-bokeh-container">
        {bokehParticles.map((dot, i) => (
          <span
            key={i}
            className="fn-bokeh-dot"
            style={{
              left: `${dot.x}%`,
              bottom: `${100 - dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              animationDelay: `${dot.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Diagonal Luxury Glass Light Glint */}
      <div className="fn-light-glint" />

      {/* Studio Atelier Seal Stamp */}
      <div className="fn-atelier-seal">
        <span className="seal-star">✦</span>
        <span className="seal-text">MORLEY ATELIER • PERTH WA • EST. 2026</span>
        <span className="seal-star">✦</span>
      </div>
    </div>
  );
}

// 3. EXAM PLATFORM OVERLAY (Biometric Radar Scanner, Technical Crosshairs, Session Integrity HUD)
function ProctorExamOverlay() {
  return (
    <div className="ep-proctor-overlay" aria-hidden="true">
      {/* Rotating Biometric Radar Scanner */}
      <div className="ep-radar-reticle">
        <div className="radar-circle ring-outer" />
        <div className="radar-circle ring-inner" />
        <div className="radar-crosshair-h" />
        <div className="radar-crosshair-v" />
        <div className="radar-sweep-beam" />
        <span className="radar-center-dot" />
        <span className="radar-target-blip blip-1" />
        <span className="radar-target-blip blip-2" />
      </div>

      {/* Technical Blueprint Coordinate Tags */}
      <div className="ep-crosshair-tag top-left">
        <span>AI_MONITOR: ACTIVE</span>
        <small>ZONE_01 [X:142.8 Y:89.2] • JWT_ENCRYPTED</small>
      </div>

      {/* Session Integrity Telemetry HUD */}
      <div className="ep-integrity-hud">
        <div className="hud-metric-pill">
          <span className="metric-icon">🛡️</span>
          <span className="metric-label">INTEGRITY:</span>
          <strong className="metric-val">99.8%</strong>
        </div>
        <div className="hud-metric-pill">
          <span className="metric-icon">⚡</span>
          <span className="metric-label">REDIS:</span>
          <strong className="metric-val">6ms</strong>
        </div>
        <div className="hud-metric-pill">
          <span className="metric-icon">⏱️</span>
          <span className="metric-label">TIMER:</span>
          <strong className="metric-val">45:00</strong>
        </div>
        <div className="hud-metric-pill">
          <span className="metric-icon">🔒</span>
          <span className="metric-label">TAB:</span>
          <strong className="metric-val">LOCKED</strong>
        </div>
      </div>
    </div>
  );
}

// 4. VK DIGITAL OVERLAY (Data-Flow Pipeline, Rising Growth Curve SVG, Conversion Telemetry)
function GrowthPipelineOverlay() {
  return (
    <div className="vk-growth-overlay" aria-hidden="true">
      {/* Live Animated Data-Flow Pipeline Banner */}
      <div className="vk-data-pipeline">
        <div className="pipeline-node active">
          <span className="node-dot" />
          <span className="node-label">Web Form</span>
        </div>
        <div className="pipeline-cable">
          <span className="packet-pulse packet-1" />
          <span className="packet-pulse packet-2" />
        </div>
        <div className="pipeline-node active">
          <span className="node-dot" />
          <span className="node-label">Make.com Webhook (180ms)</span>
        </div>
        <div className="pipeline-cable">
          <span className="packet-pulse packet-3" />
        </div>
        <div className="pipeline-node active">
          <span className="node-dot" />
          <span className="node-label">Slack / CRM</span>
        </div>
      </div>

      {/* Rising Growth Curve SVG */}
      <div className="vk-growth-curve-wrap">
        <svg viewBox="0 0 120 40" className="vk-growth-svg" fill="none">
          <path
            d="M 5 35 Q 35 32 60 20 T 115 5"
            stroke="url(#vkGrowthGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="vkGrowthGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
        <span className="vk-growth-badge">+340% ROI LIFT</span>
      </div>

      {/* Lead Telemetry Ticker */}
      <div className="vk-lead-ticker">
        <span className="ticker-ping" />
        <span>ZERO-LATENCY INGESTION // 200 OK</span>
      </div>
    </div>
  );
}

// 5. PORTFOLIO OVERLAY (3D Spatial Tilt, Liquid Chromatic Refraction, Blueprint Coordinates)
function ArchitecturalGlassOverlay() {
  return (
    <div className="nh-architectural-overlay" aria-hidden="true">
      {/* Liquid Chromatic Refraction Beam */}
      <div className="nh-refraction-beam" />

      {/* Minimalist Architectural Coordinate Tags */}
      <div className="nh-blueprint-coords top-left">
        <span>ARCHITECTURAL CANVAS // 4K RETINA</span>
        <small>POS [X:204.0 Y:118.5] • DEPTH_LAYER_03</small>
      </div>

      <div className="nh-blueprint-coords bottom-right">
        <span>RATIO: 16:10 • SMOOTH 3D PERSPECTIVE</span>
      </div>
    </div>
  );
}

// 6. AVIATION 3D EXPLODED OVERLAY (Radar Sweep, 3D Layers Stack, Telemetry Altitude & CG HUD)
function AviationExplodedOverlay() {
  return (
    <div className="av-exploded-overlay" aria-hidden="true">
      {/* 3D Exploded-View Layer Stack Indicator */}
      <div className="av-layer-stack">
        <div className="av-layer-item layer-4">
          <span className="layer-dot" />
          <span className="layer-name">L4: ADS-B RADAR // 1090MHz</span>
        </div>
        <div className="av-layer-item layer-3">
          <span className="layer-dot" />
          <span className="layer-name">L3: AIRFRAME & ULD CARGO BAY</span>
        </div>
        <div className="av-layer-item layer-2">
          <span className="layer-dot" />
          <span className="layer-name">L2: WEIGHT & CG ENVELOPE</span>
        </div>
        <div className="av-layer-item layer-1">
          <span className="layer-dot" />
          <span className="layer-name">L1: POSTGIS & REDIS GEO</span>
        </div>
      </div>

      {/* Aerodrome Radar Beam & Reticle */}
      <div className="av-radar-beam" />
      <div className="av-crosshair-center" />

      {/* Flight Telemetry Altitude & CG Strip */}
      <div className="av-telemetry-hud">
        <div className="av-hud-pill">
          <span className="hud-label">ALT:</span>
          <strong className="hud-val">FL360</strong>
        </div>
        <div className="av-hud-pill">
          <span className="hud-label">GS:</span>
          <strong className="hud-val">485 kts</strong>
        </div>
        <div className="av-hud-pill">
          <span className="hud-label">MACH:</span>
          <strong className="hud-val">0.82</strong>
        </div>
        <div className="av-hud-pill">
          <span className="hud-label">CG:</span>
          <strong className="hud-val">28.4% MAC</strong>
        </div>
      </div>

      {/* Cockpit Coordinates Stamp */}
      <div className="av-cockpit-stamp top-left">
        <span>VVTS ➔ WSSS // OFP-0772</span>
        <small>B777-200F • MTOW: 347,815 KG</small>
      </div>
    </div>
  );
}

// 7. MEDICARE CLINICAL TIMELINE OVERLAY (Pulsing ECG Waveform, Longitudinal Milestones, HIPAA Vault)
function ClinicalTimelineOverlay() {
  return (
    <div className="mc-timeline-overlay" aria-hidden="true">
      {/* Animated ECG Pulse Waveform SVG */}
      <div className="mc-ecg-container">
        <svg viewBox="0 0 200 40" className="mc-ecg-svg" fill="none">
          <path
            d="M 0 20 L 40 20 L 48 8 L 54 32 L 62 4 L 70 24 L 78 20 L 120 20 L 128 8 L 134 32 L 142 4 L 150 24 L 158 20 L 200 20"
            stroke="url(#mcEcgGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="mcEcgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#14B8A6" stopOpacity="1" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Clinical Timeline Journey Ribbon */}
      <div className="mc-timeline-ribbon">
        <span className="timeline-node done">00:00 Intake</span>
        <span className="timeline-arrow">➔</span>
        <span className="timeline-node done">02:15 AI Triage</span>
        <span className="timeline-arrow">➔</span>
        <span className="timeline-node active">05:30 Consult</span>
        <span className="timeline-arrow">➔</span>
        <span className="timeline-node">08:45 Rx</span>
      </div>

      {/* Vital Signs Real-Time Monitor Badge */}
      <div className="mc-vitals-hud">
        <div className="mc-vital-item">
          <span className="vital-icon">❤️</span>
          <span className="vital-label">HR:</span>
          <strong>72 bpm</strong>
        </div>
        <div className="mc-vital-item">
          <span className="vital-icon">🫁</span>
          <span className="vital-label">SpO2:</span>
          <strong>98%</strong>
        </div>
        <div className="mc-vital-item">
          <span className="vital-icon">🩺</span>
          <span className="vital-label">BP:</span>
          <strong>120/80</strong>
        </div>
        <div className="mc-vital-item">
          <span className="vital-icon">🔒</span>
          <strong>HIPAA VAULT</strong>
        </div>
      </div>
    </div>
  );
}

export function MasterInteractiveScrollytelling({
  project,
  chapters,
}: MasterInteractiveScrollytellingProps) {
  const { lang } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHoveringHotspot, setIsHoveringHotspot] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsFlowRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth continuous scroll progress tracker for the timeline rail
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const flowEl = cardsFlowRef.current;
      if (!flowEl) {
        ticking = false;
        return;
      }

      const rect = flowEl.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Start calculating when the top of the cards reaches 35% from the top of the viewport
      const startTrigger = viewportH * 0.35;
      const totalScrollDistance = rect.height - viewportH * 0.45;
      const currentScrolled = startTrigger - rect.top;

      const rawPercentage = (currentScrolled / (totalScrollDistance || 1)) * 100;
      const clamped = Math.min(Math.max(rawPercentage, 0), 100);

      setScrollProgress(clamped);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [chapters.length]);

  // Retrieve storytelling mode metadata
  const modeMeta = useMemo(() => {
    return (
      STORYTELLING_MODES_CATALOG.find((m) => m.id === project.storytellingStyle) ||
      STORYTELLING_MODES_CATALOG[0]
    );
  }, [project.storytellingStyle]);

  // Retrieve project visual mapping or generate default
  const visualList = useMemo(() => {
    if (PROJECT_VISUAL_MAP[project.slug]) {
      return PROJECT_VISUAL_MAP[project.slug];
    }
    // Fallback if custom project
    return chapters.map((ch, i) => ({
      imageUrl: ch.screenshots?.[0]?.url || project.coverUrl || '/projects/ticket-concert-hero.png',
      imageCaptionVi: ch.screenshots?.[0]?.caption || ch.title,
      imageCaptionEn: ch.screenshots?.[0]?.caption || ch.title,
      imageAlt: ch.screenshots?.[0]?.alt || ch.title,
      hotspot: {
        x: 50,
        y: 45,
        labelVi: ch.title,
        labelEn: ch.title,
        actionVi: 'Khám phá chi tiết kiến trúc kỹ thuật',
        actionEn: 'Explore technical architecture details',
        descriptionVi: ch.content,
        descriptionEn: ch.content,
      },
      cursor: {
        x: 50,
        y: 48,
        actionTextVi: 'Xem thành phần',
        actionTextEn: 'View component',
      },
      takeawayVi: 'Tối ưu hóa kiến trúc mang lại trải nghiệm mượt mà và tin cậy.',
      takeawayEn: 'Optimized architecture delivering smooth, reliable user experiences.',
    }));
  }, [project.slug, chapters, project.coverUrl]);

  // Current visual data (safely clamped)
  const currentVisual = visualList[activeIdx] || visualList[0];

  // Theme identification
  const projectTheme = useMemo(() => {
    switch (project.slug) {
      case 'ticket-concert-agentic-rag':
        return {
          themeClass: 'theme-cyber-concert',
          badgeTextVi: 'CYBER ARENA // SÂN KHẤU TRỰC TIẾP & AGENTIC RAG',
          badgeTextEn: 'CYBER ARENA // LIVE EVENT STAGE & AGENTIC RAG',
          color: '#06B6D4',
          accentBg: 'rgba(6, 182, 212, 0.08)',
          overlayComponent: <CyberConcertOverlay />,
        };
      case 'fashion-nail-morley':
        return {
          themeClass: 'theme-luxury-salon',
          badgeTextVi: 'HAUTE-COUTURE LOOKBOOK // SALON MORLEY TÂY ÚC',
          badgeTextEn: 'HAUTE-COUTURE LOOKBOOK // SALON MORLEY PERTH WA',
          color: '#E11D48',
          accentBg: 'rgba(225, 29, 72, 0.08)',
          overlayComponent: <LuxurySalonOverlay />,
        };
      case 'examplatform-ai':
        return {
          themeClass: 'theme-proctor-exam',
          badgeTextVi: 'AI PROCTORING TELEMETRY // KHẢO THÍ HỌC THUẬT',
          badgeTextEn: 'AI PROCTORING TELEMETRY // SECURE EDTECH PLATFORM',
          color: '#2563EB',
          accentBg: 'rgba(37, 99, 235, 0.08)',
          overlayComponent: <ProctorExamOverlay />,
        };
      case 'vk-digital-hub':
        return {
          themeClass: 'theme-growth-pipeline',
          badgeTextVi: 'B2B GROWTH PIPELINE // TỰ ĐỘNG HÓA MAKE.COM',
          badgeTextEn: 'B2B GROWTH PIPELINE // MAKE.COM DATA AUTOMATION',
          color: '#059669',
          accentBg: 'rgba(5, 150, 105, 0.08)',
          overlayComponent: <GrowthPipelineOverlay />,
        };
      case 'skyroute-aviation-ops':
        return {
          themeClass: 'theme-aviation-exploded',
          badgeTextVi: '3D EXPLODED FLIGHT OPS // BOEING 777F TELEMETRY',
          badgeTextEn: '3D EXPLODED FLIGHT OPS // BOEING 777F TELEMETRY',
          color: '#0284C7',
          accentBg: 'rgba(2, 132, 199, 0.08)',
          overlayComponent: <AviationExplodedOverlay />,
        };
      case 'medicare-ai-triage':
        return {
          themeClass: 'theme-clinical-timeline',
          badgeTextVi: 'CLINICAL TIMELINE TELEHEALTH // MANCHESTER TRIAGE & FHIR',
          badgeTextEn: 'CLINICAL TIMELINE TELEHEALTH // MANCHESTER TRIAGE & FHIR',
          color: '#0D9488',
          accentBg: 'rgba(13, 148, 136, 0.08)',
          overlayComponent: <ClinicalTimelineOverlay />,
        };
      case 'nh-huynh-portfolio':
      default:
        return {
          themeClass: 'theme-architectural-glass',
          badgeTextVi: '3D SPATIAL ARCHITECTURE // RETINA LIGHT THEME',
          badgeTextEn: '3D SPATIAL ARCHITECTURE // RETINA LIGHT THEME',
          color: '#6366F1',
          accentBg: 'rgba(99, 102, 241, 0.08)',
          overlayComponent: <ArchitecturalGlassOverlay />,
        };
    }
  }, [project.slug]);

  // Set up IntersectionObserver to synchronize active chapter on scroll
  useEffect(() => {
    const chapterEls = document.querySelectorAll<HTMLElement>('.scrolly-narrative-card');
    if (!chapterEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute('data-chapter-index');
            if (indexStr !== null) {
              const idx = parseInt(indexStr, 10);
              if (!isNaN(idx) && idx >= 0 && idx < chapters.length) {
                setActiveIdx(idx);
              }
            }
          }
        });
      },
      {
        rootMargin: '-25% 0px -40% 0px',
        threshold: 0.15,
      }
    );

    chapterEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapters.length]);

  // Mouse move handler for Portfolio 3D tilt
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (project.slug !== 'nh-huynh-portfolio') return;
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const maxTilt = 4.2;
    const rotateY = percentX * maxTilt;
    const rotateX = -percentY * maxTilt;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.12s ease-out',
    });
  };

  const handleStageMouseLeave = () => {
    if (project.slug !== 'nh-huynh-portfolio') return;
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
    });
  };

  // Scroll directly to a selected chapter
  const scrollToChapter = (idx: number) => {
    const chapterId = chapters[idx]?.id;
    const targetEl = (chapterId && document.getElementById(chapterId)) || document.getElementById(`chapter-card-${idx}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveIdx(idx);
    }
  };

  return (
    <section
      className={`master-scrollytelling-section ${projectTheme.themeClass} storytelling-mode-${project.storytellingStyle || 'sticky-split'}`}
      data-storytelling-mode={project.storytellingStyle || 'sticky-split'}
      id="case-scrollytelling-engine"
    >
      <div className="container scrollytelling-grid-container">
        {/* ========================================================
            LEFT COLUMN: CHAPTERS NARRATIVE SCROLL TRACK
           ======================================================== */}
        <div className="scrollytelling-narrative-col">
          <div className="narrative-progress-track" aria-hidden="true">
            <div
              className="narrative-progress-fill"
              style={{
                height: `${scrollProgress}%`,
                background: projectTheme.color,
              }}
            />
            {chapters.map((ch, idx) => {
              const dotPos = (idx / (chapters.length - 1 || 1)) * 100;
              const isPassed = scrollProgress >= dotPos - 2;
              const isCurrent = idx === activeIdx;

              return (
                <button
                  key={ch.id}
                  type="button"
                  className={`narrative-scrubber-dot ${isCurrent ? 'active' : ''} ${isPassed ? 'completed' : ''}`}
                  style={{ top: `${dotPos}%` }}
                  onClick={() => scrollToChapter(idx)}
                  title={`Chương ${ch.number}: ${ch.title}`}
                >
                  <span className="dot-inner" />
                  <span className="dot-tooltip">{ch.number}</span>
                </button>
              );
            })}
          </div>

          <div ref={cardsFlowRef} className="narrative-cards-flow">
            {chapters.map((chapter, idx) => {
              const visual = visualList[idx] || visualList[0];
              const isCurrent = idx === activeIdx;

              return (
                <article
                  key={chapter.id}
                  id={chapter.id || `chapter-card-${idx}`}
                  data-chapter-index={idx}
                  className={`scrolly-narrative-card ${isCurrent ? 'is-active-step' : ''}`}
                >
                  {/* CHAPTER PHASE BADGE */}
                  <div className="narrative-chapter-eyebrow">
                    <div className="chapter-eyebrow-left">
                      <span
                        className="chapter-badge-pill"
                        style={{
                          color: projectTheme.color,
                          borderColor: projectTheme.color,
                          background: projectTheme.accentBg,
                        }}
                      >
                        {lang === 'vi' ? 'CHƯƠNG' : 'CHAPTER'} {chapter.number}
                      </span>
                      {PROJECT_CHAPTER_DOMAINS[project.slug]?.[idx] && (
                        <span className="chapter-domain-tag">
                          {lang === 'vi'
                            ? PROJECT_CHAPTER_DOMAINS[project.slug][idx].vi
                            : PROJECT_CHAPTER_DOMAINS[project.slug][idx].en}
                        </span>
                      )}
                    </div>
                    <span className="chapter-step-counter">
                      {idx + 1} / {chapters.length}
                    </span>
                  </div>

                  {/* CHAPTER TITLE */}
                  <h3 className="narrative-chapter-title">{chapter.title}</h3>

                  {/* CHAPTER BODY */}
                  <div className="narrative-chapter-body">
                    <p className="narrative-lead-p">{chapter.content}</p>
                  </div>

                  {/* TECHNICAL NOTES & HIGHLIGHT TAGS */}
                  {chapter.technicalNotes && chapter.technicalNotes.length > 0 && (
                    <div className="narrative-tech-box">
                      <strong className="tech-box-title">
                        {lang === 'vi' ? 'Kiến trúc & Công nghệ then chốt:' : 'Key Architecture & Stack:'}
                      </strong>
                      <ul className="tech-notes-list">
                        {chapter.technicalNotes.map((note, nIdx) => (
                          <li key={nIdx}>
                            <span className="tech-bullet" style={{ color: projectTheme.color }}>✦</span>
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ARCHITECTURAL TAKEAWAY QUOTE */}
                  <div className="narrative-takeaway-card">
                    <span className="takeaway-icon">💡</span>
                    <p className="takeaway-text">
                      <strong>{lang === 'vi' ? 'Điểm nhấn kỹ thuật:' : 'Key Takeaway:'}</strong>{' '}
                      {lang === 'vi' ? visual.takeawayVi : visual.takeawayEn}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: STICKY VISUAL STORYTELLING STAGE
           ======================================================== */}
        <div className="scrollytelling-stage-col">
          <div className="sticky-stage-anchor">
            {/* BESPOKE DEVICE BROWSER FRAME */}
            <div
              ref={stageRef}
              className={`stage-browser-device ${projectTheme.themeClass}`}
              style={tiltStyle}
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
            >
              {/* BROWSER TOP WINDOW CONTROLS BAR */}
              <div className="stage-browser-header">
                <div className="stage-window-controls" aria-hidden="true">
                  <span className="control-dot dot-close" />
                  <span className="control-dot dot-min" />
                  <span className="control-dot dot-max" />
                </div>

                <div className="stage-url-display">
                  <span className="stage-ssl-lock">🔒</span>
                  <span className="stage-url-text">
                    {project.liveUrl
                      ? project.liveUrl.replace(/^https?:\/\//, '')
                      : `${project.slug}.online`}
                  </span>
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-open-live-external"
                    title={lang === 'vi' ? 'Mở website thực tế trong tab mới' : 'Open live website in new tab'}
                  >
                    <span>{lang === 'vi' ? 'Mở web' : 'Visit'}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>

              {/* STAGE SCREEN VIEWPORT: AUTHENTIC SCREENSHOT + BESPOKE ANIMATION OVERLAY */}
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

                  {/* 1 OF 5 BESPOKE PROJECT ANIMATION OVERLAYS */}
                  {projectTheme.overlayComponent}

                  {/* OVERLAID RADAR HOTSPOT PIN */}
                  <div
                    className={`scrolly-hotspot-pin ${isHoveringHotspot ? 'is-expanded' : ''}`}
                    style={{
                      left: `${currentVisual.hotspot.x}%`,
                      top: `${currentVisual.hotspot.y}%`,
                    }}
                    onMouseEnter={() => setIsHoveringHotspot(true)}
                    onMouseLeave={() => setIsHoveringHotspot(false)}
                    onClick={() => setIsHoveringHotspot(!isHoveringHotspot)}
                  >
                    <div className="hotspot-radar-ripple ring-1" />
                    <div className="hotspot-radar-ripple ring-2" />
                    <div className="hotspot-core-dot" />

                    {/* CONTEXTUAL ARCHITECTURAL CALLOUT CARD */}
                    <div className="hotspot-callout-card">
                      <div className="callout-badge-row">
                        <span className="callout-pill-tag">
                          🎯 {lang === 'vi' ? 'VỊ TRÍ ĐANG GIẢI THÍCH' : 'ACTIVE EXPLAINED COMPONENT'}
                        </span>
                        <span className="callout-phase-num">CH.{chapters[activeIdx]?.number}</span>
                      </div>
                      <strong className="callout-component-name">
                        {lang === 'vi' ? currentVisual.hotspot.labelVi : currentVisual.hotspot.labelEn}
                      </strong>
                      <p className="callout-action-desc">
                        <strong>{lang === 'vi' ? 'Hành động:' : 'Action:'}</strong>{' '}
                        {lang === 'vi' ? currentVisual.hotspot.actionVi : currentVisual.hotspot.actionEn}
                      </p>
                      <p className="callout-detail-text">
                        {lang === 'vi' ? currentVisual.hotspot.descriptionVi : currentVisual.hotspot.descriptionEn}
                      </p>
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
                      <span>{lang === 'vi' ? currentVisual.cursor.actionTextVi : currentVisual.cursor.actionTextEn}</span>
                    </div>
                  </div>
                </div>

                {/* SYNCHRONIZED CAPTION BAR */}
                <div className="stage-caption-bar">
                  <div className="caption-text-group">
                    <span className="caption-eyebrow">
                      {lang === 'vi' ? 'ĐỒNG BỘ TRỰC QUAN THEO CHƯƠNG:' : 'SYNCHRONIZED CHAPTER NARRATIVE:'}
                    </span>
                    <strong className="caption-main">
                      {lang === 'vi' ? currentVisual.imageCaptionVi : currentVisual.imageCaptionEn}
                    </strong>
                  </div>
                  <div className="caption-sync-badge">
                    <span className="sync-pulse-dot" />
                    <span>{lang === 'vi' ? 'ĐANG ĐỒNG BỘ' : 'SYNCED'}</span>
                  </div>
                </div>
              </div>

              {/* NARRATIVE ATMOSPHERE & QUICK-JUMP SCRUBBER STRIP */}
              <div className="stage-atmosphere-bar">
                <div className="atmosphere-theme-tag">
                  <span className="theme-dot" style={{ background: projectTheme.color }} />
                  <span className="theme-text">
                    {lang === 'vi' ? projectTheme.badgeTextVi : projectTheme.badgeTextEn}
                  </span>
                </div>

                <div
                  className="atmosphere-mode-badge"
                  title={lang === 'vi' ? modeMeta.descriptionVi : modeMeta.descriptionEn}
                >
                  <span className="mode-badge-icon">{modeMeta.icon}</span>
                  <span className="mode-badge-name">
                    {lang === 'vi' ? modeMeta.titleVi : modeMeta.titleEn}
                  </span>
                </div>

                <div className="stage-quick-scrubber">
                  <span className="scrubber-label">
                    {lang === 'vi' ? 'Chuyển nhanh:' : 'Jump to:'}
                  </span>
                  <div className="scrubber-pills">
                    {chapters.map((ch, idx) => (
                      <button
                        key={ch.id}
                        type="button"
                        className={`scrubber-pill ${idx === activeIdx ? 'active' : ''}`}
                        onClick={() => scrollToChapter(idx)}
                        title={`Chương ${ch.number}: ${ch.title}`}
                      >
                        {ch.number}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
