export default async function Read({ params }){
  console.log('Read 페이지 작동');
  const { id } = await params;
  
  /* 아래 순서대로 작동 */
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${params.id}`);
  const topic = await res.json(); // json->object에 담기면 topic에 담는다
  console.log(topic);
  
  return (
    <>
      <h2>{topic.title}</h2>
      <p>{topic.message}</p>
    </>
  )
}