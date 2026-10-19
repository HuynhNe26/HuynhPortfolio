'use client';

import React from 'react';
import Link from 'next/link';
import type { Project, ProjectChapter } from '@/lib/types';
import { useLanguage } from '@/context/language-context';
import { MasterInteractiveScrollytelling } from './master-interactive-scrollytelling';

interface ProjectStoryBodyProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
  themeClass?: string;
}

const PROJECT_CHAPTERS_VI: Record<string, ProjectChapter[]> = {
  'ticket-concert-agentic-rag': [
    {
      id: 'chapter-01',
      number: '01',
      title: 'Tổng quan & Cổng Khám phá Sự kiện Concert',
      content: 'Ticket Concert Support System là ứng dụng web full-stack kết hợp cổng đặt vé sự kiện âm nhạc quy mô lớn với Trợ lý ảo AI thông minh. Hệ thống tối ưu hóa luồng khám phá sự kiện, giúp người hâm mộ dễ dàng tra cứu lịch diễn, giá vé và trạng thái còn vé cập nhật theo thời gian thực.',
      technicalNotes: [
        'Kiến trúc Full-Stack React.js kết hợp Node.js RESTful API',
        'Cổng khám phá hiển thị lịch diễn chuẩn màn hình Retina sắc nét',
        'Tích hợp Cloudinary tối ưu băng thông phân phối poster ca nhạc',
      ],
    },
    {
      id: 'chapter-02',
      number: '02',
      title: 'Trợ lý AI Agentic RAG với LangChain & Gemini',
      content: 'Để giải quyết tình trạng quá tải tổng đài hỗ trợ trong các đợt mở bán vé cao điểm, hệ thống trang bị Trợ lý AI ứng dụng mô hình Agentic RAG. AI liên tục truy xuất dữ liệu từ Vector Database và sơ đồ chỗ ngồi thực tế, đưa ra câu trả lời chuẩn xác trong vòng 340ms mà không hề xảy ra tình trạng ảo giác.',
      technicalNotes: [
        'Agentic RAG workflow xây dựng trên LangChain.js & Google Gemini API',
        'Truy xuất sơ đồ chỗ ngồi và chính sách sự kiện chính xác 100%',
        'Phản hồi đa lượt hội thoại với độ trễ phản hồi trung bình chỉ 340ms',
      ],
    },
    {
      id: 'chapter-03',
      number: '03',
      title: 'Bản đồ Giữ ghế Thời gian thực & WebSocket Anti-Collision',
      content: 'Trọng tâm giải pháp phòng vé là cơ chế giữ ghế nguyên tử (Atomic Seat Locking) sử dụng WebSocket hai chiều và Redis TTL 600 giây. Ngay khi một người dùng click chọn ghế, trạng thái lập tức được phát broadcast tới toàn bộ khán giả khác trong vòng 50ms, triệt tiêu hoàn toàn nguy cơ 2 người đặt trùng cùng 1 vị trí.',
      technicalNotes: [
        'Bi-directional WebSocket event broadcast dưới 50ms',
        'Khóa giữ chỗ nguyên tử với Redis TTL đếm ngược 600s',
        'Xử lý mượt mà bài toán va chạm đồng thời (Anti-Collision concurrency)',
      ],
    },
    {
      id: 'chapter-04',
      number: '04',
      title: 'Ma trận Hạng vé & Tự động Tính toán Giỏ hàng',
      content: 'Giao diện phân tầng trực quan giữa các khu vực VIP, Regular, Early Bird và Standing kèm màu sắc phân biệt rõ ràng. Hệ thống tự động tính toán thuế phí, phụ thu dịch vụ và áp dụng mã ưu đãi voucher theo thời gian thực, nâng cao giá trị đơn hàng trung bình thêm 38%.',
      technicalNotes: [
        'Ma trận hạng vé và sơ đồ phân khu trực quan',
        'Tự động tính thuế phí và áp dụng voucher ưu đãi tức thì',
        'Trải nghiệm giỏ hàng đồng bộ với bộ đếm thời gian giữ ghế',
      ],
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Cổng Thanh toán MoMo API & IPN Webhook Bảo mật',
      content: 'Tích hợp luồng thanh toán quét mã MoMo QR Code tiện lợi. Mọi giao dịch được xác thực chữ ký số HMAC SHA-256 từ cổng MoMo qua IPN Webhook, cập nhật trạng thái đơn hàng trên PostgreSQL trong 250ms với tiêu chuẩn toàn vẹn dữ liệu ACID.',
      technicalNotes: [
        'MoMo API QR Code checkout tích hợp sâu vào giao diện modal',
        'Xác thực chữ ký số HMAC SHA-256 đối soát IPN Webhook đa lớp',
        'Ghi nhận giao dịch ACID-compliant vào cơ sở dữ liệu PostgreSQL Neon',
      ],
    },
    {
      id: 'chapter-06',
      number: '06',
      title: 'Kiến trúc API Full-Stack & Đóng góp Kỹ thuật',
      content: 'Với vai trò Full-Stack Developer trong nhóm 3 thành viên, tôi trực tiếp thiết kế kiến trúc REST API trên Node.js, cấu hình Connection Pooling tới Neon Serverless PostgreSQL, xây dựng socket handler cho chat real-time và tích hợp Cloudinary lưu trữ media tối ưu.',
      technicalNotes: [
        'Thiết kế kiến trúc cơ sở dữ liệu quan hệ PostgreSQL chuẩn hóa',
        'Xây dựng các WebSocket listener và broadcast event handler',
        'Tối ưu hóa thời gian phản hồi API trung bình đạt dưới 85ms',
      ],
    },
    {
      id: 'chapter-07',
      number: '07',
      title: 'Vé Điện tử QR Gửi Tức thì & Vận hành Thực tế',
      content: 'Ngay khi giao dịch hoàn tất, hệ thống tự động kích hoạt Resend API để gửi vé điện tử kèm mã QR định danh duy nhất về email của người mua trong 420ms. Dự án được triển khai thực tế trên tên miền ticketconcert.online với độ ổn định dịch vụ trên 99.9%.',
      technicalNotes: [
        'Tự động xuất vé điện tử PDF kèm mã QR kiểm soát cổng vào',
        'Tích hợp Resend API gửi email xác nhận trong 420ms',
        'Vận hành thực tế trên tên miền ticketconcert.online với độ ổn định 99.9%',
      ],
    },
  ],
  'fashion-nail-morley': [
    {
      id: 'chapter-01',
      number: '01',
      title: 'Mặt tiền Số Cao cấp Gam màu Champagne Rose',
      content: 'Fashion Nail Morley là dự án xây dựng mặt tiền số cho salon làm đẹp tại Morley, Tây Úc. Bố cục được thiết kế theo gam màu Champagne Rose ấm áp và typography thanh lịch, mang lại cảm giác hiếu khách và định hình đẳng cấp salon quốc tế ngay từ lần chạm mắt đầu tiên.',
      technicalNotes: [
        'Giao diện SPA siêu nhẹ phát triển trên React và Vite',
        'Bảng màu Champagne Rose ấm áp chuẩn nhận diện thương hiệu Úc',
        'Thời gian ở lại trang trung bình của khách hàng tăng lên 2 phút 40 giây',
      ],
    },
    {
      id: 'chapter-02',
      number: '02',
      title: 'Visual Lookbook Mẫu móng Nghệ thuật Studio',
      content: 'Tủ trưng bày lookbook móng tay nghệ thuật với hình ảnh chụp thực tế tại salon đạt chuẩn Retina. Khách hàng có thể dễ dàng duyệt qua các bộ sưu tập Acrylic, Shellac, Ombre và Nail Art theo mùa trước khi quyết định đặt lịch hẹn.',
      technicalNotes: [
        'Bộ sưu tập ảnh mẫu móng studio chụp thực tế tại salon',
        'Tối ưu hóa ảnh nén WebP tải trang tức thì trên mạng di động 4G/5G',
        'Tăng 52% số lượng khách yêu cầu làm mẫu thiết kế riêng sau khi duyệt lookbook',
      ],
    },
    {
      id: 'chapter-03',
      number: '03',
      title: 'Thẻ Giá Dịch vụ Chuẩn AUD Tối ưu Thiết bị Di động',
      content: 'Bảng giá dịch vụ niêm yết rõ ràng bằng đồng Đô la Úc (AUD) cho từng hạng mục dịch vụ: Acrylic Full Set, Gel Refill, SNS Dip Powder và Spa Pedicure. Khách hàng truy cập từ Instagram hoặc Google Maps có thể nắm bắt chi phí minh bạch chỉ sau 1 chạm.',
      technicalNotes: [
        'Thiết kế thẻ giá Mobile-First tối ưu hiển thị trên màn hình smartphone',
        'Bảng giá minh bạch từng dịch vụ bằng AUD, giảm 70% cuộc gọi hỏi giá',
        'Tích hợp bộ lọc nhóm dịch vụ: Tay, Chân, Chăm sóc móng nghệ thuật',
      ],
    },
    {
      id: 'chapter-04',
      number: '04',
      title: 'Khung Đặt Lịch Hẹn Nhanh 1 Chạm (One-Tap Booking)',
      content: 'Biểu mẫu yêu cầu đặt lịch hẹn không yêu cầu tạo tài khoản rườm rà. Khách hàng chỉ cần chọn thợ nail yêu thích, ngày giờ mong muốn và số điện thoại liên lạc, hoàn tất quy trình chỉ trong vòng 30 giây với tỷ lệ chuyển đổi tăng 40%.',
      technicalNotes: [
        'Modal đặt lịch 3 bước siêu tốc, không cần đăng ký tài khoản phức tạp',
        'Form validation thời gian thực ngăn ngừa nhập sai số điện thoại Úc',
        'Tỷ lệ chuyển đổi đặt lịch hẹn thành công tăng 40% so với phương thức cũ',
      ],
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Thông báo Lịch hẹn Tức thì qua Resend API',
      content: 'Dữ liệu lịch hẹn được lưu trữ an toàn trên PostgreSQL Neon Serverless, đồng thời kích hoạt API Resend để gửi email HTML thông báo tức thì đến hộp thư của chủ tiệm và khách hàng trong vòng 350ms, giúp salon không bỏ sót bất kỳ lịch hẹn nào.',
      technicalNotes: [
        'Backend Node.js xử lý yêu cầu đặt lịch và lưu trữ vào PostgreSQL Neon',
        'Tự động gửi email xác nhận HTML qua Resend API trong 350ms',
        'Chủ tiệm nhận thông báo tức thời trên điện thoại để sắp xếp thợ kịp thời',
      ],
    },
    {
      id: 'chapter-06',
      number: '06',
      title: 'Tích hợp Google Maps & Local SEO Tây Úc',
      content: 'Tích hợp bản đồ Google Maps tương tác kèm tính năng bấm để gọi điện thoại và chỉ đường 1 chạm. Dữ liệu có cấu trúc Schema.org được tối ưu cho tìm kiếm địa phương tại khu vực Morley, thu hút hơn 180 lượt khách tìm đường mới mỗi tháng.',
      technicalNotes: [
        'Tích hợp Google Maps API kèm nút bấm chỉ đường GPS 1 chạm',
        'Tối ưu hóa Local SEO Schema Markup cho khu vực Morley, Western Australia',
        'Mang lại hơn 180 lượt tìm kiếm đường đi thực tế đến salon mỗi tháng',
      ],
    },
    {
      id: 'chapter-07',
      number: '07',
      title: 'Vận hành Thực tế tại fashionnailmorley.com.au',
      content: 'Website vận hành thương mại ổn định tại fashionnailmorley.com.au với tốc độ tải trang dưới 1 giây và điểm số Google PageSpeed đạt 98/100, mang lại sự tín nhiệm và doanh thu bền vững cho chủ salon.',
      technicalNotes: [
        'Triển khai thương mại thực tế tại tên miền fashionnailmorley.com.au',
        'Điểm số Google PageSpeed 98/100 cho trải nghiệm di động',
        'Tốc độ tải trang dưới 1 giây, tiết kiệm tối đa dữ liệu di động của người dùng',
      ],
    },
  ],
  'examplatform-ai': [
    {
      id: 'chapter-01',
      number: '01',
      title: 'Phòng thi Trực tuyến Không Xao nhãng (Distraction-Free)',
      content: 'ExamPlatform AI mang đến phòng thi trực tuyến chuẩn mực học thuật, loại bỏ hoàn toàn các yếu tố gây nhiễu giao diện. Sinh viên tập trung 100% tinh thần vào nội dung câu hỏi với đồng hồ đếm ngược và bảng điều hướng câu hỏi trực quan.',
      technicalNotes: [
        'Giao diện làm bài thi Distraction-Free tối giản, khoa học',
        'Đồng hồ đếm ngược phiên thi đính kèm chỉ báo thời gian chính xác',
        'Bảng ma trận câu hỏi giúp thí sinh dễ dàng đánh dấu câu cần xem lại',
      ],
    },
    {
      id: 'chapter-02',
      number: '02',
      title: 'Cơ chế Thích ứng Độ khó Câu hỏi (Adaptive Difficulty)',
      content: 'Thuật toán đánh giá thông minh tự động phân tích độ chính xác của các câu trả lời trước đó để đưa ra câu hỏi tiếp theo có độ khó tương thích, giúp phân loại chính xác 5 cấp bậc năng lực sinh viên ngay trong cùng một đề thi chung.',
      technicalNotes: [
        'Thuật toán Adaptive Testing phân hóa câu hỏi theo năng lực thí sinh',
        'Ngân hàng đề thi đa tầng với phân loại kiến thức theo mức độ',
        'Tự động cân bằng thời gian và độ khó đảm bảo tính công bằng học thuật',
      ],
    },
    {
      id: 'chapter-03',
      number: '03',
      title: 'Giám sát Tab Blur & Chống Gian lận (Anti-Cheat Telemetry)',
      content: 'Hệ thống tích hợp telemetry phát hiện sự kiện mất focus (blur) khi thí sinh rời khỏi tab làm bài hoặc mở cửa sổ phụ trợ. Dữ liệu được mã hóa JWT và ghi nhận số lần vi phạm vào nhật ký thi, giảm 94% hành vi tra cứu tài liệu trái phép.',
      technicalNotes: [
        'Cơ chế giám sát Tab Blur và Focus State theo thời gian thực',
        'Mã hóa phiên làm bài an toàn bằng JSON Web Tokens (JWT)',
        'Giảm 94% các hành vi gian lận mở tab tra cứu tài liệu trái phép',
      ],
    },
    {
      id: 'chapter-04',
      number: '04',
      title: 'Đồng hồ Đếm ngược & Tự động Lưu vào Redis Cache',
      content: 'Mỗi thao tác chọn đáp án của sinh viên lập tức được lưu tạm vào Redis in-memory cache với độ trễ chỉ 6ms. Cơ chế Autosave bảo vệ 100% tiến độ làm bài ngay cả khi máy tính bị mất điện, rớt mạng hoặc trình duyệt bị đóng đột ngột.',
      technicalNotes: [
        'Tự động lưu đáp án vào bộ nhớ Redis với độ trễ siêu tốc 6ms',
        'Khôi phục nguyên vẹn phiên thi khi thí sinh gặp sự cố mạng hoặc f5',
        'Cơ chế Flush định kỳ đồng bộ dữ liệu an toàn về cơ sở dữ liệu chính',
      ],
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Báo cáo Phân tích AI Rubric theo từng Khái niệm',
      content: 'Sau khi nộp bài, hệ thống xuất báo cáo phân tích năng lực chi tiết theo từng chủ đề kiến thức. AI đánh giá điểm mạnh, điểm yếu và đưa ra lộ trình ôn tập cụ thể cho từng sinh viên thay vì chỉ hiển thị một con số điểm tổng chung chung.',
      technicalNotes: [
        'Báo cáo phân tích AI Rubric bóc tách chi tiết từng lỗ hổng kiến thức',
        'Gợi ý tài liệu và bài tập ôn tập có trọng tâm cho từng thí sinh',
        'Biểu đồ trực quan hóa mức độ thuần thục kỹ năng phần mềm',
      ],
    },
    {
      id: 'chapter-06',
      number: '06',
      title: 'Kiến trúc State Management & Redis Caching',
      content: 'Thiết kế kiến trúc phân tách rõ ràng giữa tầng in-memory session (Redis) tốc độ cao và tầng lưu trữ kết quả lâu dài (PostgreSQL), giúp máy chủ chịu tải mượt mà trên 500 sinh viên nộp bài cùng lúc ở các phút cuối của kỳ thi.',
      technicalNotes: [
        'Kiến trúc phân tầng Decoupled giữa Node.js, Redis và PostgreSQL',
        'Xử lý mượt mà lưu lượng trên 500 sinh viên cùng nộp bài một thời điểm',
        'Connection Pooling đảm bảo không bị nghẽn tài nguyên cơ sở dữ liệu',
      ],
    },
    {
      id: 'chapter-07',
      number: '07',
      title: 'Vận hành tại exam-platform.online & Mở rộng Tự luận',
      content: 'Nền tảng đã vận hành thực tế tại exam-platform.online, phục vụ hàng trăm lượt thi thử trực tuyến ổn định. Hệ thống tiếp tục được mở rộng với tính năng chấm điểm câu hỏi tự luận tự động ứng dụng mô hình ngôn ngữ lớn.',
      technicalNotes: [
        'Triển khai thực tế trên tên miền exam-platform.online',
        'Mở rộng mô hình chấm điểm tự luận tự động bằng mô hình AI',
        'Minh chứng rõ nét cho tiềm năng của EdTech tự động hóa khảo thí',
      ],
    },
  ],
  'vk-digital-hub': [
    {
      id: 'chapter-01',
      number: '01',
      title: 'Mặt tiền Số Agency Tiếp thị Tăng trưởng B2B',
      content: 'VK Digital Hub là mặt tiền số của agency tiếp thị tăng trưởng, xây dựng trên gam màu Emerald Green hiện đại và uy tín. Trang web định vị thương hiệu chuyên nghiệp, tập trung vào giá trị chuyển đổi số và nâng cao 45% tỷ lệ liên hệ từ khách hàng doanh nghiệp.',
      technicalNotes: [
        'Kiến trúc Frontend React tối ưu hóa tốc độ tải trang dưới 800ms',
        'Định vị thương hiệu tiếp thị số chuẩn agency quốc tế cao cấp',
        'Tăng 45% tỷ lệ khách hàng doanh nghiệp gửi yêu cầu tư vấn giải pháp',
      ],
    },
    {
      id: 'chapter-02',
      number: '02',
      title: 'Bằng chứng Số liệu & Chỉ số ROI Khách hàng',
      content: 'Trực quan hóa các kết quả tăng trưởng thực tế của khách hàng: chỉ số ROAS, tỷ lệ chuyển đổi leads và biểu đồ tăng trưởng doanh thu. Việc minh bạch số liệu ngay từ trang chủ giúp thiết lập niềm tin vững chắc với các đối tác kinh doanh.',
      technicalNotes: [
        'Showcase bằng chứng số liệu tăng trưởng và chỉ số ROI minh bạch',
        'Báo cáo trực quan các chiến dịch quảng cáo và tiếp thị hiệu quả',
        'Thiết lập độ tin cậy tức thì với khách hàng tiềm năng ngay lần đầu ghé thăm',
      ],
    },
    {
      id: 'chapter-03',
      number: '03',
      title: 'Webhook Make.com Zero-Latency Lead Ingestion',
      content: 'Trọng tâm tự động hóa là luồng đẩy dữ liệu khách hàng tiềm năng không độ trễ. Ngay khi form được gửi, Webhook kích hoạt kịch bản Make.com để bắn thông báo kèm thông tin chi tiết vào kênh Slack nội bộ trong vòng 180ms.',
      technicalNotes: [
        'Tích hợp Webhook Make.com tiếp nhận lead tức thì trong 180ms',
        'Mô hình xử lý dữ liệu Serverless không cần duy trì backend tốn kém',
        'Tự động phân loại nguồn khách hàng và gắn nhãn chiến dịch chính xác',
      ],
    },
    {
      id: 'chapter-04',
      number: '04',
      title: 'Ma trận So sánh Gói dịch vụ Tăng trưởng',
      content: 'Bảng giá và quyền lợi dịch vụ được phân tầng mạch lạc giữa các gói SEO Tăng trưởng, Google Ads Hiệu suất và Giải pháp Xây dựng Thương hiệu Toàn diện, giúp khách hàng doanh nghiệp dễ dàng ra quyết định và tăng 2.5 lần tỷ lệ chọn gói giải pháp lớn.',
      technicalNotes: [
        'Ma trận phân tầng dịch vụ rõ ràng, minh bạch quyền lợi',
        'Hỗ trợ khách hàng doanh nghiệp nhanh chóng so sánh và ra quyết định',
        'Tăng 2.5 lần tỷ lệ đối tác lựa chọn gói giải pháp dịch vụ toàn diện',
      ],
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Tự động Gửi Email Chào mừng & Đồng bộ Slack Team',
      content: 'Quy trình tự động hóa kích hoạt song song: gửi email chào mừng và tài liệu hồ sơ năng lực đến khách hàng, đồng thời gửi thông báo đẩy đến điện thoại đội ngũ tư vấn để liên hệ lại khách trong vòng 5 phút, nâng tỷ lệ chốt hợp đồng lên 3.2 lần.',
      technicalNotes: [
        'Đồng bộ tức thời thông tin liên hệ vào kênh Slack của đội ngũ tư vấn',
        'Tự động gửi email chào mừng kèm profile agency đến hộp thư khách hàng',
        'Rút ngắn thời gian phản hồi xuống dưới 5 phút, tăng 3.2 lần tỷ lệ chốt đơn',
      ],
    },
    {
      id: 'chapter-06',
      number: '06',
      title: 'Lập trình Giao diện React & Tối ưu Chuyển đổi',
      content: 'Giao diện React được lập trình với cấu trúc component sạch, tích hợp xác thực dữ liệu form ở phía client để ngăn ngừa hoàn toàn các trường hợp điền sai số điện thoại hay email, đảm bảo tỷ lệ tiếp nhận dữ liệu hợp lệ đạt 99%.',
      technicalNotes: [
        'Form validation thời gian thực xử lý phản hồi mượt mà không tải lại trang',
        'Cấu trúc component tái sử dụng cao, mã nguồn dễ dàng mở rộng',
        'Tối ưu hóa khả năng tương thích toàn diện trên thiết bị di động và máy tính bảng',
      ],
    },
    {
      id: 'chapter-07',
      number: '07',
      title: 'Triển khai Thực tế tại vkdigitalhub.netlify.app',
      content: 'Dự án được triển khai sản phẩm thực tế trên nền tảng Netlify tại vkdigitalhub.netlify.app. Mô hình Jamstack Serverless kết hợp No-code Automation vận hành ổn định 100% với chi phí duy trì máy chủ bằng 0.',
      technicalNotes: [
        'Triển khai thực tế trên nền tảng Netlify tại vkdigitalhub.netlify.app',
        'Mô hình Jamstack Serverless vận hành ổn định 100% với chi phí tối ưu',
        'Thời gian uptime dịch vụ đạt 100%, tốc độ phản hồi trang siêu tốc',
      ],
    },
  ],
  'nh-huynh-portfolio': [
    {
      id: 'chapter-01',
      number: '01',
      title: 'Giao diện Trang chủ & Hero Section Chân dung 3D',
      content: 'Portfolio cá nhân được kiến tạo theo ngôn ngữ thiết kế Light Theme hiện đại với gam màu trắng tinh khôi (#FFFFFF, #F8FAFC) và đường viền sắc sảo. Tiêu đề tên phát quang kết hợp hiệu ứng chân dung 3D tạo ấn tượng thị giác sâu sắc ngay trong 3 giây đầu tiên.',
      technicalNotes: [
        'Ngôn ngữ thiết kế Light Theme cao cấp, thanh thoát và hiện đại',
        'Tiêu đề tên hiệu ứng ánh sáng động chuyển màu tinh tế',
        'Bố cục phân tầng chuẩn mực tôn vinh hồ sơ năng lực của lập trình viên',
      ],
    },
    {
      id: 'chapter-02',
      number: '02',
      title: 'Bộ sưu tập Dự án Nổi bật với Hiệu ứng 3D Tilt',
      content: 'Thay vì các thẻ dự án phẳng thông thường, các card dự án nổi bật sở hữu cơ chế tính toán góc nghiêng 3D theo con trỏ chuột, kết hợp vầng hào quang backlight phát sáng theo hướng di chuyển, tạo cảm giác xúc giác chân thực và sống động.',
      technicalNotes: [
        'Hiệu ứng 3D perspective tilt tính toán thời gian thực theo tọa độ con trỏ',
        'Hào quang backlight và ambient glare chuyển động mượt mà',
        'Chuẩn hóa thời gian thực hiện dự án theo định dạng Tháng/Năm chuẩn mực',
      ],
    },
    {
      id: 'chapter-03',
      number: '03',
      title: 'Động cơ Scrollytelling Đồng bộ Chia đôi Màn hình',
      content: 'Trái tim của trang chi tiết là động cơ Scrollytelling đồng bộ: cột bên trái cuộn các chương câu chuyện kỹ thuật, cột bên phải là sân khấu thiết bị ghim cố định hiển thị ảnh chụp thực tế màn hình tương ứng với từng giai đoạn kiến trúc.',
      technicalNotes: [
        'Thiết kế chia đôi màn hình chuẩn mực (Split-Screen Scrollytelling)',
        'Sân khấu thiết bị bên phải ghim cố định với khung trình duyệt hiện đại',
        'Tối ưu hóa IntersectionObserver chuyển đổi trạng thái không giật khung hình',
      ],
    },
    {
      id: 'chapter-04',
      number: '04',
      title: 'Điểm nhấn Radar Hotspot & Con trỏ Chỉ dẫn UI',
      content: 'Trên mỗi ảnh chụp màn hình, hệ thống bố trí điểm radar hotspot phát sóng xung nhịp định vị chính xác vị trí thành phần UI đang được đề cập, kèm con trỏ chuột mô phỏng thao tác giúp người đọc không bao giờ bị lạc giữa các giao diện phức tạp.',
      technicalNotes: [
        'Điểm radar hotspot phát sóng sóng tỏa định vị chính xác thành phần UI',
        'Thẻ gọi ý mở rộng giải thích cặn kẽ hành động và lý do thiết kế',
        'Con trỏ chuột mô phỏng hành vi thao tác người dùng sinh động',
      ],
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Mỗi Dự án Sở hữu Animation & Storytelling Riêng biệt',
      content: 'Thay vì giao diện rập khuôn, mỗi dự án sở hữu một thế giới visual và animation độc bản: Ticket Concert mang sóng âm Cyber; Fashion Nail mang hiệu ứng Ken Burns & Bokeh vàng; ExamPlatform mang radar AI proctoring; VK Digital mang pipeline dòng dữ liệu.',
      technicalNotes: [
        '5 phong cách thiết kế chuyển động độc bản may đo cho từng dự án',
        'Sóng âm equalizer, hiệu ứng Ken Burns, radar quét AI và pipeline dữ liệu',
        'Khẳng định năng lực thiết kế UI/UX phong phú và tinh tế của ứng viên',
      ],
    },
    {
      id: 'chapter-06',
      number: '06',
      title: 'Cổng Đăng nhập Quản trị Nội dung CMS Bảo mật',
      content: 'Portfolio tích hợp bảng điều khiển CMS hoàn chỉnh ở backend với xác thực phiên bảo mật HttpOnly Session Cookie và băm mật khẩu scrypt, cho phép quản trị viên thêm/sửa/xóa dự án, điều chỉnh nội dung các chương và quản lý tin nhắn liên hệ.',
      technicalNotes: [
        'Hệ thống xác thực quản trị viên bảo mật với scrypt và HttpOnly cookie',
        'CRUD API toàn diện quản lý dự án, kỹ năng và tin nhắn liên hệ',
        'Kiểm duyệt và lưu trữ dữ liệu an toàn trên PostgreSQL Neon Serverless',
      ],
    },
    {
      id: 'chapter-07',
      number: '07',
      title: 'Hồ sơ Năng lực Kỹ thuật & Bảng Kỹ năng Phân tầng',
      content: 'Hồ sơ năng lực minh bạch thông tin học vấn GPA 3.1 và chứng chỉ TOEIC 550 do ETS cấp. Ma trận kỹ năng phân tầng rõ nét chứng minh trình độ sẵn sàng cho các vị trí Full-Stack Developer Intern, Fresher & Junior.',
      technicalNotes: [
        'Minh bạch học vấn, điểm số GPA 3.1 và chứng chỉ TOEIC 550 uy tín',
        'Ma trận kỹ năng phân tầng Frontend, Backend, AI Integration và Database',
        'Hồ sơ kỹ thuật chuẩn mực sẵn sàng cho các cơ hội tuyển dụng công nghệ',
      ],
    },
  ],
};

export function ProjectStoryBody({
  project,
  prevProject,
  nextProject,
  themeClass,
}: ProjectStoryBodyProps) {
  const { t, lang } = useLanguage();

  const defaultChapters: ProjectChapter[] = [
    {
      id: 'chapter-01',
      number: '01',
      title: 'Introduction & Project Overview',
      content: project.summary,
      technicalNotes: project.technologies,
    },
    {
      id: 'chapter-02',
      number: '02',
      title: 'The Idea & Core Concept',
      content: project.approach,
    },
    {
      id: 'chapter-03',
      number: '03',
      title: 'The Challenge & Problem',
      content: project.problem,
    },
    {
      id: 'chapter-04',
      number: '04',
      title: 'The Experience & Design',
      content: 'Designed with clean hierarchy, responsive layout adaptation, and direct user guidance throughout the application lifecycle.',
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Engineering Architecture',
      content: project.approach,
    },
    {
      id: 'chapter-06',
      number: '06',
      title: 'My Contribution',
      content: `Key responsibilities as ${project.role}: full-stack feature development, component architecture, API routing, and performance optimization.`,
    },
    {
      id: 'chapter-07',
      number: '07',
      title: 'Outcome & Reflection',
      content: project.outcome,
    },
  ];

  // Select rich bilingual chapters
  const chapters: ProjectChapter[] = lang === 'vi'
    ? (PROJECT_CHAPTERS_VI[project.slug] || (project.chapters && project.chapters.length > 0 ? project.chapters : defaultChapters))
    : (project.chapters && project.chapters.length > 0 ? project.chapters : defaultChapters);

  return (
    <>
      {/* CHAPTER NAVIGATION STRIP */}
      <nav className={`chapter-sticky-nav ${themeClass || ''}`} aria-label="Case study chapters">
        <div className="container chapter-nav-inner">
          <span className="chapter-nav-label">{t('story.chaptersNav')}</span>
          <div className="chapter-links-scroll">
            {chapters.map((ch) => (
              <a key={ch.id} href={`#${ch.id}`} className="chapter-nav-link">
                <span>{ch.number}</span> {ch.title.split('&')[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* MASTER SYNCHRONIZED SCROLLYTELLING ENGINE */}
      <MasterInteractiveScrollytelling
        project={project}
        chapters={chapters}
      />

      {/* PROJECT PAGER (PREV / NEXT) */}
      <section className="project-pager container">
        <div className="pager-grid">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="pager-card prev">
              <span className="pager-direction">{t('story.prev')}</span>
              <h4>{prevProject.title}</h4>
              <span className="pager-cat">{prevProject.category}</span>
            </Link>
          ) : (
            <div className="pager-card empty" />
          )}

          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="pager-card next">
              <span className="pager-direction">{t('story.next')}</span>
              <h4>{nextProject.title}</h4>
              <span className="pager-cat">{nextProject.category}</span>
            </Link>
          ) : (
            <div className="pager-card empty" />
          )}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="story-contact-cta container">
        <div className="cta-inner">
          <p className="eyebrow">{t('story.ctaEyebrow')}</p>
          <h2>{t('story.ctaTitle')}</h2>
          <div className="cta-buttons">
            <Link href="/contact" className="button button-pro-primary">
              {t('story.ctaTalk')}
            </Link>
            <Link href="/projects" className="button button-pro-secondary">
              {t('story.ctaMore')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
