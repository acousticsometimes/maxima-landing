# Maxima Prospera Asia - Landing Page

A modern, professional React landing page for Maxima Prospera Asia - Indonesia's premier industrial expansion partner.

## 🌟 Features

### 1. **Hero Section with Video Background**
- Bold headline with company value proposition
- Animated statistics showcase
- Call-to-action buttons for enquiry and ROI calculator
- Smooth scroll indicator

### 2. **Executive Summary**
- 14+ years of experience highlight
- Coverage of 16+ countries
- Company principles showcase
- Trust-building content

### 3. **Core Services Grid**
- 4 main service pillars with hover animations
- Expandable details on hover
- Professional icons using Lucide React
- Property Search, Business Consultancy, Permits & Licenses, Performance Management

### 4. **Geographic Reach**
- Interactive location cards for 9 industrial zones
- Visual map representation
- Coverage across Jakarta, Cikarang, Karawang, Subang, Semarang, and more

### 5. **Client Carousel**
- Auto-rotating client logos
- Social proof with industry leaders
- Manual navigation dots

### 6. **Multi-Step Enquiry Form**
- 5-step progressive form with smart logic
- Progress bar indicator
- Conditional questions based on service type
- Professional form validation ready
- Steps:
  1. Service Selection
  2. Location Selection (multi-select)
  3. Property Details (conditional)
  4. Timeline Selection
  5. Contact Information

### 7. **ROI/Feasibility Calculator**
- Interactive calculator modal
- Input fields for zone, size, and industry type
- Estimated calculations display

### 8. **Resource Library (Gated Content)**
- Downloadable guide modal
- Email capture for lead generation
- Professional presentation

### 9. **Dark Mode Toggle**
- Seamless light/dark theme switching
- Persistent across all sections
- Modern aesthetic

### 10. **Sticky Footer Enquiry Box**
- Always-visible contact bar
- Quick email capture
- Prominent CTA button

### 11. **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

## 🎨 Design Specifications

### Typography
- **Headers**: Inter (Google Fonts)
- **Body**: Lexend Deca (Google Fonts)

### Color Palette
- **Primary**: #003366 (Deep Navy Blue)
- **Secondary**: #1a4d7a (Medium Blue)
- **Accent**: #4a9eff (Light Blue)
- **Dark Blue Grey**: #2c3e50
- **Light Grey**: #f8f9fa

### Animations
- Fade-in-up animations
- Slide animations
- Hover effects
- Service card expansions
- Client carousel transitions
- Modal animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## 📁 Project Structure

```
maxima-landing/
├── src/
│   ├── App.jsx           # Main application component
│   ├── App.css           # Custom styles and animations
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind base styles
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── README.md             # This file
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Google Fonts** - Typography (Inter & Lexend Deca)

## 🎯 Key Components

### Navigation
- Fixed header with logo
- Desktop and mobile menus
- Dark mode toggle
- Smooth scrolling to sections

### Forms
- Multi-step enquiry form with validation
- ROI calculator
- Resource download gate
- Contact information collection

### Interactive Elements
- Service cards with hover expansion
- Location selection chips
- Client carousel with auto-rotation
- Animated statistics

## 🎨 Customization

### Changing Colors
Edit the color variables in `tailwind.config.js`:
```javascript
colors: {
  primary: '#003366',    // Change primary color
  secondary: '#1a4d7a',  // Change secondary color
  accent: '#4a9eff',     // Change accent color
}
```

### Adding New Sections
Add new sections in `App.jsx` following the existing structure pattern.

### Modifying Services
Update the `services` array in `App.jsx`:
```javascript
const services = [
  {
    icon: <YourIcon />,
    title: 'Service Name',
    description: 'Service description',
    details: ['Detail 1', 'Detail 2']
  }
];
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Future Enhancements (Backend Integration)

When ready to add backend functionality:

1. **Form Submission**
   - Connect enquiry form to API endpoint
   - Add email service integration (SendGrid, AWS SES)
   - Store leads in database

2. **ROI Calculator**
   - Connect to real data source
   - Dynamic pricing calculations
   - Generate PDF reports

3. **Resource Library**
   - File storage integration
   - Email automation
   - Lead tracking

4. **Analytics**
   - Google Analytics integration
   - Conversion tracking
   - User behavior analysis

5. **CMS Integration**
   - Dynamic content management
   - Client logo management
   - Service updates

## 📄 License

Copyright © 2026 PT Maxima Prospera Asia. All rights reserved.

## 📞 Contact

- **Email**: maximaprosperaasia@gmail.com
- **Website**: maximaprosperaasia.com
- **Address**: Gedung Cikarang Technopark, Jl. Inti I Blok C 1 No.7, Cibatu, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17530

---

Built with ❤️ for Maxima Prospera Asia
