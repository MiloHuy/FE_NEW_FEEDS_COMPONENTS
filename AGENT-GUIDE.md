# Hướng dẫn cho Agent đọc và phát triển Code (Agent Developer Guide)

Tài liệu này cung cấp hướng dẫn chi tiết dành cho các AI Agent (hoặc lập trình viên mới) khi tiếp cận và phát triển dự án **my-ytb-social**.

---

## 🛠️ Công nghệ cốt lõi (Technology Stack)

Dự án là một ứng dụng Frontend hiện đại với các công nghệ chính sau:
- **Framework**: React 19 (TypeScript)
- **Công cụ build**: Vite 7
- **Giao diện & Styling**: Tailwind CSS v3 kết hợp với SCSS (Sass Embedded)
- **Routing**: `react-router-dom` v7 (Sử dụng Data Router qua `createBrowserRouter` trong `src/router.tsx`)
- **Quản lý Form**: `react-hook-form` + `yup` + `@hookform/resolvers`
- **Storybook**: Storybook v10 hỗ trợ viết tài liệu và kiểm thử component độc lập.
- **Kiểm thử (Testing)**: Vitest kết hợp Playwright (chạy component test trong Storybook).
- **Kiểm soát code**: ESLint v9 & TypeScript-ESLint.
- **Micro-frontend**: Sử dụng `@originjs/vite-plugin-federation` để export `App.tsx` làm remote module (`my_ytb_social_remote`).
- **Thư viện Icon**: Sử dụng thư viện icon cục bộ `@quanghuy/ytb-icon-library` và `lucide-react`.

---

## 📂 Kiến trúc dự án & Tổ chức thư mục

Dự án áp dụng phương pháp thiết kế hệ thống **Atomic Design** kết hợp với SCSS Modular.

```
src/
├── assets/             # Tài nguyên tĩnh (hình ảnh, font, v.v.)
├── atoms/              # Các component UI cơ bản nhất (Button, Input, Badge, Select, Avatar, v.v.)
├── molecules/          # Component phức hợp từ các atoms (CardPost, trường nhập liệu phức hợp, v.v.)
├── organisms/          # Các khối giao diện lớn hoặc wrapper (AuthWrapper, GuestWrapper)
├── pages/              # Các trang hoàn chỉnh (DashboardPage, LoginPage, RegisterPage)
├── features/           # Logic riêng biệt của từng tính năng lớn trong app
├── hook/               # Các custom hooks dùng chung
├── services/           # Lớp gọi API (Axios client, request helpers)
├── constants/          # Khai báo các hằng số dùng chung trong dự án
├── lib/                # Cấu hình thư viện bên thứ ba
├── utils/              # Các hàm bổ trợ (helper functions, file *.utils.ts)
├── style/              # Thư mục chứa toàn bộ CSS/SCSS của dự án
│   ├── abstracts/      # Khai báo biến CSS, bảng màu, typography, mixins
│   ├── base/           # Reset CSS và style mặc định cho tag HTML
│   ├── components/     # Chứa style SCSS của các component tương ứng với Atomic Design
│   │   ├── atoms/
│   │   └── molecules/
│   └── themes/         # Định nghĩa các theme (nếu có)
├── main.tsx            # Điểm khởi chạy ứng dụng chính (Entry Point)
├── App.tsx             # Root component (được export làm remote module)
└── router.tsx          # Cấu hình định tuyến (React Router)
```

---

## 🎨 Quy chuẩn thiết kế & Styling (Styling Rules)

1. **Kết hợp SCSS và Tailwind CSS**:
   - Style của các component được viết trong các file SCSS tương ứng trong `src/style/components/`.
   - Sử dụng cú pháp BEM (Block-Element-Modifier) để đặt tên class (ví dụ: `.input`, `.input__wrapper`, `.input--error`).
   - Sử dụng directive `@apply` của Tailwind bên trong các file SCSS để tái sử dụng utility classes.
   - **Hạn chế** viết trực tiếp quá nhiều class Tailwind dài dòng trên JSX của các component cơ bản (Atoms). Hãy gom chúng vào file SCSS tương ứng.

2. **Hệ thống Token & CSS Variables**:
   - Toàn bộ màu sắc, khoảng cách (spacing), font-size được định nghĩa dưới dạng CSS Custom Properties (CSS variables) tại `src/style/abstracts/` (ví dụ: `src/style/abstracts/_colors.scss`).
   - Các biến này được đăng ký vào Tailwind qua `tailwind.config.js` (ví dụ: `theme('colors.primary.400')`, `bg-primary-400`, `p-xs`).
   - **Quy tắc quan trọng**: Không được viết cứng (hardcode) mã màu hex, rgb hoặc khoảng cách px thô trong code. Hãy luôn sử dụng các token màu hoặc spacing đã được cấu hình sẵn.

3. **Khai báo stylesheet mới**:
   - Mỗi lần tạo file SCSS cho component mới, bạn phải import file đó vào `src/index.css` để Vite có thể bundle chính xác.

---

## 📦 Quy trình tạo Component mới

Khi tạo một component mới (ví dụ: `MyComponent` thuộc nhóm `atoms`), hãy làm theo các bước sau:

1. **Tạo mã nguồn React**:
   - Tạo thư mục: `src/atoms/my-component/`
   - Tạo file React: `MyComponent.tsx` (export default component).
   - Tạo file export: `index.ts` chứa code: `export { default } from './MyComponent'`
   
2. **Tạo tài liệu Storybook**:
   - Tạo file: `my-component.stories.tsx` cùng cấp với file component để viết story hiển thị component.

3. **Viết Stylesheet SCSS**:
   - Tạo file style: `src/style/components/atoms/my-component.scss`
   - Viết style bằng BEM & Tailwind `@apply`.
   - Import file SCSS vừa tạo vào file tổng `src/index.css`.

4. **Tích hợp Ref & Types**:
   - Đảm bảo định nghĩa rõ ràng các Props bằng TypeScript Interface (ví dụ: `IMyComponentProps`).
   - Đối với các component tương tác nhập liệu (như input, select, button), luôn sử dụng `React.forwardRef` để hỗ trợ tích hợp mượt mà với `react-hook-form`.

*Tham khảo các component mẫu: `src/atoms/button/` hoặc `src/atoms/input/` để làm chuẩn.*

---

## 🤖 Nguyên tắc hành vi dành cho Agent (Agent Guidelines)

- **Đọc cấu trúc dữ liệu trước**: Khi nhận yêu cầu thay đổi giao diện hoặc logic, hãy đọc `package.json` và cấu trúc các thư mục liên quan trước khi chỉnh sửa.
- **Tuân thủ TypeScript**: Luôn viết code an toàn với kiểu dữ liệu (strongly typed). Tránh sử dụng `any`. Khai báo interface rõ ràng.
- **Không phá vỡ Module Federation**: Hãy nhớ rằng component `App.tsx` đang được expose làm remote module cho ứng dụng khác. Tránh đặt các state mang tính toàn cục của trang hoặc giả định layout cố định trong `App.tsx`.
- **Giữ nguyên comments**: Giữ lại toàn bộ comment hiện có trong các file code không liên quan đến thay đổi của bạn để bảo toàn tài liệu.
- **Chạy kiểm thử & Storybook**: Khi sửa đổi các component cốt lõi, hãy kiểm tra lại bằng Storybook (`npm run storybook`) để đảm bảo không làm lỗi giao diện.
