export interface TokenURI {
  name: string;
  description: string;
  image: string;
  Class: string;
  attributes: Attribute[];
}

export interface Attribute {
  trait_type: string;
  value: number;
  max_value?: number;
}
