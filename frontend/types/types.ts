export interface TokenURI {
  name?: string
  description?: string
  'NFT#'?: string
  image?: string
  Class?: string
  attributes?: Attribute[]
}

export interface Attribute {
  trait_type: 'Health Points' | 'Attack Damage'
  value: number
  max_value?: number
}
