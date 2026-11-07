import type { ProjectChapter } from '@/lib/types';

export const PROJECT_CHAPTERS_VI: Record<string, ProjectChapter[]> = {
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
  'colorbox-event-lighting': [
    {
      id: 'chapter-01',
      number: '01',
      title: 'Tổng Quan & Giao Diện Sân Khấu Volumetric Lighting Điện Ảnh',
      content:
        'COLORBOX là đơn vị chuyên môn hàng đầu trong lĩnh vực thiết kế ánh sáng, mô phỏng 3D previz và điều hành hệ thống chiếu sáng cho các concert, lễ hội âm nhạc và sự kiện quy mô lớn tại Việt Nam. Nền tảng số được thiết kế với phong cách Dark Mode cao cấp, lấy cảm hứng từ các bàn điều khiển ánh sáng grandMA3 và không gian sân khấu đại nhạc hội. Điểm nhấn thị giác là khu vực Hero mô phỏng các chùm sáng hội tụ (Volumetric Beams) chuyển động nhịp nhàng, kết hợp typography hiện đại và các chi tiết viền neon công nghệ cao.',
      screenshots: [
        {
          url: '/projects/colorbox-hero.png',
          caption: 'Sân Khấu Volumetric Lighting Điện Ảnh & Chùm Sáng Hội Tụ',
          alt: 'ColorBox Cinematic Volumetric Stage Lighting Interface',
        },
      ],
      technicalNotes: [
        'Frontend xây dựng trên nền tảng React 18, Vite và TypeScript với kiến trúc Feature-First mô-đun hóa cao',
        'Hệ thống Volumetric Light Beams được tính toán vị trí góc và giả lập bằng CSS Gradients kết hợp Framer Motion GPU transform',
        'Bảng màu Neon Cyan (#00F0FF) và Amber Gold trên nền đen thẳm (#080808) tạo độ tương phản thị giác đạt chuẩn WCAG AAA',
      ],
    },
    {
      id: 'chapter-02',
      number: '02',
      title: 'Vòng Tròn Tương Tác Four-Piece Circle HUD & Khám Phá Dự Án Động',
      content:
        'Thay vì sử dụng danh sách trượt ảnh thông thường, COLORBOX trang bị bộ điều hướng Four-Piece Circle HUD độc quyền. Lấy cảm hứng từ giao diện điều khiển bàn xoay encoder trên các bàn MA Lighting, vòng tròn được chia làm 4 góc phần tư tương ứng với các đại nhạc hội tiêu biểu: Countdown Hạ Long, Heineken Refresh Super Arena, Đấu Trường Danh Vọng và Lễ Hội Vía Bà Chúa Xứ. Người dùng có thể di chuột hoặc xoay vòng tròn theo góc lượng giác để chuyển đổi mượt mà các chỉ số kỹ thuật, quy mô khán giả và công nghệ điều khiển tương ứng.',
      screenshots: [
        {
          url: '/projects/colorbox-interactive-circle-case-studies.png',
          caption: 'Vòng Tròn Tương Tác Four-Piece Circle HUD Điều Khiển Góc Xoay',
          alt: 'Interactive Four-Piece Circle HUD Quadrant Selector',
        },
      ],
      technicalNotes: [
        'Thuật toán tính toán góc xoay liên tục dựa trên hàm lượng giác Math.atan2 kết hợp SVG path arcs',
        'Đồng bộ trạng thái active quadrant mượt mà 60FPS không gây giật lag nhờ React useMemo và Framer Motion spring physics',
        'Cung cấp khả năng truy cập song song bằng bàn phím (Arrow keys / Tab navigation) và cảm ứng touch trên màn hình di động',
      ],
    },
    {
      id: 'chapter-03',
      number: '03',
      title: 'Hồ Sơ Kỹ Thuật Dự Án & Tích Hợp Rider Thiết Bị Độc Quyền',
      content:
        'Mỗi case study trên hệ thống là một bản hồ sơ kỹ thuật toàn diện được chuẩn hóa cho giới sản xuất sự kiện. Khách hàng và đối tác có thể xem chi tiết số lượng thiết bị (ví dụ 160 Moving Head Beam 480W, 48 Strobe RGB Matrix, 8 Laser 40W High-Power), thông số giao thức điều khiển DMX/ArtNet/sACN, quy trình lập trình timecode trên grandMA3 đồng bộ từng 1/100 giây với âm thanh, cũng như danh sách nghệ sĩ biểu diễn hàng đầu.',
      screenshots: [
        {
          url: '/projects/colorbox-case-study-detail.png',
          caption: 'Hồ Sơ Sản Xuất Countdown Hạ Long Quảng Ninh & Nghệ Sĩ Lineup',
          alt: 'Countdown Ha Long Production Case Study and Lineup',
        },
        {
          url: '/projects/colorbox-case-study-gallery.png',
          caption: 'Đại Nhạc Hội 50.000 Khán Giả & Bản Vẽ Kỹ Thuật Đèn',
          alt: '50,000 Spectator Arena Crowd and Technical Rig Platform',
        },
      ],
      technicalNotes: [
        'Cơ sở dữ liệu PostgreSQL (Neon) lưu trữ thông số kỹ thuật rider, sơ đồ patch đèn và danh sách thiết bị dưới dạng JSONB linh hoạt',
        'Tối ưu hóa hình ảnh độ phân giải cao kết hợp lazy-loading và responsive image breakpoints',
        'Tích hợp nút tải rider kỹ thuật PDF và bảng tra cứu quy chuẩn an toàn tải trọng giàn truss sân khấu',
      ],
    },
    {
      id: 'chapter-04',
      number: '04',
      title: 'Quy Trình Đặt Lịch Khảo Sát Kỹ Thuật & Tự Động Hóa Email Với Resend',
      content:
        'Nhằm số hóa hoàn toàn khâu tiếp nhận yêu cầu từ các đạo diễn và nhà tổ chức sự kiện, COLORBOX xây dựng modal đặt lịch khảo sát chuyên nghiệp. Khách hàng lựa chọn loại hình sự kiện (Festival ngoài trời, Lễ trao giải truyền hình, Tour lưu diễn, Sự kiện thương mại), nhập thời gian dự kiến, địa điểm và quy mô sân khấu. Toàn bộ dữ liệu được xác thực nghiêm ngặt bằng Zod schema, lưu vào database và kích hoạt ngay lập tức dịch vụ Resend API để gửi email biên nhận chi tiết cho khách hàng kèm thông báo khẩn cấp tới ban điều hành kỹ thuật.',
      screenshots: [
        {
          url: '/projects/colorbox-booking-modal.png',
          caption: 'Biểu Mẫu Đặt Lịch Khảo Sát Kỹ Thuật & Tư Vấn Sân Khấu Trực Tuyến',
          alt: 'ColorBox Stage Consultation and Technical Booking Modal',
        },
      ],
      technicalNotes: [
        'Xử lý biểu mẫu bằng React Hook Form kết hợp Zod resolver đảm bảo an toàn kiểu dữ liệu từ frontend tới backend',
        'Tự động gửi email biên nhận HTML đẹp mắt với tỷ lệ vào hộp thư đến (deliverability) cao qua Resend API',
        'Hỗ trợ đặt lịch khảo sát hiện trường trước 24 giờ với tính năng tự động phát hiện trùng lặp lịch',
      ],
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Trung Tâm Điều Hành Admin Thời Gian Thực & Socket.IO Telemetry',
      content:
        'Hệ sinh thái quản trị COLORBOX Admin Suite là trung tâm điều phối sản xuất sự kiện toàn diện. Kết nối trực tiếp qua Socket.IO, bảng điều khiển tự động hiển thị số lượng yêu cầu booking mới trong vòng 80ms mà không cần tải lại trang. Đặc biệt, hệ thống tích hợp bộ tổng hợp âm thanh Web Audio API độc quyền: khi có booking mới phát sinh, trình duyệt sẽ tự động phát chuông đa âm sắc Harmonic Chime (chuỗi hợp âm C5, E5, G5) tạo phản hồi thính giác trực quan sống động cho ban điều hành.',
      screenshots: [
        {
          url: '/projects/colorbox-admin-dashboard.png',
          caption: 'Trung Tâm Điều Hành Quản Trị Hệ Thống & Socket.IO Telemetry',
          alt: 'ColorBox Executive Admin Operations Hub',
        },
        {
          url: '/projects/colorbox-admin-bookings.png',
          caption: 'Hệ Thống Tiếp Nhận & Phân Phối Yêu Cầu Booking Thời Gian Thực',
          alt: 'Admin Live Booking Inquiries and Event Rider Inspection',
        },
      ],
      technicalNotes: [
        'Kênh WebSocket hai chiều Socket.IO đồng bộ sự kiện booking giữa client và server trong thời gian thực dưới 80ms',
        'Bộ tổng hợp âm thanh Harmonic Synth tự sinh bằng Web Audio API (AudioContext, OscillatorNode, GainNode envelope)',
        'Bảng điều khiển trực quan hóa trạng thái tour lưu diễn, tình trạng bảo dưỡng đèn và số lượng dự án công chiếu',
      ],
    },
    {
      id: 'chapter-06',
      number: '06',
      title: 'Bảo Mật Phân Quyền JWT Token Rotation & Quản Lý Hồ Sơ Sản Xuất',
      content:
        'COLORBOX Admin Hub được bảo vệ bởi kiến trúc bảo mật phân quyền đa lớp. Quy trình đăng nhập sử dụng cơ chế JWT Token Rotation hiện đại: Access Token ngắn hạn (15 phút) được bảo vệ trong bộ nhớ ứng dụng, trong khi Refresh Token dài hạn (7 ngày) được lưu trữ trong HttpOnly Secure Cookie với cờ SameSite=Strict. Toàn bộ mật khẩu được băm bằng bcrypt 10 vòng, kết hợp middleware kiểm soát truy cập phân quyền nghiêm ngặt trên mọi API endpoint.',
      screenshots: [
        {
          url: '/projects/colorbox-admin-case-studies.png',
          caption: 'Quản Lý Danh Mục Hồ Sơ Sản Xuất & Bật/Tắt Trạng Thái Công Chiếu',
          alt: 'Admin Production Case Studies Management Table',
        },
      ],
      technicalNotes: [
        'Kiến trúc xác thực JWT Token Rotation loại bỏ hoàn toàn nguy cơ rò rỉ token qua tấn công XSS',
        'Mã hóa mật khẩu quản trị viên an toàn bằng bcrypt kết hợp muối ngẫu nhiên (salt rounds: 10)',
        'Hệ thống quản lý CRUD đầy đủ cho 11+ case study sự kiện với tính năng bật/tắt hiển thị tức thì',
      ],
    },
    {
      id: 'chapter-07',
      number: '07',
      title: 'Kiến Trúc Micro-Animations, FAQ Chatbot & Tối Ưu Hóa Di Động',
      content:
        'COLORBOX hoàn thiện trải nghiệm người dùng với trợ lý kỹ thuật trực tuyến 24/7 (FAQ Chatbot) giúp trả lời ngay lập tức các câu hỏi thường gặp về kỹ thuật giàn truss, quy chuẩn nguồn điện và lưu ý thời tiết. Toàn bộ giao diện được thiết kế tương thích hoàn hảo từ màn hình máy tính để bàn 4K đến máy tính bảng và điện thoại di động thông minh, duy trì tốc độ khung hình 60FPS mượt mà trên mọi nền tảng.',
      screenshots: [
        {
          url: '/projects/colorbox-chatbot.png',
          caption: 'Trợ Lý Kỹ Thuật Ánh Sáng Sân Khấu Trực Tuyến 24/7',
          alt: 'ColorBox 24/7 Live Stage Lighting FAQ Chatbot',
        },
        {
          url: '/projects/colorbox-mobile-responsive.png',
          caption: 'Trải Nghiệm Giao Diện Tối Ưu Trên Thiết Bị Di Động',
          alt: 'ColorBox Mobile Responsive Viewport Showcase',
        },
        {
          url: '/projects/colorbox-tablet-responsive.png',
          caption: 'Bố Cục Thích Ứng Màn Hình Máy Tính Bảng',
          alt: 'ColorBox Tablet Viewport Responsive Showcase',
        },
      ],
      technicalNotes: [
        'Chatbot FAQ phân loại ý định kỹ thuật với danh mục câu trả lời được tối ưu hóa cho ngành sự kiện',
        'Kiến trúc Responsive linh hoạt với Tailwind CSS breakpoints và CSS clamp() fluid typography',
        'Tối ưu hóa tài nguyên tĩnh, font chữ và hình ảnh mang lại chỉ số Web Vitals xuất sắc',
      ],
    },
  ],
  'fashion-nail-morley': [
    {
      id: 'chapter-01',
      number: '01',
      title: 'Mặt Tiền Số Nghệ Thuật Nail Cao Cấp Tại Morley Galleria WA',
      content: 'Fashion Nail Morley là nền tảng thương mại số chuyên nghiệp được phát triển cho salon làm đẹp tại Shop 52 Morley Galleria, Tây Úc. Bố cục được thiết kế theo phong cách Champagne Rose quý phái kết hợp hiệu ứng kính mờ Apple Glassmorphism và typography sang trọng, tạo ấn tượng hiếu khách và định vị chuẩn mực salon cao cấp ngay từ lần truy cập đầu tiên.',
      technicalNotes: [
        'Giao diện SPA siêu nhẹ phát triển trên React 19 và Vite 8 với CSS Variables Design Tokens',
        'Bảng màu Champagne Rose (#D9777F) ấm áp chuẩn nhận diện thương hiệu cao cấp tại Tây Úc',
        'Hiệu ứng kính mờ Apple Glassmorphism với thanh điều hướng cố định và nút đặt hẹn nhanh',
      ],
    },
    {
      id: 'chapter-02',
      number: '02',
      title: 'Menu 29 Liệu Trình Làm Móng & Bảng Giá AUD Minh Bạch',
      content: 'Hệ thống phân loại khoa học toàn bộ 29 liệu trình chăm sóc móng thành 6 nhóm dịch vụ: Builder Gel (BIAB), Gel-X Extensions, Acrylic Nails, SNS Dipping Powder, Spa Pedicure và Nail Art. Mỗi dịch vụ đều niêm yết minh bạch mức giá bằng Đô la Úc (AUD) và thời lượng dự kiến, giúp khách hàng đưa ra quyết định nhanh chóng và giảm 70% cuộc gọi hỏi giá.',
      technicalNotes: [
        'Bảng giá niêm yết rõ ràng bằng đồng Đô la Úc (AUD) cho 29 liệu trình độc quyền',
        'Bộ lọc danh mục mượt mà 60FPS kết hợp tìm kiếm dịch vụ tức thì trên thiết bị di động',
        'Hiển thị chi tiết thời lượng (phút), phụ phí đính đá/chrome và khuyến nghị chăm sóc móng',
      ],
    },
    {
      id: 'chapter-03',
      number: '03',
      title: 'Tiêu Chuẩn Tiệt Trùng Y Tế Autoclave 100% & Cam Kết An Toàn',
      content: 'Nổi bật sự khác biệt với các salon thông thường bằng cam kết an toàn y khoa tuyệt đối: 100% dụng cụ kim loại được tiệt trùng bằng nồi hấp áp suất y tế tiêu chuẩn bệnh viện (Autoclave Sterilization), dũa móng và đệm xốp dùng một lần, kết hợp các dòng sơn hữu cơ thuần chay không chứa hóa chất độc hại, bảo vệ sức khỏe lâu dài của khách hàng.',
      technicalNotes: [
        'Quy chuẩn tiệt trùng nhiệt độ cao bằng nồi hấp Autoclave y tế tiêu chuẩn bệnh viện Tây Úc',
        'Cam kết dụng cụ dũa và đệm xốp dùng 1 lần loại bỏ hoàn toàn nguy cơ lây nhiễm chéo',
        'Sơn móng thuần chay hữu cơ (Vegan & Cruelty-Free) không chứa formaldehyde độc hại',
      ],
    },
    {
      id: 'chapter-04',
      number: '04',
      title: 'Trợ Lý AI Fashion Nails Concierge Tư Vấn 24/7 Thời Gian Thực',
      content: 'Tích hợp Trợ lý AI Concierge thông minh với bong bóng chào đón khách chủ động xoay vòng sau mỗi 1 phút. Trợ lý có khả năng giải đáp tức thì về thời lượng dịch vụ, tư vấn mẫu móng phù hợp, hướng dẫn chăm sóc sau khi làm móng và hỗ trợ kích hoạt trực tiếp modal đặt lịch chỉ sau 1 thao tác chạm.',
      technicalNotes: [
        'Chatbot QuickChatbot tích hợp cơ sở tri thức chuyên sâu về 29 dịch vụ và chính sách giá',
        'Bong bóng tương tác thông minh tự động gợi ý câu hỏi và xoay vòng chủ đề sau mỗi 60 giây',
        'Tích hợp luồng chuyển đổi 1 chạm mở thẳng modal đặt hẹn với dịch vụ đã được chọn sẵn',
      ],
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Hệ Thống Đặt Hẹn 6 Bước Thông Minh Đồng Bộ Múi Giờ Perth (AWST UTC+8)',
      content: 'Quy trình đặt lịch 6 bước mượt mà: chọn dịch vụ & liệu trình bổ sung -> chọn ngày trong 14 ngày tới -> chọn khung giờ theo múi giờ Perth (AWST UTC+8) với kiểm tra giờ mở cửa và slot khả dụng -> điền thông tin và áp dụng ưu đãi 10% Senior/Student/Morley Staff -> kiểm tra đơn và mã voucher -> xác nhận tức thì kèm email HTML qua Resend API trong 350ms.',
      technicalNotes: [
        'Wizard 6 bước thông minh tối ưu trải nghiệm di động hoàn thành trong dưới 45 giây',
        'Bộ chọn khung giờ đồng bộ múi giờ Perth (AWST UTC+8) và tự động khóa ngày/giờ đã kín',
        'Gửi email HTML xác nhận tức thời cho khách và ban quản lý qua Resend API trong 350ms',
      ],
    },
    {
      id: 'chapter-06',
      number: '06',
      title: 'Executive Admin Suite Quản Trị Vận Hành & Đồng Bộ Socket.IO Realtime',
      content: 'Trung tâm điều hành số bảo mật cao dành riêng cho ban quản lý salon: xác thực Bcryptjs/JWT, bảng điều khiển tổng quan KPI doanh thu và lịch hẹn trong ngày, bảng danh sách lịch hẹn trực tiếp tự động đồng bộ qua WebSocket (Socket.IO) khi có khách đặt mới, và công cụ quản trị 29 dịch vụ linh hoạt.',
      technicalNotes: [
        'Xác thực quản trị viên bảo mật với Bcryptjs băm mật khẩu và JWT phân quyền an toàn',
        'Bảng lịch hẹn đồng bộ hai chiều thời gian thực qua WebSocket (Socket.IO) không cần reload',
        'Quản lý danh mục 29 liệu trình linh hoạt: bật/tắt hoạt động, chỉnh sửa giá AUD tức thời',
      ],
    },
    {
      id: 'chapter-07',
      number: '07',
      title: 'Hệ Thống Voucher Tự Động Hóa Node-cron & Vận Hành Thương Mại',
      content: 'Hệ thống quản lý chiến dịch khuyến mãi voucher linh hoạt theo % hoặc số tiền cố định AUD, kết hợp tiến trình chạy ngầm Node-cron tự động kiểm tra và khóa voucher hết hạn mỗi 10 phút và vào lúc 00:01 sáng mỗi ngày theo giờ Úc. Nền tảng vận hành thương mại ổn định tại fashionnailmorley.com.au với điểm Google PageSpeed 98/100.',
      technicalNotes: [
        'Quản trị viên phát hành mã voucher khuyến mãi (% hoặc AUD) kèm giới hạn lượt dùng',
        'Tiến trình Node-cron chạy ngầm mỗi 10 phút và 00:01 sáng (Australia/Perth) xử lý hết hạn tự động',
        'Triển khai thương mại ổn định tại fashionnailmorley.com.au với điểm số PageSpeed 98/100',
      ],
    },
  ],
  'examplatform-ai': [
    {
      id: 'chapter-01',
      number: '01',
      title: 'Tổng Quan Nền Tảng & Khảo Thí Công Bằng Chuẩn GDPT 2018',
      content: 'ExamPlatform AI định vị sứ mệnh cốt lõi: Chấm dứt học vẹt, xây dựng môi trường khảo thí công bằng và khai phóng tư duy độc lập. Hệ thống chuẩn hóa hơn 100.000 câu hỏi bám sát khung chương trình GDPT 2018 của Bộ GD&ĐT, bao phủ từ Lớp 1 đến Lớp 12 và 18 ngành học Đại học chuyên sâu.',
      technicalNotes: [
        'Full-Stack Monorepo hiện đại: React 18 (Pure Vanilla CSS) + Node.js 20 & Express.js',
        'Ngân hàng câu hỏi chuẩn hóa GDPT 2018 với hơn 100.000 mục kiểm tra phân loại đa môn',
        'Hỗ trợ toàn diện 4 khối cấp học từ Lớp 1 đến Lớp 12 và 18 ngành chuyên sâu Đại học',
      ],
    },
    {
      id: 'chapter-02',
      number: '02',
      title: 'Hệ Thống 4 Khối Cấp Học & Nút "Chưa Học" Nhân Văn',
      content: 'Lộ trình rèn luyện được phân tầng khoa học theo tâm sinh lý lứa tuổi: Tiểu học chú trọng Toán tư duy và phát hiện mỏi mắt; THCS rèn kỷ luật thi cử với cấu trúc đề 30 phút (20 TN + 2 TL); THPT bứt phá điểm 9+ và thi ĐGNL; Đại học áp dụng mô hình Bayesian Knowledge Tracing. Đặc biệt, nút "Chưa học" nhân văn cho phép học sinh tạm hoãn câu hỏi chưa học trên lớp mà không bị trừ điểm, bảo tồn nguyên vẹn chuỗi học tập (Streak).',
      technicalNotes: [
        'Tiểu học: Toán tư duy trực quan, phát hiện mất tập trung, Gamification huy hiệu Chuyên Cần',
        'THCS: Ma trận đề 30 phút (20 TN + 2 TL), bóc tách lỗ hổng theo Đại số, Hình học, KHTN',
        'THPT & Đại học: Ma trận đề 45 phút (30 TN + 3 TL), luyện thi ĐGNL & Bayesian Knowledge Tracing',
      ],
    },
    {
      id: 'chapter-03',
      number: '03',
      title: 'Phòng Lab STEM & Ma Trận Đề Phân Hóa Hamilton-Hare',
      content: 'Hệ thống triệt tiêu hoàn toàn tình trạng trùng đề bằng thuật toán Hamilton-Hare ma trận đề: phân bổ chính xác theo 4 mức nhận thức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao). Phòng Lab STEM tích hợp KaTeX hiển thị công thức toán học sắc nét và phân tích bẫy phương án nhiễu (Distractor Analysis) chỉ rõ nguyên nhân khiến 75% học sinh chọn sai.',
      technicalNotes: [
        'Thuật toán Hamilton-Hare phân bổ tỉ lệ câu hỏi theo 4 mức nhận thức chuẩn GDPT 2018',
        'Render công thức toán học, vật lý, hóa học siêu tốc bằng KaTeX không giật lag',
        'Phân tích bẫy phương án nhiễu (Distractor Analysis) giải mã tư duy sai sót của học sinh',
      ],
    },
    {
      id: 'chapter-04',
      number: '04',
      title: 'Gia Sư AI Socratic 3 Tầng & Cụm Multi-Key Gemini Failover',
      content: 'Trọng tâm sư phạm khai phóng là Gia sư AI Socratic 3 tầng dẫn dắt tư duy: Level 1 gợi mở góc nhìn và định hướng tư duy, Level 2 phân tích định lý và mối liên hệ công thức cốt lõi, Level 3 bóc tách phương pháp giải chi tiết, tuyệt đối không bao giờ mớm sẵn đáp án để chống học vẹt. Vận hành mượt mà trên cụm Multi-Key Gemini có cơ chế xoay vòng và cooldown tự động.',
      technicalNotes: [
        'Kiến trúc LangGraph JS điều phối đồ thị trạng thái tư vấn sư phạm 3 cấp độ',
        'Bộ quản lý GeminiKeyManager hỗ trợ 1-10 API keys xoay vòng và cooldown thông minh',
        'Độ trễ phản hồi Socratic đạt 0.05 giây, nâng cao trải nghiệm tự học độc lập',
      ],
    },
    {
      id: 'chapter-05',
      number: '05',
      title: 'Camera AI Giám Sát Liêm Chính & Chống Gian Lận Đa Luồng',
      content: 'Để bài kiểm tra tại nhà có giá trị như thi tại trường, ExamPlatform AI tích hợp Camera AI giám sát liêm chính chạy mô hình OpenCV Haar Cascade (Python daemon). Hệ thống theo dõi hướng nhìn, phát hiện quay đầu, vắng mặt, người lạ trước máy tính kết hợp giám sát thoát toàn màn hình (Fullscreen exit) và tab blur với thanh cảnh báo vi phạm 5 cấp độ.',
      technicalNotes: [
        'Computer Vision OpenCV phát hiện chuyển động mắt, quay mặt và vắng mặt realtime',
        'Giám sát hành vi chuyển tab và thoát chế độ toàn màn hình tức thì',
        'Cơ chế cảnh báo leo thang từ 1/5 đến 4/5 và tự động nộp bài khi chạm ngưỡng vi phạm 5/5',
      ],
    },
    {
      id: 'chapter-06',
      number: '06',
      title: 'Cổng Phụ Huynh Minh Bạch & Tự Động Hóa Báo Cáo BullMQ + Resend',
      content: 'Phụ huynh có một cổng thông tin riêng tại /parent để theo dõi sát sao tiến độ học tập: chuỗi ngày chuyên cần (Streak), thời gian học thực tế, bảng điểm từng môn và các cảnh báo vi phạm liêm chính. Hàng ngày vào lúc 19:00 - 20:00, worker nền tảng BullMQ tự động quét tiến độ và gửi email HTML nhận xét sư phạm đến phụ huynh qua Resend API.',
      technicalNotes: [
        'Cổng thông tin riêng biệt cho phụ huynh theo dõi tiến độ và lịch sử bài thi con em',
        'BullMQ In-Memory Queue phối hợp cùng Resend API gửi email định kỳ lúc 19:00 - 20:00',
        'Minh bạch hóa tiến độ học tập, xóa bỏ khoảng cách giữa nhà trường và gia đình',
      ],
    },
    {
      id: 'chapter-07',
      number: '07',
      title: 'Bảng Điều Khiển Quản Trị Viên, Live Proctor & Pure SVG Analytics',
      content: 'Hệ thống quản trị cung cấp góc nhìn toàn cảnh về hoạt động khảo thí: giám sát thí sinh trực tiếp (Live Proctoring qua WebSockets), biểu đồ ScoreChart & SkillRadarChart thuần SVG không phụ thuộc thư viện nặng ngoài, thống kê DAU/MAU và tình trạng sức khỏe cụm khóa Gemini AI. Nền tảng được bảo vệ bởi cơ chế In-Memory JWT Token Rotation chống tấn công token reuse.',
      technicalNotes: [
        'Trung tâm điều hành quản trị viên với Live Proctoring Stream qua WebSockets',
        'Biểu đồ Pure SVG (ScoreChart, SkillRadarChart) đạt chuẩn 60fps siêu nhẹ',
        'Bảo mật In-Memory Access Token 15p + HttpOnly Cookie Refresh Token Rotation',
        'Vận hành thực tế trên tên miền thương mại exam-platform.online với độ tin cậy 99.8%',
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


