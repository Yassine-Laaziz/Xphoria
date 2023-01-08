export default async function Head({ params }: { params: { slug: string } }) {
  return (
    <>
      <title>{params.slug}</title>
      <link rel="icon" href="../Green_Astronauts.png" />
    </>
  )
}
