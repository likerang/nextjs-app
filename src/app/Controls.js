"use client";
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export function Controls() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  return (
    <ul className="nav gap-1">
      <li><Link href="/create" className="btn btn-primary">Create</Link></li>
      {
      id &&
      <>
        <li><Link href={"/update/"+id} className="btn btn-secondary">Modify</Link></li>
        <li><button className="btn btn-danger" onClick={()=>{
          const options = {method:'DELETE'}
          fetch('http://localhost:9999/topics/'+id, options) //두번째 인자에는 추가할 값
          .then()
          .then(()=>{
            router.push(`/`);
            router.refresh();
          });
        }}>Delete</button></li>
      </>
      }
    </ul>
  );
}
