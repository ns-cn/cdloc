import Link from 'next/link'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return <Link href={`/tags/${encodeURIComponent(text)}`}>{text.split(' ').join('-')}</Link>
}

export default Tag
