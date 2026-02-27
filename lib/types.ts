export type UserRole = 'owner' | 'admin' | 'contractor'

export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Contractor {
  id: string
  business_name: string
  email: string
  phone?: string
  website?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  business_type?: string
  created_at: string
  updated_at: string
}

export interface Campaign {
  id: string
  owner_id: string
  title: string
  description?: string
  template: string
  recipients_count: number
  sent_count: number
  opened_count: number
  clicked_count: number
  status: 'draft' | 'scheduled' | 'sent'
  scheduled_at?: string
  created_at: string
  updated_at: string
}

export interface ContractorMessage {
  id: string
  from_user_id: string
  to_user_id: string
  message: string
  read: boolean
  created_at: string
}

export interface Analytics {
  id: string
  contractor_id: string
  date: string
  views: number
  calls: number
  messages: number
  created_at: string
}
