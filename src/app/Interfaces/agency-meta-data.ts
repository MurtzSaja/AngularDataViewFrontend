export interface AgencyMetaData {
  jsonapi: Jsonapi
  data: Data
  links: Links10
}

export interface Jsonapi {
  version: string
  meta: Meta
}

export interface Meta {
  links: Links
}

export interface Links {
  self: Self
}

export interface Self {
  href: string
}

export interface Data {
  type: string
  id: string
  links: Links2
  attributes: Attributes
  relationships: Relationships
}

export interface Links2 {
  self: Self2
}

export interface Self2 {
  href: string
}

export interface Attributes {
  status: boolean
  title: string
  moderation_state: any
  description: any
  abbreviation: string
  telephone: any
  commonly_requested_records: any
  request_data_complex_average_days: string
  request_data_complex_highest_days: string
  request_data_complex_lowest_days: string
  request_data_complex_median_days: string
  email: any[]
  request_data_expedited_average_days: string
  request_data_expedited_highest_days: string
  request_data_expedited_lowest_days: string
  request_data_expedited_median_days: string
  is_centralized: boolean
  portal_submission_format: string
  reading_rooms: any[]
  field_rep_start: string
  request_data_year: string
  request_data_simple_average_days: string
  request_data_simple_highest_days: string
  request_data_simple_lowest_days: string
  request_data_simple_median_days: string
  submission_address: any
  submission_fax: any
  submission_web: any
  website: any
}

export interface Relationships {
  agency: Agency
  foia_officers: FoiaOfficers
  field_misc: FieldMisc
  public_liaisons: PublicLiaisons
  paper_receiver: PaperReceiver
  request_form: RequestForm
  service_centers: ServiceCenters
}

export interface Agency {
  data: Data2
  links: Links3
}

export interface Data2 {
  type: string
  id: string
  meta: Meta2
}

export interface Meta2 {
  drupal_internal__target_id: number
}

export interface Links3 {
  related: Related
  self: Self3
}

export interface Related {
  href: string
}

export interface Self3 {
  href: string
}

export interface FoiaOfficers {
  data: any[]
  links: Links4
}

export interface Links4 {
  related: Related2
  self: Self4
}

export interface Related2 {
  href: string
}

export interface Self4 {
  href: string
}

export interface FieldMisc {
  data: any[]
  links: Links5
}

export interface Links5 {
  related: Related3
  self: Self5
}

export interface Related3 {
  href: string
}

export interface Self5 {
  href: string
}

export interface PublicLiaisons {
  data: any[]
  links: Links6
}

export interface Links6 {
  related: Related4
  self: Self6
}

export interface Related4 {
  href: string
}

export interface Self6 {
  href: string
}

export interface PaperReceiver {
  data: any
  links: Links7
}

export interface Links7 {
  related: Related5
  self: Self7
}

export interface Related5 {
  href: string
}

export interface Self7 {
  href: string
}

export interface RequestForm {
  data: any
  links: Links8
}

export interface Links8 {
  related: Related6
  self: Self8
}

export interface Related6 {
  href: string
}

export interface Self8 {
  href: string
}

export interface ServiceCenters {
  data: any[]
  links: Links9
}

export interface Links9 {
  related: Related7
  self: Self9
}

export interface Related7 {
  href: string
}

export interface Self9 {
  href: string
}

export interface Links10 {
  self: Self10
}

export interface Self10 {
  href: string
}

