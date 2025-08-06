"use client";
import { useRouter } from 'next/navigation'

const Create = ()=>{
  const router = useRouter()
  return (
    <>
      <form onSubmit={(e)=>{
        e.preventDefault();
        const title = e.target.title.value;
        const message = e.target.message.value;
        const options = { //전송 방식, 전송할 데이터 설정
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({title, message})
        }
        fetch(process.env.NEXT_PUBLIC_API_URL+'topics', options) //두번째 인자에는 추가할 값
        .then(r=>r.json())
        .then(result=>{
          router.push(`/read/${result.id}`);
          router.refresh(); // 새로고침 - 강제로 불러오기 (추가 시 등록된 글이 페이지에 바로 보이도록 !)
        });
      }}>
        <div className="mb-3">
          <input type="text" className="form-control" name="title" placeholder="title"/>
        </div>
        <div className="mb-3">          
          <textarea className="form-control" name="message" rows="3"></textarea>
        </div>
        <p>
          <button type="submit" className="btn btn-success">전송</button>
        </p>
      </form>
    </>
  )
}

export default Create;