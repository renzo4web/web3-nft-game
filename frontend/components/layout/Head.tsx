import NextHead from 'next/head'
import { useRouter } from 'next/router'

/**
 * Constants & Helpers
 */
export const WEBSITE_HOST_URL = 'https://nextjs-ethereum-starter.vercel.app/'

/**
 * Prop Types
 */
export interface MetaProps {
  description?: string
  image?: string
  title: string
  type?: string
}

/**
 * Component
 */
export const Head = ({
  customMeta,
}: {
  customMeta?: MetaProps
}): JSX.Element => {
  const router = useRouter()
  const meta: MetaProps = {
    title: 'Legends Unleashed: Choose Your Hero, Save the Realm',
    description: 'Embark on an epic web3 adventure in ConTro and unleash the power of your chosen hero. Choose from the mighty Barbarian, mystical Mage, or compassionate Healer. Defeat fearsome enemies, unravel mysteries, and save the enchanted world in this captivating role-playing game.',
    image: `https://res.cloudinary.com/dsdziwljt/image/upload/v1686860667/2890a1fc-047d-4897-9fc6-015a21147e12_vj8ud8.jpg`,
    type: 'website',
    ...customMeta,
  }

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <link rel="canonical" href={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Next.js Ethereum Starter" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@renzo4web" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </NextHead>
  )
}
