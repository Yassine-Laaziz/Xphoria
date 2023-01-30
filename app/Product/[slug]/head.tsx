import { DefaultTags } from "../../../components/nextjs";

export default async function Head({ params }: { params: { slug: string } }) {
  return (
    <>
      <title>{params.slug}</title>
      <DefaultTags />
    </>
  )
}
