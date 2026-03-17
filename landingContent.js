// landingContent.js  –  Static fallback used when Firestore is unavailable.
// Field names match exactly what the dashboard editor saves to Firestore.
// C:\Users\LIVIA\maxima-landing\maxima-landing\landingContent.js

export const landingContent = {
  hero: {
    trustedBy: "Trusted by 200+ companies across 16 countries",
    title1: "Your gateway to",
    title2: "industrial Indonesia",
    description: "Expert guidance for manufacturing expansion across Indonesia's prime industrial zones. From site selection to permits, we handle every detail.",
    ctaConsultation: "Get Free Consultation",
    ctaProfile: "Company Profile",
    image: "/assets/hero-illustration.png"
  },
  stats: [
    { number: '14+', label: 'Years of Experience' },
    { number: '16+', label: 'Countries Served' },
    { number: '9',   label: 'Industrial Zones' },
    { number: '200+',label: 'Projects Completed' }
  ],
  services: {
    title: 'Complete expansion services',
    description: 'Comprehensive services tailored to your needs.',
    items: [
      { id: 1, title: 'Property & Development', description: 'Property Search, Marketing, and Dealing for Direct User and Industrial Estate Development.', features: [] },
      { id: 2, title: 'Consultancy & Planning', description: 'Business Consultancy, Feasibility Study, Permit and Licenses Services.', features: [] },
      { id: 3, title: 'Legal & Performance', description: 'Permit and Licenses Application, Immigration Services, Tax consultant, Performance Management and Audit.', features: [] }
    ]
  },
  process: {
    title: 'How we work',
    description: 'A streamlined process designed for efficiency and clarity.',
    steps: [
      { step: '01', title: 'Initial Consultation', description: 'Discuss your requirements and objectives' },
      { step: '02', title: 'Site Selection',       description: 'Identify optimal locations for your needs' },
      { step: '03', title: 'Due Diligence',        description: 'Comprehensive legal and site assessment' },
      { step: '04', title: 'Execution',            description: 'Smooth transaction and handover process' }
    ]
  },
  whyUs: {
    title: "Why Us?",
    summary: "Specializes in Manufacturing Industry Development with more than 14 years experience, we tailored the needs of reputable companies for expansion in Indonesia throughout Jakarta, Cikarang, Karawang, Subang, Semarang, Kendal, Batang, Grobogan, and Sidoarjo areas. Client originates from China mainland, Hongkong, Taiwan, Japan, Korea, United States, Australia, Singapore, Vietnam, Thailand, Dubai, Saudi Arabia, India, France, Germany, and Indonesia has engaged with us to find the most suitable location for their businesses and providing the end-to-end services for their convenience to operate in accordance with the regulation in Indonesia.",
    intro: {
      text: "The most important principle for our business is Trust, which makes every services to be executed with utmost Care to cater what our client truly needs with the drive to provide Convenience, Saving Time, and Money compelled with our Experience and Knowledge in the Investment Regulation in Indonesia."
    },
    pillars: [
      { title: 'Property Agency',      description: 'For secondary and primary properties, including land acquisition for Industrial area development.' },
      { title: 'Business Consultancy', description: 'Feasibility Study, Permit and Licenses Services.' },
      { title: 'Commodity Trading',    description: 'For Nickel, coal, iron, bauxite.' }
    ],
    deliverables: [
      'Undertake the industrial land search, coordinate the site survey and data',
      'Advise on local comprehension, viable options based on client requirements, and comparisons',
      'Facilitate the QnA due diligence which includes physical, and legal clearance',
      'Facilitate negotiation process for prices, timeline and terms and conditions',
      'Liaise for the preparation of transaction between both seller and buyer, prepare a purchase confirmation, booking or deposit payment',
      'Ensure a successful and smooth sales transaction process in coordination with Notary, for the signing of Sale and Purchase Agreement (PPJB), Deed of Sale and Purchase (AJB) and handover from the Landlord to the Buyer.'
    ],
    process: {
        title: "Our Process",
        steps: [
            { step: '1', title: 'Property search and official agent cooperation' },
            { step: '2', title: 'Digital & physical proposal and communication to client' },
            { step: '3', title: 'Inquiries filtering, prospect qualifying, and prospect nomination' },
            { step: '4', title: 'Site survey arrangement and Due Diligence Coordination' },
            { step: '5', title: 'Negotiation LOI, Purchase Confirmation Letter and Transaction Dealing with Notary' },
            { step: '6', title: 'Commission Invoicing' }
        ]
    },
    team: [
      { name: 'Michael Rino',      role: 'Principal',             description: 'Provides strategic oversight and ensures objectives are met.',       image: '/images/team/michael.jpg',  imageScale: 100 },
      { name: 'Michelle Prayogo', role: 'Marketing Director',    description: 'Facilitates dialogue with stakeholders and gathers feedback.',        image: '/images/team/michelle.jpg', imageScale: 100 },
      { name: 'Subekti Aswinanto',role: 'Site Surveyor Officer', description: 'Handles day-to-day coordination and manages timelines.',              image: '/images/team/subekti.jpg',  imageScale: 100 }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  whyIndonesia: {
    title: "Our Presence in Indonesia",
    factsTitle: "Why Invest Here?",
    mapImage: "/images/photos/indomap.png",
    facts: [
      { title: "Economic",   subtitle: "Largest Economy in SEA",   description: "Indonesia is #1 Largest Economy in Southeast Asia" },
      { title: "Population", subtitle: "#4 Most Populous Country", description: "Indonesia is #4 world's most populous country with 278 million citizens" },
      { title: "Stock",      subtitle: "Stable Outlook",           description: "Outlook with investment-grade ratings from S&P, Fitch & Moody's" },
      { title: "Growth",     subtitle: "High Economic Growth",     description: "5% expected economic growth in 2024 and 5% economic growth in 2023." },
      { title: "Medal",      subtitle: "Top GDP Growth in Asia",   description: "USD 1.3 Trillion GDP & Rising" }
    ]
  },
  investmentGuidelines: {
    header: { title: 'Complete Investment Guidelines', subtitle: 'We have prepared a thorough investment guideline just for you.' },
    pdf: null,
    guidelines: [
      { category: "Establishment & Pre-Investments", items: ["Company Name Reservation", "Deed of Establishment", "Business License"] },
      { category: "Pre-Construction & Construction", items: ["Environmental Permit", "Building Permit", "SLF"] },
      { category: "Operation",                       items: ["Air Pollution Control", "Operational Licenses"] }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about expanding your business to Indonesia.",
    items: [
      { id: 1, q: "What services does Maxima Prospera Asia provide?", a: "We provide end-to-end industrial expansion services including property and land acquisition, business setup and registration, permits and compliance management, and ongoing operational support." },
      { id: 2, q: "Which industrial zones do you cover?",             a: "We cover 9 major industrial zones across Indonesia, including Jakarta, Cikarang, Karawang, Subang, Semarang, Kendal, Batang, Grobogan, and Sidoarjo." },
      { id: 3, q: "How long does the company registration process take?", a: "The timeline varies depending on the specific business classification, but generally, a standard PT PMA registration can be completed within 1-2 months with our assistance." },
      { id: 4, q: "Do you assist with finding local partners?",       a: "Yes, we can assist in identifying and vetting potential local partners if your business model requires or benefits from local partnership." },
      { id: 5, q: "What are the costs involved in setting up a factory in Indonesia?", a: "Costs vary significantly based on location, size, and industry. We recommend scheduling a consultation so we can provide a tailored estimate based on your specific requirements." }
    ]
  },
  contact: {
    email: 'contact@maximaprospera.com',
    phone: '+65 1234 5678',
    whatsapp: '+65 1234 5678',
    address: 'Singapore',
    linkedin: ''
  }
};