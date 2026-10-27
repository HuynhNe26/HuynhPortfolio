'use client';

import React from 'react';
import Link from 'next/link';
import type { Project, ProjectChapter } from '@/lib/types';
import { STORYTELLING_MODES_CATALOG } from '@/lib/types';
import { useLanguage } from '@/context/language-context';
import { MasterInteractiveScrollytelling } from './master-interactive-scrollytelling';
import { ProjectGalleryShowcase } from '@/components/project-gallery-showcase';
import { ResponsiveOmniDeviceShowcase } from '@/components/responsive-omni-device-showcase';

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
      title: 'Tổng quan & Cổng Khám phá Sự kiện Concert (110+ Sự kiện)',
      content: 'Ticket Concert Support System là nền tảng phân phối vé âm nhạc quy mô lớn kết hợp Trợ lý AI thông minh ứng dụng Agentic RAG. Cổng thông tin cho phép người hâm mộ duyệt hơn 110 concert đa thể loại, theo dõi các tour diễn xu hướng như "Em Xinh Say Hi", "Anh Trai Vượt Ngàn Chông Gai", lọc sự kiện theo ngày biểu diễn và định vị địa điểm tổ chức trên khắp Việt Nam.',
      technicalNotes: [
        'Frontend React.js kết hợp Node.js & Express.js RESTful API tốc độ cao',
        'Quản lý danh mục hơn 110+ sự kiện âm nhạc, đại hội EDM và sân khấu kịch',
        'Tích hợp Cloudinary tối ưu hóa phân phối poster ca nhạc chất lượng cao',
      ],
    },
    {
      id: 'chapter-02',
      number: '02',
      title: 'Trợ lý AI Agentic RAG với LangGraph & Gemini 2.5 Flash',
      content: 'Nhằm giải quyết triệt để vấn đề quá tải chăm sóc khách hàng trong các đợt săn vé cao điểm, hệ thống trang bị Trợ lý AI Agentic RAG sử dụng kiến trúc LangGraph và mô hình Gemini 2.5 Flash. Trợ lý liên tục truy vấn kho tri thức vector (pgvector) và database PostgreSQL thời gian thực qua 7 công cụ chuyên biệt, phản hồi chuẩn xác về tình trạng vé, giá niêm yết và chính sách hoàn tiền trong vòng 340ms mà không hề xảy ra hiện tượng ảo giác.',
      technicalNotes: [
        'Kiến trúc LangGraph createReactAgent với cơ chế PostgresSaver checkpointing',
        'Mô hình Gemini 2.5 Flash kết hợp embedding vector 2000 chiều (gemini-embedding-001)',
        'Hệ thống quản lý xoay vòng 16 API Key (geminiKeyManager) tự động phục hồi khi gặp rate-limit',
      ],
    },
    {
      id: 'chapter-03',
      number: '03',
      title: 'Sơ Đồ Chọn Vé Tương Tác & Đồng Bộ Realtime Socket.IO',
      content: 'Trọng tâm của trải nghiệm đặt vé là bản đồ sân khấu tương tác đa phân khu (VIP, Standing, GA, CAT 1/2/3). Sử dụng Socket.IO kết nối theo từng phòng sự kiện (room_${eventId}), số lượng vé còn lại được cập nhật tức thì tới toàn bộ người dùng đang online. Khi một khách hàng giữ vé, hệ thống phát broadcast cập nhật kho vé trong 50ms, triệt tiêu hoàn toàn nguy cơ tranh chấp hoặc đặt trùng chỗ ngồi.',
      technicalNotes: [
        'Đồng bộ dữ liệu hai chiều thời gian thực qua Socket.IO room broadcast dưới 50ms',
        'Cập nhật tồn kho vé trực tiếp từ cấu trúc JSONB trong cơ sở dữ liệu PostgreSQL',
        'Xử lý ngăn chặn xung đột đặt vé đồng thời (Anti-collision race condition)',
      ],
    },
    {
      id: 'chapter-04',
      number: '04',
      title: 'Bộ Công Cụ Admin Thiết Kế Sơ Đồ Sân Khấu (React-Konva Canvas)',
      content: 'Thay vì sử dụng các mẫu sân khấu cố định, hệ thống cung cấp công cụ Canvas Stage Layout Editor độc quyền dành cho quản trị viên. Bằng cách sử dụng React-Konva, ban tổ chức có thể vẽ trực tiếp các phân khu đa giác (Polygon) hoặc hình chữ nhật (Rect) tùy biến theo sơ đồ thực tế của sân vận động hay nhà thi đấu, gán mã khu vực, màu sắc nhận diện, số lượng ghế tối đa và giá vé một cách trực quan.',
      technicalNotes: [
        'Trình biên tập đồ họa trực quan trên HTML5 Canvas với React-Konva',
        'Hỗ trợ công cụ vẽ đa giác tự do (Polygon) và hình khối chữ nhật (Rect)',
        'Toàn bộ tọa độ phân khu và thông số sân khấu được lưu trữ dưới định dạng JSONB',
      ],
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Cổng Thanh Toán MoMo / VNPay & Đối Soát Đơn Hàng Tự Động',
      content: 'Hệ thống tích hợp quy trình thanh toán không dùng tiền mặt qua cổng MoMo QR Code và VNPay. Mỗi đơn hàng được bảo vệ bởi cơ chế sinh mã giao dịch duy nhất kèm xác thực chữ ký số HMAC SHA-256 qua IPN Webhook. Khi thanh toán thành công, hệ thống tự động ghi nhận giao dịch chuẩn ACID vào PostgreSQL và cập nhật trạng thái đơn hàng trong 250ms.',
      technicalNotes: [
        'Tích hợp song song cổng thanh toán MoMo QR và VNPay Gateway',
        'Xác thực chữ ký số HMAC SHA-256 bảo vệ toàn vẹn dữ liệu IPN Webhook',
        'Đảm bảo tính nhất quán giao dịch và cập nhật tồn kho vé chuẩn ACID',
      ],
    },
    {
      id: 'chapter-06',
      number: '06',
      title: 'Báo Cáo Thống Kê Doanh Thu & Cảnh Báo Cháy Vé Tức Thì',
      content: 'Bảng điều khiển quản trị cung cấp góc nhìn toàn diện về hoạt động kinh doanh của toàn bộ nền tảng. Sử dụng thư viện Recharts để trực quan hóa doanh thu theo tháng, tỷ lệ lấp đầy vé của từng đêm nhạc và vận tốc bán vé. Đồng thời, Socket.IO lắng nghe liên tục và kích hoạt thông báo cảnh báo tức thì khi một concert đạt trên 90% hoặc 100% tỷ lệ bán vé.',
      technicalNotes: [
        'Biểu đồ thống kê tài chính và phân tích xu hướng bán vé với Recharts',
        'Hệ thống Socket.IO phát tín hiệu cảnh báo cháy vé tức thời tới ban quản trị',
        'Báo cáo hiệu suất kinh doanh phục vụ ra quyết định mở bán thêm vé',
      ],
    },
    {
      id: 'chapter-07',
      number: '07',
      title: 'Máy Quét Soát Vé QR Tại Cổng & Vận Hành Thực Tế',
      content: 'Để hoàn thiện vòng đời trải nghiệm sự kiện, hệ thống cung cấp máy quét mã QR soát vé tại cổng sử dụng camera trực tiếp qua html5-qrcode. Nhân viên cổng chỉ cần quét mã QR trên vé điện tử của khán giả, hệ thống ngay lập tức đối soát trong cơ sở dữ liệu và xác nhận check-in trong vòng 150ms, ngăn ngừa tuyệt đối tình trạng gian lận vé giả hay dùng lại mã vé cũ.',
      technicalNotes: [
        'Công nghệ quét mã QR thời gian thực sử dụng html5-qrcode trên trình duyệt',
        'Xác thực vé điện tử và cập nhật trạng thái đã sử dụng tức thì dưới 150ms',
        'Triển khai thực tế trên tên miền ticketconcert.online với độ sẵn sàng cao',
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
      title: 'Mỗi Dự án Sở hữu Animation & Storytelling Riêng biệt',
      content: 'Thay vì giao diện rập khuôn, mỗi dự án sở hữu một thế giới visual và animation độc bản: Ticket Concert mang sóng âm Cyber; Fashion Nail mang hiệu ứng Ken Burns & Bokeh vàng; ExamPlatform mang radar AI proctoring; VK Digital mang pipeline dòng dữ liệu.',
      technicalNotes: [
        '5 phong cách thiết kế chuyển động độc bản may đo cho từng dự án',
        'Sóng âm equalizer, hiệu ứng Ken Burns, radar quét AI và pipeline dữ liệu',
        'Khẳng định năng lực thiết kế UI/UX phong phú và tinh tế của ứng viên',
      ],
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Hệ thống Kỹ năng & Khối Bento Grid Tương tác',
      content: 'Khu vực Bento Grid tổ chức hệ sinh thái công nghệ phân loại theo tab (Frontend, Backend, Database, APIs) với hiệu ứng lọc mượt mà, kết hợp thẻ Học vấn VAA và thẻ chứng chỉ TOEIC 550 có xem trước bản PDF trực tiếp.',
      technicalNotes: [
        'Phân loại kỹ năng tương tác phản hồi tức thì với bộ lọc danh mục',
        'Thẻ chứng chỉ TOEIC 550 với thumbnail xem trước và mở file PDF chính thức',
        'Form liên hệ trực tiếp kết nối API backend kiểm duyệt dữ liệu an toàn',
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
      title: 'Trang Hồ sơ Kỹ thuật Về tôi (/about) & Triết lý Phát triển',
      content: 'Trang Về tôi độc lập minh bạch toàn bộ quá trình học tập tại VAA, chứng chỉ quốc tế TOEIC 550, hệ sinh thái công nghệ phân loại và 4 nguyên tắc kỹ thuật cốt lõi (Mã nguồn sạch SOLID, Hiệu năng Core Web Vitals, Ứng dụng AI Agentic, Trải nghiệm người dùng).',
      technicalNotes: [
        'Trang Về tôi độc lập với 5 chương cấu trúc bài bản và chuyên nghiệp',
        'Tên tiếng Anh chuẩn hóa không dấu: Nguyen Hoang Huynh',
        'Hỗ trợ toàn diện 2 chế độ Sáng / Tối và 3 ngôn ngữ VI / EN / ZH',
      ],
    },
  ],
  'rent-house-smart-management': [
    {
      id: 'chapter-01',
      number: '01',
      title: 'Cổng Khám Phá & Danh Mục Phòng Trọ Minh Bạch (Landing Page)',
      content:
        'Giao diện công khai tại nhatrothanhtam.netlify.app chào đón khách tìm phòng với danh mục trực quan các phòng trọ tiện nghi, bảng giá niêm yết rõ ràng, bộ lọc trạng thái (còn trống, đang thuê), cùng thông tin địa chỉ, tiện ích và vị trí thực tế.',
      technicalNotes: [
        'Giao diện chuẩn SEO Schema.org (ApartmentComplex) & OpenGraph',
        'Hiển thị danh mục phòng với trạng thái thời gian thực và giá thuê minh bạch',
        'Bố cục Responsive tối ưu cho cả máy tính và điện thoại di động',
      ],
      screenshots: [
        {
          url: '/projects/rent-house-hero.png',
          caption: 'Cổng Khám Phá & Danh Mục Phòng Trọ Nhà Trọ Thanh Tâm',
          alt: 'Landing Page & Catalog Phòng Trọ Nhà Trọ Thanh Tâm',
        },
      ],
    },
    {
      id: 'chapter-02',
      number: '02',
      title: 'Trung Tâm Quản Trị & Phân Tích Hiệu Suất Vận Hành (Admin Dashboard)',
      content:
        'Bảng điều khiển quản trị trung tâm dành cho chủ nhà trọ, tổng hợp nhanh tỷ lệ lấp đầy phòng, doanh thu tiền phòng, tiền điện, tiền nước thực thu so với dự kiến. Biểu đồ trực quan theo dõi lượng tiêu thụ điện nước trung bình 3-6 tháng và cảnh báo nhanh các phòng quá hạn thanh toán.',
      technicalNotes: [
        'Bảo mật phiên đăng nhập Quản trị viên với HTTP-Only Cookie & Rate Limiting',
        'Tổng hợp số liệu tài chính, doanh thu và công nợ tức thời',
        'Biểu đồ Recharts phân tích xu hướng tiêu thụ điện nước theo chu kỳ tháng',
      ],
      screenshots: [
        {
          url: '/projects/rent-house-admin-dashboard.png',
          caption: 'Bảng Điều Khiển Quản Trị & Phân Tích Tài Chính Nhà Trọ',
          alt: 'Admin Dashboard Quản Trị Nhà Trọ Thanh Tâm',
        },
      ],
    },
    {
      id: 'chapter-03',
      number: '03',
      title: 'Động Cơ AI OCR Nhận Diện Chỉ Số & Quy Trình Duyệt Human-In-The-Loop',
      content:
        'Điểm đột phá của dự án là việc xử lý ảnh công tơ điện và đồng hồ nước bằng mô hình AI OCR kết hợp thuật toán thị giác máy tính OpenCV. Hệ thống tự động phân tích độ sắc nét bằng phương sai Laplacian, cảnh báo ảnh mờ, chói sáng hoặc quá tối. Chủ nhà đối chiếu trực tiếp ảnh chụp thực tế và số liệu AI nhận diện, phê duyệt 1 chạm hoặc điều chỉnh số liệu trước khi chốt sổ.',
      technicalNotes: [
        'Local AI OCR Microservice (FastAPI + OpenCV + Tesseract) tự chủ 100% chi phí',
        'Thuật toán kiểm tra chất lượng ảnh (Laplacian variance blur detector)',
        'Quy trình kiểm soát Human-in-the-loop: đối chiếu song song ảnh gốc và số liệu OCR',
      ],
      screenshots: [
        {
          url: '/projects/rent-house-ai-meters.png',
          caption: 'Giao Diện Ghi Chỉ Số Điện Nước & AI OCR Đối Chiếu Ảnh Thực Tế',
          alt: 'AI OCR Meter Reading & Human-in-the-loop Review',
        },
      ],
    },
    {
      id: 'chapter-04',
      number: '04',
      title: 'Tự Động Tính Tiền Hóa Đơn & Phát Thông Báo Đa Kênh (SMS OTP & Email Resend)',
      content:
        'Ngay sau khi chỉ số điện nước được phê duyệt, hệ thống tự động tính toán tổng hóa đơn gồm tiền phòng, tiền điện, tiền nước và phí dịch vụ. Cơ chế Snapshot Pricing chốt cứng đơn giá tại thời điểm lập hóa đơn để lịch sử kế toán không bao giờ sai lệch. Hóa đơn được phát tức thời tới khách thuê qua tin nhắn SMS OTP và Email thông báo chi tiết qua Resend API.',
      technicalNotes: [
        'Cơ chế Snapshot Pricing lưu trữ bất biến đơn giá tại thời điểm lập phiếu',
        'Tự động tính toán phụ phí, trừ tiền đặt cọc hoặc cộng dồn nợ cũ',
        'Tích hợp Resend API gửi bảng kê chi tiết kèm ảnh chụp công tơ và SMS thông báo',
      ],
      screenshots: [
        {
          url: '/projects/rent-house-billing.png',
          caption: 'Quản Lý Hóa Đơn & Trạng Thái Gửi Thông Báo Tự Động',
          alt: 'Admin Bills Management & Multi-channel Dispatch',
        },
      ],
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Hợp Đồng Thuê Điện Tử Bất Biến & Khóa Mật Mã SHA-256 Trigger CSDL',
      content:
        'Giải quyết triệt để rủi ro thất lạc hoặc sửa đổi hợp đồng thuê truyền thống. Hệ thống sinh hợp đồng điện tử định dạng PDF, mã hóa toàn bộ văn bản và sinh chuỗi băm mật mã học SHA-256. Database Trigger (trg_enforce_contract_immutability) trên Neon PostgreSQL kích hoạt cơ chế bảo vệ bất biến, nghiêm cấm mọi hành vi cập nhật hoặc xóa hợp đồng đã được hai bên ký kết.',
      technicalNotes: [
        'Sinh file PDF hợp đồng chuẩn pháp lý với thư viện PDFKit',
        'Băm mật mã SHA-256 (document_hash) bảo đảm tính toàn vẹn tài liệu',
        'PostgreSQL trigger trg_enforce_contract_immutability ngăn chặn sửa đổi vĩnh viễn',
      ],
      screenshots: [
        {
          url: '/projects/rent-house-contracts.png',
          caption: 'Quản Lý Hợp Đồng Điện Tử Bất Biến với Mã Băm SHA-256',
          alt: 'Admin Electronic Contracts Management',
        },
      ],
    },
    {
      id: 'chapter-06',
      number: '06',
      title: 'Cổng Người Thuê Phòng: Chữ To, Tương Phản Cao & Đối Chiếu Ảnh Công Tơ',
      content:
        'Thấu hiểu tâm lý khách thuê và người lớn tuổi, Tenant Portal được thiết kế theo tiêu chuẩn công thái học cao: chữ to rõ ràng (≥18px), số tiền thanh toán hiển thị đậm nét (32px), nút bấm lớn (≥52px). Khách thuê đăng nhập nhanh bằng số điện thoại và mã OTP, có thể mở modal phóng to ảnh chụp đồng hồ thực tế để tự kiểm tra đối chiếu chỉ số của phòng mình.',
      technicalNotes: [
        'Xác thực đăng nhập không mật khẩu qua số điện thoại và mã OTP',
        'Giao diện Accessible High-Contrast thiết kế chuyên biệt cho mọi lứa tuổi',
        'Modal phóng to hình ảnh công tơ điện nước thực tế minh bạch 100%',
      ],
      screenshots: [
        {
          url: '/projects/rent-house-tenant-portal.png',
          caption: 'Cổng Thông Tin Người Thuê Dễ Dùng & Tra Cứu Ảnh Đồng Hồ Thực Tế',
          alt: 'Tenant Portal High-Contrast Accessible Dashboard',
        },
      ],
    },
    {
      id: 'chapter-07',
      number: '07',
      title: 'Ký Hợp Đồng Cảm Ứng HTML5 Canvas & Ứng Dụng Di Động Android APK',
      content:
        'Khách thuê có thể ký tên trực tiếp bằng ngón tay hoặc bút cảm ứng trên màn hình điện thoại thông qua khung ký Canvas mượt mà. Hệ thống đóng gói ứng dụng di động hoàn chỉnh với Capacitor 8 cho Android và iOS, thanh điều hướng Liquid Glass Dock kiểu dáng Apple tinh tế, và cung cấp sẵn tệp APK cài đặt trực tiếp.',
      technicalNotes: [
        'Ký số trực tiếp trên màn hình cảm ứng với HTML5 Canvas SignaturePad',
        'Đóng gói ứng dụng di động Native bằng Capacitor 8 (Android Studio / Gradle)',
        'Biên dịch sẵn tệp APK Android độc lập và hỗ trợ PWA Standalone trên iOS',
      ],
      screenshots: [
        {
          url: '/projects/rent-house-mobile.png',
          caption: 'Ứng Dụng Di Động Android APK & Thanh Điều Hướng Liquid Glass Dock',
          alt: 'Mobile Card UI & Liquid Glass Dock Navigation',
        },
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

  const storytellingMode = STORYTELLING_MODES_CATALOG.find((m) => m.id === project.storytellingStyle);

  return (
    <>
      {/* CHAPTER NAVIGATION STRIP */}
      <nav className={`chapter-sticky-nav ${themeClass || ''}`} aria-label="Case study chapters">
        <div className="container chapter-nav-inner">
          <div className="chapter-nav-brand-group">
            <span className="chapter-nav-label">{t('story.chaptersNav')}</span>
            {storytellingMode && (
              <span className="chapter-storytelling-mode-pill" title={lang === 'vi' ? storytellingMode.descriptionVi : storytellingMode.descriptionEn}>
                <span className="mode-pill-icon">{storytellingMode.icon}</span>
                <span className="mode-pill-name">{lang === 'vi' ? storytellingMode.titleVi : storytellingMode.titleEn}</span>
              </span>
            )}
          </div>
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

      {/* OMNI-DEVICE RESPONSIVE ANIMATION & CAPABILITY SHOWCASE */}
      {project.slug === 'rent-house-smart-management' && (
        <div style={{ marginTop: '56px', marginBottom: '64px' }}>
          <ResponsiveOmniDeviceShowcase />
        </div>
      )}

      {/* FULL HIGH-RESOLUTION SCREENSHOTS GALLERY SHOWCASE */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="container" style={{ marginTop: '48px', marginBottom: '64px' }}>
          <ProjectGalleryShowcase
            screenshots={project.gallery}
            projectTitle={project.title}
            liveUrl={project.slug === 'nh-huynh-portfolio' ? undefined : project.liveUrl}
            accentColor={project.themeColor || '#2563EB'}
          />
        </div>
      )}

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
