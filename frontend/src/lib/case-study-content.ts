import type { Language } from '@/context/language-context';
import type { Project } from '@/lib/types';

const copy = {
  vi: {
    back: 'Tất cả dự án', caseStudy: 'Thiết kế & phát triển sản phẩm', completed: 'Đã hoàn thành', ongoing: 'Đang phát triển',
    live: 'Trải nghiệm website', source: 'Mã nguồn', report: 'Báo cáo dự án', explore: 'Khám phá dự án',
    role: 'Vai trò', team: 'Đội ngũ', solo: 'Phát triển độc lập', members: 'thành viên', timeline: 'Thời gian', field: 'Lĩnh vực',
    overview: 'Tổng quan', experience: 'Trải nghiệm sản phẩm', stack: 'Công nghệ', outcome: 'Kết quả', gallery: 'Thư viện giao diện',
    context: 'Từ bài toán thực tế đến một sản phẩm hoàn chỉnh.', challenge: 'Bài toán', solution: 'Cách tiếp cận',
    experienceTitle: 'Đi sâu vào từng trải nghiệm.', experienceIntro: 'Chọn một chức năng để khám phá luồng sử dụng, giao diện và cách triển khai.',
    implementation: 'Điểm nhấn kỹ thuật', preview: 'Giao diện sản phẩm', enlarge: 'Phóng to ảnh',
    stackTitle: 'Những công nghệ đứng sau sản phẩm.', stackIntro: 'Bộ công nghệ được sử dụng để xây dựng giao diện, xử lý nghiệp vụ và triển khai dự án.',
    resultTitle: 'Giá trị sau cùng của dự án.', galleryTitle: 'Một góc nhìn đầy đủ hơn.', galleryIntro: 'Các màn hình và chi tiết khác trong quá trình hoàn thiện sản phẩm.',
    close: 'Đóng ảnh', previousImage: 'Ảnh trước', nextImage: 'Ảnh tiếp theo', image: 'Ảnh', of: '/',
    previous: 'Dự án trước', next: 'Dự án tiếp theo', all: 'Xem tất cả dự án',
    contactEyebrow: 'CÙNG TẠO RA SẢN PHẨM TIẾP THEO', contactTitle: 'Bạn có một ý tưởng muốn hiện thực hóa?', contact: 'Cùng trao đổi',
  },
  en: {
    back: 'All projects', caseStudy: 'Product design & development', completed: 'Completed', ongoing: 'In progress',
    live: 'Visit website', source: 'Source code', report: 'Project report', explore: 'Explore the project',
    role: 'My role', team: 'Team', solo: 'Independent developer', members: 'members', timeline: 'Timeline', field: 'Discipline',
    overview: 'Overview', experience: 'Product experience', stack: 'Technology', outcome: 'Outcome', gallery: 'Interface gallery',
    context: 'From a real challenge to a considered product.', challenge: 'The challenge', solution: 'The approach',
    experienceTitle: 'A closer look at the experience.', experienceIntro: 'Select a feature to explore its interface, user journey, and implementation.',
    implementation: 'Engineering highlights', preview: 'Product interface', enlarge: 'Enlarge image',
    stackTitle: 'The technology behind the experience.', stackIntro: 'The tools used to build the interface, handle business logic, and deliver the product.',
    resultTitle: 'What the project delivers.', galleryTitle: 'See the bigger picture.', galleryIntro: 'More screens and details from the finished product.',
    close: 'Close image', previousImage: 'Previous image', nextImage: 'Next image', image: 'Image', of: '/',
    previous: 'Previous project', next: 'Next project', all: 'View all projects',
    contactEyebrow: 'LET’S BUILD WHAT COMES NEXT', contactTitle: 'Have an idea you want to bring to life?', contact: 'Let’s talk',
  },
  zh: {
    back: '所有项目', caseStudy: '产品设计与开发', completed: '已完成', ongoing: '开发中',
    live: '访问网站', source: '源代码', report: '项目报告', explore: '探索项目',
    role: '我的职责', team: '团队', solo: '独立开发', members: '位成员', timeline: '开发周期', field: '领域',
    overview: '项目概览', experience: '产品体验', stack: '技术栈', outcome: '项目成果', gallery: '界面图集',
    context: '从实际需求到完整产品。', challenge: '面临的挑战', solution: '解决方案',
    experienceTitle: '深入了解产品体验。', experienceIntro: '选择一个功能，查看其界面、用户流程和实现方式。',
    implementation: '技术亮点', preview: '产品界面', enlarge: '放大图片',
    stackTitle: '体验背后的技术。', stackIntro: '用于构建界面、处理业务逻辑和部署产品的技术工具。',
    resultTitle: '项目带来的价值。', galleryTitle: '了解更多产品细节。', galleryIntro: '查看产品的其他界面与设计细节。',
    close: '关闭图片', previousImage: '上一张', nextImage: '下一张', image: '图片', of: '/',
    previous: '上一个项目', next: '下一个项目', all: '查看所有项目',
    contactEyebrow: '一起打造下一个产品', contactTitle: '有想要实现的创意吗？', contact: '联系我',
  },
};

export const getCaseStudyCopy = (lang: Language) => copy[lang];

export function getCaseStudyReportUrl(value?: string): string | null {
  if (!value || value.includes('/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/')) return null;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

type Presentation = { name: string; subtitle: [string, string, string]; description: [string, string, string] };
const presentations: Record<string, Presentation> = {
  'ticket-concert-agentic-rag': { name: 'Ticket Concert',
    subtitle: ['Kết nối khán giả với sân khấu.', 'Connecting audiences to the stage.', '连接观众与舞台。'],
    description: ['Nền tảng đặt vé hòa nhạc kết hợp trợ lý AI, chọn chỗ thời gian thực và quy trình quản lý sự kiện từ mở bán đến check-in.', 'A concert ticketing platform bringing together AI assistance, real-time seat selection, and event operations from discovery to check-in.', '集成 AI 助手、实时选座及活动管理的演唱会票务平台，覆盖从发现活动到入场签到的完整流程。'] },
  'fashion-nail-morley': { name: 'Fashion Nail Morley',
    subtitle: ['Trải nghiệm làm đẹp, được kết nối.', 'A considered beauty booking experience.', '互联的美甲预约体验。'],
    description: ['Website đặt lịch và quản trị salon tại Perth, kết nối danh mục dịch vụ, lịch hẹn, tư vấn và vận hành trong cùng một trải nghiệm.', 'A booking and management platform for a Perth salon, connecting service discovery, appointments, consultation, and daily operations.', '为珀斯美甲沙龙打造的预约与管理平台，连接服务展示、预约、咨询及日常运营。'] },
  'examplatform-ai': { name: 'ExamPlatform AI',
    subtitle: ['Học chủ động. Hiểu sâu hơn.', 'Learn actively. Understand deeply.', '主动学习，深入理解。'],
    description: ['Nền tảng luyện thi và đánh giá năng lực, tích hợp gia sư Socratic AI, đề thi thích ứng và cổng thông tin dành cho phụ huynh.', 'An adaptive assessment platform with Socratic AI tutoring, personalized exam generation, and a connected parent portal.', '自适应考试与能力评估平台，集成苏格拉底式 AI 辅导、个性化试卷及家长门户。'] },
  'vk-digital-hub': { name: 'VK Digital Hub',
    subtitle: ['Từ kết nối đầu tiên đến cơ hội mới.', 'From first connection to new opportunity.', '从首次连接到全新机遇。'],
    description: ['Website giới thiệu dịch vụ tiếp thị số, kết hợp thiết kế nội dung rõ ràng và quy trình tự động tiếp nhận khách hàng tiềm năng.', 'A digital agency website pairing clear service storytelling with automated lead capture and inquiry routing.', '数字营销机构网站，将清晰的服务展示与潜在客户收集及咨询自动分发相结合。'] },
  'nh-huynh-portfolio': { name: 'NH Huynh Portfolio',
    subtitle: ['Một góc nhìn về người làm sản phẩm.', 'A perspective on building digital products.', '数字产品开发者的视角。'],
    description: ['Portfolio cá nhân giới thiệu năng lực phát triển Full-Stack qua các dự án thực tế, đi cùng hệ quản trị nội dung và trải nghiệm đa ngôn ngữ.', 'A personal portfolio presenting full-stack work through detailed case studies, with content management and multilingual experiences.', '通过详细项目案例展示全栈开发能力的个人作品集，提供内容管理及多语言体验。'] },
  'colorbox-event-lighting': { name: 'COLORBOX Lighting',
    subtitle: ['Nghệ thuật ánh sáng & điều hành sân khấu.', 'The art of lighting & stage production.', '舞台灯光艺术与现场制作平台。'],
    description: ['Nền tảng trực quan và điều hành sản xuất ánh sáng sân khấu sự kiện chuyên nghiệp, tích hợp hiệu ứng điện ảnh, mô phỏng 3D Previz và quản trị thời gian thực.', 'A professional stage lighting & visual production platform bringing together cinematic volumetric beams, 3D previz workflows, and real-time production operations.', '专业活动舞台灯光与视觉制作平台，融合电影级体积光效、3D预演工作流及实时制作运营管理。'] },
  'rent-house-smart-management': { name: 'Nhà Trọ Thanh Tâm',
    subtitle: ['Quản lý gọn hơn. Vận hành minh bạch hơn.', 'Simpler management. Clearer operations.', '管理更简单，运营更透明。'],
    description: ['Hệ thống quản lý nhà trọ kết hợp AI đọc công tơ, hóa đơn tự động và hợp đồng điện tử, kết nối chủ nhà với người thuê trong một nền tảng.', 'A rental management platform connecting landlords and tenants through AI meter reading, automated billing, and electronic contracts.', '通过 AI 表计识别、自动账单和电子合同连接房东与租客的房屋租赁管理平台。'] },
};

export function getCaseStudyPresentation(project: Project, lang: Language) {
  const entry = presentations[project.slug];
  const index = lang === 'vi' ? 0 : lang === 'en' ? 1 : 2;
  return entry ? { name: entry.name, subtitle: entry.subtitle[index], description: entry.description[index] }
    : { name: project.title, subtitle: '', description: project.summary };
}

const narrativesVi: Record<string, { problem: string; approach: string; outcome: string }> = {
  'ticket-concert-agentic-rag': {
    problem: 'Trong các đợt mở bán, người xem cần tìm nhanh thông tin sự kiện, kiểm tra chỗ ngồi và theo dõi thanh toán. Các bước rời rạc khiến trải nghiệm đặt vé thiếu liền mạch và tăng khối lượng hỗ trợ.',
    approach: 'Kết nối danh mục sự kiện, bản đồ chọn chỗ và thanh toán trong cùng một luồng. Trợ lý Agentic RAG tra cứu dữ liệu theo ngữ cảnh, kết hợp Socket.IO cập nhật trạng thái và công cụ quản trị cho ban tổ chức.',
    outcome: 'Hoàn thiện hành trình từ khám phá sự kiện, chọn vé, thanh toán đến nhận vé và check-in bằng QR; đi cùng hệ thống hỗ trợ AI và bảng điều khiển quản trị.',
  },
  'colorbox-event-lighting': {
    problem: 'Các công ty tổ chức sự kiện và tổng đạo diễn thường gặp rủi ro lớn khi duyệt thiết kế ánh sáng sân khấu qua các bản vẽ 2D tĩnh hoặc file PDF cồng kềnh; việc trao đổi kỹ thuật rider thiết bị, báo giá và phản hồi đặt lịch qua email/tin nhắn truyền thống thiếu tính trực quan, dẫn đến sai lệch thông số DMX trên hiện trường và chậm trễ thời gian setup.',
    approach: 'Phát triển nền tảng trải nghiệm số cao cấp cho COLORBOX kết hợp hiệu ứng Volumetric Light Beams và vòng tròn HUD tương tác 4 phân vùng; tích hợp bộ giải pháp trình chiếu 3D Previz / grandMA3 timecode automation, quy trình đặt lịch khảo sát kỹ thuật tự động hóa qua Resend API và hệ thống quản trị thời gian thực với Socket.IO kèm cảnh báo âm thanh Web Audio API.',
    outcome: 'Hệ thống vận hành mượt mà 60FPS với thời gian phản hồi API dưới 120ms, số hóa toàn diện hồ sơ kỹ thuật cho hơn 11 đại nhạc hội và sự kiện sân vận động quy mô tới 50.000 khán giả, rút ngắn 85% thời gian tiếp nhận rider kỹ thuật và tự động hóa 100% thông báo booking theo thời gian thực.',
  },
  'fashion-nail-morley': {
    problem: 'Việc tiếp nhận lịch qua điện thoại và tin nhắn khiến salon khó theo dõi khung giờ, tư vấn dịch vụ và quản lý thay đổi. Khách hàng cần một cách đặt hẹn rõ ràng theo múi giờ Perth.',
    approach: 'Xây dựng danh mục dịch vụ minh bạch và quy trình đặt hẹn từng bước, kết nối xác nhận email, tư vấn trực tuyến và bảng điều khiển quản trị lịch hẹn.',
    outcome: 'Tạo một điểm kết nối thống nhất giữa khách hàng và salon: tìm dịch vụ, đặt lịch, nhận xác nhận và quản lý vận hành trên cùng nền tảng.',
  },
  'examplatform-ai': {
    problem: 'Một quy trình luyện thi chỉ tập trung vào điểm số chưa giúp người học hiểu cách suy luận. Học sinh và phụ huynh cần theo dõi tiến trình và nhận hỗ trợ phù hợp trong quá trình học.',
    approach: 'Kết hợp ngân hàng câu hỏi, ma trận đề và gia sư Socratic hướng dẫn qua câu hỏi gợi mở. Phân tích năng lực và cổng phụ huynh giúp kết nối kết quả thi với quá trình học tập.',
    outcome: 'Hoàn thiện môi trường luyện thi với đề thích ứng, hỗ trợ AI, lịch sử kết quả và các công cụ quản trị nội dung dành cho nhiều cấp học.',
  },
  'vk-digital-hub': {
    problem: 'Agency cần trình bày dịch vụ rõ ràng và chuyển các yêu cầu tư vấn đến đúng nơi, hạn chế thao tác thủ công khi tiếp nhận khách hàng mới.',
    approach: 'Thiết kế giao diện React theo từng nhóm dịch vụ và điểm chuyển đổi, kết nối biểu mẫu với webhook Make để phân phối yêu cầu và gửi email xác nhận.',
    outcome: 'Website được triển khai trên Netlify, kết nối nội dung giới thiệu dịch vụ với quy trình tự động tiếp nhận và phản hồi yêu cầu tư vấn.',
  },
  'nh-huynh-portfolio': {
    problem: 'Một danh sách liên kết chưa thể hiện được bối cảnh, quyết định kỹ thuật và đóng góp của người phát triển. Portfolio cần giúp người đọc hiểu được quá trình tạo ra từng sản phẩm.',
    approach: 'Xây dựng các trang case study với nội dung có cấu trúc, ảnh giao diện thực tế và điều hướng rõ ràng. Next.js kết nối backend Node.js, CMS và trải nghiệm đa ngôn ngữ.',
    outcome: 'Một hệ thống giới thiệu năng lực và dự án có thể cập nhật qua CMS, hỗ trợ chế độ sáng tối và trình bày câu chuyện sản phẩm trên nhiều kích thước màn hình.',
  },
  'rent-house-smart-management': {
    problem: 'Ghi chỉ số điện nước bằng sổ tay dễ sai lệch và mất thời gian đối chiếu. Hóa đơn, hợp đồng và lịch sử thanh toán rời rạc khiến cả chủ nhà lẫn người thuê khó kiểm tra thông tin.',
    approach: 'Thiết kế một quy trình khép kín: chụp công tơ, AI nhận diện, chủ nhà đối chiếu và duyệt, sau đó lập hóa đơn theo đơn giá đã chốt. Hợp đồng điện tử và cổng người thuê bổ sung khả năng tra cứu minh bạch.',
    outcome: 'Kết nối việc quản lý phòng, chỉ số điện nước, hóa đơn và hợp đồng trong một hệ thống. Người thuê có thể tra cứu lịch sử cùng ảnh công tơ, trong khi chủ nhà có công cụ kiểm soát và đối chiếu tập trung.',
  },
};

export function getCaseStudyNarrative(project: Project, lang: Language) {
  if (lang === 'vi' && narrativesVi[project.slug]) return narrativesVi[project.slug];
  return { problem: project.problem, approach: project.approach, outcome: project.outcome };
}
