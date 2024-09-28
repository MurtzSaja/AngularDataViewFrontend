export interface AgencyData {
  jsonapi: Jsonapi
  data: Daum[]
  links: Links3
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

export interface Daum {
  type: string
  id: string
  links: Links2
  attributes: Attributes
}

export interface Links2 {
  self: Self2
}

export interface Self2 {
  href: string
}

export interface Attributes {
  title: string
  abbreviation: string
  submission_address?: SubmissionAddress
  website?: Website
}

export interface SubmissionAddress {
  langcode: any
  country_code: string
  administrative_area: string
  locality: string
  dependent_locality: any
  postal_code: string
  sorting_code: any
  address_line1: string
  address_line2: string
}

export interface Website {
  uri: string
  title: string
  options: any[]
}

export interface Links3 {
  next: Next
  self: Self3
}

export interface Next {
  href: string
}

export interface Self3 {
  href: string
}


export interface RefinedAgencyData {
  title: string,
  website: string,
  address: string,
  id: string
}
