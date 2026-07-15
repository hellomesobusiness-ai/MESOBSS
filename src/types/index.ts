export interface Package {
  id: number
  name: string
  description: string | null
  price_label: string
  price_currency: string
  price_value: string
  category: 'monthly' | 'single' | 'international' | 'custom'
  features: string[]
  is_popular: boolean
  is_active: boolean
  sort_order: number
}

export interface Service {
  id: number
  title: string
  slug: string
  code: string | null
  description: string | null
  category: string
  subcategory: string | null
  price_label: string | null
  price_currency: string
  price_value: string | null
  timeline: string | null
  image_url: string | null
  is_featured: boolean
  is_active: boolean
  sort_order: number
}

export interface InternationalService {
  id: number
  title: string
  description: string | null
  price_currency: string
  price_value: string | null
  timeline: string | null
  is_active: boolean
  sort_order: number
}

export interface Project {
  id: number
  title: string
  slug: string
  description: string | null
  category: string | null
  client: string | null
  completion_date: string | null
  metrics: Record<string, any>
  image_url: string | null
  video_url: string | null
  testimonial: string | null
  testimonial_author: string | null
  is_published: boolean
  is_featured: boolean
  sort_order: number
  images?: ProjectImage[]
}

export interface ProjectImage {
  id: number
  project_id: number
  url: string
  alt: string | null
  sort_order: number
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  author: string | null
  category: string | null
  image_url: string | null
  tags: string[]
  is_published: boolean
  published_at: string | null
  scheduled_at: string | null
  created_at: string
  updated_at: string
}

export interface Inquiry {
  id: number
  name: string
  email: string | null
  phone: string | null
  company: string | null
  country: string | null
  budget: string | null
  project_type: string | null
  interest: string | null
  message: string | null
  status: 'new' | 'contacted' | 'proposal' | 'won' | 'lost'
  value: number | null
  assigned_to: string | null
  created_at: string
}

export interface Testimonial {
  id: number
  client_name: string
  company: string | null
  role: string | null
  content: string
  rating: number
  image_url: string | null
  is_featured: boolean
  is_active: boolean
  sort_order: number
}

export interface FAQ {
  id: number
  question: string
  answer: string
  category: string | null
  sort_order: number
  is_active: boolean
}

export interface Coupon {
  id: number
  code: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  min_purchase: number
  max_uses: number | null
  used_count: number
  expires_at: string | null
  is_active: boolean
}

export interface SEO {
  id: number
  page: string
  title: string | null
  description: string | null
  keywords: string | null
  og_image: string | null
  schema_markup: Record<string, any> | null
}

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  role: 'admin' | 'editor'
}
