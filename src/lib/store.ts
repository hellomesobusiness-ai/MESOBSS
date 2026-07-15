type ID = string

export interface ServiceItem {
  id: ID; name: string; desc: string; icon: string; href: string
}

export interface Package {
  id: ID; name: string; price: string; currency: string; features: string[]; popular?: boolean
}

export interface SingleServiceCat {
  id: ID; name: string; items: string[]
}

export interface IntlService {
  id: ID; title: string; price: string
}

export interface PortfolioItem {
  id: ID; title: string; cat: string; desc: string; metric: string
}

export interface BlogPost {
  id: ID; title: string; cat: string; date: string; excerpt: string
}

export interface Testimonial {
  id: ID; text: string; author: string; role: string
}

export interface Inquiry {
  id: ID; name: string; email: string; phone: string; country: string; company: string; budget: string; project_type: string; message: string; status: string; created_at: string
}

export interface Lead {
  id: ID; name: string; email: string; phone: string; source: string; status: string; created_at: string
}

export interface Coupon {
  id: ID; code: string; discount: number; type: 'percentage' | 'fixed'; active: boolean; expires_at: string
}

export interface Setting {
  id: ID; key: string; value: string
}

export interface UserProfile {
  id: ID; email: string; role: string; created_at: string
}

interface Store {
  services: ServiceItem[]
  packages: Package[]
  singleCategories: SingleServiceCat[]
  intlServices: IntlService[]
  portfolio: PortfolioItem[]
  blogPosts: BlogPost[]
  testimonials: Testimonial[]
  inquiries: Inquiry[]
  leads: Lead[]
  coupons: Coupon[]
  settings: Setting[]
  users: UserProfile[]
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

const seed: Store = {
  services: [
    { id: uid(), name: 'Monthly Packages', desc: 'Ongoing growth support with social media management, advertising, content strategy, and weekly reports.', icon: 'calendar_month', href: '/services#monthly' },
    { id: uid(), name: 'Single Services', desc: 'One-time projects including branding, web development, AI systems, photography, and video production.', icon: 'bolt', href: '/services#single' },
    { id: uid(), name: 'International', desc: 'Premium services for global clients. Branding, UI/UX, AI development, and growth marketing in USD.', icon: 'language', href: '/services#international' },
    { id: uid(), name: 'Custom Solutions', desc: 'Tailor-made systems designed around your unique business requirements.', icon: 'rocket_launch', href: '/services#custom' },
  ],
  packages: [
    { id: uid(), name: 'Starter', price: '5,500', currency: 'BDT', features: ['Social media management', 'Basic boosting', 'Content strategy', 'Monthly report', '6 posters', '2 reels'] },
    { id: uid(), name: 'Growth', price: '12,500', currency: 'BDT', features: ['Social media management', 'Meta advertising', 'Website support', 'Weekly reports', '12 posters', '3 reels', 'Weekly meetings'], popular: true },
    { id: uid(), name: 'Business', price: '22,500', currency: 'BDT', features: ['Full digital management', 'Advanced advertising', 'Website management', 'AI consultation', 'Business analysis', 'Priority support'] },
  ],
  singleCategories: [
    { id: uid(), name: 'Graphic Design', items: ['Logo Design', 'Brand Identity', 'Packaging Design', 'Poster Design', 'Social Media Design'] },
    { id: uid(), name: 'Photography', items: ['Product Photography', 'Fashion Photography', 'Corporate Photography'] },
    { id: uid(), name: 'Video Production', items: ['Reels', 'Advertisements', 'Promotional Videos'] },
    { id: uid(), name: 'Website', items: ['Business Website', 'Portfolio Website', 'Landing Page', 'E-commerce Website'] },
    { id: uid(), name: 'AI Services', items: ['AI Chatbot', 'AI Automation', 'AI Content System'] },
    { id: uid(), name: 'Marketing', items: ['Facebook Ads', 'Instagram Ads', 'Google Ads', 'Lead Generation'] },
  ],
  intlServices: [
    { id: uid(), title: 'Branding', price: '$1,500+' },
    { id: uid(), title: 'Web Development', price: '$2,500+' },
    { id: uid(), title: 'UI/UX Design', price: '$1,200+' },
    { id: uid(), title: 'AI Systems', price: '$3,000+' },
    { id: uid(), title: 'Growth Marketing', price: '$1,800+' },
    { id: uid(), title: 'Lead Generation', price: '$1,000+' },
    { id: uid(), title: 'Automation', price: '$2,000+' },
  ],
  portfolio: [
    { id: uid(), title: 'Urban Aesthetics', cat: 'Branding & Web Development', desc: 'Complete digital transformation for a premium beauty brand. Revenue grew 3x in 6 months.', metric: '3x Revenue' },
    { id: uid(), title: 'TechNova Solutions', cat: 'AI Automation System', desc: 'Custom AI workflow automation saving 40+ hours per week across operations.', metric: '40+ hrs Saved' },
    { id: uid(), title: 'Luxe & Co.', cat: 'Brand Identity', desc: 'World-class brand identity system for a luxury retail brand.', metric: '2x Engagement' },
    { id: uid(), title: 'GreenLeaf Organic', cat: 'E-commerce', desc: 'Full e-commerce platform with integrated marketing automation.', metric: '150% Growth' },
  ],
  blogPosts: [
    { id: uid(), title: 'How AI is Transforming SME Growth in 2024', cat: 'AI', date: 'Dec 12, 2024', excerpt: 'Discover how artificial intelligence is leveling the playing field for small and medium enterprises.' },
    { id: uid(), title: 'The Complete Guide to Brand Identity for Startups', cat: 'Branding', date: 'Nov 28, 2024', excerpt: 'Everything you need to know about building a brand that resonates with your target audience.' },
    { id: uid(), title: 'Why Your Business Needs an AI Chatbot', cat: 'AI', date: 'Nov 15, 2024', excerpt: 'Customer service automation is no longer optional.' },
    { id: uid(), title: 'Social Media Marketing in Bangladesh: 2024 Trends', cat: 'Marketing', date: 'Nov 2, 2024', excerpt: 'The latest social media trends shaping the Bangladeshi market.' },
  ],
  testimonials: [
    { id: uid(), text: 'MESO transformed our digital presence completely. Our revenue grew 3x in 6 months.', author: 'Sarah Rahman', role: 'CEO, Urban Aesthetics' },
    { id: uid(), text: 'The AI automation system MESO built saved us 40 hours per week. Incredible efficiency gains.', author: 'Kamal Hossain', role: 'Founder, TechNova Solutions' },
    { id: uid(), text: 'Their branding package gave us a world-class identity. We look like a Fortune 500 company now.', author: 'Nusrat Jahan', role: 'Marketing Director, Luxe & Co.' },
  ],
  inquiries: [],
  leads: [],
  coupons: [
    { id: uid(), code: 'LAUNCH20', discount: 20, type: 'percentage', active: true, expires_at: '2025-12-31' },
    { id: uid(), code: 'SAVE500', discount: 500, type: 'fixed', active: true, expires_at: '2025-06-30' },
  ],
  settings: [
    { id: uid(), key: 'site_name', value: 'MESO' },
    { id: uid(), key: 'site_description', value: 'Modernize Every SME with Opportunity' },
    { id: uid(), key: 'contact_email', value: 'hello@meso.com' },
    { id: uid(), key: 'contact_phone', value: '+880 1700-000000' },
    { id: uid(), key: 'address', value: 'Dhaka, Bangladesh' },
  ],
  users: [
    { id: uid(), email: 'admin@meso.com', role: 'admin', created_at: new Date().toISOString() },
  ],
}

const store: Store = { ...seed, services: [...seed.services], packages: [...seed.packages], singleCategories: [...seed.singleCategories], intlServices: [...seed.intlServices], portfolio: [...seed.portfolio], blogPosts: [...seed.blogPosts], testimonials: [...seed.testimonials], inquiries: [...seed.inquiries], leads: [...seed.leads], coupons: [...seed.coupons], settings: [...seed.settings], users: [...seed.users] }

export type Collection = keyof Store

export function list<T extends Collection>(col: T): Store[T] {
  return store[col]
}

export function get<T extends Collection>(col: T, id: ID): Store[T][number] | null {
  const items = store[col] as any[]
  return items.find((i) => i.id === id) || null
}

export function create<T extends Collection>(col: T, data: any): any {
  const items = store[col] as any[]
  const item = { id: uid(), ...data, created_at: new Date().toISOString() }
  items.push(item)
  return item
}

export function update<T extends Collection>(col: T, id: ID, data: any): any | null {
  const items = store[col] as any[]
  const idx = items.findIndex((i) => i.id === id)
  if (idx === -1) return null
  items[idx] = { ...items[idx], ...data, id }
  return items[idx]
}

export function remove<T extends Collection>(col: T, id: ID): boolean {
  const items = store[col] as any[]
  const idx = items.findIndex((i) => i.id === id)
  if (idx === -1) return false
  items.splice(idx, 1)
  return true
}

export type { Store, ID }
