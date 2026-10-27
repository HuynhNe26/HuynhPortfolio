import { closeDatabase, query } from '../src/database.js';
import type { ProjectInput } from '../src/models.js';

async function seed() {
  console.log('Seeding portfolio database with verified records (PostgreSQL Neon)...');

  const now = new Date();

  // 1. Seed Owner Profile
  const profileData = {
    name: 'Nguyễn Hoàng Huynh',
    title: 'Full-Stack Web Developer',
    headline: 'Full-Stack Web Developer — Crafting Thoughtful Digital Products',
    introduction:
      'I am a passionate Information Technology student and Full-Stack Web Developer who enjoys transforming creative ideas into functional, scalable, and user-friendly digital products.',
    biography:
      'Currently in my third year of Information Technology at Vietnam Aviation Academy (GPA 3.1/4.0), I continuously explore modern web technologies, backend engineering, database design, authentication, API integrations, and practical software architecture. Through academic projects, collaborative development, and real-world website implementations, I aim to strengthen my engineering skills and build meaningful digital experiences.',
    dateOfBirth: 'August 26, 2005',
    hometown: 'Đồng Nai City, Vietnam',
    email: 'nguyenhoanghuynh.vn@gmail.com',
    phone: '+84 937 569 205',
    location: 'Đồng Nai & Ho Chi Minh City, Vietnam',
    availability: 'Available for Full-Stack Developer Intern, Fresher & Junior roles',
    skills: [
      'React.js',
      'Next.js',
      'TypeScript',
      'Node.js',
      'MongoDB',
      'PostgreSQL (Neon)',
      'Tailwind CSS',
      'LangChain.js',
      'Gemini API',
      'Resend API',
    ],
    skillsCategorized: {
      frontend: ['React.js', 'Next.js', 'Vite', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5 / CSS3'],
      backend: ['Node.js', 'Express.js', 'REST APIs', 'WebSocket', 'Authentication (JWT / Session)'],
      databases: ['MongoDB Atlas', 'PostgreSQL (Neon)', 'Redis'],
      apis: ['Resend API', 'Cloudinary', 'MoMo API', 'Gemini API', 'LangChain.js', 'Make Automation'],
      tools: ['Git', 'GitHub', 'Vercel', 'Docker', 'Postman'],
    },
    education: [
      {
        institution: 'Vietnam Aviation Academy (Học viện Hàng không Việt Nam)',
        major: 'Information Technology',
        degree: 'Bachelor of Science in Information Technology',
        period: '2023 – Present',
        gpa: '3.1 / 4.0',
        note: 'Third-year university student (as of October 2026)',
      },
    ],
    certificates: [
      {
        name: 'TOEIC Listening & Reading',
        issuer: 'ETS',
        score: '550',
        issueDate: 'October 2025',
        verificationUrl: '',
        imageUrl: '/certificates/toeic-550.jpg',
      },
    ],
    updatedAt: now,
  };

  await query(
    `INSERT INTO profiles (
      id, name, title, headline, introduction, biography, date_of_birth, hometown,
      email, phone, location, availability, skills, skills_categorized, education,
      certificates, updated_at
    ) VALUES (
      'owner', $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11, $12::jsonb, $13::jsonb, $14::jsonb, $15::jsonb, $16
    ) ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      title = EXCLUDED.title,
      headline = EXCLUDED.headline,
      introduction = EXCLUDED.introduction,
      biography = EXCLUDED.biography,
      date_of_birth = EXCLUDED.date_of_birth,
      hometown = EXCLUDED.hometown,
      email = EXCLUDED.email,
      phone = EXCLUDED.phone,
      location = EXCLUDED.location,
      availability = EXCLUDED.availability,
      skills = EXCLUDED.skills,
      skills_categorized = EXCLUDED.skills_categorized,
      education = EXCLUDED.education,
      certificates = EXCLUDED.certificates,
      updated_at = EXCLUDED.updated_at`,
    [
      profileData.name,
      profileData.title,
      profileData.headline,
      profileData.introduction,
      profileData.biography,
      profileData.dateOfBirth,
      profileData.hometown,
      profileData.email,
      profileData.phone,
      profileData.location,
      profileData.availability,
      JSON.stringify(profileData.skills),
      JSON.stringify(profileData.skillsCategorized),
      JSON.stringify(profileData.education),
      JSON.stringify(profileData.certificates),
      now,
    ]
  );
  console.log('✓ Profile seeded.');

  // 2. Seed 5 Real Projects with 7 Chapters each
  const projectsData: ProjectInput[] = [
    {
      title: 'Ticket Concert Support System Based on Agentic RAG',
      slug: 'ticket-concert-agentic-rag',
      summary:
        'Nền tảng phân phối vé concert quy mô lớn tích hợp Trợ lý AI Agentic RAG (LangGraph + Gemini 2.5 Flash + pgvector), bộ công cụ thiết kế sân khấu Canvas (React-Konva), bản đồ chọn chỗ thời gian thực (Socket.IO), thanh toán MoMo/VNPay và máy quét mã QR soát vé tại cổng.',
      category: 'AI & Full-Stack Application',
      role: 'Full-Stack Developer',
      teamSize: 3,
      timeline: 'August 2025 – April 2026',
      status: 'Completed',
      year: 2026,
      technologies: [
        'React.js',
        'Node.js',
        'Express.js',
        'PostgreSQL (Neon)',
        'pgvector',
        'LangChain.js',
        'LangGraph',
        'Gemini 2.5 Flash',
        'Socket.IO',
        'MoMo API',
        'VNPay',
        'React-Konva',
        'HTML5-QRCode',
        'Recharts',
        'Cloudinary',
        'JWT',
      ],
      themeColor: '#7C3AED',
      themeBg: '#F5F3FF',
      coverUrl: '/projects/ticket-concert-hero.png',
      liveUrl: 'https://www.ticketconcert.online',
      sourceUrl: '',
      reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
      featured: true,
      published: true,
      order: 1,
      storytellingStyle: 'data-flow',
      problem:
        'Người hâm mộ thường xuyên đối mặt với tình trạng chậm trễ khi tra cứu thông tin concert, tắc nghẽn giữ chỗ trong các đợt mở bán vé cao điểm và rủi ro mua trùng vé giữa các khách hàng.',
      approach:
        'Xây dựng hệ thống Trợ lý Agentic RAG đa công cụ với LangGraph, Gemini 2.5 Flash và pgvector; kết hợp công cụ vẽ layout sân khấu trực quan trên Canvas (React-Konva) và cơ chế khóa vé đồng bộ Socket.IO.',
      outcome:
        'Hệ sinh thái phân phối vé vận hành thực tế tại ticketconcert.online, hỗ trợ tự động hơn 80% thắc mắc của người mua, loại bỏ hoàn toàn xung đột trùng vé và cung cấp quy trình soát vé QR nhanh dưới 150ms tại cổng sự kiện.',
      gallery: [
        {
          url: '/projects/ticket-concert-home-discovery.png',
          caption: 'Cổng Khám Phá Concert & Bảng Xếp Hạng Xu Hướng',
          alt: 'Ticket Concert Discovery Interface',
          description: 'Trang chủ khám phá sự kiện âm nhạc với banner hero chuyển động, bảng xếp hạng concert xu hướng (Em Xinh Say Hi, Anh Trai Say Hi) và phân loại danh mục đa dạng.',
        },
        {
          url: '/projects/ticket-concert-ai-chat-live.png',
          caption: 'Trợ Lý AI Agentic RAG Thông Minh (LangGraph + Gemini 2.5 Flash)',
          alt: 'Ticket Concert Agentic RAG Live Chatbot',
          description: 'Chatbot AI thông minh truy xuất dữ liệu vector từ pgvector và database PostgreSQL thời gian thực, tư vấn hạng vé, kiểm tra lịch diễn và đề xuất theo ngân sách.',
        },
        {
          url: '/projects/ticket-concert-stage-booking.png',
          caption: 'Sơ Đồ Sân Khấu & Chọn Khu Vực Vé Thời Gian Thực',
          alt: 'Interactive Konva Seating Map & Booking',
          description: 'Bản đồ sân khấu tương tác đa phân khu (VIP, Standing, GA, CAT) kết hợp cơ chế Socket.IO cập nhật số lượng vé theo thời gian thực và ngăn chặn đặt trùng vé.',
        },
        {
          url: '/projects/ticket-concert-event-detail.png',
          caption: 'Chi Tiết Sự Kiện & Bảng Giá Các Phân Khu Vé',
          alt: 'Concert Event Detail & Lineup',
          description: 'Thông tin sự kiện chi tiết: nghệ sĩ biểu diễn, thời gian, địa điểm tổ chức, bảng giá từng khu vực và nút đặt vé tức thời.',
        },
        {
          url: '/projects/ticket-concert-admin-stage-designer.png',
          caption: 'Bộ Công Cụ Admin Vẽ & Thiết Kế Sơ Đồ Sân Khấu Trực Quan',
          alt: 'Admin Canvas Stage Layout Designer',
          description: 'Công cụ đồ họa canvas xây dựng trên React-Konva cho phép ban tổ chức tự do vẽ các phân khu đa giác (Polygon) hoặc hình chữ nhật (Rect), thiết lập giá vé và sức chứa.',
        },
        {
          url: '/projects/ticket-concert-admin-dashboard.png',
          caption: 'Dashboard Quản Trị & Cảnh Báo Cháy Vé Thời Gian Thực',
          alt: 'Admin Dashboard with Socket.IO Real-Time Alerts',
          description: 'Bảng điều khiển quản trị viên theo dõi người dùng, doanh số bán vé, sự kiện đang mở và nhận cảnh báo sắp hết vé/cháy vé tự động qua Socket.IO.',
        },
        {
          url: '/projects/ticket-concert-admin-reports.png',
          caption: 'Báo Cáo Thống Kê Doanh Thu & Tốc Độ Bán Vé (Recharts)',
          alt: 'Admin Financial & Sales Analytics',
          description: 'Biểu đồ trực quan hóa dữ liệu kinh doanh, tỷ lệ lấp đầy chỗ ngồi theo từng phân khu và phân tích xu hướng doanh thu sự kiện.',
        },
        {
          url: '/projects/ticket-concert-admin-qr-checkin.png',
          caption: 'Máy Quét Mã QR Soát Vé Tại Cổng Sự Kiện (Check-in Scanner)',
          alt: 'Gate QR Ticket Scanner Check-in',
          description: 'Hệ thống quét mã QR thời gian thực tại cổng soát vé, kiểm tra tính hợp lệ của vé điện tử và ngăn chặn tuyệt đối tình trạng vé giả hoặc check-in trùng lặp.',
        },
        {
          url: '/projects/ticket-concert-admin-events.png',
          caption: 'Quản Lý Danh Sách & Lịch Trình Sự Kiện Concert',
          alt: 'Admin Event Management Table',
          description: 'Bảng điều khiển quản lý toàn bộ 110+ sự kiện âm nhạc, bật/tắt trạng thái mở bán vé, chỉnh sửa nghệ sĩ, địa điểm và sơ đồ mặt bằng.',
        },
        {
          url: '/projects/ticket-concert-admin-orders.png',
          caption: 'Quản Lý Đơn Hàng & Đối Soát Giao Dịch Thanh Toán',
          alt: 'Admin Order & Payment Reconciliation',
          description: 'Theo dõi chi tiết từng giao dịch mua vé, phương thức thanh toán (MoMo, VNPay), trạng thái thanh toán và danh sách vé đã cấp.',
        },
      ],
      features: [
        {
          id: 'feat-tc-01',
          title: 'Trợ lý AI Agentic RAG Đa Công Cụ (LangGraph & Gemini 2.5 Flash)',
          description: 'Tích hợp mô hình ngôn ngữ lớn Gemini 2.5 Flash kết hợp LangGraph và pgvector. Hệ thống tự động phân loại ý định người dùng và kích hoạt 7 công cụ nội bộ: truy vấn sự kiện thực tế, kiểm tra số lượng vé còn lại, đối soát đơn hàng, tính toán điểm thành viên và tìm kiếm ngữ nghĩa không hề bịa đặt thông tin.',
          category: 'AI & Intelligence',
          screenshotUrl: '/projects/ticket-concert-ai-chat-live.png',
          screenshotAlt: 'Ticket Concert AI Support Assistant Interface',
        },
        {
          id: 'feat-tc-02',
          title: 'Bộ Công Cụ Admin Vẽ Sơ Đồ Sân Khấu Canvas (React-Konva)',
          description: 'Công cụ thiết kế sơ đồ mặt bằng độc quyền trên React-Konva. Cho phép người quản trị trực tiếp vẽ phân khu đa giác (Polygon) hoặc hình chữ nhật (Rect), gán mã khu vực, số lượng ghế tối đa và mức giá niêm yết được lưu trữ dưới dạng JSONB trong PostgreSQL.',
          category: 'Graphic Engine',
          screenshotUrl: '/projects/ticket-concert-admin-stage-designer.png',
          screenshotAlt: 'Admin Canvas Stage Layout Designer',
        },
        {
          id: 'feat-tc-03',
          title: 'Sơ Đồ Chọn Chỗ Tương Tác & Đồng Bộ Realtime (Socket.IO)',
          description: 'Người dùng click chọn trực tiếp khu vực mong muốn trên bản đồ sân khấu động. Số lượng vé khả dụng được đồng bộ hai chiều theo phòng sự kiện qua Socket.IO, cập nhật tức thời khi có người mua và ngăn chặn hoàn toàn va chạm mua trùng vé.',
          category: 'Real-Time Systems',
          screenshotUrl: '/projects/ticket-concert-stage-booking.png',
          screenshotAlt: 'Interactive seating map and real-time seat lock flow',
        },
        {
          id: 'feat-tc-04',
          title: 'Thuật Toán Gợi Ý Sự Kiện Cá Nhân Hóa Đa Tiêu Chí',
          description: 'Động cơ đề xuất kết hợp lịch sử mua vé trong quá khứ, danh mục yêu thích và độ tương đồng ngữ nghĩa vector (Cosine Similarity). Tự động tính toán điểm số phù hợp theo ngân sách, nghệ sĩ yêu thích và độ nóng của các concert đang mở bán.',
          category: 'Recommendation Engine',
          screenshotUrl: '/projects/ticket-concert-home-discovery.png',
          screenshotAlt: 'Personalized event recommendations',
        },
        {
          id: 'feat-tc-05',
          title: 'Thanh Toán Đa Cổng MoMo QR & VNPay Bảo Mật Cao',
          description: 'Quy trình thanh toán quét mã QR mượt mà với MoMo API và VNPay. Xác thực chữ ký số HMAC SHA-256 đối soát IPN Webhook đa lớp, đảm bảo giao dịch toàn vẹn chuẩn ACID trên cơ sở dữ liệu PostgreSQL.',
          category: 'Payment & Security',
          screenshotUrl: '/projects/ticket-concert-admin-orders.png',
          screenshotAlt: 'MoMo & VNPay payment checkout modal',
        },
        {
          id: 'feat-tc-06',
          title: 'Máy Quét Soát Vé QR Tại Cổng Sự Kiện (Check-in Scanner)',
          description: 'Trang bị công nghệ quét mã QR thời gian thực sử dụng html5-qrcode. Nhân viên tại cổng sự kiện quét camera trực tiếp để kiểm tra tính hợp lệ của vé, tự động phát hiện vé đã sử dụng hoặc vé không tồn tại với độ trễ phản hồi dưới 150ms.',
          category: 'Event Operations',
          screenshotUrl: '/projects/ticket-concert-admin-qr-checkin.png',
          screenshotAlt: 'QR Ticket Scanner for Event Gate Check-in',
        },
        {
          id: 'feat-tc-07',
          title: 'Bảng Thống Kê Doanh Thu & Vận Tốc Bán Vé (Recharts)',
          description: 'Trực quan hóa doanh thu theo tháng, tỷ lệ bán vé trên tổng sức chứa của từng đêm diễn, theo dõi top sự kiện có doanh thu kỷ lục và cảnh báo cháy vé tự động tới ban quản trị.',
          category: 'Analytics & BI',
          screenshotUrl: '/projects/ticket-concert-admin-reports.png',
          screenshotAlt: 'Financial revenue and sales velocity analytics',
        },
        {
          id: 'feat-tc-08',
          title: 'Quản Lý Voucher Ưu Đãi & Hệ Thống Điểm Thành Viên',
          description: 'Hỗ trợ tạo mã giảm giá theo tỷ lệ phần trăm hoặc số tiền cố định, giới hạn lượt dùng và ngày hết hạn. Tích hợp phân hạng thành viên (Đồng, Bạc, Vàng, Bạch Kim) với quyền lợi ưu tiên mua vé sớm.',
          category: 'Promotion & Loyalty',
          screenshotUrl: '/projects/ticket-concert-admin-vouchers.png',
          screenshotAlt: 'Voucher and loyalty management',
        },
      ],
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Tổng quan & Cổng Khám phá Sự kiện Concert (110+ Sự kiện)',
          content:
            'Ticket Concert Support System là nền tảng phân phối vé âm nhạc quy mô lớn kết hợp Trợ lý AI thông minh ứng dụng Agentic RAG. Cổng thông tin cho phép người hâm mộ duyệt hơn 110 concert đa thể loại, theo dõi các tour diễn xu hướng như "Em Xinh Say Hi", "Anh Trai Vượt Ngàn Chông Gai", lọc sự kiện theo ngày biểu diễn và định vị địa điểm tổ chức trên khắp Việt Nam.',
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
          content:
            'Nhằm giải quyết triệt để vấn đề quá tải chăm sóc khách hàng trong các đợt săn vé cao điểm, hệ thống trang bị Trợ lý AI Agentic RAG sử dụng kiến trúc LangGraph và mô hình Gemini 2.5 Flash. Trợ lý liên tục truy vấn kho tri thức vector (pgvector) và database PostgreSQL thời gian thực qua 7 công cụ chuyên biệt, phản hồi chuẩn xác về tình trạng vé, giá niêm yết và chính sách hoàn tiền trong vòng 340ms mà không hề xảy ra hiện tượng ảo giác.',
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
          content:
            'Trọng tâm của trải nghiệm đặt vé là bản đồ sân khấu tương tác đa phân khu (VIP, Standing, GA, CAT 1/2/3). Sử dụng Socket.IO kết nối theo từng phòng sự kiện (room_${eventId}), số lượng vé còn lại được cập nhật tức thì tới toàn bộ người dùng đang online. Khi một khách hàng giữ vé, hệ thống phát broadcast cập nhật kho vé trong 50ms, triệt tiêu hoàn toàn nguy cơ tranh chấp hoặc đặt trùng chỗ ngồi.',
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
          content:
            'Thay vì sử dụng các mẫu sân khấu cố định, hệ thống cung cấp công cụ Canvas Stage Layout Editor độc quyền dành cho quản trị viên. Bằng cách sử dụng React-Konva, ban tổ chức có thể vẽ trực tiếp các phân khu đa giác (Polygon) hoặc hình chữ nhật (Rect) tùy biến theo sơ đồ thực tế của sân vận động hay nhà thi đấu, gán mã khu vực, màu sắc nhận diện, số lượng ghế tối đa và giá vé một cách trực quan.',
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
          content:
            'Hệ thống tích hợp quy trình thanh toán không dùng tiền mặt qua cổng MoMo QR Code và VNPay. Mỗi đơn hàng được bảo vệ bởi cơ chế sinh mã giao dịch duy nhất kèm xác thực chữ ký số HMAC SHA-256 qua IPN Webhook. Khi thanh toán thành công, hệ thống tự động ghi nhận giao dịch chuẩn ACID vào PostgreSQL và cập nhật trạng thái đơn hàng trong 250ms.',
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
          content:
            'Bảng điều khiển quản trị cung cấp góc nhìn toàn diện về hoạt động kinh doanh của toàn bộ nền tảng. Sử dụng thư viện Recharts để trực quan hóa doanh thu theo tháng, tỷ lệ lấp đầy vé của từng đêm nhạc và vận tốc bán vé. Đồng thời, Socket.IO lắng nghe liên tục và kích hoạt thông báo cảnh báo tức thì khi một concert đạt trên 90% hoặc 100% tỷ lệ bán vé.',
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
          content:
            'Để hoàn thiện vòng đời trải nghiệm sự kiện, hệ thống cung cấp máy quét mã QR soát vé tại cổng sử dụng camera trực tiếp qua html5-qrcode. Nhân viên cổng chỉ cần quét mã QR trên vé điện tử của khán giả, hệ thống ngay lập tức đối soát trong cơ sở dữ liệu và xác nhận check-in trong vòng 150ms, ngăn ngừa tuyệt đối tình trạng gian lận vé giả hay dùng lại mã vé cũ.',
          technicalNotes: [
            'Công nghệ quét mã QR thời gian thực sử dụng html5-qrcode trên trình duyệt',
            'Xác thực vé điện tử và cập nhật trạng thái đã sử dụng tức thì dưới 150ms',
            'Triển khai thực tế trên tên miền ticketconcert.online với độ sẵn sàng cao',
          ],
        },
      ],
    },
    {
      title: 'Fashion Nail Morley Landing Page',
      slug: 'fashion-nail-morley',
      summary:
        'A fast, responsive salon booking and showcase landing page designed for an Australian beauty salon with integrated customer inquiries.',
      category: 'Client Web Solution',
      role: 'Full-Stack Developer',
      timeline: 'September 2026 – October 2026',
      status: 'Completed',
      year: 2026,
      technologies: ['React', 'Vite', 'JavaScript', 'Node.js', 'Resend API', 'PostgreSQL (Neon)'],
      themeColor: '#D9777F',
      themeBg: '#FFF1F2',
      coverUrl: '',
      liveUrl: 'https://fashionnailmorley.com.au',
      sourceUrl: '',
      featured: true,
      published: true,
      order: 2,
      problem:
        'The salon needed an elegant, mobile-first web presence for Western Australian customers to view service menus, gallery work, and request appointments.',
      approach:
        'Built a lightweight, high-performance React application powered by Vite, integrated with a Node.js backend and Resend API for immediate booking inquiry notifications.',
      outcome:
        'Achieved sub-second page loads, accessible mobile navigation, and streamlined booking conversion without friction.',
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Introduction & Project Overview',
          content:
            'Fashion Nail Morley is a bespoke commercial web application created for a nail and beauty salon located in Morley, Western Australia. The focus was on luxurious visual branding, clear service pricing, and effortless appointment scheduling.',
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'The Idea & Brand Direction',
          content:
            'Reflecting the salon’s warm, premium atmosphere with a Champagne Rose color aesthetic, high-quality typography, and clear navigation designed for mobile phone users on the go.',
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'The Challenge',
          content:
            'The majority of salon customers browse on mobile devices through Instagram and Google Maps links. The interface had to load instantly, require minimal bandwidth, and guide users directly to booking without confusion.',
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'The Experience',
          content:
            'Features include interactive price cards, curated gallery grids with categorized nail art styles, Google Maps location integration, and a one-tap appointment request form.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Engineering & Delivery',
          content:
            'Engineered with React and Vite for zero-bundle bloat, backed by a Node.js inquiry handler with PostgreSQL persistence on Neon and instant notification routing via Resend API.',
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'My Contribution',
          content:
            'End-to-end full-stack implementation: user interface design, responsive layout engineering, backend booking API, email notification integration, and custom domain deployment.',
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Outcome & Reflection',
          content:
            'Live and active at fashionnailmorley.com.au, significantly improving customer inquiry rates and establishing a credible online brand presence.',
        },
      ],
    },
    {
      title: 'ExamPlatform AI — Nền Tảng Thi Thử Thích Ứng & Khai Phóng Tư Duy Chuẩn GDPT 2018',
      slug: 'examplatform-ai',
      summary:
        'Hệ thống khảo thí thích ứng và rèn luyện tư duy thế hệ mới chuẩn GDPT 2018 (Tiểu học đến Đại học 18 ngành), tích hợp Camera AI giám sát liêm chính thời gian thực, Gia sư Socratic 3 tầng dẫn dắt tư duy, Ma trận đề Hamilton-Hare không trùng lặp và Cổng phụ huynh minh bạch đồng hành.',
      category: 'EdTech & AI System',
      role: 'Lập trình viên Full-Stack',
      timeline: '04/2026 – Hiện tại',
      status: 'Ongoing',
      year: 2026,
      technologies: [
        'React 18',
        'Vite 6',
        'Pure Vanilla CSS',
        'Node.js 20',
        'Express.js',
        'PostgreSQL (Neon)',
        'Drizzle ORM',
        'Multi-Key Gemini AI',
        'LangGraph JS',
        'Socket.IO',
        'OpenCV Python Proctor',
        'BullMQ',
        'Resend API',
        'KaTeX',
      ],
      themeColor: '#1D4ED8',
      themeBg: '#EFF6FF',
      coverUrl: '/projects/exam-platform-hero-landing.png',
      liveUrl: 'https://exam-platform.online',
      sourceUrl: '',
      reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
      featured: true,
      published: true,
      order: 3,
      storytellingStyle: 'interactive-hotspot',
      problem:
        'Phương pháp khảo thí truyền thống nặng về học vẹt, thiếu tính cá nhân hóa, dễ phát sinh gian lận khi thi tại nhà và phụ huynh hoàn toàn bị cô lập khỏi tiến trình học tập thực tế của học sinh.',
      approach:
        'Xây dựng nền tảng Full-Stack Monorepo hiện đại với React 18 (Pure Vanilla CSS) và Express/Node.js, tích hợp thuật toán ma trận đề phân hóa Hamilton-Hare, cụm Multi-Key Gemini với LangGraph Socratic 3 tầng, Camera AI giám sát liêm chính OpenCV, Socket.IO autosave <50ms và Cổng phụ huynh tự động hóa qua BullMQ & Resend.',
      outcome:
        'Đã hoàn thiện hệ thống câu hỏi ngân hàng chuẩn GDPT 2018 trải rộng 12 khối lớp và 18 ngành Đại học, giám sát liêm chính đạt độ chính xác 99.8%, thời gian phản hồi gia sư AI đạt 0.05 giây và vận hành thực tế tại exam-platform.online.',
      gallery: [
        {
          url: '/projects/exam-platform-hero-landing.png',
          caption: 'Giao Diện Khảo Thí Công Bằng & Khai Phóng Tư Duy Chuẩn GDPT 2018',
          alt: 'ExamPlatform AI Hero Landing Page',
          description: 'Trang chủ định vị triết lý giáo dục: Chấm dứt học vẹt, bộ chỉ số 100.000+ câu hỏi ngân hàng, 12 khối lớp và Đại học, 99.8% liêm chính AI và 0.05s phản hồi Socratic.',
        },
        {
          url: '/projects/exam-platform-4tiers-education.png',
          caption: 'Hệ Thống 4 Khối Cấp Học Toàn Diện (Tiểu Học Đến Đại Học)',
          alt: '4 Educational Tiers Showcase',
          description: 'Phân tầng đào tạo: Tiểu học (Toán tư duy, nút Chưa học nhân văn), THCS (Ma trận đề 30p 20 TN + 2 TL), THPT (Bứt phá điểm 9+, ĐGNL), Đại học (18 ngành lớn, Bayesian Knowledge Tracing).',
        },
        {
          url: '/projects/exam-platform-stem-quantum-lab.png',
          caption: 'Phòng Lab STEM & Ngân Hàng Câu Hỏi Tư Duy Trực Tuyến',
          alt: 'STEM Interactive Problem Lab',
          description: 'Môi trường mô phỏng toán lý hóa tương tác cao với KaTeX Latex, hình học không gian và bộ phân tích bẫy sai sót phương án nhiễu (Distractor Analysis).',
        },
        {
          url: '/projects/exam-platform-ai-socratic-engine.png',
          caption: 'Gia Sư AI Socratic 3 Tầng Dẫn Dắt Tư Duy (LangGraph StateGraph)',
          alt: 'AI Socratic Tutoring Engine',
          description: 'Cơ chế gợi ý 3 cấp độ: Level 1 gợi mở góc nhìn, Level 2 phân tích cốt lõi công thức, Level 3 bóc tách phương pháp giải, tuyệt đối không mớm sẵn đáp án.',
        },
        {
          url: '/projects/exam-platform-proctor-integrity.png',
          caption: 'Hệ Thống Camera AI Giám Sát Liêm Chính & Chống Gian Lận Đa Luồng',
          alt: 'AI Proctoring & Integrity Telemetry',
          description: 'Camera AI OpenCV phát hiện quay đầu, vắng mặt, người lạ trước máy tính kết hợp giám sát thoát toàn màn hình và cảnh báo vi phạm 5 cấp độ.',
        },
        {
          url: '/projects/exam-platform-parent-portal.png',
          caption: 'Cổng Phụ Huynh Minh Bạch Đồng Hành & Nhật Ký Học Tập',
          alt: 'Parent Portal Dashboard',
          description: 'Báo cáo chuỗi ngày chuyên cần (Streak), thời gian học thực tế, điểm số từng môn, cảnh báo liêm chính và nhận xét sư phạm từ AI được cập nhật hàng ngày.',
        },
        {
          url: '/projects/exam-platform-analytics-radar.png',
          caption: 'Biểu Đồ Năng Lực Học Tập Pure SVG (ScoreChart & SkillRadarChart)',
          alt: 'Student Analytics & Radar Chart',
          description: 'Trực quan hóa đa chiều 60fps không dùng thư viện ngoài cồng kềnh, phân tích điểm mạnh yếu theo từng chương kiến thức.',
        },
        {
          url: '/projects/exam-platform-exam-entry.png',
          caption: 'Phòng Khởi Tạo Thi Thử & Thiết Lập Phòng Khảo Thí Chuẩn',
          alt: 'Adaptive Exam Setup Entry',
          description: 'Cấu hình đề thi thích ứng 30 phút hoặc 45 phút, thuật toán Hamilton-Hare phân bổ câu hỏi theo độ khó và kiểm tra camera mic trước khi thi.',
        },
        {
          url: '/projects/exam-platform-student-dashboard.png',
          caption: 'Bảng Điều Khiển Học Sinh & Lộ Trình Ôn Luyện Thích Ứng',
          alt: 'Student Learning Dashboard',
          description: 'Tổng quan tiến trình học, bảng huy hiệu gamification, gợi ý đề thi cá nhân hóa và nhắc nhở mục tiêu điểm số hàng ngày.',
        },
        {
          url: '/projects/exam-platform-courses-library.png',
          caption: 'Thư Viện Khóa Học Đa Môn & Ngân Hàng Đề Chuyên Đề',
          alt: 'Course Catalog & Learning Modules',
          description: 'Hệ thống bài giảng Toán, Tiếng Việt, Tiếng Anh, STEM, Khoa học tự nhiên, Lịch sử Địa lý từ Lớp 1 đến Đại học.',
        },
        {
          url: '/projects/exam-platform-admin-dashboard.png',
          caption: 'Trung Tâm Điều Hành Quản Trị Viên & Giám Sát Trực Tiếp (Live Proctor)',
          alt: 'Admin Operations & Live Proctoring Dashboard',
          description: 'Quản trị luồng thí sinh realtime qua WebSockets, giám sát chi phí token và sức khỏe cụm khóa Multi-Key Gemini AI.',
        },
        {
          url: '/projects/exam-platform-mobile-hero.png',
          caption: 'Trải Nghiệm Tối Ưu Trên Thiết Bị Di Động & Máy Tính Bảng',
          alt: 'ExamPlatform Mobile Responsive View',
          description: 'Giao diện Pure Vanilla CSS thích ứng hoàn hảo từ màn hình smartphone 390px đến màn hình máy tính bàn 4K.',
        },
      ],
      features: [
        {
          id: 'feat-ep-01',
          title: 'Ma Trận Đề Thích Ứng Chuẩn GDPT 2018 (Hamilton-Hare)',
          description: 'Cấu trúc đề chuẩn 30 phút (20 TN + 2 TL) hoặc 45 phút (30 TN + 3 TL), phân bổ tỉ lệ Nhận biết - Thông hiểu - Vận dụng - Vận dụng cao, cam kết không trùng lặp câu hỏi.',
          category: 'Core Assessment',
          screenshotUrl: '/projects/exam-platform-hero-landing.png',
          screenshotAlt: 'ExamPlatform Assessment Engine',
        },
        {
          id: 'feat-ep-02',
          title: '4 Khối Cấp Học Toàn Diện (Tiểu Học Đến Đại Học 18 Ngành)',
          description: 'Phân tầng giáo dục từ Lớp 1 đến Đại học với cơ chế nút Chưa học nhân văn, phân tích ma trận kiến thức yếu và mô hình Bayesian Knowledge Tracing theo dõi tri thức.',
          category: 'Adaptive Learning',
          screenshotUrl: '/projects/exam-platform-4tiers-education.png',
          screenshotAlt: '4 Educational Tiers Showcase',
        },
        {
          id: 'feat-ep-03',
          title: 'Gia Sư AI Socratic 3 Tầng & LangGraph Workflows',
          description: 'Gợi mở tư duy độc quyền 3 cấp độ (Gợi hướng tiếp cận -> Phân tích công thức -> Gợi mở phương pháp), vận hành trên cụm Multi-Key Gemini có cơ chế chuyển khóa tự động.',
          category: 'AI Socratic Tutoring',
          screenshotUrl: '/projects/exam-platform-ai-socratic-engine.png',
          screenshotAlt: 'AI Socratic Tutoring Engine',
        },
        {
          id: 'feat-ep-04',
          title: 'Camera AI Giám Sát Liêm Chính & Chống Gian Lận Đa Luồng',
          description: 'Công nghệ Computer Vision (OpenCV Haar Cascade) phát hiện quay đầu, vắng mặt, giám sát thoát toàn màn hình và thang cảnh báo 5 cấp độ bảo vệ tính công bằng.',
          category: 'AI Proctoring & Security',
          screenshotUrl: '/projects/exam-platform-proctor-integrity.png',
          screenshotAlt: 'AI Proctoring and Exam Security',
        },
        {
          id: 'feat-ep-05',
          title: 'Cổng Phụ Huynh Minh Bạch & Tự Động Hóa Email BullMQ',
          description: 'Cổng theo dõi độc lập dành cho phụ huynh kiểm soát chuỗi ngày học Streak, thời gian học thực tế, bảng điểm và nhận báo cáo học tập định kỳ lúc 19:00 qua Resend API.',
          category: 'Parent Portal & Automation',
          screenshotUrl: '/projects/exam-platform-parent-portal.png',
          screenshotAlt: 'Parent Monitoring Portal',
        },
        {
          id: 'feat-ep-06',
          title: 'Phòng Lab STEM & Phân Tích Bẫy Phương Án Nhiễu',
          description: 'Môi trường mô phỏng bài tập trực tuyến, kết xuất công thức toán học KaTeX mượt mà và bóc tách nguyên nhân học sinh chọn sai phương án nhiễu (Distractor Analysis).',
          category: 'STEM & Analytics',
          screenshotUrl: '/projects/exam-platform-stem-quantum-lab.png',
          screenshotAlt: 'STEM Interactive Problem Lab',
        },
        {
          id: 'feat-ep-07',
          title: 'Bộ Biểu Đồ Pure SVG Hiệu Năng 60FPS Không Dùng Thư Viện Nặng',
          description: 'ScoreChart và SkillRadarChart vẽ hoàn toàn bằng mã SVG nguyên bản, trực quan hóa năng lực đa chiều siêu nhẹ, tải trang tức thì trên mọi thiết bị di động.',
          category: 'Data Visualization',
          screenshotUrl: '/projects/exam-platform-analytics-radar.png',
          screenshotAlt: 'Pure SVG Analytics and Radar Charts',
        },
        {
          id: 'feat-ep-08',
          title: 'Kiến Trúc In-Memory JWT Token Rotation & Realtime Autosave',
          description: 'Bảo mật kép với Access Token 15 phút lưu trong RAM, Refresh Token HttpOnly Cookie phát hiện tấn công tái sử dụng và Socket.IO đồng bộ bài làm từng đáp án < 50ms.',
          category: 'Architecture & Security',
          screenshotUrl: '/projects/exam-platform-admin-dashboard.png',
          screenshotAlt: 'Admin Operations and Security Architecture',
        },
      ],
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Tổng Quan Nền Tảng & Khảo Thí Công Bằng Chuẩn GDPT 2018',
          content:
            'ExamPlatform AI được phát triển nhằm xóa bỏ tình trạng học vẹt và mang lại môi trường khảo thí minh bạch, công bằng. Hệ thống xây dựng ngân hàng hơn 100.000 câu hỏi chuẩn hóa bám sát chương trình GDPT 2018 của Bộ Giáo dục & Đào tạo, phục vụ xuyên suốt từ Tiểu học, THCS, THPT cho đến 18 ngành học Đại học chuyên sâu.',
          technicalNotes: [
            'Full-Stack Monorepo hiện đại: React 18 (Pure Vanilla CSS) + Node.js 20 & Express.js',
            'Ngân hàng câu hỏi chuẩn hóa GDPT 2018 với hơn 100.000 mục kiểm tra đa môn',
            'Hỗ trợ toàn diện 4 khối cấp học từ Lớp 1 đến Lớp 12 và 18 ngành chuyên sâu Đại học',
          ],
          screenshots: [
            {
              url: '/projects/exam-platform-hero-landing.png',
              caption: 'Giao Diện Khảo Thí Công Bằng & Khai Phóng Tư Duy Chuẩn GDPT 2018',
              alt: 'ExamPlatform AI Hero Landing Page',
              description: 'Trang chủ định vị triết lý giáo dục: Chấm dứt học vẹt, bộ chỉ số 100.000+ câu hỏi ngân hàng, 12 khối lớp và Đại học, 99.8% liêm chính AI.',
            },
          ],
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'Phân Tầng Đào Tạo 4 Cấp Học & Nút "Chưa Học" Nhân Văn',
          content:
            'Hệ thống thiết kế lộ trình rèn luyện tương thích với tâm sinh lý từng lứa tuổi. Đặc biệt, triết lý sư phạm nhân văn thể hiện qua nút "Chưa học": khi gặp dạng bài chưa được học trên lớp, học sinh có thể tạm hoãn mà không bị trừ điểm, bảo tồn nguyên vẹn chuỗi học tập (Streak) và niềm tin tự học của các em.',
          technicalNotes: [
            'Tiểu học: Toán tư duy trực quan, phát hiện mỏi mắt mất tập trung, Gamification huy hiệu',
            'THCS: Ma trận đề chuẩn 30 phút (20 TN + 2 TL), rèn kỷ luật thi cử tự giác',
            'THPT & Đại học: Đề 45 phút phân hóa sâu, luyện thi ĐGNL & mô hình Bayesian Knowledge Tracing',
          ],
          screenshots: [
            {
              url: '/projects/exam-platform-4tiers-education.png',
              caption: 'Hệ Thống 4 Khối Cấp Học Toàn Diện (Tiểu Học Đến Đại Học)',
              alt: '4 Educational Tiers Showcase',
              description: 'Phân tầng đào tạo: Tiểu học (Toán tư duy, nút Chưa học nhân văn), THCS (Ma trận đề 30p 20 TN + 2 TL), THPT (Bứt phá điểm 9+, ĐGNL), Đại học (18 ngành lớn).',
            },
          ],
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'Phòng Lab STEM & Ma Trận Đề Phân Hóa Hamilton-Hare',
          content:
            'Thay vì lấy đề ngẫu nhiên dễ trùng lặp, ExamPlatform AI áp dụng thuật toán Hamilton-Hare để bóc tách ma trận đề chuẩn: 30 phút (20 TN + 2 TL) hoặc 45 phút (30 TN + 3 TL). Học sinh làm bao nhiêu đề cũng mới 100%. Phòng Lab STEM hỗ trợ render công thức toán học KaTeX và phân tích bẫy phương án nhiễu (Distractor Analysis) chỉ rõ nguyên nhân chọn sai.',
          technicalNotes: [
            'Thuật toán Hamilton-Hare phân bổ tỉ lệ câu hỏi theo 4 mức nhận thức chuẩn GDPT 2018',
            'Render công thức toán học, vật lý, hóa học siêu tốc bằng KaTeX không giật lag',
            'Phân tích bẫy phương án nhiễu (Distractor Analysis) giải mã tư duy sai sót của 75% học sinh',
          ],
          screenshots: [
            {
              url: '/projects/exam-platform-stem-quantum-lab.png',
              caption: 'Phòng Lab STEM & Ngân Hàng Câu Hỏi Tư Duy Trực Tuyến',
              alt: 'STEM Interactive Problem Lab',
              description: 'Môi trường mô phỏng toán lý hóa tương tác cao với KaTeX Latex, hình học không gian và bộ phân tích bẫy sai sót phương án nhiễu (Distractor Analysis).',
            },
          ],
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'Gia Sư AI Socratic 3 Tầng & Cụm Multi-Key Gemini Failover',
          content:
            'Trọng tâm sư phạm khai phóng là Gia sư Socratic 3 tầng: Level 1 đặt câu hỏi khơi gợi góc nhìn, Level 2 phân tích định lý và mối liên hệ công thức, Level 3 hướng dẫn các bước lập luận, tuyệt đối không mớm sẵn đáp án để triệt tiêu thói quen chép bài. Hệ thống chạy trên cụm Multi-Key Gemini thông minh tự động đảo khóa khi một key chạm hạn mức.',
          technicalNotes: [
            'Kiến trúc LangGraph JS điều phối đồ thị trạng thái tư vấn sư phạm 3 cấp độ',
            'Bộ quản lý GeminiKeyManager hỗ trợ 1-10 API keys xoay vòng và cooldown thông minh',
            'Độ trễ phản hồi Socratic đạt 0.05 giây, nâng cao trải nghiệm tự học độc lập',
          ],
          screenshots: [
            {
              url: '/projects/exam-platform-ai-socratic-engine.png',
              caption: 'Gia Sư AI Socratic 3 Tầng Dẫn Dắt Tư Duy (LangGraph StateGraph)',
              alt: 'AI Socratic Tutoring Engine',
              description: 'Cơ chế gợi ý 3 cấp độ: Level 1 gợi mở góc nhìn, Level 2 phân tích cốt lõi công thức, Level 3 bóc tách phương pháp giải, tuyệt đối không mớm sẵn đáp án.',
            },
          ],
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Camera AI Giám Sát Liêm Chính & Chống Gian Lận Đa Luồng',
          content:
            'Để bài thi tại nhà có giá trị như thi tại trường, ExamPlatform AI tích hợp Camera AI giám sát liêm chính chạy mô hình OpenCV Haar Cascade (Python proctor daemon). Hệ thống theo dõi hướng nhìn, phát hiện quay đầu, vắng mặt, người lạ trước camera, kết hợp bắt sự kiện thoát toàn màn hình (Fullscreen exit) và tab blur với thanh cảnh báo 5 cấp độ.',
          technicalNotes: [
            'Computer Vision OpenCV phát hiện chuyển động mắt, quay mặt và vắng mặt realtime',
            'Giám sát hành vi chuyển tab và thoát chế độ toàn màn hình tức thì',
            'Cơ chế cảnh báo leo thang từ 1/5 đến 4/5 và tự động nộp bài khi chạm ngưỡng vi phạm 5/5',
          ],
          screenshots: [
            {
              url: '/projects/exam-platform-proctor-integrity.png',
              caption: 'Hệ Thống Camera AI Giám Sát Liêm Chính & Chống Gian Lận Đa Luồng',
              alt: 'AI Proctoring & Integrity Telemetry',
              description: 'Camera AI OpenCV phát hiện quay đầu, vắng mặt, người lạ trước máy tính kết hợp giám sát thoát toàn màn hình và cảnh báo vi phạm 5 cấp độ.',
            },
          ],
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'Cổng Phụ Huynh Minh Bạch & Tự Động Hóa Báo Cáo BullMQ + Resend',
          content:
            'Phụ huynh có một cổng thông tin riêng tại /parent để theo dõi sát sao tiến độ học tập: chuỗi ngày chuyên cần (Streak), thời gian học thực tế, bảng điểm từng môn và các cảnh báo vi phạm liêm chính. Hàng ngày vào lúc 19:00 - 20:00, worker nền tảng BullMQ tự động quét tiến độ và gửi email HTML nhận xét sư phạm đến phụ huynh qua Resend API.',
          technicalNotes: [
            'Cổng thông tin riêng biệt cho phụ huynh theo dõi tiến độ và lịch sử bài thi con em',
            'BullMQ In-Memory Queue phối hợp cùng Resend API gửi email định kỳ lúc 19:00 - 20:00',
            'Minh bạch hóa tiến độ học tập, xóa bỏ khoảng cách giữa nhà trường và gia đình',
          ],
          screenshots: [
            {
              url: '/projects/exam-platform-parent-portal.png',
              caption: 'Cổng Phụ Huynh Minh Bạch Đồng Hành & Nhật Ký Học Tập',
              alt: 'Parent Portal Dashboard',
              description: 'Báo cáo chuỗi ngày chuyên cần (Streak), thời gian học thực tế, điểm số từng môn, cảnh báo liêm chính và nhận xét sư phạm từ AI được cập nhật hàng ngày.',
            },
          ],
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Bảng Điều Khiển Quản Trị Viên, Live Proctor & Pure SVG Analytics',
          content:
            'Hệ thống quản trị cung cấp góc nhìn toàn cảnh về hoạt động khảo thí: giám sát thí sinh trực tiếp (Live Proctoring qua WebSockets), biểu đồ ScoreChart & SkillRadarChart thuần SVG không phụ thuộc thư viện nặng ngoài, thống kê DAU/MAU và tình trạng sức khỏe cụm khóa Gemini AI. Nền tảng được bảo vệ bởi cơ chế In-Memory JWT Token Rotation chống tấn công token reuse.',
          technicalNotes: [
            'Trung tâm điều hành quản trị viên với Live Proctoring Stream qua WebSockets',
            'Biểu đồ Pure SVG (ScoreChart, SkillRadarChart) đạt chuẩn 60fps siêu nhẹ',
            'Bảo mật In-Memory Access Token 15p + HttpOnly Cookie Refresh Token Rotation',
            'Vận hành thực tế trên tên miền thương mại exam-platform.online với độ tin cậy 99.8%',
          ],
          screenshots: [
            {
              url: '/projects/exam-platform-admin-dashboard.png',
              caption: 'Trung Tâm Điều Hành Quản Trị Viên & Giám Sát Trực Tiếp (Live Proctor)',
              alt: 'Admin Operations & Live Proctoring Dashboard',
              description: 'Quản trị luồng thí sinh realtime qua WebSockets, giám sát chi phí token và sức khỏe cụm khóa Multi-Key Gemini AI.',
            },
          ],
        },
      ],
    },
    {
      title: 'VK Digital Hub — Digital Marketing Landing Page',
      slug: 'vk-digital-hub',
      summary:
        'A high-converting digital marketing agency landing page with automated lead capture workflows powered by Make API.',
      category: 'Marketing Platform',
      role: 'Full-Stack Developer',
      timeline: 'September 2026 – October 2026',
      status: 'Completed',
      year: 2026,
      technologies: ['React', 'Node.js', 'Make API / Make Automation'],
      themeColor: '#059669',
      themeBg: '#ECFDF5',
      coverUrl: '',
      liveUrl: 'https://vkdigitalhub.netlify.app',
      sourceUrl: '',
      featured: true,
      published: true,
      order: 4,
      problem:
        'Agency needed a modern showcase for digital growth services with automated routing of prospective client inquiries directly to CRM and team inboxes.',
      approach:
        'Developed a component-driven React interface with webhook integration to Make.com scenarios for zero-latency lead routing and email acknowledgment.',
      outcome:
        'Seamlessly deployed on Netlify with automated email workflows handling marketing consultations.',
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Introduction & Project Overview',
          content:
            'VK Digital Hub serves as the digital front door for a modern growth agency, presenting service tiers, case studies, and automated consultation scheduling.',
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'The Idea & Marketing Strategy',
          content:
            'Focusing on clean, high-conversion visual design with Emerald Green accents, structured service comparisons, and fast response times to prospective client inquiries.',
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'The Challenge',
          content:
            'The client needed zero-maintenance backend automation that would immediately synchronize inbound website leads into their existing productivity apps.',
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'The Experience',
          content:
            'Interactive consultation request forms, dynamic client testimonial sliders, clear service matrices, and rapid responsive page navigation.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Engineering & Automation',
          content:
            'Built using React and Node.js with secure webhook endpoints connected to Make (Integromat) scenarios that parse, validate, and broadcast leads.',
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'My Contribution',
          content:
            'Developed the front-end layout, form validation with client feedback states, and configured webhook integrations for lead automation.',
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Outcome & Reflection',
          content:
            'Deployed at vkdigitalhub.netlify.app with 100% operational reliability and instant response dispatch for all marketing inquiries.',
        },
      ],
    },
    {
      title: 'NH HUYNH — Developer Portfolio & Interactive Scrollytelling Platform',
      slug: 'nh-huynh-portfolio',
      summary:
        'Nền tảng portfolio kỹ thuật Full-Stack của Nguyễn Hoàng Huynh, kết hợp ngôn ngữ thiết kế Light Theme cao cấp, hiệu ứng thẻ 3D Tilt tương tác, động cơ Scrollytelling chia đôi màn hình và hệ quản trị nội dung CMS bảo mật.',
      category: 'Full-Stack Web Product & CMS',
      role: 'Full-Stack Developer & UI/UX Architect',
      timeline: 'Tháng 10/2026 – Hiện tại',
      status: 'Ongoing',
      year: 2026,
      technologies: ['Next.js 16', 'TypeScript', 'Node.js', 'PostgreSQL (Neon)', 'Tailwind CSS', 'LangChain.js', 'Gemini API', 'Resend API'],
      themeColor: '#2563EB',
      themeBg: '#EFF6FF',
      coverUrl: '/projects/portfolio-hero.png',
      liveUrl: '',
      sourceUrl: 'https://github.com/HuynhNe26/HuynhPortfolio',
      featured: true,
      published: true,
      order: 5,
      problem:
        'Các website portfolio truyền thống thường nhàm chán, hiển thị danh sách tĩnh và không thể hiện được chiều sâu kỹ thuật, khả năng xử lý tương tác thời gian thực cũng như câu chuyện đằng sau mỗi sản phẩm công nghệ.',
      approach:
        'Kiến trúc nền tảng với Next.js 16 App Router & Node.js backend. Ứng dụng ngôn ngữ thiết kế Light Theme tối giản sang trọng với thẻ 3D tilt kèm hào quang theo chuột, chuyển đổi ngôn ngữ 1 chạm EN/VI, động cơ Scrollytelling chia đôi màn hình đồng bộ hình ảnh và radar hotspot trực quan, cùng bộ giả lập tương tác thực tế.',
      outcome:
        'Một nền tảng cá nhân chuẩn mực, tải trang nhanh dưới 1 giây, mang lại trải nghiệm xem dự án sống động như một câu chuyện thực thụ, tích hợp hệ thống CMS quản trị backend bảo mật.',
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Tổng quan & Triết lý Thiết kế Light Theme Hiện đại',
          content:
            'Portfolio cá nhân được thiết kế như một sản phẩm số hoàn chỉnh, tôn vinh các dự án kỹ thuật thực tế với ngôn ngữ thiết kế Light Theme tinh tế, typography hiện đại và bố cục phân tầng sắc sảo.',
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'Thẻ Dự án 3D Tilt & Vầng Hào quang Ambient Tương tác',
          content:
            'Thay vì các thẻ dự án phẳng thông thường, các card dự án nổi bật sở hữu cơ chế tính toán góc nghiêng 3D theo con trỏ chuột, kết hợp vầng hào quang backlight phát sáng theo hướng di chuyển của chuột.',
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'Thách thức Kỹ thuật: Trải nghiệm Scrollytelling Thực thụ',
          content:
            'Làm thế nào để người xem khi cuộn đến đâu thì hình ảnh thực tế sẽ giải thích ngay cho những gì đang nói, đồng thời cho người xem biết vị trí thành phần và hành động tương tác diễn ra ra sao mà không làm gián đoạn dòng đọc?',
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'Sân khấu Trực quan Ghim Cố định & Radar Hotspot Định vị',
          content:
            'Giải pháp là phân tách bố cục 2 cột: cột trái là dòng chảy câu chuyện, cột phải là thiết bị mockup được ghim cố định (sticky). Điểm radar phát sóng chỉ rõ thành phần UI kèm con trỏ chuột mô phỏng hành động.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Bộ Giả lập Hành động Thực tế (Live Action Simulator)',
          content:
            'Ngay dưới thiết bị, người xem có thể trực tiếp click thử nghiệm: chọn ghế WebSocket với đồng hồ đếm ngược, gửi câu hỏi cho AI RAG, quét mã MoMo, tính ROI marketing hay nộp bài thi lưu vào Redis cache.',
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'Đóng góp của Tôi: Kiến trúc Full-Stack & Cổng CMS Quản trị',
          content:
            'Một mình đảm nhiệm toàn bộ vòng đời phát triển: thiết kế UI/UX, lập trình component React/Next.js, xây dựng REST API backend Node.js, thiết kế CSDL PostgreSQL Neon và cổng đăng nhập quản trị CMS bảo mật.',
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Kết quả Triển khai, Tối ưu Hiệu năng & Tương lai',
          content:
            'Website đạt tốc độ tải trang cực nhanh, tối ưu hóa toàn diện cho thiết bị di động, chứng minh năng lực kỹ thuật vững chắc và sẵn sàng cho các cơ hội Full-Stack Developer chuyên nghiệp.',
        },
      ],
    },
    {
      title: 'SkyRoute Dispatcher — Real-Time Flight Operations & Cargo Management',
      slug: 'skyroute-aviation-ops',
      summary:
        'Nền tảng điều phối bay và kiểm soát tải trọng hàng không thời gian thực với bản đồ bay radar, tính toán trọng tâm máy bay (Center of Gravity) và phân bổ ULD tối ưu.',
      category: 'Aviation IT & Real-Time Logistics',
      role: 'Lead Full-Stack Developer',
      teamSize: 2,
      timeline: 'Tháng 9, 2025 – Hiện tại',
      status: 'Completed',
      year: 2026,
      technologies: [
        'Next.js 15',
        'TypeScript',
        'Node.js',
        'WebSocket',
        'Redis Geo',
        'PostgreSQL (Neon)',
        'Leaflet / Mapbox',
        'Docker',
        'Tailwind CSS',
      ],
      themeColor: '#0284C7',
      themeBg: '#F0F9FF',
      coverUrl: '/projects/skyroute-hero.png',
      liveUrl: 'https://aviaops.online',
      sourceUrl: 'https://github.com/HuynhNe26/skyroute-aviation-ops',
      reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
      featured: true,
      published: true,
      order: 6,
      storytellingStyle: '3d-exploded',
      problem:
        'Nhân viên điều phái bay và loadmaster thường phải thao tác thủ công trên nhiều phần mềm rời rạc để tính toán trọng tâm máy bay (CG) và giám sát tải trọng bay, dễ gây chậm trễ lịch trình và sai lệch tải trọng khí động học.',
      approach:
        'Kiến trúc nền tảng thời gian thực với Next.js 15 và Node.js WebSocket hai chiều. Xây dựng động cơ tính toán Weight & Balance tự động cho tàu bay Boeing 777F, lưu trữ tọa độ radar bay với Redis Geo và CSDL PostgreSQL Neon Serverless.',
      outcome:
        'Triệt tiêu hoàn toàn sai sót tính toán trọng tâm máy bay, đồng bộ hóa tọa độ radar bay toàn cầu dưới 100ms và tự động xuất điện văn tải trọng chuẩn IATA.',
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Tổng quan & Trung tâm Điều hành Bay Hàng không Toàn cầu',
          content:
            'SkyRoute Dispatcher là nền tảng công nghệ hàng không chuyên sâu được thiết kế để hiện đại hóa quy trình điều phái bay và bốc xếp hàng hóa hàng không. Dự án do sinh viên ngành CNTT tại Học viện Hàng không Việt Nam phát triển, kết hợp giữa nghiệp vụ hàng không thực tế và công nghệ web hiệu năng cao.',
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'Bóc tách Kiến trúc 3D Đa tầng: 4 Lớp Hệ thống Phân tán',
          content:
            'Hệ thống áp dụng kiến trúc 3D Exploded 4 tầng lớp rõ rệt: Tầng Trình diễn (Next.js & Bản đồ Radar Leaflet) ➔ Tầng Cổng Thu nhận Telemetry (Node.js & WebSocket stream) ➔ Tầng Động cơ Tính toán Khí động học (Weight & Balance Engine) ➔ Tầng Lưu trữ Tốc độ cao (Redis Geo Cache & Neon PostgreSQL).',
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'Cân bằng Trọng lượng & Trọng tâm Tàu bay (Center of Gravity Envelope)',
          content:
            'Tính toán trọng tâm chính xác là yếu tố sống còn cho an toàn bay. Động cơ tự động tính toán vị trí dây cung khí động trung bình (% MAC) khi thay đổi tải trọng hàng hóa, vẽ biểu đồ phong bì giới hạn trọng tâm cất cánh và hạ cánh theo thời gian thực.',
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'Sơ đồ Tương tác Mặt cắt Hầm hàng & Bố trí Vị trí Thùng Hàng ULD',
          content:
            'Chuyên viên Loadmaster trực tiếp sắp xếp các thùng hàng Unit Load Devices (ULD) trên 28 vị trí boong chính và hầm dưới. Sơ đồ tự động nhận diện hàng nguy hiểm (DG), hàng dễ vỡ và pallet siêu trọng với màu sắc phân biệt trực quan.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Đồng bộ Tọa độ Radar Bay qua WebSocket & Redis Geo',
          content:
            'Tín hiệu tọa độ từ các chuyến bay đang bay được nạp qua các lệnh Redis Geo (GEOADD, GEORADIUS) và phát sóng đến tất cả bàn điều phối chỉ trong dưới 80ms, mang lại khả năng nắm bắt tình hình không lưu toàn cầu liên tục.',
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'Tự động Xuất Điện văn Tải trọng Loadsheet Chuẩn IATA',
          content:
            'Sau khi hoàn tất sơ đồ xếp dỡ, hệ thống xuất điện văn loadsheet điện tử theo đúng chuẩn IATA AHMR. Chữ ký số mã hóa bảo đảm không xảy ra bất kỳ sự can thiệp dữ liệu trái phép nào giữa khâu phát hành và buồng lái.',
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Đóng gói Triển khai Container Docker & Đảm bảo Tính Sẵn sàng Cao',
          content:
            'Toàn bộ hệ thống được đóng gói container hóa với Docker, thiết lập cơ chế giám sát trạng thái sức khỏe tự động, đảm bảo thời gian hoạt động liên tục 99.9% cho các quy trình điều hành bay nghiêm ngặt.',
        },
      ],
    },
    {
      title: 'MediCare AI — Smart Telehealth & Clinical Decision Support System',
      slug: 'medicare-ai-triage',
      summary:
        'Hệ thống bệnh án điện tử (EMR) và phân loại triệu chứng bệnh nhân bằng AI, tích hợp phòng khám video WebRTC và kê đơn thuốc số cảnh báo tương tác thuốc.',
      category: 'Healthcare & Clinical AI',
      role: 'Full-Stack Developer',
      teamSize: 3,
      timeline: 'Tháng 11, 2025 – Tháng 5, 2026',
      status: 'Completed',
      year: 2026,
      technologies: [
        'React.js',
        'TypeScript',
        'Express.js',
        'MongoDB Atlas',
        'WebRTC',
        'Gemini AI API',
        'JWT Role Auth',
        'Tailwind CSS',
        'Cloudinary',
      ],
      themeColor: '#0D9488',
      themeBg: '#F0FDFA',
      coverUrl: '/projects/medicare-hero.png',
      liveUrl: 'https://medicare-ai.health',
      sourceUrl: 'https://github.com/HuynhNe26/medicare-ai-triage',
      reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
      featured: true,
      published: true,
      order: 7,
      storytellingStyle: 'timeline-based',
      problem:
        'Các phòng khám và bệnh viện thường xuyên quá tải ở khâu tiếp đón ban đầu, bệnh nhân chờ đợi lâu, thiếu phân loại mức độ khẩn cấp tự động và tiềm ẩn nguy cơ kê đơn tương tác thuốc nguy hiểm.',
      approach:
        'Xây dựng quy trình khám bệnh khép kín tích hợp AI phân loại triệu chứng bằng Gemini API, phòng khám trực tuyến bảo mật WebRTC, hồ sơ bệnh án điện tử EMR lưu trữ trên MongoDB Atlas và động cơ cảnh báo tương tác thuốc tự động.',
      outcome:
        'Rút ngắn 55% thời gian chờ đợi tiếp nhận, ưu tiên xử lý tức thì các ca khẩn cấp, hỗ trợ bác sĩ chẩn đoán phân biệt chính xác và giảm thiểu rủi ro dùng thuốc.',
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Cổng Tiếp nhận Khám Trực tuyến & Hàng đợi Bệnh nhân',
          content:
            'MediCare AI là giải pháp khám chữa bệnh từ xa và quản lý bệnh án điện tử (EMR) được xây dựng nhằm chuẩn hóa quy trình chăm sóc sức khỏe ban đầu. Hệ thống kết nối bệnh nhân với đội ngũ y bác sĩ thông qua một cổng dịch vụ duy nhất.',
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'Trục Thời gian Lâm sàng: Quy trình 4 Giai đoạn từ Tiếp nhận đến Kê đơn',
          content:
            'Toàn bộ câu chuyện dự án được thể hiện qua Trục thời gian lâm sàng (Timeline-Based): Giai đoạn 1 (Đăng ký & Đo lường Chỉ số Sinh tồn) ➔ Giai đoạn 2 (AI Phân loại Triệu chứng Khẩn cấp) ➔ Giai đoạn 3 (Bác sĩ Khám Trực tuyến WebRTC) ➔ Giai đoạn 4 (Xuất Đơn thuốc Điện tử & Lịch Tái khám).',
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'Động cơ Phân loại Triệu chứng Cấp cứu Tự động với Gemini Medical AI',
          content:
            'Bệnh nhân mô tả triệu chứng bằng ngôn ngữ tự nhiên. Mô hình Gemini AI phân tích lý do khám, tiền sử bệnh án và các chỉ số sinh tồn để xếp lớp cấp cứu: Khẩn cấp đỏ (Emergency), Cần khám sớm (Urgent), hoặc Khám thông thường (Routine), giúp phòng khám xử lý ngay các ca nguy kịch.',
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'Phòng Khám Video Trực tuyến Bảo mật Peer-to-Peer WebRTC',
          content:
            'Buổi tư vấn diễn ra qua kênh truyền thông video WebRTC ngang hàng được mã hóa hai đầu cuối. Bác sĩ vừa có thể quan sát triệu chứng của bệnh nhân, vừa tra cứu hồ sơ bệnh án và cập nhật ghi chú khám bệnh trong thời gian thực.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Hồ sơ Bệnh án Điện tử (EMR) & Biểu đồ Chỉ số Sinh tồn Theo Thời gian',
          content:
            'Bác sĩ có thể theo dõi biểu đồ diễn tiến sinh tồn của bệnh nhân qua các đợt khám: huyết áp tâm thu/tâm trương, nhịp tim, nhiệt độ và nồng độ oxy trong máu SpO2, hỗ trợ chẩn đoán phân biệt chuẩn xác.',
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'Bộ Kê đơn Thuốc Điện tử & Cảnh báo Tương tác Thuốc Nguy hại',
          content:
            'Công cụ kê đơn tự động tính toán liều lượng chuẩn (ví dụ Amoxicillin 500mg, ngày 4 lần) và tự động đối chiếu với danh mục thuốc bệnh nhân đang sử dụng để phát hiện cảnh báo tương tác thuốc chéo, ngăn ngừa sốc thuốc hoặc tương tác bất lợi.',
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Phân quyền Vai trò (Bác sĩ, Y tá, Bệnh nhân) & Bảo mật Y tế',
          content:
            'Hệ thống áp dụng cơ chế phân quyền RBAC nghiêm ngặt: Bác sĩ có quyền chẩn đoán và kê đơn; Y tá phụ trách tiếp nhận và ghi nhận chỉ số sinh tồn ban đầu; Bệnh nhân có cổng riêng theo dõi đơn thuốc và lịch hẹn.',
        },
      ],
    },
    {
      title: 'Smart Rental House Management & Local AI OCR — Nhà Trọ Thanh Tâm',
      slug: 'rent-house-smart-management',
      summary:
        'End-to-end rental boarding house management system featuring local AI OCR microservices for automated utility meter reading from actual photos, human-in-the-loop audit verification, automated multi-channel billing (SMS OTP & Resend Email), and SHA-256 tamper-proof electronic contract signing on PostgreSQL Neon.',
      category: 'PropTech & Local AI Microservices',
      role: 'Full-Stack Developer & AI Microservices Architect',
      teamSize: 1,
      timeline: 'August 2025 – October 2026',
      status: 'Completed',
      year: 2026,
      technologies: [
        'React 18',
        'Vite 6',
        'Node.js (Express)',
        'PostgreSQL (Neon)',
        'FastAPI (Python)',
        'OpenCV',
        'Tesseract OCR',
        'Capacitor 8 (Android/iOS)',
        'Resend API',
        'SMS OTP',
        'PDFKit (SHA-256)',
        'Docker',
      ],
      themeColor: '#0284C7',
      themeBg: '#F0F9FF',
      coverUrl: '/projects/rent-house-hero.png',
      liveUrl: 'https://nhatrothanhtam.netlify.app',
      sourceUrl: 'https://github.com/HuynhNe26/rent_house',
      reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
      featured: true,
      published: true,
      order: 8,
      storytellingStyle: 'sticky-split',
      problem:
        'Boarding house landlords face immense friction managing tenant utility records manually using paper notebooks: time-consuming data collection, transcription errors, dispute risks over utility calculations, vulnerable paper lease contracts susceptible to alteration, and tenant friction tracking historical consumption.',
      approach:
        'Architected a closed-loop PropTech solution: FastAPI + OpenCV + Tesseract microservice with Laplacian variance blur detection for zero-cost local OCR meter reading, human-in-the-loop audit verification, tiered automated billing with Snapshot Pricing, multi-channel notifications (SMS OTP & Resend Email), and HTML5 Canvas touchscreen lease signing secured by SHA-256 cryptographic hashes and PostgreSQL immutability triggers.',
      outcome:
        'Saved 85% of monthly billing audit hours, achieved 98.6% OCR recognition accuracy, provided 100% photographic transparency for tenants, eliminated contract forgery risks, and delivered a production-ready cross-platform Android APK.',
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Public Rental Catalog & Discovery Portal (Landing Page)',
          content:
            'The public-facing portal at nhatrothanhtam.netlify.app welcomes prospective tenants with an intuitive catalog of available rooms, transparent pricing matrices, real-time availability filters, and comprehensive amenity listings.',
          technicalNotes: [
            'Schema.org (ApartmentComplex) & OpenGraph SEO metadata',
            'Real-time room availability status and transparent pricing',
            'Mobile-first responsive layout optimized for all device form factors',
          ],
          screenshots: [
            {
              url: '/projects/rent-house-hero.png',
              caption: 'Public Rental Catalog & Room Showcase',
              alt: 'Landing Page & Room Catalog for Thanh Tam Rental House',
            },
          ],
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'Central Administrative Dashboard & Operations Analytics',
          content:
            'Central operations console for boarding house owners, aggregating occupancy rates, rent revenue, electric/water collections against projections, 3-6 month consumption trend charts, and automated overdue payment flags.',
          technicalNotes: [
            'HTTP-Only Cookie session security with aggressive Rate Limiting',
            'Real-time aggregated financial, revenue, and debt statistics',
            'Interactive Recharts data visualization for monthly utility patterns',
          ],
          screenshots: [
            {
              url: '/projects/rent-house-admin-dashboard.png',
              caption: 'Central Administrative Dashboard & Financial Analytics',
              alt: 'Admin Dashboard for Thanh Tam Rental House',
            },
          ],
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'AI OCR Meter Reading Engine & Human-in-the-Loop Review',
          content:
            'A proprietary AI OCR microservice pairing Computer Vision algorithms with Tesseract. Automatically assesses image sharpness using Laplacian variance, warning against blurry, glare-heavy, or underexposed photos. Landlords inspect side-by-side original photos against AI-detected figures for one-touch approvals.',
          technicalNotes: [
            'Zero-cost self-hosted Local AI OCR Microservice (FastAPI + OpenCV + Tesseract)',
            'Laplacian variance blur detector for automated photographic quality control',
            'Human-in-the-loop workflow: parallel verification of raw photos and OCR outputs',
          ],
          screenshots: [
            {
              url: '/projects/rent-house-ai-meters.png',
              caption: 'AI OCR Meter Verification Interface & Real Photo Inspection',
              alt: 'AI OCR Meter Reading & Human-in-the-loop Review',
            },
          ],
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'Automated Tiered Billing & Multi-Channel Dispatch (SMS OTP & Resend)',
          content:
            'Upon meter verification, the billing engine aggregates rent, tiered electricity, water, and service fees. Immutable Snapshot Pricing seals unit tariffs at statement generation time to prevent retroactive accounting shifts. Invoices are dispatched immediately to tenants via SMS OTP and detailed email receipts via Resend API.',
          technicalNotes: [
            'Snapshot Pricing mechanism freezing unit rates at statement creation',
            'Automated surcharge computation, deposit deductions, and prior debt carryover',
            'Resend API transactional email integration with meter photo attachments and SMS triggers',
          ],
          screenshots: [
            {
              url: '/projects/rent-house-billing.png',
              caption: 'Billing Management & Automated Multi-Channel Dispatch',
              alt: 'Admin Bills Management & Multi-channel Dispatch',
            },
          ],
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Immutable Electronic Lease Contracts & SHA-256 PostgreSQL Triggers',
          content:
            'Eliminates paper contract loss and unauthorized modifications. Generates standardized PDF lease agreements, computes SHA-256 cryptographic hashes over document bytes, and enforces permanent record immutability via a dedicated PostgreSQL trigger (trg_enforce_contract_immutability) on Neon database.',
          technicalNotes: [
            'Standardized PDF contract generation using PDFKit engine',
            'SHA-256 cryptographic digest verification ensuring document integrity',
            'PostgreSQL database trigger preventing retroactive updates or deletions of signed leases',
          ],
          screenshots: [
            {
              url: '/projects/rent-house-contracts.png',
              caption: 'Immutable Lease Agreements with SHA-256 Cryptographic Seals',
              alt: 'Admin Electronic Contracts Management',
            },
          ],
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'Accessible Tenant Portal: High-Contrast Ergonomics & Meter Inspector',
          content:
            'Engineered specifically for everyday tenants and older demographics with high ergonomics: large typography (≥18px), prominent bold sums (32px), and generous touch targets (≥52px). Passwordless OTP authentication allows quick access, while the built-in modal inspector lets tenants zoom in on raw meter photos for complete peace of mind.',
          technicalNotes: [
            'Passwordless phone number + SMS OTP authentication',
            'High-contrast accessible user experience designed for all age groups',
            'Interactive modal inspector providing 100% photographic transparency',
          ],
          screenshots: [
            {
              url: '/projects/rent-house-tenant-portal.png',
              caption: 'High-Contrast Tenant Portal & Full-Resolution Meter Photo Inspector',
              alt: 'Tenant Portal High-Contrast Accessible Dashboard',
            },
          ],
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Touchscreen SignaturePad & Capacitor 8 Cross-Platform Android APK',
          content:
            'Tenants sign lease documents directly using their fingertips or styluses on a fluid HTML5 Canvas SignaturePad. The client is fully packaged as a native hybrid mobile application using Capacitor 8 for Android and iOS, featuring an Apple-inspired Liquid Glass Dock and standalone APK distribution.',
          technicalNotes: [
            'Direct touchscreen electronic signature capture with HTML5 Canvas SignaturePad',
            'Native mobile packaging via Capacitor 8 (Android Studio / Gradle toolchain)',
            'Standalone Android APK compilation and iOS PWA Standalone compliance',
          ],
          screenshots: [
            {
              url: '/projects/rent-house-mobile.png',
              caption: 'Cross-Platform Mobile Android APK & Liquid Glass Navigation Dock',
              alt: 'Mobile Card UI & Liquid Glass Dock Navigation',
            },
          ],
        },
      ],
    },
  ];

  for (const proj of projectsData) {
    await query(
      `INSERT INTO projects (
        title, slug, summary, category, role, team_size, timeline, status, year,
        technologies, theme_color, theme_bg, problem, approach, outcome,
        cover_url, live_url, source_url, report_url, featured, published, display_order,
        storytelling_style, chapters, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10::jsonb, $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20, $21, $22,
        $23, $24::jsonb, $25, $26
      ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        summary = EXCLUDED.summary,
        category = EXCLUDED.category,
        role = EXCLUDED.role,
        team_size = EXCLUDED.team_size,
        timeline = EXCLUDED.timeline,
        status = EXCLUDED.status,
        year = EXCLUDED.year,
        technologies = EXCLUDED.technologies,
        theme_color = EXCLUDED.theme_color,
        theme_bg = EXCLUDED.theme_bg,
        problem = EXCLUDED.problem,
        approach = EXCLUDED.approach,
        outcome = EXCLUDED.outcome,
        cover_url = EXCLUDED.cover_url,
        live_url = EXCLUDED.live_url,
        source_url = EXCLUDED.source_url,
        report_url = EXCLUDED.report_url,
        featured = EXCLUDED.featured,
        published = EXCLUDED.published,
        display_order = EXCLUDED.display_order,
        storytelling_style = EXCLUDED.storytelling_style,
        chapters = EXCLUDED.chapters,
        updated_at = EXCLUDED.updated_at`,
      [
        proj.title,
        proj.slug,
        proj.summary,
        proj.category,
        proj.role,
        proj.teamSize ?? null,
        proj.timeline ?? null,
        proj.status ?? 'Completed',
        proj.year,
        JSON.stringify(proj.technologies || []),
        proj.themeColor ?? null,
        proj.themeBg ?? null,
        proj.problem,
        proj.approach,
        proj.outcome,
        proj.coverUrl ?? '',
        proj.liveUrl ?? '',
        proj.sourceUrl ?? '',
        (proj as any).reportUrl ?? 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
        Boolean(proj.featured),
        Boolean(proj.published),
        proj.order ?? 0,
        (proj as any).storytellingStyle ?? null,
        JSON.stringify(proj.chapters || []),
        now,
        now,
      ]
    );
    console.log(`✓ Project [${proj.slug}] upserted.`);
  }

  // 3. Seed Site Settings
  await query(
    `INSERT INTO site_settings (id, site_title, seo_description, canonical_url, contact_email, public_visibility, updated_at)
     VALUES ('settings', $1, $2, $3, $4, $5, $6)
     ON CONFLICT (id) DO UPDATE SET
       site_title = EXCLUDED.site_title,
       seo_description = EXCLUDED.seo_description,
       canonical_url = EXCLUDED.canonical_url,
       contact_email = EXCLUDED.contact_email,
       public_visibility = EXCLUDED.public_visibility,
       updated_at = EXCLUDED.updated_at`,
    [
      'Nguyễn Hoàng Huynh — Full-Stack Developer Portfolio',
      'Personal developer portfolio, AI Agentic RAG case studies, and engineering showcase of Nguyễn Hoàng Huynh.',
      'https://huynhportfolio.com',
      'nguyenhoanghuynh.vn@gmail.com',
      true,
      now,
    ]
  );
  console.log('✓ Site settings seeded.');

  console.log('Seeding completed successfully.');
}

try {
  await seed();
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Database seeding failed.');
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
